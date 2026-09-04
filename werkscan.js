// AI WerkScan — client-engine. Config-gedreven, geen dependencies, toegankelijk.
// Leest window.WERKSCAN (doelgroepconfig) + window.WERKSCAN_META (audience, event, ticket).
// Rule-based scoring: los van presentatie. Geen PII in analytics of console.
(function () {
  "use strict";
  var CFG = window.WERKSCAN;
  var META = window.WERKSCAN_META || {};
  var root = document.getElementById("werkscan");
  if (!CFG || !root) return;

  var AUD = CFG.audience;
  var SKEY = "werkscan_" + AUD; // sessionStorage-sleutel (alleen antwoorden, geen PII)
  var state = { i: 0, answers: {}, started: false, submitting: false };

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) { if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]); } if (html != null) e.innerHTML = html; return e; }
  function track(event, extra) {
    try {
      var payload = { event: event, audience: AUD };
      if (extra) for (var k in extra) payload[k] = extra[k];
      (window.dataLayer = window.dataLayer || []).push(payload);
      if (typeof window.gtag === "function") window.gtag("event", event, payload);
    } catch (e) {}
  }
  function saveAnswers() { try { sessionStorage.setItem(SKEY, JSON.stringify(state.answers)); } catch (e) {} }
  function loadAnswers() { try { var v = sessionStorage.getItem(SKEY); if (v) state.answers = JSON.parse(v) || {}; } catch (e) {} }
  function utm() {
    var out = {}, p = new URLSearchParams(location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) { var v = p.get(k); if (v) out[k] = v.slice(0, 120); });
    return out;
  }

  // ---------- scoring ----------
  function score() {
    var scores = {}; Object.keys(CFG.opportunities).forEach(function (k) { scores[k] = 0; });
    CFG.vragen.forEach(function (q) {
      var chosen = state.answers[q.id];
      if (chosen == null) return;
      var idxs = q.type === "multi" ? chosen : [chosen];
      idxs.forEach(function (idx) {
        var a = q.antwoorden[idx]; if (!a || !a.w) return;
        for (var key in a.w) if (scores[key] != null) scores[key] += a.w[key];
      });
    });
    var ranked = Object.keys(scores).sort(function (a, b) {
      if (scores[b] !== scores[a]) return scores[b] - scores[a];
      return Object.keys(CFG.opportunities).indexOf(a) - Object.keys(CFG.opportunities).indexOf(b);
    });
    // alleen kansen met score > 0; vul aan met eerste opportunities als er te weinig zijn
    var top = ranked.filter(function (k) { return scores[k] > 0; });
    if (top.length < 3) Object.keys(CFG.opportunities).forEach(function (k) { if (top.indexOf(k) < 0 && top.length < 3) top.push(k); });
    return top.slice(0, 3).map(function (k) { return CFG.opportunities[k]; });
  }

  // ---------- schermen ----------
  function scrollIntoView() { var r = root.getBoundingClientRect(); if (r.top < 0 || r.top > 120) root.scrollIntoView({ behavior: "smooth", block: "start" }); }

  function renderStart() {
    root.innerHTML = "";
    var box = el("div", { class: "ws-card ws-start" });
    box.appendChild(el("p", { class: "ws-eyebrow" }, esc(CFG.scanNaam)));
    box.appendChild(el("h2", { class: "ws-start-h" }, esc(CFG.scanIntro.titel[0]) + "<br>" + esc(CFG.scanIntro.titel[1] || "")));
    box.appendChild(el("p", { class: "ws-start-tekst" }, esc(CFG.scanIntro.tekst)));
    var meta = el("p", { class: "ws-microcopy" }, "2 minuten. 6 vragen. Concrete uitslag.");
    box.appendChild(meta);
    var geef = el("ul", { class: "ws-geef" });
    ["jouw drie grootste AI-kansen", "je beste startpunt", "een concrete workflow die bij jouw werk past", "een idee dat je op 23 november kunt bouwen"].forEach(function (t) {
      geef.appendChild(el("li", null, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>' + esc(t)));
    });
    box.appendChild(el("p", { class: "ws-geef-titel" }, "Je krijgt:"));
    box.appendChild(geef);
    var btn = el("button", { type: "button", class: "btn btn-primary ws-startbtn" }, "Doe de AI WerkScan &rarr;");
    btn.addEventListener("click", function () { start(); });
    box.appendChild(btn);
    box.appendChild(el("p", { class: "ws-fineprint" }, "&plusmn; 2 minuten &middot; gratis &middot; persoonlijke uitslag"));
    root.appendChild(box);
  }

  function start() {
    if (!state.started) { state.started = true; track("audience_scan_start"); }
    state.i = 0; renderQuestion();
    scrollIntoView();
  }

  function renderQuestion() {
    var q = CFG.vragen[state.i], tot = CFG.vragen.length;
    root.innerHTML = "";
    var box = el("div", { class: "ws-card" });
    var top = el("div", { class: "ws-top" });
    top.appendChild(el("span", { class: "ws-scanname" }, esc(CFG.scanNaam)));
    top.appendChild(el("span", { class: "ws-count" }, String(state.i + 1).padStart(2, "0") + " / " + String(tot).padStart(2, "0")));
    box.appendChild(top);
    var bar = el("div", { class: "ws-bar" }); bar.appendChild(el("i", { style: "width:" + Math.round((state.i + 1) / tot * 100) + "%" })); box.appendChild(bar);
    box.appendChild(el("h2", { class: "ws-q", id: "ws-q", tabindex: "-1" }, esc(q.vraag)));
    if (q.type === "multi") box.appendChild(el("p", { class: "ws-hint" }, esc(q.hint || "Meerdere antwoorden mogelijk")));

    var group = el("div", { class: "ws-answers", role: q.type === "multi" ? "group" : "radiogroup", "aria-labelledby": "ws-q" });
    var chosen = state.answers[q.id];
    q.antwoorden.forEach(function (a, idx) {
      var selected = q.type === "multi" ? (Array.isArray(chosen) && chosen.indexOf(idx) >= 0) : chosen === idx;
      var b = el("button", { type: "button", class: "ws-opt" + (selected ? " is-on" : ""), role: q.type === "multi" ? "checkbox" : "radio", "aria-checked": selected ? "true" : "false" });
      b.appendChild(el("span", { class: "ws-opt-box", "aria-hidden": "true" }));
      b.appendChild(el("span", { class: "ws-opt-label" }, esc(a.label)));
      b.addEventListener("click", function () { choose(q, idx, b); });
      group.appendChild(b);
    });
    box.appendChild(group);

    var nav = el("div", { class: "ws-nav" });
    if (state.i > 0) { var back = el("button", { type: "button", class: "ws-back" }, "&larr; Vorige"); back.addEventListener("click", function () { state.i--; renderQuestion(); }); nav.appendChild(back); }
    else { var ghost = el("span"); nav.appendChild(ghost); }
    var next = el("button", { type: "button", class: "btn btn-primary ws-next", id: "ws-next" }, state.i === tot - 1 ? "Naar mijn analyse &rarr;" : "Volgende &rarr;");
    next.disabled = !hasAnswer(q);
    next.addEventListener("click", function () { goNext(q); });
    nav.appendChild(next);
    box.appendChild(nav);
    box.appendChild(el("p", { class: "ws-noright" }, "Geen goed of fout antwoord."));
    root.appendChild(box);
    var qh = document.getElementById("ws-q"); if (qh && state.i > 0) qh.focus();
  }

  function hasAnswer(q) { var c = state.answers[q.id]; return q.type === "multi" ? (Array.isArray(c) && c.length > 0) : c != null; }

  function choose(q, idx, btn) {
    if (q.type === "multi") {
      var arr = Array.isArray(state.answers[q.id]) ? state.answers[q.id].slice() : [];
      var at = arr.indexOf(idx);
      if (at >= 0) { arr.splice(at, 1); btn.classList.remove("is-on"); btn.setAttribute("aria-checked", "false"); }
      else { arr.push(idx); btn.classList.add("is-on"); btn.setAttribute("aria-checked", "true"); }
      state.answers[q.id] = arr;
    } else {
      state.answers[q.id] = idx;
      root.querySelectorAll(".ws-opt").forEach(function (o) { o.classList.remove("is-on"); o.setAttribute("aria-checked", "false"); });
      btn.classList.add("is-on"); btn.setAttribute("aria-checked", "true");
    }
    saveAnswers();
    var next = document.getElementById("ws-next"); if (next) next.disabled = !hasAnswer(q);
  }

  function goNext(q) {
    if (!hasAnswer(q)) return;
    track("audience_scan_question_complete", { vraag: state.i + 1 });
    if (state.i < CFG.vragen.length - 1) { state.i++; renderQuestion(); scrollIntoView(); }
    else { renderLeadGate(); scrollIntoView(); }
  }

  // ---------- leadgate ----------
  function renderLeadGate() {
    track("audience_scan_lead_form_view");
    root.innerHTML = "";
    var box = el("div", { class: "ws-card ws-gate" });
    box.appendChild(el("p", { class: "ws-eyebrow" }, "Dat was 'm."));
    box.appendChild(el("h2", { class: "ws-gate-h" }, "Je analyse is klaar."));
    box.appendChild(el("p", { class: "ws-gate-tekst" }, "We hebben op basis van je antwoorden je belangrijkste AI-kansen bepaald. Vul hieronder je gegevens in om je persoonlijke uitslag te bekijken."));
    var form = el("form", { class: "ws-form", novalidate: "novalidate" });
    form.innerHTML =
      '<div class="ws-veld"><label for="ws-vn">Voornaam</label><input id="ws-vn" name="voornaam" type="text" autocomplete="given-name" required maxlength="80"></div>' +
      '<div class="ws-veld"><label for="ws-an">Achternaam</label><input id="ws-an" name="achternaam" type="text" autocomplete="family-name" required maxlength="80"></div>' +
      '<div class="ws-veld"><label for="ws-em">E-mailadres</label><input id="ws-em" name="email" type="email" autocomplete="email" required maxlength="160"></div>' +
      '<label class="ws-consent"><input type="checkbox" name="marketing"> Ja, houd mij af en toe op de hoogte van praktische AI-tips en de AI Aan De Slag Dag.</label>' +
      '<input type="text" name="_website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
      '<button type="submit" class="btn btn-primary ws-submit">Bekijk mijn AI-kansen &rarr;</button>' +
      '<p class="ws-fout" role="alert" hidden></p>' +
      '<p class="ws-privacy">Door je gegevens te versturen verwerken we deze om je persoonlijke AI WerkScan-resultaat te tonen en toe te sturen. Bekijk onze <a href="/privacy">privacyverklaring</a>.</p>';
    box.appendChild(form);
    root.appendChild(box);
    var startTs = Date.now();
    form.addEventListener("submit", function (e) { e.preventDefault(); submitLead(form, startTs); });
    var vn = document.getElementById("ws-vn"); if (vn) vn.focus();
  }

  function toonFout(form, tekst) {
    var f = form.querySelector(".ws-fout"); if (f) { f.textContent = tekst; f.hidden = false; }
    var btn = form.querySelector(".ws-submit"); if (btn) { btn.disabled = false; btn.textContent = "Bekijk mijn AI-kansen →"; }
    state.submitting = false;
  }

  function submitLead(form, startTs) {
    if (state.submitting) return;
    var vn = form.voornaam.value.trim(), an = form.achternaam.value.trim(), em = form.email.value.trim();
    var mk = form.marketing.checked, hp = form._website.value;
    if (!vn || !an) return toonFout(form, "Vul je voor- en achternaam in.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return toonFout(form, "Vul een geldig e-mailadres in.");
    state.submitting = true;
    var btn = form.querySelector(".ws-submit"); if (btn) { btn.disabled = true; btn.textContent = "Momentje…"; }
    var f = form.querySelector(".ws-fout"); if (f) f.hidden = true;

    var kansen = score();
    var payload = {
      audience: AUD, scan_version: CFG.scan_version,
      voornaam: vn, achternaam: an, email: em, marketing_consent: mk,
      result_profile: kansen[0] ? kansen[0].titel : "",
      opportunities: kansen.map(function (k) { return k.titel; }),
      kansen: kansen.map(function (k) { return { titel: k.titel, waarom: k.waarom }; }),
      start: kansen[0] ? kansen[0].start : "",
      build: kansen[0] ? kansen[0].build : "",
      ticket: CFG.ticket,
      source_page: location.pathname,
      _website: hp, _ts: startTs,
    };
    var uu = utm(); for (var k in uu) payload[k] = uu[k];

    track("audience_scan_lead_submit");
    var done = false;
    var to = setTimeout(function () { if (!done) { done = true; toonFout(form, "Dat duurde te lang. Je antwoorden zijn bewaard. Probeer het nog een keer."); } }, 15000);
    fetch("/api/werkscan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
      .then(function (res) {
        if (done) return; done = true; clearTimeout(to);
        if (res && res.ok) { renderResult(vn, kansen); }
        else { toonFout(form, "Dat ging niet goed. Je antwoorden zijn bewaard. Probeer het nog een keer."); }
      })
      .catch(function () { if (done) return; done = true; clearTimeout(to); toonFout(form, "Dat ging niet goed. Je antwoorden zijn bewaard. Probeer het nog een keer."); });
  }

  // ---------- resultaat ----------
  function renderResult(voornaam, kansen) {
    track("audience_scan_completed");
    track("audience_scan_result_view");
    try { sessionStorage.removeItem(SKEY); } catch (e) {}
    root.innerHTML = "";
    var box = el("div", { class: "ws-result" });
    box.appendChild(el("p", { class: "ws-eyebrow" }, "Je AI WerkScan-uitslag"));
    box.appendChild(el("h2", { class: "ws-result-h" }, esc(voornaam) + ", dit zijn jouw grootste AI-kansen."));
    if (CFG.nuance) box.appendChild(el("p", { class: "ws-nuance" }, esc(CFG.nuance)));
    if (CFG.groot) box.appendChild(el("p", { class: "ws-groot" }, esc(CFG.groot)));

    var lijst = el("div", { class: "ws-kansen" });
    kansen.forEach(function (k, i) {
      var c = el("div", { class: "ws-kans" });
      c.appendChild(el("span", { class: "ws-kans-num" }, String(i + 1).padStart(2, "0")));
      c.appendChild(el("h3", null, esc(k.titel)));
      c.appendChild(el("p", null, esc(k.waarom)));
      lijst.appendChild(c);
    });
    box.appendChild(lijst);

    var top = kansen[0];
    var start = el("div", { class: "ws-block ws-start-advies" });
    start.appendChild(el("h3", null, "Hier zou ik beginnen."));
    start.appendChild(el("p", null, esc(top.start)));
    box.appendChild(start);

    var build = el("div", { class: "ws-block ws-build" });
    build.appendChild(el("p", { class: "ws-build-eyebrow" }, "Dit zou je op 23 november kunnen bouwen"));
    build.appendChild(el("p", { class: "ws-build-tekst" }, esc(top.build)));
    box.appendChild(build);

    // event + CTA
    var isTeam = CFG.ticket === "team";
    var ev = el("div", { class: "ws-event" });
    ev.appendChild(el("p", { class: "ws-event-koppel" }, "Dit is precies waar je op 23 november aan kunt werken."));
    ev.appendChild(el("p", { class: "ws-event-info" }, "23 november 2026 &middot; Grote Kerk Den Haag<br>Maximaal 6 deelnemers per AI-coach &middot; " + (isTeam ? "&euro;2.995 excl. btw voor zes" : "&euro;595 excl. btw")));
    var cta = el("a", { class: "btn btn-primary ws-event-cta", href: isTeam ? "/#teams" : "/#tickets" }, isTeam ? "Dit wil ik met mijn team doen &rarr;" : "Dit wil ik bouwen &rarr;");
    cta.addEventListener("click", function () { track("audience_scan_event_cta_click", { ticket: CFG.ticket }); });
    ev.appendChild(cta);
    ev.appendChild(el("p", { class: "ws-mailnote" }, "We sturen deze uitslag ook naar je e-mail."));
    box.appendChild(ev);
    root.appendChild(box);
    scrollIntoView();
  }

  // ---------- init ----------
  loadAnswers();
  renderStart();
})();
