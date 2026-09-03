// Cookie-consent voor AI Aan De Slag Dag.
//
// Google Analytics (gtag.js) wordt PAS geladen na expliciete toestemming ("Accepteren").
// Bij "Weigeren" of zolang er geen keuze is, laadt GA niet en gaat er geen data naar Google.
// Data-events queuen intussen in dataLayer (geen netwerkverkeer) en worden alleen verzonden
// als er alsnog toestemming komt. Keuze wordt lokaal bewaard; via de footerlink
// "Cookievoorkeuren" (of window.cookievoorkeuren()) is de keuze altijd te herzien.

(function () {
  "use strict";
  var KEY = "aisd_consent";            // 'accepted' | 'declined'
  var GA_ID = "G-MYG8ZJJLBD";

  // gtag-shim: data-events blijven werken (queuen), zonder netwerk vóór consent.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  function bewaar(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function keuze() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

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
        '<p class="cookiebar-tekst">We gebruiken alleen analytische cookies om de website te verbeteren — ' +
        'uitsluitend met jouw toestemming. Meer hierover in onze <a href="/privacy">privacyverklaring</a>.</p>' +
        '<div class="cookiebar-acties">' +
          '<button type="button" class="cookiebar-btn cookiebar-weiger" data-keuze="declined">Weigeren</button>' +
          '<button type="button" class="cookiebar-btn cookiebar-accept" data-keuze="accepted">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-keuze]");
      if (!b) return;
      var k = b.getAttribute("data-keuze");
      bewaar(k);
      if (k === "accepted") laadGA();
      verberg();
    });
  }

  // Publiek: keuze herzien (footerlink "Cookievoorkeuren").
  window.cookievoorkeuren = toon;

  function init() {
    var k = keuze();
    if (k === "accepted") laadGA();
    else if (k !== "declined") toon();   // nog geen keuze → banner
    // 'declined' → niets laden

    // Footerlink om de keuze altijd te herzien.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cookievoorkeuren]");
      if (t) { e.preventDefault(); toon(); }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
