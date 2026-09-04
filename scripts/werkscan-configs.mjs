// Configuratie voor de AI WerkScan (5 doelgroepen).
// Eén datamodel → één engine (werkscan.js) + één generator (bouw-landingspaginas.mjs).
// Rule-based scoring: elk gekozen antwoord geeft punten aan opportunity-keys.
// Geen AI-call, geen PII in de logica. Nieuwe doelgroep = nieuw config-object hieronder.
//
// Opportunity: { key, titel, waarom, start, build }
//   waarom  = korte, eerlijke uitleg waarom deze kans past (geen hype).
//   start   = 1 concreet startadvies (alleen gebruikt voor de #1-kans).
//   build   = wat je op 23 november zou kunnen bouwen (alleen #1-kans).
// Vraag: { id, vraag, type:'single'|'multi', hint?, antwoorden:[{ label, w:{oppKey:punten}, tag? }] }

export const EVENT = {
  datum: 'Maandag 23 november 2026',
  locatie: 'Grote Kerk Den Haag',
  prijs_individueel: '€595 excl. btw',
  prijs_team: '€2.995 excl. btw voor zes personen',
}

// ---------------------------------------------------------------- SALES
const sales = {
  audience: 'sales',
  scan_version: 'sales-v1',
  scanNaam: 'AI Sales WerkScan',
  eyebrow: 'AI voor sales',
  h1: ['Laat AI meer', 'van je saleswerk doen.'],
  subhead: 'Klantonderzoek. Gespreksvoorbereiding. Offertes. Follow-ups. CRM. Neem één terugkerende salestaak mee en bouw er tijdens de AI Aan De Slag Dag samen met je AI-coach een slimmere werkwijze van.',
  ctaPrimair: { label: 'Reserveer je werkplek', href: '/#tickets' },
  ctaScan: 'Doe de AI Sales WerkScan',
  herken: {
    titel: 'Herken je dit?',
    punten: [
      'Je bereidt elk klantgesprek liefst goed voor, maar de tijd ontbreekt.',
      'Na een gesprek blijft de uitwerking en follow-up te vaak liggen.',
      'Offertes en voorstellen kosten steeds opnieuw veel tijd.',
      'Je CRM loopt achter op wat er echt speelt.',
    ],
  },
  scanIntro: { titel: ['Waar laat jij', 'nog tijd liggen?'], tekst: 'Beantwoord een paar vragen over je saleswerk en ontdek welke taken je waarschijnlijk als eerste met AI kunt verbeteren.' },
  overnemen: {
    titel: 'Wat kan AI hiervan overnemen?',
    tekst: 'Niet het klantgesprek zelf. Wel veel van het werk eromheen: informatie verzamelen, samenvatten, uitwerken en opvolgen.',
  },
  voorbeelden: {
    titel: 'Concrete voorbeelden',
    items: [
      { k: 'Accountbriefing', v: 'Voor elk gesprek automatisch de relevante info over een account verzameld en samengevat.' },
      { k: 'Gespreksverslag', v: 'Van je aantekeningen naar een net verslag met actiepunten en een concept-vervolgmail.' },
      { k: 'Offerte-assistent', v: 'Een vaste werkwijze die een voorstel voor 80% opzet, jij scherpt aan.' },
    ],
  },
  opportunities: {
    research: { key: 'research', titel: 'Account research', waarom: 'Je geeft aan dat het onderzoeken en voorbereiden van accounts veel tijd kost. Dat is werk dat grotendeels uit zoeken, lezen en samenvatten bestaat, precies waar AI sterk in is.', start: 'Bouw een vaste briefing: geef AI de bron-info over een account en laat het de kernpunten en gesprekshaakjes samenvatten.', build: 'Een workflow die vóór ieder salesgesprek automatisch accountinformatie verzamelt, relevante signalen samenvat en een persoonlijke gespreksbriefing maakt.' },
    meetingprep: { key: 'meetingprep', titel: 'Gespreksvoorbereiding', waarom: 'Je steekt veel tijd in voorbereiding. Een vaste AI-werkwijze levert je in minuten een scherpe voorbereiding met de juiste vragen.', start: 'Maak een voorbereidingssjabloon dat op basis van wat je weet de belangrijkste vragen en aandachtspunten oplevert.', build: 'Een voorbereidingsassistent die per gesprek een briefing met doelen, vragen en mogelijke bezwaren opstelt.' },
    followup: { key: 'followup', titel: 'Follow-up automation', waarom: 'Je noemt dat opvolging blijft liggen. Juist de uitwerking na een gesprek, samenvatting plus concept-mail, kan AI grotendeels voor je doen.', start: 'Laat AI van je gespreksnotities meteen een samenvatting én een concept-vervolgmail maken.', build: 'Een workflow die na ieder gesprek automatisch een samenvatting, actiepunten en een concept-follow-upmail oplevert.' },
    proposal: { key: 'proposal', titel: 'Offerte-assistent', waarom: 'Offertes en voorstellen kosten je veel tijd. Met een vaste werkwijze zet AI het voorstel grotendeels op en houd jij de eindregie.', start: 'Bouw een offerte-opzet die de standaardonderdelen invult op basis van een korte briefing.', build: 'Een offerte-assistent die op basis van gesprek en behoefte een concept-voorstel opstelt in jouw huisstijl.' },
    crm: { key: 'crm', titel: 'CRM-workflow', waarom: 'Je CRM bijwerken kost tijd en loopt achter. AI kan van je aantekeningen gestructureerde updates maken die zo je systeem in kunnen.', start: 'Laat AI je losse notities omzetten naar nette, gestructureerde CRM-velden.', build: 'Een workflow die gespreksnotities omzet naar gestructureerde CRM-updates en vervolgacties.' },
    accountplan: { key: 'accountplan', titel: 'Accountplanning', waarom: 'Accountplannen vragen overzicht en herhaling. AI helpt je informatie te ordenen tot een helder plan dat je makkelijk bijwerkt.', start: 'Laat AI een eerste opzet van een accountplan maken op basis van wat je al weet.', build: 'Een assistent die per account een actueel accountplan met kansen en volgende stappen bijhoudt.' },
    qualify: { key: 'qualify', titel: 'Leadkwalificatie', waarom: 'Je wilt beter overzicht van kansen. AI kan leads helpen ordenen en samenvatten zodat je sneller ziet waar je op moet inzetten.', start: 'Laat AI binnenkomende leads samenvatten en op jouw criteria een eerste inschatting maken.', build: 'Een workflow die nieuwe leads verrijkt, samenvat en op jouw criteria een kwalificatie voorstelt.' },
    reporting: { key: 'reporting', titel: 'Salesrapportage', waarom: 'Interne rapportages kosten tijd die niet naar klanten gaat. AI kan van je cijfers en notities een leesbare update maken.', start: 'Laat AI van je ruwe cijfers een korte, leesbare salesupdate maken.', build: 'Een workflow die van je pijplijndata automatisch een heldere salesrapportage maakt.' },
  },
  vragen: [
    { id: 'q1', vraag: 'Waar besteed je relatief veel tijd aan?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Prospects en accounts onderzoeken', w: { research: 3, meetingprep: 1 } },
      { label: 'Klantgesprekken voorbereiden', w: { meetingprep: 3, research: 1 } },
      { label: 'E-mails en follow-ups', w: { followup: 3 } },
      { label: 'Offertes en voorstellen', w: { proposal: 3 } },
      { label: 'CRM bijwerken', w: { crm: 3 } },
      { label: 'Accountplannen', w: { accountplan: 3 } },
      { label: 'Interne salesrapportages', w: { reporting: 3 } },
      { label: 'Leads kwalificeren', w: { qualify: 3 } },
    ] },
    { id: 'q2', vraag: 'Hoe vaak doe je dit soort terugkerende werkzaamheden?', type: 'single', antwoorden: [
      { label: 'Meerdere keren per dag', w: {}, tag: 'freq-hoog' },
      { label: 'Dagelijks', w: {}, tag: 'freq-hoog' },
      { label: 'Enkele keren per week', w: {} },
      { label: 'Minder vaak', w: {} },
    ] },
    { id: 'q3', vraag: 'Hoeveel van je voorbereiding bestaat uit informatie zoeken, lezen, samenvatten of combineren?', type: 'single', antwoorden: [
      { label: 'Heel veel', w: { research: 3, meetingprep: 2 } },
      { label: 'Behoorlijk veel', w: { research: 2, meetingprep: 1 } },
      { label: 'Een beetje', w: { research: 1 } },
      { label: 'Nauwelijks', w: {} },
    ] },
    { id: 'q4', vraag: 'Wat gebeurt er na een klantgesprek?', type: 'single', antwoorden: [
      { label: 'Ik werk alles grotendeels handmatig uit', w: { followup: 3, crm: 2 } },
      { label: 'Ik gebruik al AI voor delen', w: { followup: 1 } },
      { label: 'We hebben een vaste workflow', w: {} },
      { label: 'Verschilt per gesprek', w: { followup: 1, crm: 1 } },
    ] },
    { id: 'q5', vraag: 'Waar zit voor jou de grootste frustratie?', type: 'single', antwoorden: [
      { label: 'Te veel voorbereiding', w: { meetingprep: 3, research: 1 } },
      { label: 'Administratie na gesprekken', w: { crm: 3, followup: 2 } },
      { label: 'Voorstellen en offertes kosten veel tijd', w: { proposal: 3 } },
      { label: 'Follow-up blijft liggen', w: { followup: 4 } },
      { label: 'CRM is niet actueel', w: { crm: 4 } },
      { label: 'Ik mis overzicht van kansen', w: { qualify: 2, accountplan: 2 } },
    ] },
    { id: 'q6', vraag: 'Wat zou je het liefst verbeteren?', type: 'single', antwoorden: [
      { label: 'Meer tijd voor klanten', w: { followup: 2, crm: 1, meetingprep: 1 } },
      { label: 'Sneller opvolgen', w: { followup: 3 } },
      { label: 'Betere voorbereiding', w: { meetingprep: 3, research: 1 } },
      { label: 'Minder administratie', w: { crm: 3 } },
      { label: 'Betere voorstellen', w: { proposal: 3 } },
      { label: 'Meer structuur in sales', w: { accountplan: 2, reporting: 1, qualify: 1 } },
    ] },
  ],
  resultHeadline: ['Jouw grootste', 'AI-kansen in sales'],
  ticket: 'individueel',
}

