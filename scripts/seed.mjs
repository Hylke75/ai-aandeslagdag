// Seed de home-pagina (slug "/") van de site "AI Aan De Slag Dag" in het centrale CMS,
// via de token-beveiligde sync-API. Idempotent: één POST vervangt de blokken van de pagina.
//
// Draaien:  CMS_TOKEN=$(cat <tokenbestand>) node scripts/seed.mjs
// (of zet CMS_TOKEN in de omgeving; nooit het token op de commandline zetten)
//
// De teksten zijn 1-op-1 uit het aangeleverde ontwerp. Elk blok draagt content._sectie zodat de
// frontend het op de juiste sectie mapt. Bloktypes = de geregistreerde CMS-typen.

const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl'
const CMS_TOKEN = process.env.CMS_TOKEN
if (!CMS_TOKEN) { console.error('Ontbrekend CMS_TOKEN'); process.exit(1) }

const blokken = [
  { type: 'header', content: {
    _sectie: 'hero',
    eyebrow: 'Maandag 23 november 2026 · Grote Kerk Den Haag',
    heading: 'Laat AI meer van je werk doen.',
    subheading: 'Je gebruikt AI al. Nu ga je ermee werken.',
    body: 'Neem een taak mee die je iedere week tijd kost. Samen met je AI-coach maak je die in één dag slimmer, sneller of deels automatisch.',
    price_note: '€595 excl. btw · inclusief lunch, borrel en voorbereidende intake',
    cta_primair_label: 'Reserveer mijn werkplek voor €595', cta_primair_link: '#tickets',
    cta_secundair_label: 'Kom met mijn team', cta_secundair_link: '#teams',
    usps: [
      { tekst: 'Maximaal 6 deelnemers per AI-coach' },
      { tekst: 'Je eigen werk' },
      { tekst: 'Geen technische kennis nodig' },
      { tekst: 'Direct toepasbaar' },
    ],
  } },
  { type: 'statement', content: {
    _sectie: 'positionering',
    titel: 'Dit is geen AI-congres.',
    tekst: 'Je komt niet kijken wat anderen met AI doen. Je gaat het zelf doen.',
    rule: 'Laptop open. Eigen werkzaamheden erbij. AI-coach aan tafel.',
    highlight: 'Aan het einde van de dag heb je AI niet alleen gezien. Je hebt ermee gewerkt.',
  } },
  { type: 'kaarten', content: {
    _sectie: 'herkenning',
    titel: 'Je gebruikt ChatGPT. Maar hoeveel werk neemt AI je werkelijk uit handen?',
    intro: 'Zes plekken waar bijna elke professional wekelijks uren laat liggen.',
    kolommen: '3',
    items: [
      { icoon: 'kompas', titel: 'Research', tekst: 'Bronnen verzamelen, lezen, samenvatten en er iets mee doen.' },
      { icoon: 'post', titel: 'E-mails & voorstellen', tekst: 'Steeds dezelfde mail, offerte of opvolging opnieuw schrijven.' },
      { icoon: 'gesprek', titel: 'Vergaderingen', tekst: 'Voorbereiden, notuleren, acties uitzetten en nabellen.' },
      { icoon: 'lijst', titel: 'Rapportages', tekst: 'Maandelijks dezelfde update, in hetzelfde format, uit dezelfde bronnen.' },
      { icoon: 'groei', titel: 'Analyses', tekst: 'Cijfers uit een export halen en er een conclusie aan koppelen.' },
      { icoon: 'vonk', titel: 'Content', tekst: 'Posts, nieuwsbrieven en teksten die van jouw kennis naar de wereld moeten.' },
    ],
  } },
  { type: 'intake', content: {
    _sectie: 'intake',
    titel: 'Neem één taak mee waarvan je regelmatig denkt: dit moet toch slimmer kunnen?',
    tekst: 'Na je reservering vul je een korte intake in. Je AI-coach leest die vooraf, zodat je op 23 november niet begint met zoeken, maar met bouwen.',
    muted: 'Vier vragen. Vijf minuten. Geen voorbereiding nodig.',
    stappen: [
      { nummer: '1', vraag: 'Wat voor werk doe je?', veld: 'Accountmanager, adviesbureau' },
      { nummer: '2', vraag: 'Welke taak kost veel tijd?', veld: 'Wekelijkse pipelinerapportage' },
      { nummer: '3', vraag: 'Waar gebruik je AI al voor?', veld: 'Typ hier je antwoord' },
      { nummer: '4', vraag: 'Wat wil je slimmer doen?', veld: 'Typ hier je antwoord' },
    ],
  } },
  { type: 'rolvoorbeelden', content: {
    _sectie: 'voorbeelden',
    titel: 'Wat zou AI in jouw werk slimmer kunnen maken?',
    intro: 'Kies je functie. Dit zijn voorbeelden van werkuitdagingen die deelnemers meenemen.',
    items: [
      { tab: 'Sales', nu: 'Voor elk gesprek zelf LinkedIn, website en jaarverslag doorspitten.', met: 'Eén gespreksvoorbereiding per prospect, in jouw format, in twee minuten.' },
      { tab: 'Sales', nu: 'Opvolgmails na een gesprek blijven een dag liggen.', met: 'Vanuit je gespreksnotities een opvolgmail in jouw toon, klaar om te versturen.' },
      { tab: 'Sales', nu: 'Offertes zijn knip-en-plakwerk uit oude documenten.', met: 'Een voorstel dat start vanuit de klantvraag en jouw bouwstenen.' },
      { tab: 'Marketing & Communicatie', nu: 'Eén whitepaper wordt met moeite twee posts.', met: 'Uit één stuk kennis een maand content, in jouw huisstijl en schrijfwijzer.' },
      { tab: 'Marketing & Communicatie', nu: 'De nieuwsbrief kost elke maand een halve dag.', met: 'Een vaste werkwijze van bronnen naar concept, jij redigeert alleen nog.' },
      { tab: 'Marketing & Communicatie', nu: 'Persberichten en teksten worden vijf keer heen en weer gestuurd.', met: 'Eerste versies die al aan jullie tone of voice voldoen.' },
      { tab: 'Management & Advies', nu: 'Maandrapportage: cijfers verzamelen, duiden, opmaken.', met: 'Van export naar duiding en concepttekst in één vaste stap.' },
      { tab: 'Management & Advies', nu: 'Vergaderingen zonder scherpe voorbereiding en zonder opvolging.', met: 'Agenda, samenvatting en actielijst uit dezelfde bron.' },
      { tab: 'Management & Advies', nu: 'Adviesrapporten schrijven begint steeds weer bij een leeg document.', met: 'Een structuur en eerste versie op basis van jouw interviews en bronnen.' },
      { tab: 'Projecten & Operations', nu: 'Statusupdates naar stakeholders handmatig bij elkaar rapen.', met: 'Een wekelijkse update die uit je projecttool en notities rolt.' },
      { tab: 'Projecten & Operations', nu: 'Processen staan in iemands hoofd, niet op papier.', met: 'Werkinstructies en checklists uit een gesprek van tien minuten.' },
      { tab: 'Projecten & Operations', nu: "Risico's en planning worden pas laat zichtbaar.", met: 'Een vaste analyse-stap op je planning en issuelijst.' },
      { tab: 'HR', nu: 'Vacatureteksten zijn kopieën van vorige vacatures.', met: 'Teksten die starten bij het team, de rol en jullie eigen toon.' },
      { tab: 'HR', nu: 'Beleidsdocumenten vertalen naar heldere communicatie kost dagen.', met: 'Van beleid naar medewerkerscommunicatie in één werkwijze.' },
      { tab: 'HR', nu: 'Gesprekscycli: voorbereiding en verslag lopen altijd achter.', met: 'Gespreksvoorbereiding en verslagstructuur die je zelf beheert.' },
    ],
  } },
  { type: 'kaarten', content: {
    _sectie: 'resultaat',
    titel: 'Dit staat er om 17.30 uur op jouw laptop.',
    items: [
      { titel: 'Jouw AI-toepassing', tekst: 'Een werkende oplossing voor de taak die je meenam. Getest op je eigen materiaal.' },
      { titel: 'Jouw nieuwe werkwijze', tekst: 'Stap voor stap vastgelegd, zodat je het morgen op kantoor herhaalt.' },
      { titel: 'Jouw volgende AI-kansen', tekst: 'Een korte lijst met wat je hierna aanpakt, samen met je coach opgesteld.' },
    ],
  } },
  { type: 'reeks', content: {
    _sectie: 'stappen', _variant: 'genummerd',
    titel: 'Eén dag. Drie stappen.',
    knoptekst_reeks: 'Reserveer mijn werkplek', knop: '#tickets',
    stappen: [
      { nummer: '1', titel: 'Kies', tekst: 'Vooraf bepalen we jouw AI-werkuitdaging.' },
      { nummer: '2', titel: 'Bouw', tekst: 'Je werkt op je eigen laptop met je AI-coach.' },
      { nummer: '3', titel: 'Gebruik', tekst: 'Je neemt een concrete werkwijze mee terug naar je werk.' },
    ],
  } },
  { type: 'statement', content: {
    _sectie: 'coach',
    cijfer: '6', cijfer_label: 'Maximaal deelnemers per AI-coach',
    titel: 'Vastlopen hoort erbij.',
    tekst: 'Iemand die jouw taak vooraf heeft gelezen, naast je zit, meekijkt op je scherm en je verder helpt op het moment dat je vastloopt. Niet vanaf een podium, aan jouw tafel.',
  } },
  { type: 'mediatekst', content: {
    _sectie: 'voorwie',
    titel: 'Voor professionals die AI al proberen en nu verder willen.',
    punten: [
      { tekst: 'Je gebruikt ChatGPT, Copilot of een andere assistent, maar vooral voor losse vragen.' },
      { tekst: 'Je hebt een taak in je week waarvan je weet dat het slimmer kan.' },
      { tekst: 'Je werkt met documenten, mails, data of mensen, niet met code.' },
      { tekst: 'Je wilt na één dag iets hebben dat je maandag gebruikt, geen lijst met tools.' },
      { tekst: 'Je neemt je eigen laptop en je eigen werk mee.' },
    ],
  } },
  { type: 'kaarten', content: {
    _sectie: 'veiligheid',
    titel: 'En je bedrijfsgegevens dan?',
    intro: 'Een goede vraag, en precies waarom je hier een coach naast je hebt. Je bepaalt zelf wat je deelt en werkt binnen het beleid van je eigen organisatie.',
    kolommen: '4',
    items: [
      { titel: 'Persoonsgegevens', tekst: 'Je werkt met geanonimiseerde of fictieve voorbeelden waar dat nodig is. Klantnamen zijn niet nodig om een werkwijze te bouwen.' },
      { titel: 'Vertrouwelijke informatie', tekst: 'Je coach helpt je bepalen wat wel en niet in een AI-tool thuishoort, en hoe je dat oplost zonder de taak te verliezen.' },
      { titel: 'Zakelijke accounts', tekst: 'Waar mogelijk werk je in de zakelijke omgeving van je eigen organisatie, met de instellingen die daar gelden.' },
      { titel: 'Betrouwbaarheid', tekst: 'Controleren hoort bij de werkwijze. Je leert waar AI goed in is, waar niet, en hoe je dat in je proces afvangt.' },
    ],
  } },
  { type: 'sprekers', content: {
    _sectie: 'sprekers',
    titel: 'Af en toe gaat je laptop dicht.',
    sub: 'En krijg je nieuwe ideeën.',
    items: [
      { naam: 'Jarno Duursma', tekst: 'Over wat AI de komende jaren met werk doet, en wat je daar nu al mee moet.' },
      { naam: 'Ben van der Burg', tekst: 'Over ondernemen, tempo maken en waarom je niet moet wachten tot alles duidelijk is.' },
      { naam: 'Hylke Thiry', tekst: 'Over AI in sales en communicatie: hoe je het van experiment naar dagelijks werk brengt.' },
    ],
    slot: 'Inspiratie is belangrijk. Maar daarna gaat je laptop weer open.',
  } },
  { type: 'tekst', content: {
    _sectie: 'tools',
    titel: 'Je komt niet om tien AI-tools te leren.',
    tekst: 'Welke tool je gebruikt, hangt af van je taak en van wat je organisatie toestaat. Je coach werkt met wat jij hebt.',
  } },
  { type: 'reeks', content: {
    _sectie: 'programma', _variant: 'tijdlijn',
    titel: 'Zo ziet jouw AI-werkdag eruit.',
    intro: 'Het grootste deel van de dag ben je aan het werk. Twee keer gaat je laptop dicht voor een spreker.',
    knoptekst_reeks: 'Bekijk het volledige programma',
    stappen: [
      { label: '09.00', titel: 'Binnenkomen', tekst: 'Koffie, laptop open, kennismaken met je coach en je tafel.' },
      { label: '09.30', titel: 'Begrijpen', tekst: 'Jouw werkuitdaging scherp maken: wat moet het resultaat zijn?' },
      { label: '10.30', titel: 'Eerste build', tekst: 'Aan de slag met je eigen taak en je eigen materiaal.', hi: true },
      { label: '12.30', titel: 'Lunch', tekst: 'Laptop dicht. Spreker één.' },
      { label: '13.30', titel: 'Bouwen', tekst: 'Verdiepen en verbeteren, met je coach aan tafel.', hi: true },
      { label: '15.00', titel: 'Testen', tekst: 'Draait het op echt werk? Wat moet anders?', hi: true },
      { label: '16.15', titel: 'Van experiment naar werk', tekst: 'Je werkwijze vastleggen en je volgende AI-kansen bepalen.' },
      { label: '17.30', titel: 'Borrel', tekst: 'Laten zien wat er op je laptop staat.' },
    ],
  } },
  { type: 'prijskaarten', content: {
    _sectie: 'tickets',
    titel: 'Kies hoe je komt.',
    items: [
      { naam: 'Individuele werkplek', prijs: '€595', eenheid: 'excl. btw', accent: 'nee',
        incl: 'Een volledige werkdag met een AI-coach aan je tafel\nMaximaal 6 deelnemers per coach\nVoorbereidende intake op jouw werkuitdaging\nLunch, koffie en borrel in de Grote Kerk',
        knoptekst: 'Reserveer mijn werkplek', knop: '#' },
      { naam: 'Teamtafel', prijs: '€2.995', eenheid: 'excl. btw · 6 personen', accent: 'ja',
        badge: 'Meeste impact', voordeel: '€575 voordeel ten opzichte van 6 losse werkplekken',
        incl: 'Een eigen tafel met een eigen AI-coach voor jullie team\nTeamintake: één gedeelde werkuitdaging of zes losse\nWerkwijzen die morgen in jullie eigen proces passen\nLunch, koffie en borrel in de Grote Kerk',
        knoptekst: 'Reserveer onze teamtafel', knop: '#' },
    ],
  } },
  { type: 'leadcta', content: {
    _sectie: 'werkgever',
    titel: 'Wil je komen, maar moet je werkgever akkoord geven?',
    tekst: 'Wij schrijven de mail voor je: wat je meeneemt, wat het kost en wat je organisatie ermee terugkrijgt.',
    knoptekst: 'Help mij mijn manager overtuigen', knop: '/voor-je-werkgever',
  } },
  { type: 'feiten', content: {
    _sectie: 'locatie',
    titel: 'Een werkdag op een bijzondere plek.',
    feiten: [
      { label: 'Locatie', waarde: 'Grote Kerk, Rond de Grote Kerk 12, Den Haag' },
      { label: 'Datum', waarde: 'Maandag 23 november 2026, 09.00 tot 18.30 uur' },
      { label: 'Reizen', waarde: '10 minuten lopen vanaf Den Haag Centraal. Parkeren in Q-Park Spui.' },
      { label: 'Meenemen', waarde: 'Je laptop, oplader en één taak uit je eigen werk. Wifi en stroom zijn aanwezig.' },
    ],
  } },
  { type: 'faq', content: {
    _sectie: 'faq',
    titel: 'Veelgestelde vragen',
    vragen: [
      { vraag: 'Hoeveel AI-ervaring moet ik hebben?', antwoord: 'Genoeg om ChatGPT of een vergelijkbare tool weleens gebruikt te hebben. Meer niet. De dag begint bij jouw werk, niet bij de techniek.' },
      { vraag: 'Moet ik kunnen programmeren?', antwoord: 'Nee. Je werkt met tools die je in gewone taal aanstuurt. Als er ergens een stukje automatisering nodig is, doet je coach dat samen met je.' },
      { vraag: 'Wat neem ik mee?', antwoord: 'Je laptop, je oplader en één taak die je regelmatig doet. Handig: een paar voorbeelden van die taak (een mail, een rapport, een export) waar je op de dag mee kunt werken.' },
      { vraag: 'Wat ga ik precies bouwen?', antwoord: 'Dat bepalen we vooraf in de intake. Meestal een vaste werkwijze, een set instructies of een kleine automatisering rond de taak die je meeneemt. Het resultaat staat om 17.30 uur op je eigen laptop.' },
      { vraag: 'Hoe zit het met vertrouwelijke gegevens?', antwoord: 'Je bepaalt zelf wat je deelt en werkt binnen het beleid van je organisatie. Waar nodig gebruik je geanonimiseerde voorbeelden. Je coach helpt je bij die keuzes.' },
      { vraag: 'Kunnen we met een team komen?', antwoord: 'Ja. Een teamtafel is voor 6 personen met een eigen AI-coach. Je kiest in de teamintake of jullie aan één gedeelde uitdaging werken of ieder aan een eigen taak.' },
      { vraag: 'Zijn de prijzen inclusief btw?', antwoord: 'Nee, alle prijzen zijn exclusief 21% btw. Je ontvangt een factuur die je bij je werkgever kunt indienen.' },
      { vraag: 'Wat gebeurt er na afloop?', antwoord: 'Je gaat naar huis met een werkende toepassing, een vastgelegde werkwijze en een lijst met volgende kansen. Daarmee kun je maandag direct verder.' },
    ],
  } },
  { type: 'cta', content: {
    _sectie: 'finale',
    titel: 'Je kunt nog maanden blijven ontdekken wat AI allemaal kan.',
    tekst: 'Of je trekt er één dag voor uit en gaat ermee werken.',
    knoptekst: 'Reserveer mijn werkplek voor €595', knop: '#tickets',
  } },
  { type: 'leadcta', content: {
    _sectie: 'lead',
    titel: 'Nog niet klaar om te boeken?',
    tekst: 'De gratis AI Werkbespaarder: beantwoord drie vragen over je werk en ontvang een korte analyse van je AI-kansen.',
    knoptekst: 'Ontdek mijn AI-kansen', knop: '/ai-voor-ondernemers#werkscan-sectie',
  } },
]

const body = {
  paginas: [{
    slug: '/',
    titel: 'AI Aan De Slag Dag · 23 november 2026 · Grote Kerk Den Haag',
    beschrijving: 'Laat AI meer van je werk doen. Neem een taak mee die je iedere week tijd kost en maak die in één dag slimmer met je AI-coach. Maximaal 6 deelnemers per coach. €595 excl. btw.',
    published: true,
    blokken,
  }],
}

const res = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/cms/sync`, {
  method: 'POST',
  headers: { authorization: `Bearer ${CMS_TOKEN}`, 'content-type': 'application/json' },
  body: JSON.stringify(body),
})
const json = await res.json().catch(() => null)
console.log('HTTP', res.status, JSON.stringify(json))
if (!res.ok || !json?.ok) process.exit(1)
console.log(`✓ Geseed: ${json.paginas} pagina('s), ${json.blokken} blokken.`)
