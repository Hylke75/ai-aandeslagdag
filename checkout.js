// Checkout-modal voor de ticketverkoop. Opent op de ticket-knoppen (data-event="checkout_start").
// Verzamelt besteller + betaalwijze (online/factuur) + teamnamen, post naar same-origin /api/checkout.
// Online → redirect naar Mollie. Factuur → bevestiging op de pagina. Geen PII in analytics.
(function () {
  "use strict";
  var TICKETS = {
    individueel: { naam: "Individuele werkplek", prijs: "€595 excl. btw", team: false },
    teamtafel: { naam: "Teamtafel (6 personen)", prijs: "€2.995 excl. btw", team: true },
  };
  var overlay = null, startTs = 0, bezig = false;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function track(ev, extra) { try { var p = { event: ev }; if (extra) for (var k in extra) p[k] = extra[k]; (window.dataLayer = window.dataLayer || []).push(p); if (typeof window.gtag === "function") window.gtag("event", ev, p); } catch (e) {} }

  function teamVelden() {
    var h = '<fieldset class="co-team"><legend>Namen van je team <span class="co-opt">(mag ook later)</span></legend>';
    for (var i = 1; i <= 6; i++) h += '<input type="text" name="deelnemer" maxlength="120" placeholder="Deelnemer ' + i + '" autocomplete="off">';
    return h + '</fieldset>';
  }

  function open(ticketKey) {
    if (overlay) sluit();
    var t = TICKETS[ticketKey] || TICKETS.individueel;
    startTs = Date.now();
    track("checkout_open", { ticket: ticketKey });
    overlay = document.createElement("div");
    overlay.className = "co-overlay";
    overlay.innerHTML =
      '<div class="co-modal" role="dialog" aria-modal="true" aria-labelledby="co-h">' +
        '<button type="button" class="co-sluit" aria-label="Sluiten">&times;</button>' +
        '<p class="co-eyebrow">Reserveren</p>' +
        '<h2 id="co-h">' + esc(t.naam) + '</h2>' +
        '<p class="co-prijs">' + esc(t.prijs) + " · 23 november 2026 · Grote Kerk Den Haag</p>" +
        '<form class="co-form" novalidate>' +
          '<div class="co-veld"><label for="co-naam">Naam</label><input id="co-naam" name="naam" type="text" autocomplete="name" required maxlength="120"></div>' +
          '<div class="co-veld"><label for="co-email">E-mailadres</label><input id="co-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>' +
          '<div class="co-rij"><div class="co-veld"><label for="co-bedrijf">Bedrijf</label><input id="co-bedrijf" name="bedrijf" type="text" autocomplete="organization" maxlength="160"></div>' +
          '<div class="co-veld"><label for="co-tel">Telefoon</label><input id="co-tel" name="telefoon" type="tel" autocomplete="tel" required maxlength="40"></div></div>' +
          '<div class="co-veld"><label for="co-adres">Factuuradres <span class="co-opt">(optioneel)</span></label><input id="co-adres" name="factuur_adres" type="text" autocomplete="street-address" maxlength="160"></div>' +
          '<div class="co-rij"><div class="co-veld"><label for="co-pc">Postcode</label><input id="co-pc" name="factuur_postcode" type="text" maxlength="16" autocomplete="postal-code"></div>' +
          '<div class="co-veld"><label for="co-plaats">Plaats</label><input id="co-plaats" name="factuur_plaats" type="text" maxlength="80" autocomplete="address-level2"></div></div>' +
          '<div class="co-veld"><label for="co-btw">Btw-nummer <span class="co-opt">(optioneel)</span></label><input id="co-btw" name="btw_nummer" type="text" maxlength="20"></div>' +
          (t.team ? teamVelden() : "") +
          '<fieldset class="co-betaal"><legend>Hoe wil je betalen?</legend>' +
            '<label class="co-radio"><input type="radio" name="betaalwijze" value="online" checked> <span><strong>Direct online betalen</strong> (iDEAL of creditcard)</span></label>' +
            '<label class="co-radio"><input type="radio" name="betaalwijze" value="factuur"> <span><strong>Op factuur betalen</strong> (betaaltermijn 14 dagen)</span></label>' +
          "</fieldset>" +
          '<label class="co-check"><input type="checkbox" name="optin"> Houd mij af en toe op de hoogte van praktische AI-tips en de AI Aan De Slag Dag.</label>' +
          '<label class="co-check"><input type="checkbox" name="akkoord" required> Ik ga akkoord met de <a href="/voorwaarden" target="_blank" rel="noopener">algemene voorwaarden</a>. Een factuur ontvang je in beide gevallen.</label>' +
          '<input type="text" name="_website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
          '<button type="submit" class="btn btn-primary co-submit">Reserveren &amp; betalen &rarr;</button>' +
          '<p class="co-fout" role="alert" hidden></p>' +
          '<p class="co-privacy">Je gegevens worden verwerkt om je reservering en factuur af te handelen. Bekijk onze <a href="/privacy" target="_blank" rel="noopener">privacyverklaring</a>.</p>' +
        "</form>" +
      "</div>";
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    var form = overlay.querySelector(".co-form");
    var ticketKeyLocal = t.team ? "teamtafel" : "individueel";
    overlay.querySelector(".co-sluit").addEventListener("click", sluit);
    overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) sluit(); });
    document.addEventListener("keydown", escSluit);
    // betaalwijze wijzigt de knoptekst
    form.addEventListener("change", function () {
      var bw = form.querySelector('input[name="betaalwijze"]:checked');
      var btn = form.querySelector(".co-submit");
      if (bw && btn) btn.innerHTML = bw.value === "factuur" ? "Reserveren &amp; factuur ontvangen &rarr;" : "Reserveren &amp; betalen &rarr;";
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); verstuur(form, ticketKeyLocal); });
    setTimeout(function () { var n = overlay.querySelector("#co-naam"); if (n) n.focus(); }, 40);
  }

  function escSluit(e) { if (e.key === "Escape") sluit(); }
  function sluit() { if (!overlay) return; document.removeEventListener("keydown", escSluit); overlay.remove(); overlay = null; document.body.style.overflow = ""; bezig = false; }

  function fout(form, tekst) {
    var f = form.querySelector(".co-fout"); if (f) { f.textContent = tekst; f.hidden = false; }
    var b = form.querySelector(".co-submit"); if (b) b.disabled = false;
    bezig = false;
  }

  function verstuur(form, ticketKey) {
    if (bezig) return;
    var naam = form.naam.value.trim(), email = form.email.value.trim();
    if (!naam) return fout(form, "Vul je naam in.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fout(form, "Vul een geldig e-mailadres in.");
    if (form.telefoon.value.trim().replace(/[^0-9]/g, "").length < 8) return fout(form, "Vul een geldig telefoonnummer in.");
    if (!form.akkoord.checked) return fout(form, "Je moet akkoord gaan met de voorwaarden.");
    bezig = true;
    var btn = form.querySelector(".co-submit"); if (btn) btn.disabled = true;
    var f = form.querySelector(".co-fout"); if (f) f.hidden = true;

    var deelnemers = [];
    form.querySelectorAll('input[name="deelnemer"]').forEach(function (inp) { if (inp.value.trim()) deelnemers.push({ naam: inp.value.trim() }); });
    var bw = (form.querySelector('input[name="betaalwijze"]:checked') || {}).value || "online";

    var payload = {
      ticket: ticketKey, betaalwijze: bw,
      naam: naam, email: email,
      bedrijf: form.bedrijf.value.trim(), telefoon: form.telefoon.value.trim(),
      factuur_adres: form.factuur_adres.value.trim(), factuur_postcode: form.factuur_postcode.value.trim(),
      factuur_plaats: form.factuur_plaats.value.trim(), btw_nummer: form.btw_nummer.value.trim(),
      deelnemers: deelnemers,
      optin: form.optin.checked, optin_tekst: form.optin.checked ? "Aangevinkt bij reservering AI Aan De Slag Dag" : "",
      bron_pagina: location.pathname,
      _website: form._website.value, _ts: startTs,
    };
    track("checkout_submit", { ticket: ticketKey, betaalwijze: bw });

    fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (res && res.ok && res.redirect) { track("checkout_redirect", { ticket: ticketKey }); window.location.href = res.redirect; return; }
        if (res && res.ok) { track("checkout_factuur", { ticket: ticketKey }); bevestig(res.melding); return; }
        fout(form, (res && res.melding) || "Reserveren lukte niet. Probeer het opnieuw.");
      })
      .catch(function () { fout(form, "Er ging iets mis. Je gegevens staan er nog; probeer het opnieuw."); });
  }

  function bevestig(melding) {
    if (!overlay) return;
    var m = overlay.querySelector(".co-modal");
    m.innerHTML =
      '<button type="button" class="co-sluit" aria-label="Sluiten">&times;</button>' +
      '<div class="co-klaar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>' +
      "<h2>Je plek is gereserveerd</h2>" +
      "<p>" + esc(melding || "De factuur staat in je mail. Betaal graag binnen 14 dagen en uiterlijk vóór het evenement.") + "</p>" +
      "<p class=\"co-klaar-sub\">Geen mail ontvangen? Check je spam of mail naar contact@ai-aandeslagdag.nl.</p>" +
      '<button type="button" class="btn btn-primary co-sluit2">Sluiten</button></div>';
    m.querySelector(".co-sluit").addEventListener("click", sluit);
    m.querySelector(".co-sluit2").addEventListener("click", sluit);
  }

  // Koppel aan de ticket-knoppen (ook via CMS-hydratie later toegevoegd → delegatie).
  document.addEventListener("click", function (e) {
    var b = e.target.closest('[data-event="checkout_start"]');
    if (!b) return;
    e.preventDefault();
    // data-ticket kan de key ("teamtafel") of de CMS-naam ("Teamtafel") zijn.
    var dt = (b.getAttribute("data-ticket") || "").toLowerCase();
    open(dt.indexOf("team") >= 0 ? "teamtafel" : "individueel");
  });
})();