// ---------------------------------------------------------------- MARKETING
const marketing = {
  audience: 'marketing',
  scan_version: 'marketing-v1',
  scanNaam: 'AI Marketing WerkScan',
  eyebrow: 'AI voor marketing & communicatie',
  h1: ['Van losse prompts', 'naar een AI-werkwijze', 'die je iedere week gebruikt.'],
  subhead: 'Research. Content. Campagnes. Analyse. Rapportages. Neem een terugkerende marketing- of communicatietaak mee en maak er een herbruikbare AI-werkwijze van.',
  ctaPrimair: { label: 'Reserveer je werkplek', href: '/#tickets' },
  ctaScan: 'Doe de AI Marketing WerkScan',
  herken: { titel: 'Herken je dit?', punten: [
    'Je begint te vaak met een leeg document.',
    'Dezelfde content maak je steeds opnieuw in een andere vorm.',
    'Research en analyse kosten meer tijd dan je zou willen.',
    'Je gebruikt AI al, maar voor losse prompts, niet als vaste werkwijze.',
  ] },
  scanIntro: { titel: ['Waar kan AI', 'je marketingwerk versnellen?'], tekst: 'Beantwoord een paar vragen over je werk en ontdek welke taken je waarschijnlijk als eerste met AI kunt verbeteren, zonder in te leveren op kwaliteit.' },
  overnemen: { titel: 'Wat kan AI hiervan overnemen?', tekst: 'Niet je creatieve keuzes of je merk. Wel het voorwerk: research, eerste opzetten, varianten en analyse.' },
  voorbeelden: { titel: 'Concrete voorbeelden', items: [
    { k: 'Interview naar content', v: 'Eén interview omgezet naar artikel, posts en nieuwsbrieftekst in jouw tone of voice.' },
    { k: 'Research-assistent', v: 'Doelgroep- en concurrentie-info verzameld en samengevat tot bruikbare inzichten.' },
    { k: 'Contentwerkwijze', v: 'Van ruwe aantekeningen naar een eerste opzet die je alleen nog aanscherpt.' },
  ] },
  opportunities: {
    research: { key: 'research', titel: 'Research-assistent', waarom: 'Je geeft aan dat research veel tijd kost. Informatie uit meerdere bronnen verzamelen en samenvatten is precies werk dat AI grotendeels kan doen.', start: 'Laat AI je bronnen samenvatten tot een korte, bruikbare research-notitie.', build: 'Een workflow die doelgroep-, markt- en concurrentie-info verzamelt en samenvat tot bruikbare inzichten.' },
    content: { key: 'content', titel: 'Content-workflow', waarom: 'Je begint vaak met een leeg document. Een vaste werkwijze levert je een eerste opzet, zodat je begint met aanscherpen in plaats van bedenken.', start: 'Bouw een vaste opzet-werkwijze: ruwe input erin, gestructureerd concept eruit.', build: 'Een content-workflow die van een briefing of aantekeningen een eerste concept in jouw stijl maakt.' },
    repurposing: { key: 'repurposing', titel: 'Content repurposing', waarom: 'Je maakt dezelfde content steeds opnieuw in een andere vorm. AI kan één bron omzetten naar versies voor al je kanalen.', start: 'Laat AI één goed stuk omzetten naar een post, een nieuwsbrieftekst en een korte variant.', build: 'Een workflow die één interview of artikel omzet naar posts, nieuwsbrieftekst en contentideeën, met jouw tone of voice als uitgangspunt.' },
    campaign: { key: 'campaign', titel: 'Campagne-assistent', waarom: 'Campagnes vragen veel samenhangende teksten. AI helpt je snel een consistente set opzetten die je daarna aanscherpt.', start: 'Laat AI vanuit één campagne-idee de bijbehorende teksten in samenhang opzetten.', build: 'Een campagne-assistent die vanuit één propositie een consistente set kanaalteksten opzet.' },
    interview: { key: 'interview', titel: 'Interview naar content', waarom: 'Je verwerkt gesprekken of interviews. Dat uitwerken en hergebruiken is werk dat AI grotendeels overneemt.', start: 'Laat AI van een interviewtranscript een artikel-opzet en een paar posts maken.', build: 'Een workflow die één interview omzet naar een artikel, posts en nieuwsbrieftekst in jouw tone of voice.' },
    audience: { key: 'audience', titel: 'Doelgroep-inzicht', waarom: 'Je werkt met doelgroep- en concurrentie-analyse. AI kan losse signalen ordenen tot bruikbaar inzicht.', start: 'Laat AI feedback, reviews of onderzoek samenvatten tot de belangrijkste inzichten.', build: 'Een workflow die klantfeedback en marktsignalen samenvat tot heldere doelgroepinzichten.' },
    reporting: { key: 'reporting', titel: 'Rapportage & analyse', waarom: 'Rapportages kosten tijd. AI kan van je cijfers een leesbaar verhaal met de kernpunten maken.', start: 'Laat AI van je data een korte rapportage met de belangrijkste bevindingen maken.', build: 'Een workflow die van je marketingdata automatisch een leesbare rapportage met inzichten maakt.' },
    briefing: { key: 'briefing', titel: 'Briefing-assistent', waarom: 'Afstemming en briefings kosten tijd. AI helpt je snel heldere briefings te maken zodat iedereen weet wat de bedoeling is.', start: 'Laat AI van een kort idee een complete briefing maken die je alleen aanscherpt.', build: 'Een briefing-assistent die van een kort idee een complete, heldere briefing maakt.' },
  },
  vragen: [
    { id: 'q1', vraag: 'Waar gaat de meeste tijd in zitten?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Research en analyse', w: { research: 3 } },
      { label: 'Content schrijven', w: { content: 3 } },
      { label: 'Social media', w: { repurposing: 2, content: 1 } },
      { label: 'Nieuwsbrieven', w: { content: 2, repurposing: 1 } },
      { label: 'Campagnes', w: { campaign: 3 } },
      { label: 'Interviews of gesprekken verwerken', w: { interview: 3 } },
      { label: 'Rapportages', w: { reporting: 3 } },
      { label: 'Doelgroep- en concurrentieanalyse', w: { audience: 3 } },
    ] },
    { id: 'q2', vraag: 'Welke taak herhaal je het vaakst?', type: 'single', antwoorden: [
      { label: 'Social posts', w: { repurposing: 2, content: 1 } },
      { label: 'Nieuwsbrieven', w: { content: 2 } },
      { label: 'Artikelen of blogs', w: { content: 3 } },
      { label: 'Campagneteksten', w: { campaign: 3 } },
      { label: 'Rapportages', w: { reporting: 3 } },
    ] },
    { id: 'q3', vraag: 'Waar start je vaak met een leeg document?', type: 'single', antwoorden: [
      { label: 'Bijna altijd', w: { content: 3 } },
      { label: 'Regelmatig', w: { content: 2 } },
      { label: 'Soms', w: { content: 1 } },
      { label: 'Zelden', w: {} },
    ] },
    { id: 'q4', vraag: 'Waar moet je informatie uit meerdere bronnen combineren?', type: 'single', antwoorden: [
      { label: 'Heel vaak', w: { research: 3, audience: 1 } },
      { label: 'Regelmatig', w: { research: 2 } },
      { label: 'Soms', w: { research: 1 } },
      { label: 'Zelden', w: {} },
    ] },
    { id: 'q5', vraag: 'Welke content maak je steeds opnieuw in verschillende vormen?', type: 'single', antwoorden: [
      { label: 'Eén verhaal naar veel kanalen', w: { repurposing: 4 } },
      { label: 'Interviews naar content', w: { interview: 3, repurposing: 1 } },
      { label: 'Campagnevarianten', w: { campaign: 3 } },
      { label: 'Weinig herhaling', w: {} },
    ] },
    { id: 'q6', vraag: 'Wat zou je het liefst versnellen zonder kwaliteit te verliezen?', type: 'single', antwoorden: [
      { label: 'Research', w: { research: 3 } },
      { label: 'Content maken', w: { content: 3 } },
      { label: 'Repurposing', w: { repurposing: 3 } },
      { label: 'Campagnes', w: { campaign: 3 } },
      { label: 'Rapportages', w: { reporting: 3 } },
      { label: 'Briefings en afstemming', w: { briefing: 3 } },
    ] },
  ],
  resultHeadline: ['Hier kan AI je', 'marketingwerk het meest versterken'],
  ticket: 'individueel',
}

