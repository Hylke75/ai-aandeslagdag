// Cookie-/meetvoorkeuren voor AI Aan De Slag Dag — drie keuzes:
//   • Weigeren            → geen enkele meting.
//   • Alleen noodzakelijk → alleen cookieloze, anonieme bezoekmeting (Vercel Web Analytics). Geen cookies, geen GA.
//   • Alles accepteren    → cookieloze meting + Google Analytics (gtag.js, met cookies).
//
// De keuze wordt lokaal bewaard (aisd_consent = 'none' | 'essential' | 'all') en is altijd te herzien via
// de footerlink "Cookievoorkeuren" of window.cookievoorkeuren(). Data-events queuen in dataLayer (geen
// netwerk) en gaan alleen naar Google bij 'all'. Vercel Web Analytics is cookieloos en verwerkt geen
// persoonsgegevens; daarom valt die meting onder de optie "Alleen noodzakelijk".

(function () {
  "use strict";
  var KEY = "aisd_consent";            // 'none' | 'essential' | 'all'
  var GA_ID = "G-MYG8ZJJLBD";

  // gtag-shim: data-events blijven werken (queuen), zonder netwerk vóór consent.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  function bewaar(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function keuze() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === "accepted") return "all";   // migratie van de oude 2-keuze-versie
      if (v === "declined") return "none";
      return v;
    } catch (e) { return null; }
  }

  // Vercel Web Analytics: cookieloos, first-party (/_vercel/insights). Meet 100% bezoek zonder PII.
  function laadVercel() {
    if (window.__vaGeladen) return;
    window.__vaGeladen = true;
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    var s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.appendChild(s);
  }

  // Google Analytics (gtag.js): met cookies, alleen bij volledige toestemming.
  function laadGA() {
    if (window.__gaGeladen) return;
    window.__gaGeladen = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  function pasToe(k) {
    if (k === "all") { laadVercel(); laadGA(); }
    else if (k === "essential") { laadVercel(); }
    // 'none' → niets laden
  }

  function verberg() { var b = document.getElementById("cookiebar"); if (b) b.parentNode.removeChild(b); }

  function toon() {
    if (document.getElementById("cookiebar")) return;
    var bar = document.createElement("div");
    bar.id = "cookiebar";
    bar.className = "cookiebar";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookievoorkeuren");
    bar.innerHTML =
      '<div class="cookiebar-in">' +
        '<p class="cookiebar-tekst">We meten websitebezoek om de site te verbeteren. Kies wat je toestaat. ' +
        '<strong>Alleen noodzakelijk</strong> gebruikt anonieme, cookieloze meting. ' +
        '<strong>Alles accepteren</strong> voegt Google Analytics toe. ' +
        'Meer in onze <a href="/privacy">privacyverklaring</a>.</p>' +
        '<div class="cookiebar-acties">' +
          '<button type="button" class="cookiebar-btn cookiebar-weiger" data-keuze="none">Weigeren</button>' +
          '<button type="button" class="cookiebar-btn cookiebar-ess" data-keuze="essential">Alleen noodzakelijk</button>' +
          '<button type="button" class="cookiebar-btn cookiebar-accept" data-keuze="all">Alles accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-keuze]");
      if (!b) return;
      var k = b.getAttribute("data-keuze");
      bewaar(k);
      pasToe(k);
      verberg();
    });
  }

  // Publiek: keuze herzien (footerlink "Cookievoorkeuren").
  window.cookievoorkeuren = toon;

  function init() {
    var k = keuze();
    if (k === "all" || k === "essential" || k === "none") pasToe(k);
    else toon();   // nog geen keuze → banner

    // Footerlink om de keuze altijd te herzien.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cookievoorkeuren]");
      if (t) { e.preventDefault(); toon(); }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
