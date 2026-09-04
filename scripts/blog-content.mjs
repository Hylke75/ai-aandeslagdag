// Contentbron voor de blog van AI Aan De Slag Dag.
// Eén bron: hieruit wordt (1) de statische blog gegenereerd (bouw-blog.mjs) en
// (2) het CMS geseed (seed-artikelen.mjs → tabel artikelen, site-gescoopt).
// Bewust zonder em-/en-streepjes in de teksten.

export const AUTEUR = 'Redactie AI Aan De Slag Dag'

// hoofdtekst: platte tekst, alinea's gescheiden door een lege regel.
export const posts = [
  {
    slug: 'van-losse-vragen-naar-vaste-werkwijze',
    titel: 'Van losse vragen naar een vaste AI-werkwijze',
    rubriek: 'Aan de slag',
    datum: '2026-09-01',
    samenvatting: 'De meeste mensen gebruiken AI voor losse vragen. De echte winst zit in een vaste werkwijze die elke week tijd bespaart.',
    antwoordblok: 'Stop met losse vragen stellen. Bouw één keer een werkwijze en hergebruik die elke week.',
    hoofdtekst: `Bijna iedereen heeft inmiddels weleens iets aan ChatGPT of Copilot gevraagd. Een mailtje laten herschrijven, een samenvatting laten maken, even een idee toetsen. Handig, maar het blijft bij losse acties. De volgende keer begin je weer opnieuw.

De sprong die de meeste professionals nog niet hebben gemaakt, is van losse vragen naar een vaste werkwijze. Een werkwijze is een herbruikbaar recept: je legt één keer goed vast wat je wilt, met welke context en in welk format, en daarna draai je dezelfde taak in een fractie van de tijd.

Neem een terugkerende taak die je week elke keer tijd kost. Een weekrapportage, een offerte, een verslag. In plaats van elke keer opnieuw te beginnen, maak je een vaste aanpak: welke informatie geef je mee, welke toon, welke structuur. Die aanpak sla je op en verbeter je een paar keer. Vanaf dan is het werk voor een groot deel gedaan voordat je begint.

Precies dat oefen je op AI Aan De Slag Dag. Je neemt een echte taak mee en gaat samen met een coach niet één antwoord maken, maar een werkwijze die je maandag meteen kunt gebruiken.`,
  },
  {
    slug: 'de-taak-die-je-week-opeet',
    titel: 'De ene taak die je week elke keer opeet',
    rubriek: 'Aan de slag',
    datum: '2026-08-25',
    samenvatting: 'Iedereen heeft er een: die terugkerende klus die telkens te veel tijd kost. Dat is precies waar je met AI moet beginnen.',
    antwoordblok: 'Begin niet bij de tool, maar bij de taak die je week elke keer opeet.',
    hoofdtekst: `Als je wilt weten waar AI het meeste voor je kan betekenen, hoef je niet ver te zoeken. Denk aan die ene taak die elke week terugkomt en telkens meer tijd kost dan je zou willen. Voor de een is dat het verwerken van klantvragen, voor de ander het maken van een rapportage of het voorbereiden van gesprekken.

Die terugkerende taak is goud waard, want de tijd die je er één keer in investeert om hem slimmer te maken, verdien je elke week terug. Een taak die je vijftig keer per jaar doet en die je met AI half zo snel doet, levert je tientallen uren op.

De valkuil is dat mensen met de nieuwste tool beginnen in plaats van met hun eigen werk. Draai het om. Kies eerst de taak, en zoek daarna de aanpak die past. Zo voorkom je dat je een indrukwekkende tool hebt die je nergens voor gebruikt.

Op de dag zelf begin je precies hier. Je brengt je eigen tijdvreter mee en gaat er samen met een coach mee aan de slag, tot je een aanpak hebt die werkt.`,
  },
  {
    slug: 'een-dag-bouwen-versus-tien-webinars',
    titel: 'Waarom één dag echt bouwen meer oplevert dan tien webinars',
    rubriek: 'Mindset',
    datum: '2026-08-18',
    samenvatting: 'Kijken hoe iemand anders AI gebruikt is inspirerend. Maar je leert het pas als je het zelf doet, met je eigen werk.',
    antwoordblok: 'Je leert AI niet door te kijken, maar door zelf te bouwen aan je eigen werk.',
    hoofdtekst: `Er is geen tekort aan AI-inhoud. Webinars, video's, nieuwsbrieven, LinkedIn-posts: je kunt je hele week vullen met kijken naar wat er allemaal kan. Toch verandert er in de praktijk vaak weinig aan hoe je zelf werkt.

Dat komt doordat kijken en doen twee verschillende dingen zijn. Een webinar laat zien wat mogelijk is met een voorbeeld dat niet het jouwe is. Zodra je het zelf probeert met je eigen taak, loop je tegen vragen aan die in de video nooit voorbijkwamen.

Juist die vragen zijn waar je van leert. Hoe geef je jouw context mee? Wat werkt wel en niet bij jouw soort werk? Waar moet je bijsturen? Dat leer je alleen door het te doen, het liefst met iemand naast je die je op de juiste momenten verder helpt.

Daarom draait AI Aan De Slag Dag niet om toekijken. Je werkt een dag lang aan je eigen werk, met een coach aan tafel, en gaat naar huis met iets dat af is in plaats van een lijst met tools die je nog eens moet uitproberen.`,
  },
  {
    slug: 'prompten-is-geen-trucje',
    titel: 'Prompten is geen trucje: zo geef je AI context die werkt',
    rubriek: 'Tools & technieken',
    datum: '2026-08-11',
    samenvatting: 'Goede resultaten met AI komen niet van slimme toverwoorden, maar van goede context. Zo pak je dat aan.',
    antwoordblok: 'De kwaliteit van je resultaat hangt af van de context die je geeft, niet van magische promptwoorden.',
    hoofdtekst: `Er doen veel lijstjes de ronde met de perfecte promptwoorden. Alsof er een geheime formule is die AI opeens veel beter maakt. In de praktijk werkt het anders. Wat echt het verschil maakt, is de context die je meegeeft.

AI weet niets over jouw organisatie, je klanten, je toon of je doel, tenzij je het vertelt. Hoe concreter je bent over wie de lezer is, wat je wilt bereiken en hoe het resultaat eruit moet zien, hoe beter het antwoord. Een vage vraag levert een vaag antwoord op, hoe slim je woorden ook zijn.

Een goede aanpak: geef de rol, de taak, de context en het gewenste format. Wie ben ik, wat wil ik, voor wie is het, en in welke vorm wil ik het terug. Voeg een voorbeeld toe van iets dat je goed vindt en je bent al ver.

Het mooie is dat je dit één keer goed opzet en daarna hergebruikt. Op AI Aan De Slag Dag leer je precies dat: niet trucjes, maar een manier om AI de context te geven die jouw werk nodig heeft.`,
  },
  {
    slug: 'ai-en-je-eigen-data',
    titel: 'AI en je eigen data: wat je wel en niet moet delen',
    rubriek: 'AI in de praktijk',
    datum: '2026-08-04',
    samenvatting: 'AI wordt pas echt nuttig als je je eigen informatie gebruikt. Maar hoe doe je dat verstandig en veilig?',
    antwoordblok: 'Gebruik je eigen materiaal, maar houd je aan het beleid van je organisatie en deel geen gevoelige gegevens zomaar.',
    hoofdtekst: `AI wordt pas echt krachtig als je het voedt met je eigen materiaal: je documenten, je klantvragen, je eerdere werk. Pas dan sluit het aan op jouw praktijk in plaats van op algemene voorbeelden.

Tegelijk roept dat een terechte vraag op: wat kun je wel en niet delen? Het korte antwoord is dat je je houdt aan het beleid van je eigen organisatie. Persoonsgegevens, vertrouwelijke bedrijfsinformatie en gevoelige data horen niet zomaar in een tool die je niet goed kent.

Gelukkig kun je vaak prima werken met geanonimiseerde of algemene versies van je materiaal. Je haalt namen en cijfers eruit, of je gebruikt een voorbeeld dat op je echte werk lijkt zonder de gevoelige details. Zo krijg je de kracht van je eigen context zonder onnodig risico.

Op de dag bepaal je zelf welke gegevens je gebruikt. De coaches helpen je een werkwijze te vinden die bij je organisatie past, zodat je met een gerust hart met je eigen werk aan de slag kunt.`,
  },
  {
    slug: 'van-spelen-naar-werken',
    titel: 'Van concept naar bruikbaar: het verschil tussen spelen en werken met AI',
    rubriek: 'Mindset',
    datum: '2026-07-28',
    samenvatting: 'Spelen met AI is leuk, maar levert zelden iets op dat je echt gebruikt. Zo maak je de stap naar werk dat af is.',
    antwoordblok: 'Spelen levert leuke demo\'s op. Werken levert iets op dat je maandag gebruikt.',
    hoofdtekst: `Veel mensen zijn de fase van spelen met AI wel voorbij. Je hebt gezien dat het indrukwekkende dingen kan, je hebt wat geëxperimenteerd, en toch gebruik je het nog niet echt in je werk.

Dat komt doordat spelen en werken twee verschillende doelen hebben. Bij spelen kijk je wat er kan. Bij werken maak je iets af dat je echt gaat gebruiken. Die tweede stap vraagt meer: je moet het resultaat aanscherpen, controleren en inpassen in hoe je werkt.

Het goede nieuws is dat die stap kleiner is dan hij lijkt. Je hebt geen technische kennis nodig, maar wel focus op een concreet resultaat. Niet iets dat leuk is om te laten zien, maar iets dat je taak echt uit handen neemt.

Dat is de kern van AI Aan De Slag Dag. Aan het einde van de dag heb je niet gespeeld, maar gewerkt: er ligt iets bruikbaars waar je meteen mee verder kunt.`,
  },
  {
    slug: 'de-intake-die-het-verschil-maakt',
    titel: 'Zo bereid je je AI-werkdag voor',
    rubriek: 'Aan de slag',
    datum: '2026-07-21',
    samenvatting: 'Een goede voorbereiding maakt het verschil tussen een leuke dag en een dag die echt iets oplevert.',
    antwoordblok: 'Kom niet met lege handen. De taak die je meeneemt bepaalt wat je meeneemt naar huis.',
    hoofdtekst: `Het rendement van een werkdag met AI hangt voor een groot deel af van je voorbereiding. Wie met een vage vraag binnenkomt, gaat met een vaag resultaat naar huis. Wie een concrete taak meebrengt, gaat met iets bruikbaars naar buiten.

Daarom start AI Aan De Slag Dag met een korte intake, nog voor de dag zelf. Je denkt na over welke taak je week elke keer tijd kost en die je slimmer wilt maken. Hoe scherper je die keuze, hoe meer je aan de dag hebt.

Je hoeft nog niet te weten hoe je het gaat aanpakken. Dat is juist waar de coaches voor zijn. Je hoeft alleen te weten welk stuk van je werk je wilt verbeteren, en het materiaal mee te nemen dat daarbij hoort.

Denk aan een voorbeeld van hoe je het nu doet, en aan hoe het idealiter eruit zou zien. Met dat vertrekpunt kun je op de dag zelf meteen bouwen in plaats van bedenken waar je zult beginnen.`,
  },
  {
    slug: 'vijf-taken-voor-marketeers',
    titel: 'Vijf taken die marketeers deze week aan AI kunnen geven',
    rubriek: 'Voor jouw vak',
    datum: '2026-07-14',
    samenvatting: 'Concrete voorbeelden van marketingwerk waar AI vandaag al tijd bespaart, zonder in te leveren op kwaliteit.',
    antwoordblok: 'Begin bij het werk dat veel herhaling kent: daar zit de snelste winst.',
    hoofdtekst: `Marketing zit vol met werk dat zich herhaalt en dat zich daarom uitstekend leent voor een slimme AI-werkwijze. Vijf voorbeelden die je deze week al kunt oppakken.

Ten eerste het maken van varianten. Eén goede tekst omzetten naar versies voor verschillende kanalen en doelgroepen kost normaal veel tijd. Met een vaste werkwijze doe je dat in minuten. Ten tweede het samenvatten en analyseren van feedback, reviews of onderzoeksresultaten tot bruikbare inzichten.

Ten derde het voorbereiden van content: van ruwe aantekeningen naar een eerste opzet die je alleen nog hoeft aan te scherpen. Ten vierde het opstellen van briefings en de onderlinge afstemming, zodat iedereen sneller weet wat de bedoeling is. En ten vijfde het doornemen van data om patronen te vinden die je anders zou missen.

In alle gevallen geldt: AI doet het voorwerk, jij houdt de regie en de eindredactie. Op AI Aan De Slag Dag pak je jouw eigen marketingtaak en bouw je er een werkwijze omheen die blijft.`,
  },
  {
    slug: 'ai-voor-sales',
    titel: 'Voor sales: AI die je voorbereiding en opvolging overneemt',
    rubriek: 'Voor jouw vak',
    datum: '2026-07-07',
    samenvatting: 'Sales draait om aandacht voor de klant. AI neemt het voorwerk over, zodat jij tijd houdt voor het gesprek.',
    antwoordblok: 'Laat AI je voorbereiding en opvolging doen, zodat jij tijd houdt voor het echte gesprek.',
    hoofdtekst: `In sales gaat de meeste tijd niet op aan het gesprek zelf, maar aan alles eromheen. Voorbereiding, verslaglegging, opvolging, het bijwerken van je systeem. Precies dat voorwerk kan AI voor een groot deel overnemen.

Denk aan het voorbereiden van een gesprek: op basis van wat je al weet over een klant maak je snel een scherpe voorbereiding met de juiste vragen. Of aan de opvolging: van je aantekeningen naar een nette samenvatting en een concept-vervolgmail, klaar om te versturen.

Ook je pijplijn kun je slimmer maken. AI helpt je prioriteiten stellen, terugkerende vragen beantwoorden en voorstellen sneller opstellen. Zo houd je meer tijd over voor waar het echt om draait: aandacht voor de klant.

Op de dag neem je je eigen salesproces mee. Samen met een coach maak je van jouw voorbereiding en opvolging een werkwijze die je elke week tijd oplevert.`,
  },
  {
    slug: 'ai-voor-managers',
    titel: 'Voor managers: AI die vergaderingen en rapportages inkort',
    rubriek: 'Voor jouw vak',
    datum: '2026-06-30',
    samenvatting: 'Als manager verdrink je in overleg en rapportages. AI helpt je sneller tot de kern te komen.',
    antwoordblok: 'Gebruik AI om ruwe input tot heldere besluiten en overzichten te maken, niet om mensen te vervangen.',
    hoofdtekst: `Managers besteden een groot deel van hun week aan overleg, afstemming en rapportages. Veel van dat werk bestaat uit het ordenen van informatie: van ruwe input naar een helder overzicht of een duidelijk besluit.

Daar is AI sterk in. Van een verslag naar de kernpunten en actiepunten, van losse cijfers naar een leesbare rapportage, van een lange mailwisseling naar de essentie. Werk dat je normaal veel tijd kost, maar weinig energie geeft.

Het doel is niet om mensen of gesprekken te vervangen, maar om sneller tot de kern te komen. Zo houd je meer tijd over voor de dingen die er echt toe doen: richting geven, keuzes maken en aandacht voor je team.

Op AI Aan De Slag Dag pak je een concreet stuk van je managementwerk, bijvoorbeeld je rapportage of je overlegvoorbereiding, en maak je er een werkwijze van die je week lichter maakt.`,
  },
  {
    slug: 'ai-voor-hr',
    titel: 'Voor HR: van vacaturetekst tot onboarding met AI',
    rubriek: 'Voor jouw vak',
    datum: '2026-06-23',
    samenvatting: 'HR-werk is mensenwerk, maar veel eromheen is tekst en proces. Daar bespaart AI je veel tijd.',
    antwoordblok: 'Laat AI het tekst- en procesdeel doen, zodat jij tijd houdt voor de mens.',
    hoofdtekst: `HR draait om mensen, maar een groot deel van het werk bestaat uit tekst en proces. Vacatureteksten, functieprofielen, onboardingmateriaal, interne communicatie. Precies daar bespaart AI je veel tijd.

Een vacaturetekst die aansluit bij je organisatie en toch aantrekkelijk is, maak je met een goede werkwijze in een fractie van de tijd. Hetzelfde geldt voor het samenvatten van gesprekken, het opstellen van heldere procesbeschrijvingen of het maken van onboardingdocumenten voor nieuwe collega's.

Belangrijk blijft dat je zorgvuldig omgaat met persoonsgegevens. Werk met algemene of geanonimiseerde versies waar dat kan, en houd je aan het beleid van je organisatie. AI doet het voorwerk, jij houdt de menselijke maat.

Op de dag neem je je eigen HR-taak mee. Samen met een coach bouw je een werkwijze die het tekst- en procesdeel lichter maakt, zodat je meer tijd overhoudt voor de mensen zelf.`,
  },
  {
    slug: 'ai-voor-operations',
    titel: 'Voor operations: processen documenteren en verbeteren met AI',
    rubriek: 'Voor jouw vak',
    datum: '2026-06-16',
    samenvatting: 'In operations zit de winst in heldere processen. AI helpt je die te beschrijven, te verbeteren en te bewaken.',
    antwoordblok: 'Gebruik AI om kennis uit hoofden en mails naar heldere, herbruikbare processen te halen.',
    hoofdtekst: `In operations zit veel kennis in hoofden, mails en losse documenten. Zodra je die kennis helder en herbruikbaar maakt, wordt je werk voorspelbaarder en makkelijker over te dragen. AI is daar een sterke hulp bij.

Denk aan het beschrijven van een proces: van een rommelige uitleg naar een duidelijke stap-voor-stap-instructie die iedereen kan volgen. Of aan het analyseren van waar het misgaat: patronen vinden in meldingen, klachten of doorlooptijden.

Ook het bijhouden en actueel houden van documentatie wordt lichter. In plaats van dat handleidingen verouderen, werk je ze snel bij op basis van wat er verandert. Zo blijft je kennis leven in plaats van stof te vergaren.

Op AI Aan De Slag Dag pak je een echt proces uit je werk. Samen met een coach maak je er een werkwijze van waarmee je het beschrijft, verbetert en actueel houdt.`,
  },
  {
    slug: 'waarom-een-teamtafel-werkt',
    titel: 'Het team dat samen bouwt, wint',
    rubriek: 'Voor teams',
    datum: '2026-06-09',
    samenvatting: 'AI landt pas echt in een organisatie als een team er samen mee werkt. Daarom bestaat de teamtafel.',
    antwoordblok: 'Eén enthousiaste collega verandert weinig. Een team dat samen bouwt, verandert hoe jullie werken.',
    hoofdtekst: `Vaak is er in een organisatie wel iemand die enthousiast is over AI. Diegene probeert van alles, maar de rest van het team verandert nauwelijks mee. Zo blijft de winst beperkt tot een enkeling.

AI landt pas echt als een team er samen mee aan de slag gaat. Als je met elkaar dezelfde taak onder handen neemt, dezelfde werkwijze afspreekt en elkaar helpt, ontstaat er iets dat blijft hangen. Je bouwt niet alleen iets nuttigs, je bouwt ook een gedeelde manier van werken.

Daarom bestaat de teamtafel op AI Aan De Slag Dag. Je komt met je team, neemt een gezamenlijke uitdaging mee en werkt er samen aan, met een coach die jullie op weg helpt. Aan het einde van de dag heb je niet één enthousiaste collega, maar een team dat weet hoe het verder kan.

Het verschil merk je in de weken erna. Wat je samen hebt gebouwd, gebruik je samen. En wat je samen gebruikt, blijft.`,
  },
  {
    slug: 'tools-komen-en-gaan-werkwijze-blijft',
    titel: 'AI-tools komen en gaan, je werkwijze blijft',
    rubriek: 'Mindset',
    datum: '2026-06-02',
    samenvatting: 'Elke maand een nieuwe tool. Wie zich daarop blindstaart, blijft achter. Investeer in je werkwijze, niet in de hype.',
    antwoordblok: 'Investeer in een werkwijze die je begrijpt, niet in de tool van de maand.',
    hoofdtekst: `Er komt elke maand wel een nieuwe AI-tool bij die alles zou veranderen. Wie die stroom probeert bij te houden, raakt vooral moe. En zodra je een tool onder de knie hebt, is er alweer een nieuwe.

De oplossing is om je niet blind te staren op tools, maar te investeren in je werkwijze. Als je begrijpt hoe je AI context geeft, hoe je een taak opbouwt en hoe je een resultaat aanscherpt, dan werkt dat in elke tool. De tool is inwisselbaar, je werkwijze niet.

Dat maakt je ook minder kwetsbaar. Verandert er iets aan de tool die je gebruikt, of stapt je organisatie over op een andere? Dan neem je je werkwijze gewoon mee. Je hebt geen trucje geleerd dat aan één tool vastzit, maar een manier van werken.

Op AI Aan De Slag Dag leer je precies dat. Niet welke knop je in welke tool moet indrukken, maar hoe je AI laat werken voor jouw taak, met welk hulpmiddel dan ook.`,
  },
  {
    slug: 'ai-kritisch-gebruiken',
    titel: 'Hallucinaties, bias en fouten: AI kritisch gebruiken',
    rubriek: 'AI in de praktijk',
    datum: '2026-05-26',
    samenvatting: 'AI maakt fouten, met overtuiging. Wie dat weet en ernaar handelt, gebruikt AI juist beter.',
    antwoordblok: 'Vertrouw AI als een snelle assistent, niet als een onfeilbare bron. Jij blijft eindverantwoordelijk.',
    hoofdtekst: `AI klinkt vaak zeker van zijn zaak, ook als het ernaast zit. Het kan feiten verzinnen, bronnen door elkaar halen of vooroordelen overnemen uit de data waarop het is getraind. Wie dat niet weet, loopt het risico fouten klakkeloos over te nemen.

De oplossing is niet om AI te wantrouwen en links te laten liggen, maar om het te gebruiken zoals je een snelle, soms slordige assistent zou gebruiken. Je laat het voorwerk doen, en je controleert de dingen die ertoe doen. Feiten, cijfers en namen check je altijd.

Dat vraagt een kritische houding, maar die maakt je juist een betere gebruiker. Je leert waar AI sterk in is en waar je moet opletten. En je houdt de regie, want jij blijft eindverantwoordelijk voor wat je oplevert.

Op AI Aan De Slag Dag leer je niet alleen wat AI kan, maar ook waar je scherp op moet zijn. Zo bouw je een werkwijze die snel is en betrouwbaar blijft.`,
  },
  {
    slug: 'meet-wat-ai-oplevert',
    titel: 'Meet wat AI je oplevert: tijd, kwaliteit en plezier',
    rubriek: 'AI in de praktijk',
    datum: '2026-05-19',
    samenvatting: 'AI inzetten is pas een succes als het echt iets oplevert. Zo maak je die winst zichtbaar.',
    antwoordblok: 'Maak de winst concreet: hoeveel tijd bespaar je, en wat doe je met die tijd?',
    hoofdtekst: `Het is makkelijk om enthousiast te zijn over AI. Maar enthousiasme is geen resultaat. De vraag die telt is simpel: wat levert het je echt op?

Begin met tijd. Kies een taak, meet hoe lang die nu kost, en meet opnieuw als je hem met AI doet. Dat verschil is je harde winst. Bij een taak die je wekelijks doet, loopt die winst over een jaar flink op.

Kijk daarnaast naar kwaliteit en plezier. Wordt het resultaat beter of consistenter? Houd je energie over voor het werk waar je wel warm van wordt? Die zachtere winst is minstens zo belangrijk, want die bepaalt of je het volhoudt.

Op AI Aan De Slag Dag maak je die winst concreet. Je pakt een echte taak, meet wat hij nu kost, en gaat naar huis met een werkwijze waarvan je precies weet wat hij je oplevert.`,
  },
  {
    slug: 'de-80-20-van-ai-op-je-werk',
    titel: 'De 80/20 van AI op je werk: waar begin je?',
    rubriek: 'Aan de slag',
    datum: '2026-05-12',
    samenvatting: 'Je hoeft niet alles met AI te doen. Focus op het kleine deel dat het grootste verschil maakt.',
    antwoordblok: 'Zoek de paar taken die veel tijd kosten en zich vaak herhalen. Daar zit tachtig procent van je winst.',
    hoofdtekst: `Je kunt AI op ontelbaar veel manieren inzetten, en juist die overvloed maakt het lastig om te beginnen. De truc is om niet alles te willen, maar te kiezen waar de winst het grootst is.

Dat is bijna altijd een klein deel van je werk. De paar taken die veel tijd kosten en zich vaak herhalen. Daar zit het grootste deel van je winst, terwijl de rest van je werk voorlopig prima blijft zoals het is.

Maak dus een korte lijst van je terugkerende taken en zet er de tijd bij die ze kosten. De taken bovenaan die lijst zijn je startpunt. Niet omdat ze het spannendst zijn, maar omdat ze het meeste opleveren.

Op AI Aan De Slag Dag help je een coach je precies die keuze te maken. Je begint niet overal tegelijk, maar bij het ene stuk werk dat het grootste verschil maakt.`,
  },
  {
    slug: 'copilot-chatgpt-of-claude',
    titel: 'Copilot, ChatGPT of Claude? Kies op basis van je taak',
    rubriek: 'Tools & technieken',
    datum: '2026-05-05',
    samenvatting: 'De beste tool bestaat niet. De beste tool voor jouw taak wel. Zo maak je die keuze.',
    antwoordblok: 'Kies niet de populairste tool, maar de tool die past bij je taak en je omgeving.',
    hoofdtekst: `Een van de meest gestelde vragen is welke AI-tool nu de beste is. Het eerlijke antwoord: dat hangt af van je taak en je omgeving. De beste tool in het algemeen bestaat niet, de beste tool voor jouw situatie wel.

Werk je veel in Microsoft 365, dan zit een assistent die daar direct in geïntegreerd is dicht bij je werk. Schrijf je veel, dan wil je een tool die goed met taal en context omgaat. Werk je met gevoelige data, dan wegen de afspraken en de omgeving van je organisatie zwaar mee.

Het goede nieuws is dat de vaardigheden die je opbouwt grotendeels overdraagbaar zijn. Als je begrijpt hoe je context geeft en een taak opbouwt, kun je met de meeste tools uit de voeten. De keuze voor een tool is dan een praktische, geen principiële.

Op AI Aan De Slag Dag werk je in de omgeving die bij jou past. De coaches helpen je een keuze te maken die aansluit bij je taak, je organisatie en de tools die je al gebruikt.`,
  },
  {
    slug: 'na-de-dag-werkwijze-vasthouden',
    titel: 'Na de dag: zo houd je je nieuwe werkwijze vast',
    rubriek: 'Aan de slag',
    datum: '2026-04-28',
    samenvatting: 'De dag is een startpunt. Met een paar simpele gewoontes houd je je nieuwe werkwijze vast.',
    antwoordblok: 'Gebruik je nieuwe werkwijze meteen die eerste week. Wat je direct toepast, blijft.',
    hoofdtekst: `Een goede werkdag met AI levert je iets bruikbaars op. Maar of het beklijft, hangt af van wat je in de weken erna doet. Nieuwe gewoontes hebben een zetje nodig om te blijven hangen.

De belangrijkste tip is simpel: gebruik je nieuwe werkwijze meteen. Wacht niet op het perfecte moment, maar pas hem toe op de eerstvolgende keer dat de taak langskomt. Wat je direct gebruikt, wordt vanzelf onderdeel van hoe je werkt.

Deel het daarnaast met een collega. Door uit te leggen hoe je het nu doet, maak je het steviger voor jezelf, en help je iemand anders op weg. Zo verspreidt een goede werkwijze zich vanzelf door je team.

Op AI Aan De Slag Dag zorgen we dat je niet met losse ideeën naar huis gaat, maar met een concrete werkwijze. En met een paar simpele gewoontes om die de weken erna vast te houden.`,
  },
  {
    slug: 'veelgemaakte-fouten-met-ai',
    titel: 'Veelgemaakte fouten als je met AI aan de slag gaat',
    rubriek: 'AI in de praktijk',
    datum: '2026-04-21',
    samenvatting: 'De meeste teleurstellingen met AI komen door een handvol vermijdbare fouten. Herken ze op tijd.',
    antwoordblok: 'De grootste fout is beginnen bij de tool in plaats van bij je eigen werk.',
    hoofdtekst: `Veel teleurstellingen met AI komen niet door de techniek, maar door een handvol vermijdbare fouten. Als je die kent, ben je ze snel voorbij.

De eerste is beginnen bij de tool in plaats van bij je werk. Je hebt dan een indrukwekkende tool, maar geen taak om hem op los te laten. De tweede is te weinig context geven en dan teleurgesteld zijn in een vaag antwoord. AI weet alleen wat je vertelt.

De derde fout is resultaten klakkeloos overnemen zonder te controleren. AI klinkt overtuigend, ook als het ernaast zit. En de vierde is opgeven na één poging. Een goede werkwijze bouw je in een paar rondes, niet in één keer.

Op AI Aan De Slag Dag loop je deze valkuilen niet in je eentje tegen het lijf, maar met een coach naast je. Je begint bij je eigen werk, geeft de juiste context, controleert wat telt en bouwt in een paar rondes iets dat werkt.`,
  },
]