// ---------------------------------------------------------------- MANAGERS
const managers = {
  audience: 'managers',
  scan_version: 'managers-v1',
  scanNaam: 'AI Management WerkScan',
  eyebrow: 'AI voor managers & teamleiders',
  h1: ['Minder tijd kwijt', 'aan het werk', 'rond je werk.'],
  subhead: 'Vergaderingen. Rapportages. Analyses. Plannen. Updates. Actiepunten. Neem één terugkerende taak mee en maak er een slimmere werkwijze van.',
  ctaPrimair: { label: 'Reserveer je werkplek', href: '/#tickets' },
  ctaScan: 'Doe de AI Management WerkScan',
  herken: { titel: 'Herken je dit?', punten: [
    'Een groot deel van je week gaat op aan overleg en afstemming.',
    'Notulen en actiepunten uitwerken blijft hangen.',
    'Rapportages en updates kosten tijd die je liever aan je team geeft.',
    'Informatie zit verspreid over te veel documenten.',
  ] },
  scanIntro: { titel: ['Welk werk rond', 'je werk kan AI overnemen?'], tekst: 'Beantwoord een paar vragen en ontdek welk voorbereidend werk je waarschijnlijk als eerste met AI kunt verlichten.' },
  overnemen: { titel: 'Wat kan AI hiervan overnemen?', tekst: 'Niet je beslissingen. Wel veel van het voorbereidende werk: samenvatten, ordenen, uitwerken en rapporteren.' },
  voorbeelden: { titel: 'Concrete voorbeelden', items: [
    { k: 'Vergaderworkflow', v: 'Van notities naar besluiten, actiepunten en een korte update, automatisch geordend.' },
    { k: 'Documentanalyse', v: 'Lange documenten samengevat tot de kern en de beslispunten.' },
    { k: 'Managementupdate', v: 'Van ruwe input naar een leesbare update voor je team of directie.' },
  ] },
  opportunities: {
    meeting: { key: 'meeting', titel: 'Vergaderworkflow', waarom: 'Je geeft aan dat vergaderingen en de uitwerking veel tijd kosten. Notulen omzetten naar besluiten en acties is werk dat AI grotendeels kan doen.', start: 'Laat AI van je vergadernotities meteen besluiten en actiepunten met eigenaren maken.', build: 'Een workflow die uit vergadernotities automatisch besluiten, actiepunten, verantwoordelijken en een managementupdate maakt.' },
    actions: { key: 'actions', titel: 'Actiepunten-tracker', waarom: 'Actiepunten blijven bij jou hangen. AI kan ze uit gesprekken halen en overzichtelijk bijhouden.', start: 'Laat AI uit je notities een heldere actielijst met eigenaren en deadlines destilleren.', build: 'Een tracker die uit overleg automatisch actiepunten met eigenaar en status bijhoudt.' },
    reporting: { key: 'reporting', titel: 'Managementrapportage', waarom: 'Rapportages en updates kosten tijd. AI kan van ruwe input een heldere rapportage in vaste vorm maken.', start: 'Laat AI van je cijfers en notities een korte, leesbare update maken.', build: 'Een workflow die van losse input automatisch een heldere managementrapportage maakt.' },
    docanalysis: { key: 'docanalysis', titel: 'Documentanalyse', waarom: 'Je moet informatie uit meerdere documenten samenvoegen. AI kan lange stukken samenvatten tot de kern en de beslispunten.', start: 'Laat AI een lang document samenvatten tot kernpunten en open vragen.', build: 'Een assistent die meerdere documenten samenvat tot de kern en de beslispunten.' },
    decision: { key: 'decision', titel: 'Besluitvoorbereiding', waarom: 'Besluitvorming vraagt overzicht. AI kan opties, voors en tegens en context ordenen zodat jij sneller kunt kiezen.', start: 'Laat AI de opties en afwegingen rond een besluit overzichtelijk op een rij zetten.', build: 'Een workflow die rond een besluit de opties, afwegingen en context overzichtelijk voorbereidt.' },
    projects: { key: 'projects', titel: 'Projectupdates', waarom: 'Projectupdates kosten herhalend werk. AI kan van de laatste stand automatisch een korte update maken.', start: 'Laat AI van je projectnotities een korte statusupdate maken.', build: 'Een workflow die van projectnotities automatisch een korte, consistente statusupdate maakt.' },
    knowledge: { key: 'knowledge', titel: 'Kennis-assistent', waarom: 'Informatie zit verspreid. AI kan die ontsluiten zodat je sneller antwoord vindt zonder overal te zoeken.', start: 'Verzamel je belangrijkste documenten en laat AI daar vragen over beantwoorden.', build: 'Een assistent die vragen beantwoordt op basis van jullie eigen documenten en afspraken.' },
    internal: { key: 'internal', titel: 'Interne communicatie', waarom: 'Interne updates en berichten kosten tijd. AI helpt je snel heldere, passende teksten te maken.', start: 'Laat AI van een kort punt een heldere interne update maken.', build: 'Een workflow die van korte input heldere interne communicatie in jouw toon maakt.' },
  },
  vragen: [
    { id: 'q1', vraag: 'Waar gaat buiten je echte managementwerk de meeste tijd aan op?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Vergaderingen en voorbereiding', w: { meeting: 3 } },
      { label: 'Notulen en actiepunten', w: { actions: 3, meeting: 1 } },
      { label: 'Rapportages en updates', w: { reporting: 3 } },
      { label: 'Lange documenten doornemen', w: { docanalysis: 3 } },
      { label: 'Projectupdates', w: { projects: 3 } },
      { label: 'Interne communicatie', w: { internal: 3 } },
      { label: 'Informatie opzoeken', w: { knowledge: 3 } },
      { label: 'Besluiten voorbereiden', w: { decision: 3 } },
    ] },
    { id: 'q2', vraag: 'Hoeveel vergaderingen heb je gemiddeld?', type: 'single', antwoorden: [
      { label: 'Veel, dagelijks meerdere', w: { meeting: 3, actions: 1 } },
      { label: 'Redelijk wat', w: { meeting: 2 } },
      { label: 'Een paar per week', w: { meeting: 1 } },
      { label: 'Weinig', w: {} },
    ] },
    { id: 'q3', vraag: 'Wat gebeurt er met notulen en actiepunten?', type: 'single', antwoorden: [
      { label: 'Ik werk ze grotendeels handmatig uit', w: { meeting: 2, actions: 3 } },
      { label: 'Iemand anders doet dat', w: { actions: 1 } },
      { label: 'Ze blijven vaak liggen', w: { actions: 3 } },
      { label: 'We hebben een vaste werkwijze', w: {} },
    ] },
    { id: 'q4', vraag: 'Hoe vaak moet je informatie uit meerdere documenten samenvoegen?', type: 'single', antwoorden: [
      { label: 'Heel vaak', w: { docanalysis: 3, knowledge: 1 } },
      { label: 'Regelmatig', w: { docanalysis: 2 } },
      { label: 'Soms', w: { docanalysis: 1 } },
      { label: 'Zelden', w: {} },
    ] },
    { id: 'q5', vraag: 'Hoe maak je rapportages en updates?', type: 'single', antwoorden: [
      { label: 'Grotendeels handmatig', w: { reporting: 3 } },
      { label: 'Deels met vaste sjablonen', w: { reporting: 2 } },
      { label: 'Iemand anders maakt ze', w: { reporting: 1 } },
      { label: 'Nauwelijks rapportages', w: {} },
    ] },
    { id: 'q6', vraag: 'Welke taak zou je het liefst niet meer handmatig doen?', type: 'single', antwoorden: [
      { label: 'Notulen en acties', w: { meeting: 2, actions: 2 } },
      { label: 'Rapportages', w: { reporting: 3 } },
      { label: 'Documenten doornemen', w: { docanalysis: 3 } },
      { label: 'Projectupdates', w: { projects: 3 } },
      { label: 'Besluiten voorbereiden', w: { decision: 3 } },
      { label: 'Interne communicatie', w: { internal: 3 } },
    ] },
  ],
  resultHeadline: ['Dit is het werk', 'dat AI van je kan overnemen'],
  nuance: 'Niet je beslissingen. Wel veel van het voorbereidende werk.',
  ticket: 'individueel',
}

// ---------------------------------------------------------------- ONDERNEMERS
const ondernemers = {
  audience: 'entrepreneurs',
  scan_version: 'entrepreneurs-v1',
  scanNaam: 'AI Ondernemers WerkScan',
  eyebrow: 'AI voor ondernemers',
  h1: ['Je hoeft niet', 'alles zelf', 'te blijven doen.'],
  subhead: 'Sales. Marketing. Research. Klanten. Administratie. Plannen. Neem één taak mee die iedere week tijd kost en bouw een AI-werkwijze die je vanaf morgen kunt gebruiken.',
  ctaPrimair: { label: 'Reserveer je werkplek', href: '/#tickets' },
  ctaScan: 'Doe de AI Ondernemers WerkScan',
  herken: { titel: 'Herken je dit?', punten: [
    'Je doet veel zelf, ook werk dat eigenlijk voorbereid zou kunnen worden.',
    'Als het druk wordt, blijft juist het belangrijke werk liggen.',
    'Je begint te vaak opnieuw vanaf nul.',
    'Een extra paar handen zou schelen, maar dat is niet altijd de oplossing.',
  ] },
  scanIntro: { titel: ['Waar verdwijnt', 'jouw tijd?'], tekst: 'Beantwoord een paar vragen over je week en ontdek waar AI je waarschijnlijk het meest slagkracht geeft.' },
  overnemen: { titel: 'Wat kan AI hiervan overnemen?', tekst: 'Geen extra fte. Wel slimmer werk: het terugkerende voorwerk in sales, marketing, klantcontact en administratie.' },
  voorbeelden: { titel: 'Concrete voorbeelden', items: [
    { k: 'Klantopvolging', v: 'Van gesprek naar samenvatting en een concept-vervolgmail, klaar om te versturen.' },
    { k: 'Offerte-workflow', v: 'Een voorstel dat voor een groot deel automatisch wordt opgezet.' },
    { k: 'Administratie', v: 'Terugkerend administratief werk dat AI grotendeels voorbereidt.' },
  ] },
  opportunities: {
    sales: { key: 'sales', titel: 'Sales-assistent', waarom: 'Sales kost jou als ondernemer veel tijd. AI kan de voorbereiding en opvolging grotendeels overnemen zodat jij het gesprek voert.', start: 'Laat AI je gesprekken voorbereiden en de opvolging als concept klaarzetten.', build: 'Een workflow die je salesgesprekken voorbereidt en na afloop een samenvatting en concept-follow-up maakt.' },
    marketing: { key: 'marketing', titel: 'Marketing-assistent', waarom: 'Marketing blijft er vaak bij in. Een vaste AI-werkwijze levert je sneller content zonder dat je steeds vanaf nul begint.', start: 'Bouw een werkwijze die van een kort idee een post of nieuwsbrieftekst maakt.', build: 'Een workflow die van een kort idee content voor je kanalen opzet in jouw stijl.' },
    followup: { key: 'followup', titel: 'Klantopvolging', waarom: 'Opvolging blijft liggen als het druk wordt. AI kan de uitwerking en het concept-contact voor je klaarzetten.', start: 'Laat AI van je klantnotities een samenvatting en een concept-vervolgmail maken.', build: 'Een workflow die na klantcontact automatisch een samenvatting en concept-opvolging maakt.' },
    research: { key: 'research', titel: 'Research-assistent', waarom: 'Uitzoekwerk kost tijd. AI kan informatie verzamelen en samenvatten zodat jij sneller kunt beslissen.', start: 'Laat AI een onderwerp voor je uitzoeken en samenvatten tot de kern.', build: 'Een workflow die een onderwerp uitzoekt en samenvat tot een bruikbare notitie.' },
    proposal: { key: 'proposal', titel: 'Offerte-workflow', waarom: 'Offertes kosten je veel tijd. Met een vaste werkwijze zet AI het voorstel grotendeels op.', start: 'Bouw een offerte-opzet die de standaardonderdelen invult op basis van een korte briefing.', build: 'Een offerte-workflow die op basis van een gesprek een concept-voorstel in jouw stijl opstelt.' },
    admin: { key: 'admin', titel: 'Administratie-workflow', waarom: 'Administratief werk is terugkerend en tijdrovend. AI kan het grotendeels voorbereiden zodat jij alleen nog controleert.', start: 'Kies één administratieve klus en laat AI de eerste opzet doen.', build: 'Een workflow die terugkerend administratief werk voor je voorbereidt.' },
    knowledge: { key: 'knowledge', titel: 'Kennis-assistent', waarom: 'Veel kennis zit in je hoofd en in mails. AI kan die ontsluiten zodat je sneller antwoord vindt.', start: 'Verzamel je belangrijkste documenten en laat AI er vragen over beantwoorden.', build: 'Een assistent die vragen beantwoordt op basis van je eigen documenten.' },
    planning: { key: 'planning', titel: 'Planning-assistent', waarom: 'Plannen en prioriteren kost overzicht. AI kan je helpen structuur aan te brengen in wat er moet gebeuren.', start: 'Laat AI je taken ordenen en een voorstel voor je week maken.', build: 'Een workflow die je taken ordent en een voorstel voor je planning maakt.' },
    process: { key: 'process', titel: 'Procesautomatisering', waarom: 'Terugkerende processen lenen zich voor automatisering. AI helpt je die eerst helder te maken en daarna te versnellen.', start: 'Beschrijf één terugkerend proces en laat AI verbeterstappen voorstellen.', build: 'Een workflow die een terugkerend proces beschrijft en stap voor stap slimmer maakt.' },
  },
  vragen: [
    { id: 'q1', vraag: 'Waar verdwijnt jouw tijd?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Sales', w: { sales: 3 } },
      { label: 'Marketing', w: { marketing: 3 } },
      { label: 'Klantcontact', w: { followup: 3 } },
      { label: 'Administratie', w: { admin: 3 } },
      { label: 'Research', w: { research: 3 } },
      { label: 'Offertes', w: { proposal: 3 } },
      { label: 'Planning', w: { planning: 3 } },
      { label: 'Interne processen', w: { process: 3 } },
    ] },
    { id: 'q2', vraag: 'Wat doe jij nu zelf wat eigenlijk voorbereid zou kunnen worden?', type: 'single', antwoorden: [
      { label: 'Sales en opvolging', w: { sales: 2, followup: 2 } },
      { label: 'Marketing en content', w: { marketing: 3 } },
      { label: 'Offertes', w: { proposal: 3 } },
      { label: 'Administratie', w: { admin: 3 } },
      { label: 'Bijna alles', w: { admin: 1, sales: 1, marketing: 1 } },
    ] },
    { id: 'q3', vraag: 'Welke taak herhaal je iedere week?', type: 'single', antwoorden: [
      { label: 'Klanten opvolgen', w: { followup: 3 } },
      { label: 'Content maken', w: { marketing: 3 } },
      { label: 'Offertes maken', w: { proposal: 3 } },
      { label: 'Administratie', w: { admin: 3 } },
      { label: 'Plannen en prioriteren', w: { planning: 3 } },
    ] },
    { id: 'q4', vraag: 'Waar begin je vaak opnieuw vanaf nul?', type: 'single', antwoorden: [
      { label: 'Content', w: { marketing: 3 } },
      { label: 'Offertes', w: { proposal: 3 } },
      { label: 'Klantberichten', w: { followup: 2 } },
      { label: 'Uitzoekwerk', w: { research: 3 } },
      { label: 'Weinig herhaling', w: {} },
    ] },
    { id: 'q5', vraag: 'Wat blijft liggen als het druk wordt?', type: 'single', antwoorden: [
      { label: 'Opvolging van klanten', w: { followup: 3 } },
      { label: 'Marketing', w: { marketing: 3 } },
      { label: 'Administratie', w: { admin: 3 } },
      { label: 'Planning en overzicht', w: { planning: 3 } },
      { label: 'Nadenken over de langere lijn', w: { knowledge: 1, planning: 1 } },
    ] },
    { id: 'q6', vraag: 'Welke taak zou je als eerste willen delegeren?', type: 'single', antwoorden: [
      { label: 'Sales-voorbereiding', w: { sales: 3 } },
      { label: 'Marketing', w: { marketing: 3 } },
      { label: 'Klantopvolging', w: { followup: 3 } },
      { label: 'Offertes', w: { proposal: 3 } },
      { label: 'Administratie', w: { admin: 3 } },
      { label: 'Research', w: { research: 3 } },
    ] },
  ],
  resultHeadline: ['Hier zit voor jou', 'de meeste extra slagkracht'],
  groot: 'Geen extra fte. Wel slimmer werk.',
  ticket: 'individueel',
}

// ---------------------------------------------------------------- TEAMS
const teams = {
  audience: 'teams',
  scan_version: 'teams-v1',
  scanNaam: 'AI Team WerkScan',
  eyebrow: 'AI aan de slag met je team',
  h1: ["Kom met zes collega's.", 'Vertrek met zes', 'concrete AI-werkwijzen.'],
  subhead: "Met zes collega's krijg je een eigen tafel met een eigen AI-coach. Iedere deelnemer werkt aan een echte taak uit het eigen werk.",
  ctaPrimair: { label: 'Reserveer een teamtafel', href: '/#teams' },
  ctaScan: 'Doe de AI Team WerkScan',
  herken: { titel: 'Herken je dit?', punten: [
    'In je team experimenteert iedereen los met AI.',
    'Er zijn ideeën, maar ze worden niet uitgevoerd.',
    'Er is te weinig tijd om samen uit te zoeken wat werkt.',
    'Je wilt van losse pogingen naar een gedeelde werkwijze.',
  ] },
  scanIntro: { titel: ['Waar kan jouw team', 'met AI het snelst verschil maken?'], tekst: 'Beantwoord een paar vragen over je team en ontdek waar jullie het beste kunnen beginnen.' },
  overnemen: { titel: 'Wat levert een teamtafel op?', tekst: "Niet één enthousiaste collega, maar zes concrete werkwijzen en een gedeelde manier van werken." },
  voorbeelden: { titel: 'Concrete voorbeelden', items: [
    { k: 'Zes toepassingen', v: 'Iedere collega werkt aan een echte taak en gaat naar huis met iets bruikbaars.' },
    { k: 'Gedeelde werkwijze', v: 'Niet los experimenteren, maar samen een aanpak die blijft hangen.' },
    { k: 'Eigen coach', v: "Een eigen tafel met een eigen AI-coach voor jullie zes." },
  ] },
  opportunities: {
    exploration: { key: 'exploration', titel: 'AI-verkenning', waarom: 'Jullie staan aan het begin. De grootste winst is nu overzicht: ontdekken waar AI voor jullie werk echt kan helpen.', start: 'Laat ieder teamlid één terugkerende taak kiezen en die als vertrekpunt nemen.', build: "Zes toepassingen: iedere collega bouwt een eerste werkwijze voor een taak uit het eigen werk." },
    workflow: { key: 'workflow', titel: 'Werkwijzen bouwen', waarom: 'Er wordt al geëxperimenteerd. De volgende stap is van losse pogingen naar vaste, herbruikbare werkwijzen.', start: 'Kies per collega één taak en maak daar een herbruikbare werkwijze van.', build: 'Zes vaste werkwijzen die jullie na de dag echt blijven gebruiken.' },
    automation: { key: 'automation', titel: 'Automatiseringen', waarom: 'Jullie hebben concrete ideeën. De winst zit in ze uitvoeren en vastleggen zodat ze blijven werken.', start: 'Kies de ideeën met de meeste herhaling en werk die als eerste uit.', build: 'Concrete automatiseringen voor het werk dat bij jullie het vaakst terugkomt.' },
    knowledge: { key: 'knowledge', titel: 'Gedeelde kennis', waarom: 'Kennis zit verspreid in het team. AI kan die ontsluiten zodat iedereen sneller antwoord vindt.', start: 'Verzamel jullie belangrijkste documenten en maak er een gedeelde assistent van.', build: "Een gedeelde kennis-assistent op basis van jullie eigen documenten." },
    adoption: { key: 'adoption', titel: 'AI-adoptie', waarom: 'Kennis en tijd ontbreken om AI structureel op te pakken. Een dag samen bouwen zet dat in gang.', start: 'Begin klein en concreet: één werkende toepassing per collega werkt aanstekelijk.', build: 'Een gedeelde werkwijze plus zes toepassingen die de rest van het team meenemen.' },
  },
  vragen: [
    { id: 'q1', vraag: 'Welke functies zitten in het team?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Sales', w: { workflow: 1 } },
      { label: 'Marketing', w: { workflow: 1 } },
      { label: 'Communicatie', w: { workflow: 1 } },
      { label: 'Management', w: { knowledge: 1 } },
      { label: 'Operations', w: { automation: 1 } },
      { label: 'Projectmanagement', w: { workflow: 1 } },
      { label: 'HR', w: { knowledge: 1 } },
      { label: 'Finance', w: { automation: 1 } },
      { label: 'Service', w: { automation: 1 } },
      { label: 'Anders', w: {} },
    ] },
    { id: 'q2', vraag: 'Hoe wordt AI nu gebruikt?', type: 'single', antwoorden: [
      { label: 'Nauwelijks', w: { exploration: 4, adoption: 1 } },
      { label: 'Individueel en incidenteel', w: { exploration: 2, workflow: 1 } },
      { label: 'Door een aantal collega\'s regelmatig', w: { workflow: 3 } },
      { label: 'Structureel in workflows', w: { automation: 3 } },
    ] },
    { id: 'q3', vraag: 'Wat is nu het grootste probleem?', type: 'single', antwoorden: [
      { label: 'Iedereen experimenteert los', w: { workflow: 3, adoption: 1 } },
      { label: 'Te weinig kennis', w: { exploration: 3 } },
      { label: 'Geen concrete toepassingen', w: { workflow: 2, automation: 1 } },
      { label: 'Geen tijd om uit te zoeken', w: { adoption: 3 } },
      { label: 'Privacy of onzekerheid', w: { adoption: 2 } },
      { label: 'Ideeën worden niet uitgevoerd', w: { automation: 3 } },
    ] },
    { id: 'q4', vraag: 'Waar zit veel terugkerend werk?', type: 'multi', hint: 'Meerdere antwoorden mogelijk', antwoorden: [
      { label: 'Klantcontact en opvolging', w: { workflow: 2 } },
      { label: 'Content en communicatie', w: { workflow: 2 } },
      { label: 'Rapportages en overzichten', w: { automation: 2 } },
      { label: 'Documenten en kennis', w: { knowledge: 2 } },
      { label: 'Administratie en processen', w: { automation: 2 } },
    ] },
    { id: 'q5', vraag: 'Wat zou na één dag het waardevolste zijn?', type: 'single', antwoorden: [
      { label: 'Zes concrete toepassingen', w: { workflow: 3 } },
      { label: 'Een gezamenlijke werkwijze', w: { adoption: 3 } },
      { label: 'Team meer AI-vaardig', w: { exploration: 3 } },
      { label: 'Concrete automatiseringen', w: { automation: 3 } },
      { label: 'Inzicht in vervolgstappen', w: { adoption: 2, exploration: 1 } },
    ] },
    { id: 'q6', vraag: 'Hoe belangrijk is het dat iedereen aan een eigen case werkt?', type: 'single', antwoorden: [
      { label: 'Zeer belangrijk', w: { workflow: 2 } },
      { label: 'Prettig', w: { workflow: 1 } },
      { label: 'Liever een gezamenlijke case', w: { adoption: 2 } },
    ] },
  ],
  resultHeadline: ['Dit is waar jullie', 'team moet beginnen'],
  ticket: 'team',
}

export const CONFIGS = { sales, marketing, managers, entrepreneurs: ondernemers, teams }
export const SLUGS = {
  sales: 'ai-voor-sales', marketing: 'ai-voor-marketing', managers: 'ai-voor-managers',
  entrepreneurs: 'ai-voor-ondernemers', teams: 'ai-voor-teams',
}
