const storageKey = "traen-app-state-v1";

const exerciseBank = {
  bodyweight: {
    push: ["Push-ups", "Pike push-ups", "Diamond push-ups", "Dips på stol"],
    pull: ["Inverted row under bord", "Doorframe row", "Superman pull", "Håndklæde row"],
    legs: ["Squats", "Bulgarian split squat", "Lunges", "Glute bridge"],
    core: ["Planke", "Dead bug", "Mountain climbers", "Sideplanke"],
    cardio: ["Interval løb", "Burpees", "High knees", "Step-ups"]
  },
  dumbbells: {
    push: ["DB bench press", "DB shoulder press", "DB floor press", "DB lateral raise"],
    pull: ["DB row", "Renegade row", "DB pullover", "Rear delt fly"],
    legs: ["Goblet squat", "DB Romanian deadlift", "DB lunges", "DB calf raise"],
    core: ["Weighted plank", "Russian twist", "Suitcase carry", "Dead bug"],
    cardio: ["DB complexes", "Farmer carry intervals", "Jump rope", "Bike intervals"]
  },
  gym: {
    push: ["Bench press", "Incline DB press", "Overhead press", "Cable fly"],
    pull: ["Lat pulldown", "Seated row", "Pull-ups", "Face pulls"],
    legs: ["Squat", "Romanian deadlift", "Leg press", "Hamstring curl"],
    core: ["Cable crunch", "Hanging knee raise", "Pallof press", "Planke"],
    cardio: ["Rower intervals", "Incline walk", "Bike sprints", "Sled push"]
  }
};

const highImpactKeywords = ["burpee", "jump", "mountain climber", "plyo", "hop"];

const exerciseHowTo = {
  "Push-ups": {
    setup: "Start i plank på hænder og tæer. Hænder lidt bredere end skuldrene, fingrene spredt. Krop strak fra hæl til hoved.",
    steps: [
      "Spænd mave og baller - hold kroppen som en lige planke.",
      "Sænk brystet mod gulvet i 2-3 sekunder, albuer i ca. 45° fra kroppen.",
      "Stop når brystet er 2-3 cm fra gulvet - ét sekunds pause.",
      "Pres hårdt fra med hænderne og stræk armene tilbage til start."
    ],
    breathe: "Træk vejret ind når du sænker dig, pust ud når du presser op.",
    tips: "Undgå at hofterne synker eller stikker op. Hvis for hårdt: start med knæene i gulvet. Hvis for let: læg en tallerken eller vægt på ryggen."
  },
  "Pike push-ups": {
    setup: "Stå med fødderne på en stol eller kasse, hænder i gulvet. Gå hænderne tilbage indtil kroppen danner et omvendt V (som en håndstand-form).",
    steps: [
      "Hovedet skal hænge mellem armene, blik mod gulvet.",
      "Bøj albuerne og sænk toppen af hovedet mod gulvet.",
      "Pres tilbage op til start - stræk armene helt.",
      "Hold benene så strakte som muligt hele tiden."
    ],
    breathe: "Pust ud når du presser op, træk vejret ind når du sænker.",
    tips: "Bredere håndposition gør det lettere, smallere gør det hårdere. Start med en lav stol og arbejd dig op mod en højere."
  },
  "Diamond push-ups": {
    setup: "Start i push-up position, men lad hænder danne en diamant (fingre rører hinanden) lige under brystet.",
    steps: [
      "Albuerne holder tæt til kroppen under hele bevægelsen.",
      "Sænk brystet ned mod hænderne - albuerne peger bagud.",
      "Pres op igen, indtil armene er strakte.",
      "Hold kroppen strak som en planke hele tiden."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Træner primært triceps og indre bryst. Albuer må IKKE stikke ud til siderne - det belaster skulderen."
  },
  "Dips på stol": {
    setup: "Sæt dig på kanten af en stol eller bænk, hænder ved hoften med fingerspidserne fremad. Fødderne fladt på gulvet, knæene bøjet.",
    steps: [
      "Løft dig op af stolen og støt på hænderne - gå evt. et skridt frem.",
      "Sænk kroppen ved at bøje albuerne til ca. 90° - overarmene følger kroppen.",
      "Pres op igen til start - stræk armene.",
      "Hold ryggen tæt på stolen og skuldrene nede."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Jo længere benene er, jo hårdere. Læg vægt på skødet for at gøre det tungere. Stop hvis det gør ondt i skulderen."
  },
  "Inverted row under bord": {
    setup: "Læg dig under et solidt bord (ikke et glastbord). Greb bordets kant med overhåndsgreb, hænder lidt bredere end skuldrene. Krop strak, hæle i gulvet.",
    steps: [
      "Spænd kroppen - en lige linje fra hæle til skuldre.",
      "Træk brystet op mod bordets kant, skulderbladene klemmes sammen.",
      "Sænk dig kontrolleret tilbage til start - stræk armene helt.",
      "Hofterne bevæger sig IKKE - kun arme og skuldre arbejder."
    ],
    breathe: "Pust ud når du trækker op, ind når du sænker.",
    tips: "Lavere bord = sværere. Begynd med en helt lav position og arbejd dig op. Stram mave og baller for stabilitet."
  },
  "Doorframe row": {
    setup: "Stå i en døråbning, greb begge sider af karmen med overhåndsgreb. Læn dig tilbage, arme strakte, fødder foran dig.",
    steps: [
      "Krop strak som en planke, hæle i gulvet.",
      "Træk dig op mod karmen ved at bøje albuerne, klem skulderbladene sammen.",
      "Sænk dig langsomt tilbage til start.",
      "Undgå at hofterne synker - spænd maven."
    ],
    breathe: "Ud når du trækker op, ind når du sænker.",
    tips: "Pas på skulderne - dørkammen er hård. Start med en blid vinkel. Brug en klud eller håndklæde om karmen for komfort."
  },
  "Superman pull": {
    setup: "Lig på maven på et blødt underlag (måtte eller tæppe), arme strakt frem foran dig.",
    steps: [
      "Spænd lænd og baller.",
      "Løft arme, bryst og ben fra gulvet samtidig - som du flyver.",
      "Hold stillingen i 2-3 sekunder, klem ballerne sammen.",
      "Sænk kontrolleret tilbage til gulvet."
    ],
    breathe: "Pust ud når du løfter, ind når du sænker.",
    tips: "Undgå at kaste hovedet tilbage - nakken følger ryggen. Start med kun arme eller kun ben, hvis hele kroppen er for hårdt."
  },
  "Håndklæde row": {
    setup: "Vikl et tykt håndklæde omkring et fast punkt (dørklinke, stolpe eller et tungt bordben). Hold i begge ender med overhåndsgreb. Læn dig tilbage.",
    steps: [
      "Krop strak, fødder foran dig, arme strakte.",
      "Træk dig op ved at bøje albuerne, klem skulderbladene sammen.",
      "Træk håndklædet helt ind til brystet.",
      "Sænk dig langsomt tilbage - stræk armene helt."
    ],
    breathe: "Ud når du trækker, ind når du sænker.",
    tips: "Sørg for at håndklædet sidder fast! Vikl det godt. Hårdere: hælene på en stol."
  },
  "Squats": {
    setup: "Stå med fødderne i skulderbreddes afstand, tæerne peger lidt udad. Armene kan være foran dig for balance.",
    steps: [
      "Skub hofterne tilbage som om du sætter dig på en stol.",
      "Bøj knæene og sænk dig, hold brystet oppe og ryggen neutral.",
      "Gå så dybt du kan med god form - mindst til lårene er parallelle med gulvet.",
      "Pres op gennem hælene og stræk hofterne."
    ],
    breathe: "Ind når du sænker, ud når du rejser dig.",
    tips: "Knæene følger tæernes retning - de må ikke falde indad. Kig lige frem, ikke ned. Start med en stol bag dig som mål."
  },
  "Bulgarian split squat": {
    setup: "Stå ca. 60 cm foran en stol eller bænk. Løft den ene fod bagud og hvil den på stolen (fodryg op).",
    steps: [
      "Hold overkroppen oprejst, hænder i siden eller foran dig.",
      "Bøj forreste knæ og sænk dig, indtil bageste knæ er tæt på gulvet.",
      "Stop kort og pres tilbage op gennem forreste hæl.",
      "Behold en lodret overkrop - undgå at læne dig for langt frem."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Det er en svær balanceøvelse - start uden vægt. Hold blikket på et fast punkt foran dig."
  },
  "Lunges": {
    setup: "Stå oprejst, fødder i hoftebreddes afstand, hænder i siden.",
    steps: [
      "Tag et langt skridt frem med det ene ben.",
      "Sænk dig indtil forreste lår er parallelt med gulvet, bagerste knæ tæt på gulvet.",
      "Pres tilbage op og skift ben - eller skift ved hver rep.",
      "Hold overkroppen lodret hele tiden."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Forreste knæ må ikke gå foran tæerne. Start med korte skridt. Bagerste knæ skal næsten røre gulvet."
  },
  "Glute bridge": {
    setup: "Lig på ryggen, knæ bøjet, fødder fladt i gulvet i hoftebreddes afstand, hæle tæt på ballerne. Armene ned langs siden.",
    steps: [
      "Spænd ballerne og pres hofterne op mod loftet.",
      "Krop danner en lige linje fra knæ til skuldre i toppen.",
      "Klem ballerne hårdt sammen i 1-2 sekunder.",
      "Sænk hofterne kontrolleret tilbage til gulvet."
    ],
    breathe: "Pust ud når du løfter, ind når du sænker.",
    tips: "Pres gennem hælene, ikke tæerne. Undgå at svaje i lænden - maven spændes. Sværere: ét ben i luften."
  },
  "Planke": {
    setup: "Læg dig på alle fire, læg dig ned på underarmene. Stræk benene bagud, tæerne i gulvet. Albuerne direkte under skuldrene.",
    steps: [
      "Spænd mave og baller - krop strak som en planke.",
      "Hold hovedet i forlængelse af ryggen, blik mod gulvet.",
      "Undgå at hofterne synker ned eller stikker op i luften.",
      "Træk vejret normalt - hold stillingen i 20-60 sekunder."
    ],
    breathe: "Træk vejret roligt og dybt - ikke hold vejret.",
    tips: "Start med 20 sekunder og byg op. Let svaj i lænden er ok, stor svaj er ikke. Sværere: løft en arm eller et ben."
  },
  "Dead bug": {
    setup: "Lig på ryggen, arme strakt op mod loftet, knæ bøjet 90° (lår lodret, skinneben vandret).",
    steps: [
      "Spænd maven fladt mod gulvet - pres lænden ned.",
      "Stræk højre arm bagud og venstre ben fremad samtidig - uden at lænden løfter sig.",
      "Før dem tilbage til start med kontrol.",
      "Gentag med modsatte side. Langsomt og kontrolleret."
    ],
    breathe: "Pust ud når du strækker, ind når du fører tilbage.",
    tips: "Lænden skal hele tiden røre gulvet. Start med kun ben, tilføj arme senere. Meget god til core-stabilitet."
  },
  "Mountain climbers": {
    setup: "Start i push-up position - arme strakte, krop i en lige linje.",
    steps: [
      "Træk højre knæ ind mod brystet.",
      "Skift hurtigt - stræk højre ben og træk venstre knæ ind.",
      "Fortsæt i et jævnt tempo, som om du 'løber' i luften.",
      "Hold hofterne lave - undgå at de stikker op."
    ],
    breathe: "Træk vejret hurtigt og rytmisk - ud når knæet kommer frem.",
    tips: "Start langsomt for at lære form, øg tempo. Hårdt for knæene - undgå hvis du har knæproblemer."
  },
  "Sideplanke": {
    setup: "Lig på siden, støt på den ene underarm (albue under skulder). Ben strakte, fødderne stablet.",
    steps: [
      "Løft hofterne fra gulvet - krop danner en lige diagonal linje.",
      "Spænd mave og sidemave (obliques).",
      "Hovedet i forlængelse af ryggen.",
      "Hold 20-45 sekunder, skift side."
    ],
    breathe: "Træk vejret roligt, dybe åndedrag.",
    tips: "Start med knæene i gulvet. Den frie arm kan hvile langs siden eller op mod loftet. Hold hofterne højt - lad dem ikke synke."
  },
  "Interval løb": {
    setup: "Find et fladt område eller løbebånd. Varm op 3-5 min med rask gang.",
    steps: [
      "Løb i 30 sekunder med ca. 80-90% indsats.",
      "Gå eller let jog i 30-60 sekunder (pause).",
      "Gentag 8-10 runder.",
      "Slut af med 3-5 min let udstrækning."
    ],
    breathe: "Rytmisk vejrtrækning - 3 skridt ind, 2 skridt ud.",
    tips: "Start med længere pauser (60-90 sek) hvis du er ny. Løb ikke sprints - bare hårdt nok til at du ikke kan tale i sætninger."
  },
  "Burpees": {
    setup: "Stå oprejst, fødder i skulderbreddes afstand.",
    steps: [
      "Sæt dig i en squat, hænder i gulvet foran dig.",
      "Spark benene bagud, land i push-up position.",
      "Lav én push-up (valgfrit, kan springes over).",
      "Træk benene tilbage til squat og hop op med arme over hovedet."
    ],
    breathe: "Pust ud når du hopper op, ind når du går ned.",
    tips: "Meget krævende! Start med at fjerne hoppet. Hold et jævnt tempo - det er ikke en sprint. Træn teknik før intensitet."
  },
  "High knees": {
    setup: "Stå oprejst, fødder i hoftebreddes afstand. Armene klar til at svinge som ved løb.",
    steps: [
      "Løb på stedet med høje knæ - hælene op mod ballerne.",
      "Hold et hurtigt tempo, fødderne rammer gulvet let.",
      "Brug armene aktivt - modsat arm til modsat knæ.",
      "Land blødt på forfoden, ikke hælene."
    ],
    breathe: "Hurtig, rytmisk vejrtrækning gennem næsen og munden.",
    tips: "Start med 20 sek, pause 10 sek. Undgå at læne dig for langt tilbage. Sæt farten ned hvis teknikken halter."
  },
  "Step-ups": {
    setup: "Stå foran en stærk stol, bænk eller kasse (knæhøjde). Fødder i hoftebreddes afstand.",
    steps: [
      "Træd op med højre fod, hele foden på kassen.",
      "Pres op gennem hælen og løft venstre fod op på kassen.",
      "Stå oprejst et øjeblik - begge fødder på kassen.",
      "Træd ned igen med samme ben, eller skift."
    ],
    breathe: "Ud når du presser op, ind når du træder ned.",
    tips: "Hele foden på kassen - ellers belaster du knæet. Hold kroppen lodret, undgå at skubbe fra med bageste ben."
  },
  "DB bench press": {
    setup: "Læg dig på en bænk med fødderne fladt på gulvet. Hold håndvægte ved skuldrene, arme bøjet, håndflader fremad.",
    steps: [
      "Pres håndvægte op mod loftet, indtil armene er strakte over brystet.",
      "Sænk kontrolleret ned - albuer i 45° vinkel ud fra kroppen.",
      "Stop når håndvægterne er på niveau med brystet.",
      "Pres op igen - skulderbladene presset ned i bænken."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Undgå at støde håndvægtene sammen i toppen - hold spænding. Fødderne bliver i gulvet. Start let for at lære form."
  },
  "DB shoulder press": {
    setup: "Siddende på en bænk med rygstøtte, eller stående. Hold håndvægte ved skulderhøjde, håndflader fremad, albuer ud til siderne.",
    steps: [
      "Spænd maven - undgå at svaje i lænden.",
      "Pres håndvægte lige op mod loftet, indtil armene er strakte.",
      "Sænk langsomt ned til skulderhøjde igen.",
      "Hovedet holdes neutralt - kig lige frem."
    ],
    breathe: "Ud når du presser op, ind når du sænker.",
    tips: "Pres hovedet lidt frem når håndvægtene passerer - så de ikke rammer næsen. Sidder er lettere end stående for de fleste."
  },
  "DB floor press": {
    setup: "Lig på gulvet med knæene bøjet, fødderne fladt. Hold håndvægte ved brystet, albuer på gulvet.",
    steps: [
      "Pres håndvægte op mod loftet til strakte arme.",
      "Sænk kontrolleret ned - albuerne rører gulvet (det er dit stoppunkt).",
      "Pres op igen med det samme.",
      "Gulvet begrænser bevægelsen - skåner skuldrene."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "God erstatning for bænkpres hvis du ikke har bænk. Albuer i 45° vinkel, ikke flade ud. Lavere gulvbelastning på skuldrene."
  },
  "DB lateral raise": {
    setup: "Stå oprejst med håndvægte ned langs siden, håndflader ind mod kroppen.",
    steps: [
      "Spænd maven let, bøj albuerne lidt (hold bøjningen hele tiden).",
      "Løft armene ud til siderne, op til skulderhøjde.",
      "Tænk i at løfte med albuerne, ikke hænderne.",
      "Sænk kontrolleret ned igen."
    ],
    breathe: "Pust ud når du løfter, ind når du sænker.",
    tips: "Brug lettere vægte end du tror - det er en isolationsøvelse. Undgå at svinge eller bruge momentum. Stop ved skulderhøjde."
  },
  "DB row": {
    setup: "Stå med fødder i skulderbreddes afstand, knæ let bøjet. Bøj dig frem fra hoften, ryggen neutral. Håndvægte hænger ned foran dig.",
    steps: [
      "Lad armene hænge lige ned - strakte, men ikke låste.",
      "Træk håndvægte op mod hoften, albuer tæt på kroppen.",
      "Klem skulderbladene sammen i toppen.",
      "Sænk kontrolleret ned igen."
    ],
    breathe: "Ud når du trækker, ind når du sænker.",
    tips: "Ryggen holdes neutral - ikke rund. Træk med albuerne, ikke hænderne. Start let for at lære formen."
  },
  "Renegade row": {
    setup: "Start i push-up position med hænderne på to håndvægte (eller kettlebells) på gulvet.",
    steps: [
      "Spænd mave og baller - krop strak som en planke.",
      "Træk én håndvægt op mod hoften, albue tæt på kroppen.",
      "Sænk ned igen med kontrol.",
      "Gentag med modsatte arm. Hold hofterne stabile."
    ],
    breathe: "Ud når du trækker, ind når du sænker.",
    tips: "Sværere end det ser ud! Start uden vægt eller med lette håndvægte. Bredere stance med fødderne = mere stabilitet."
  },
  "DB pullover": {
    setup: "Lig på en bænk (eller på gulvet) med kun skuldrene på bænken, fødderne fladt på gulvet. Hold én håndvægt med begge hænder over brystet, arme let bøjet.",
    steps: [
      "Spænd maven.",
      "Sænk håndvægten bag hovedet i en bue - arme holder bøjningen.",
      "Mærk stræk i brystet og ribbenene.",
      "Træk håndvægten tilbage over brystet, klem brystet sammen."
    ],
    breathe: "Ind når du sænker, ud når du trækker op.",
    tips: "Træner både bryst, ryg og 'serratus'. Hold armene relativt strakte men ikke låste. Let start - det er en undervurderet øvelse."
  },
  "Rear delt fly": {
    setup: "Stå med fødder i skulderbreddes afstand, knæ let bøjet. Bøj dig frem fra hoften, ryggen flad. Håndvægte hænger ned.",
    steps: [
      "Lad håndvægte hænge med håndfladerne mod hinanden.",
      "Løft armene ud til siderne, albuer let bøjet.",
      "Klem skulderbladene sammen i toppen.",
      "Sænk kontrolleret ned igen."
    ],
    breathe: "Ud når du løfter, ind når du sænker.",
    tips: "Træner den ofte oversete bagside skulder. Vigtig for skuldersundhed. Undgå at svinge - brug lette vægte."
  },
  "Goblet squat": {
    setup: "Stå med fødder lidt bredere end skuldre. Hold en håndvægt (eller kettlebell) lodret foran brystet med begge hænder under 'hagen' på vægten.",
    steps: [
      "Spænd maven, brystet op.",
      "Squat dybt ned - hælene bliver i gulvet, knæ følger tæerne.",
      "Albuerne kan gå let indvendigt mellem knæene i bunden.",
      "Pres op gennem hælene til start."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Vægten foran hjælper med balance. Bedre end almindelig squat for de fleste - tvinger god overkropsholdning."
  },
  "DB Romanian deadlift": {
    setup: "Stå med fødder i hoftebreddes afstand, hold håndvægte foran lårene, håndflader ind mod kroppen.",
    steps: [
      "Bøj fra hoften - skub ballerne tilbage som en låge, der lukker.",
      "Knæene bøjer sig let - men bøjningen sker PRIMÆRT i hoften.",
      "Sænk håndvægte langs forsiden af benene, tæt på kroppen.",
      "Stop når du mærker stram bagside lår - ryggen holder sig neutral."
    ],
    breathe: "Ind når du sænker, ud når du rejser op.",
    tips: "Det er IKKE en squat - hoften er hovedleddet. Ryggen neutral hele tiden - undgå at runde lænden."
  },
  "DB lunges": {
    setup: "Stå oprejst med håndvægte ned langs siden.",
    steps: [
      "Tag et skridt frem med det ene ben.",
      "Sænk dig indtil forreste lår er parallelt med gulvet.",
      "Pres tilbage op til start.",
      "Skift ben - enten skift ved hver rep eller kør alle reps på én side."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Forreste knæ over forreste fod. Overkroppen holder sig lodret. Start uden vægt for at lære balancen."
  },
  "DB calf raise": {
    setup: "Stå oprejst med håndvægte ned langs siden. Stå evt. på en kant af en trappe for at få bevægelsesbanen.",
    steps: [
      "Spænd maven let.",
      "Løft dig langsomt op på tæerne - så højt du kan.",
      "Hold stillingen et øjeblik i toppen, klem læggene.",
      "Sænk hælene langsomt ned igen, evt. under kantens niveau for stræk."
    ],
    breathe: "Pust ud når du løfter, ind når du sænker.",
    tips: "Langsomt er nøglen! Korte bevægelser giver intet. Strækket i bunden er lige så vigtigt som sammentrækningen i toppen."
  },
  "Weighted plank": {
    setup: "Start i planke position på underarme og tæer. Placer en håndvægt, vægtskive eller tung rygsæk forsigtigt på lænden (eller hold den på ryggen).",
    steps: [
      "Spænd mave og baller.",
      "Hold kroppen strak i en lige linje - ingen svaj i lænden.",
      "Træk vejret roligt - hold stillingen i 20-60 sekunder.",
      "Tag vægten af og hvil, gentag."
    ],
    breathe: "Ro, dyb vejrtrækning. Hold aldrig vejret.",
    tips: "Start uden ekstra vægt. Korte sæt med pause er bedre end lang tid med dårlig form. Placer vægten på lænden, ikke ballerne."
  },
  "Russian twist": {
    setup: "Siddende på gulvet, knæ bøjet, fødderne løftet lidt (eller hvilende på gulvet for lettere). Hold en håndvægt eller vægtskive med begge hænder foran brystet.",
    steps: [
      "Læn overkroppen lidt tilbage - spænd maven.",
      "Roter overkroppen til højre, ført vægten mod gulvet ved hoften.",
      "Roter til venstre, ført vægten til den anden side.",
      "Hofterne følger med lidt - men bevægelsen er primært i maven."
    ],
    breathe: "Pust ud ved hver rotation.",
    tips: "Hårdere: fødderne fra gulvet. Lettere: fødderne i gulvet. Ikke en 'kastebevægelse' - kontroller hele vejen."
  },
  "Suitcase carry": {
    setup: "Stå oprejst med en tung håndvægt (eller kettlebell) i den ene hånd. Skuldrene lige - ikke sidelæns hældende.",
    steps: [
      "Spænd maven hårdt - som om nogen prøver at skubbe dig omkuld.",
      "Gå med faste, kontrollerede skridt.",
      "Hold overkroppen lodret - må ikke læne til siden.",
      "Gå 20-40 meter, skift side."
    ],
    breathe: "Ro, dyb vejrtrækning. Hold ikke vejret.",
    tips: "Tungere end du tror - god core-øvelse. Hold skuldrene lige - det er hele pointen. Gå langsomt, det er ikke en sprint."
  },
  "DB complexes": {
    setup: "Stå med to håndvægte klar. Vælg 5 øvelser (f.eks. squat, row, press, biceps curl, triceps extension) som du laver i træk.",
    steps: [
      "Udfør 5-10 reps af hver øvelse uden pause mellem dem.",
      "Når alle 5 er gjort, hvil 1-2 minutter.",
      "Gentag 3-5 runder.",
      "Vælg lette vægte - det er kondition, ikke styrke."
    ],
    breathe: "Rytmisk - typisk ud på anstrengelsen.",
    tips: "Start med bare 2-3 øvelser. Lette vægte er afgørende - form må ikke brydes. Kondition + styrke i én øvelse."
  },
  "Farmer carry intervals": {
    setup: "Stå med en tung håndvægt eller kettlebell i hver hånd. Armene ned langs siden.",
    steps: [
      "Stå oprejst - skuldrene tilbage og ned.",
      "Spænd maven og gå med faste skridt.",
      "Gå 30-60 sekunder, hvil 30-60 sekunder.",
      "Gentag 4-6 runder."
    ],
    breathe: "Ro, dyb vejrtrækning - hold ikke vejret.",
    tips: "Tunge vægte, kort distance. Hold en neutral nakke - kig frem, ikke ned. Hænderne afslappede, men greb stramt."
  },
  "Jump rope": {
    setup: "Stå med rebet bag fødderne. Håndtag i hver hånd, albuer tæt på kroppen, hænder i hoftehøjde.",
    steps: [
      "Sving rebet over hovedet med håndleddene (ikke armene).",
      "Hop lige nok til at rebet passerer under fødderne - 2-3 cm.",
      "Land blødt på forfoden.",
      "Start med 30 sek hop, 30 sek pause. Byg op."
    ],
    breathe: "Rytmisk - ind og ud gennem næsen/munden.",
    tips: "Hård belastning på knæene! Start med at 'svinge' rebet uden at hoppe for at lære rytmen. Lette sko anbefales."
  },
  "Bike intervals": {
    setup: "Indstil en motionscykel (eller brug en almindelig cykel på en plan rute). Sæt sadlen så knæet er let bøjet i bunden.",
    steps: [
      "Varm op 3-5 min med let modstand.",
      "Træd hårdt i 30 sekunder - ca. 90% indsats.",
      "Sæt farten ned 60-90 sekunder - let modstand.",
      "Gentag 6-10 runder."
    ],
    breathe: "Dyb og rytmisk - træk vejret ind over 2-3 tråd, ud over 2-3 tråd.",
    tips: "Modstanden skal være tung nok til at du mærker det. Juster modstanden, ikke bare kadencen. Nedkøling 5 min er vigtig."
  },
  "Bench press": {
    setup: "Lig på bænken, fødderne fladt på gulvet. Greb stangen lidt bredere end skuldrene, tommelfingre omkring stangen. Løft stangen af stativet.",
    steps: [
      "Sænk stangen kontrolleret ned til brystet (lige ved eller lige under brystvorterne).",
      "Pause et øjeblik - hold spænding.",
      "Pres stangen op igen til strakte arme.",
      "Skulderbladene presset ned i bænken hele tiden."
    ],
    breathe: "Ind når du sænker, ud når du presser op. Hold aldrig vejret længe.",
    tips: "Brug en spotter eller sikkerhedsstænger når du kører tungt. Albuer i ca. 45-60° vinkel ud fra kroppen, ikke fladt ud. Bue i øvre ryg er ok."
  },
  "Incline DB press": {
    setup: "Indstil bænken til 30-45 graders hældning. Sid med håndvægte på lårene, læg dig tilbage og 'spark' vægtene op til skuldrene.",
    steps: [
      "Start med håndvægte ved skuldrene, håndflader fremad.",
      "Pres op mod loftet, indtil armene er strakte.",
      "Sænk kontrolleret ned til skulderhøjde.",
      "Fødderne fladt på gulvet, lænden presset mod bænken."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Træner øvre bryst og forreste skulder. For høj bænk (over 45°) flytter fokus for meget til skulderen. Hold albuer ikke for fladt ud."
  },
  "Overhead press": {
    setup: "Stå med stang foran dig, greb lidt bredere end skuldrene. Løft stangen op til kravebenet (front rack position) - eller start med stangen allerede på skuldrene.",
    steps: [
      "Spænd mave og baller - undgå at svaje i lænden.",
      "Pres stangen lige op mod loftet, hovedet skubbes lidt frem under stangen.",
      "Stræk armene helt i toppen - stangen over hovedet, skuldre over hofter.",
      "Sænk stangen kontrolleret tilbage til kravebenet."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Hårdere end de fleste tror! Spænd maven som for et mavebøjning - beskytter lænden. Undgå at sparke fra med benene."
  },
  "Cable fly": {
    setup: "Stå mellem to kabelmaskiner, håndtag i begge hænder. Træk håndtagene op så armene er spredt ud til siderne, albuer let bøjet.",
    steps: [
      "Bøj albuerne let - hold bøjningen hele tiden.",
      "Før hænderne sammen i en bue foran dig, håndtagene mødes foran brystet.",
      "Klem brystet sammen i midten.",
      "Åben langsomt tilbage til start - mærk strækket i brystet."
    ],
    breathe: "Ind når du åbner, ud når du fører sammen.",
    tips: "Træner det indre bryst. Hold albuerne i en fast bøjet stilling - det er IKKE en pressebevægelse. Let vægt, kontrolleret bevægelse."
  },
  "Lat pulldown": {
    setup: "Sæt dig i maskinen, lår under puderne. Greb den lange stang overhånds, hænder lidt bredere end skuldrene.",
    steps: [
      "Læn dig lidt tilbage - hold brystet oppe.",
      "Træk stangen ned mod øvre bryst, albuer peger ned og lidt tilbage.",
      "Klem skulderbladene sammen i bunden.",
      "Lad stangen kontrolleret op igen - stræk armene helt."
    ],
    breathe: "Ud når du trækker ned, ind når du slipper op.",
    tips: "Undgå at svinge eller bruge kropsvægt. Træk med albuerne, ikke hænderne. Forskellige grebsbredder rammer forskellige dele af ryggen."
  },
  "Seated row": {
    setup: "Sæt dig på maskinen med fødderne på pladerne, knæ let bøjet. Greb håndtaget, arme strakte foran dig.",
    steps: [
      "Sid oprejst - brystet op, skuldrene tilbage.",
      "Træk håndtaget mod maven, albuer tæt på kroppen.",
      "Klem skulderbladene sammen i bunden.",
      "Lad armene strække kontrolleret frem igen."
    ],
    breathe: "Ud når du trækker, ind når du slipper frem.",
    tips: "Undgå at læne dig for langt tilbage og bruge momentum. Træk albuerne tilbage, ikke hænderne. Hold brystet oppe hele tiden."
  },
  "Pull-ups": {
    setup: "Hæng fra en pull-up stang med overhåndsgreb, hænder lidt bredere end skuldrene. Arme strakte, fødder fra gulvet.",
    steps: [
      "Spænd maven og baller - undgå at svinge.",
      "Træk dig op ved at bøje albuerne og klemme skulderbladene sammen.",
      "Hagen over stangen - eller brystet tæt på stangen.",
      "Sænk dig kontrolleret ned - stræk armene helt i bunden."
    ],
    breathe: "Pust ud når du trækker op, ind når du sænker.",
    tips: "Hård øvelse! Start med negative (spring op, sænk langsomt ned) eller brug et elastikbånd. Bredere greb = mere lats, smallere = mere biceps."
  },
  "Face pulls": {
    setup: "Indstil kabelmaskinen til overhovedet højde. Tag et reb-håndtag, træd tilbage så der er spænding. Arme strakte fremad.",
    steps: [
      "Stå med fødder i skulderbreddes afstand, let bøjede knæ.",
      "Træk rebet mod dit ansigt - albuer høje, hænder ved ørerne.",
      "Drej hænderne udad i toppen (som du 'hælder vand ud af kander').",
      "Lad armene strække langsomt frem igen."
    ],
    breathe: "Ud når du trækker, ind når du slipper.",
    tips: "Vigtig øvelse for skuldersundhed! Træner den svage bagside skulder. Let vægt - fokusér på teknikken. God modforøvelse til meget pres/bryst."
  },
  "Squat": {
    setup: "Stå under stangen i et squat rack, stangen på øvre ryg/trapez. Greb stangen lidt bredere end skuldrene. Løft stangen af stativet og træd et skridt tilbage.",
    steps: [
      "Stå med fødder i skulderbreddes afstand, tæerne lidt udad.",
      "Spænd maven hårdt - som forberedelse til et slag i maven.",
      "Bøj i både hofte og knæ, sænk dig kontrolleret.",
      "Gå mindst til parallelt (lårene vandret). Pres op gennem hælene."
    ],
    breathe: "Tag en dyb indånding før, hold i bunden, pust ud når du presser op (eller hold i toppen).",
    tips: "Brug et bælte ved tunge løft. Kneæene følger tæerne - ikke indad. Kig på et punkt 1-2 meter foran dig på væggen. Start med let stang for at lære form."
  },
  "Romanian deadlift": {
    setup: "Stå med stangen foran dig, greb i skulderbreddes afstand, overhånds- eller blandingsgreb. Stangen hviler mod lårene.",
    steps: [
      "Bøj fra hoften - skub ballerne bagud.",
      "Knæene bøjer sig KUN let - bøjningen er primært i hoften.",
      "Sænk stangen tæt langs benene, indtil du mærker stram bagside lår.",
      "Pres hofterne frem igen - stram ballerne i toppen."
    ],
    breathe: "Ind når du sænker, ud når du rejser dig.",
    tips: "Ryggen holdes neutral hele tiden. Mærk strækket i bagside lår - det er en bagside-lårsøvelse, ikke en ryg-øvelse. Lavere end midt-læg er for de fleste."
  },
  "Leg press": {
    setup: "Sæt dig i maskinen, ryg og hoved presset mod ryglænet. Fødder på pladen i skulderbreddes afstand.",
    steps: [
      "Lås sikkerhedsstoppen fra, sænk pladen kontrolleret ved at bøje knæene.",
      "Sænk indtil knæene er i ca. 90 graders bøjning (eller lidt mere).",
      "Pres pladen op igen - stræk benene (men lås ikke knæene helt).",
      "Hold lænden presset mod ryglænet hele tiden."
    ],
    breathe: "Ind når du sænker, ud når du presser op.",
    tips: "Skånsom for ryggen - god erstatning for squat. Lavere fodstilling rammer mere baller, højere rammer mere lår. Lås ikke knæene i toppen."
  },
  "Hamstring curl": {
    setup: "Indstil maskinen så pude-rullen sidder lige over anklerne (liggende) eller over læggen (siddende). Læg dig ned eller sid oprejst.",
    steps: [
      "Spænd ballerne og bøj knæene, før hælene mod ballerne.",
      "Klem bagside lår hårdt i toppen - hold 1 sekund.",
      "Sænk kontrolleret tilbage til start.",
      "Hoften skal blive presset ned - ikke løfte sig."
    ],
    breathe: "Ud når du bøjer, ind når du sænker.",
    tips: "Isolationsøvelse til bagside lår. Let vægt og kontrollerede bevægelser. Ikke en 'swing-bevægelse' - langsom og stram."
  },
  "Cable crunch": {
    setup: "Knæl foran et kabelmaskine med høj indstilling. Hold rebet over skuldrene, hænderne ved siden af hovedet.",
    steps: [
      "Spænd maven og bøj overkroppen ned mod knæene - maven gør arbejdet.",
      "Bøj kun så langt du kan uden at hoften går frem.",
      "Klem maven hårdt i bunden.",
      "Rejs langsomt op igen med kontrol."
    ],
    breathe: "Pust ud når du krummer ned, ind når du rejser op.",
    tips: "Træner maven meget effektivt! Bevægelsen er i ryggen/maven, IKKE i hoften. Lette vægte - det er ikke en tung styrkeøvelse."
  },
  "Hanging knee raise": {
    setup: "Hæng fra en pull-up stang med overhåndsgreb. Arme strakte, krop afslappet (men maven spændt).",
    steps: [
      "Spænd maven og løft knæene op mod brystet.",
      "Bøj i hoften - ikke kun knæene.",
      "Løft så højt du kan, eller indtil lår er parallelle med gulvet.",
      "Sænk langsomt ned igen uden at svinge."
    ],
    breathe: "Pust ud når du løfter, ind når du sænker.",
    tips: "Hårdere end det ser ud! Start med bøjede knæ. Sværere: strakte ben. Ikke en 'swing' - kontrolleret hele vejen."
  },
  "Pallof press": {
    setup: "Stå sidelæns til et kabelmaskine (eller med elastikbånd). Hold håndtaget med begge hænder foran brystet. Spænding i kablet.",
    steps: [
      "Stå med fødder i skulderbreddes afstand, let bøjede knæ.",
      "Pres håndtaget lige ud foran dig - arme strakte.",
      "Modstå trækket fra kablet - kroppen må ikke rotere.",
      "Før håndtaget tilbage til brystet."
    ],
    breathe: "Træk vejret normalt - hold ikke vejret.",
    tips: "Anti-rotationsøvelse - træner 'core' på en anden måde. Kroppen vil gerne rotere - det er pointen. Let vægt, langsom bevægelse."
  },
  "Rower intervals": {
    setup: "Sid på romaskinen, fødder i støtterne, greb håndtaget. Start med arme strakte, ryg let fremadbøjet, knæ bøjet.",
    steps: [
      "Skub først med benene - de gør 60% af arbejdet.",
      "Bagefter hæng ryggen tilbage (hold ryggen lige!).",
      "Til sidst træk armene ind mod brystet.",
      "Vend rækkefølgen: arme, ryg, ben."
    ],
    breathe: "Ud når du trækker, ind når du vender tilbage.",
    tips: "Ben-Ryg-Arme. Ikke Arme-Ryg-Bene. Træner 85% af kroppen. Interval: 30 sek hårdt, 30 sek let, gentag 8-10 gange."
  },
  "Incline walk": {
    setup: "Find en bakke eller indstil et løbebånd til 8-15% hældning. Start med rask gang.",
    steps: [
      "Stå oprejst - kig frem, ikke ned.",
      "Tag faste, lange skridt.",
      "Sving armene naturligt modsat benene.",
      "Start med 10-20 minutter, byg op til 30-45 min."
    ],
    breathe: "Ro, dyb vejrtrækning - ind gennem næsen, ud gennem munden.",
    tips: "Skånsom for leddene sammenlignet med løb. Brænder mange kalorier. Hældning er vigtigere end hastighed. Kan laves mens du ser TV/lytter til podcast."
  },
  "Bike sprints": {
    setup: "Brug en motionscykel (eller spincykel). Justér modstanden så det er tungt - ikke bare hurtigt.",
    steps: [
      "Varm op 5 minutter med let modstand.",
      "Øg modstanden og træd hårdt i 20-30 sekunder.",
      "Sæt modstand og kadence ned i 1-2 minutter (aktiv hvile).",
      "Gentag 6-10 runder."
    ],
    breathe: "Dyb og rytmisk - træk vejret ind over 2-3 tråd, ud over 2-3 tråd.",
    tips: "Tung modstand er afgørende - ellers træner du kun udholdenhed. Siddende eller stående - skift evt. Stående er hårdere. Husk nedkøling."
  },
  "Sled push": {
    setup: "Find en 'prowler' eller slæde. Læg passende vægt på. Stå bag slæden, hænder på stængerne.",
    steps: [
      "Læn dig fremad i en god atlet-position - ryg flad, knæ bøjet.",
      "Skub hårdt med benene - korte, kraftfulde skridt.",
      "Hold armene strakte, skuldrene foran slæden.",
      "Pres af hele vejen til målet - typisk 20-40 meter."
    ],
    breathe: "Kort, skarpe åndedrag - pust kraftigt ud ved hvert skub.",
    tips: "Meget konditionskrævende uden at belaste leddene. Let til medium vægt er bedst. Perfekt til slutmåned. Læg hænderne på den øverste stang for mere fokus på lår."
  }
};

const exerciseDescriptions = {
  "Push-ups": "Bryst, skuldre og triceps. Hold kroppen strak som en planke, og sænk brystet næsten til gulvet.",
  "Pike push-ups": "Skuldre og overkrop. Hænder og fødder tæt, krop i omvendt V - træner skuldrene som en mini håndstand.",
  "Diamond push-ups": "Triceps og indre bryst. Hænder samlet som en diamant under brystet.",
  "Dips på stol": "Triceps og bryst. Sænk kroppen ved at bøje armene, og skub op igen.",
  "Inverted row under bord": "Ryg og biceps. Læg dig under et bord, og træk brystet op mod kanten.",
  "Doorframe row": "Ryg og biceps. Hold fat i dørkarmen, og træk kroppen op - pas på skulderen.",
  "Superman pull": "Ryg og lænd. Lig på maven, løft arme og ben samtidig.",
  "Håndklæde row": "Ryg og biceps. Vikl et håndklæde om et fast punkt, og træk i begge ender.",
  "Squats": "Lår, baller og lænd. Skub hofterne tilbage, hold brystet oppe.",
  "Bulgarian split squat": "Lår og balance. En fod bag dig på en stol, sænk bageste knæ næsten til gulvet.",
  "Lunges": "Lår og baller. Lange skridt, bagerste knæ tæt på gulvet.",
  "Glute bridge": "Baller og bagside lår. Løft hofterne fra gulvet, klem ballerne sammen.",
  "Planke": "Mave og stabilitet. Hold kroppen strak på underarme og tæer.",
  "Dead bug": "Mave og koordination. Lig på ryggen, stræk modsat arm og ben.",
  "Mountain climbers": "Mave og kondition. Kør knæene skiftevis mod brystet i planke - høj belastning på knæ.",
  "Sideplanke": "Skrå mave og stabilitet. Hvil på en underarm, hold kroppen strak.",
  "Interval løb": "Kondition. 30 sek sprint, 30 sek gang - gentag i 8-10 runder.",
  "Burpees": "Hele kroppen og kondition. Drop, push-up, hop op - meget høj belastning.",
  "High knees": "Kondition og mave. Løb på stedet med høje knæ.",
  "Step-ups": "Lår og kondition. Træd op på en stol eller kasse, skift ben.",
  "DB bench press": "Bryst, skuldre, triceps. Liggende på bænk, pres håndvægte op.",
  "DB shoulder press": "Skuldre og triceps. Siddende eller stående, pres håndvægte op fra skulder.",
  "DB floor press": "Bryst og triceps. Liggende på gulvet, pres håndvægte op - gulvet beskytter skuldrene.",
  "DB lateral raise": "Skulder (ydre). Løft håndvægte ud til siden til skulderhøjde.",
  "DB row": "Ryg og biceps. Bøjet frem, træk håndvægt op til hoften.",
  "Renegade row": "Ryg og core. I push-up position, træk skiftevis håndvægt op.",
  "DB pullover": "Ryg og bryst. Liggende, sænk håndvægt bag hovedet og tilbage.",
  "Rear delt fly": "Bagside skulder. Bøjet frem, løft håndvægte ud til siden.",
  "Goblet squat": "Lår og baller. Hold håndvægt foran brystet, squat dybt.",
  "DB Romanian deadlift": "Bagside lår og lænd. Bøj fra hoften med let bøjede knæ.",
  "DB lunges": "Lår og baller. Skift ben i lunges med håndvægte.",
  "DB calf raise": "Lægge. Stående, løft dig op på tæerne.",
  "Weighted plank": "Mave og stabilitet. Planke med håndvægt på ryggen.",
  "Russian twist": "Skrå mave. Siddende, roter overkroppen side til side med håndvægt.",
  "Suitcase carry": "Core og greb. Gå med håndvægt i én hånd - hold dig oprejst.",
  "DB complexes": "Hele kroppen og kondition. Udfør 5 øvelser i træk uden pause.",
  "Farmer carry intervals": "Core, greb og kondition. Gå med tunge håndvægte i begge hænder.",
  "Jump rope": "Kondition og lægge. Hop med eller uden reb - hårdt for knæene.",
  "Bike intervals": "Kondition. Hårdt i 30 sek, let i 30 sek.",
  "Bench press": "Bryst, skuldre, triceps. Liggende på bænk, pres stangen fra brystet.",
  "Incline DB press": "Øvre bryst og skuldre. Bænken hældes 30 grader, pres håndvægte.",
  "Overhead press": "Skuldre og triceps. Stående, pres stang eller håndvægte fra skulder til overhead.",
  "Cable fly": "Bryst (især indre). Stå mellem kabler, før hænderne sammen foran dig.",
  "Lat pulldown": "Ryg og biceps. Træk stangen ned til brystet fra overhead.",
  "Seated row": "Ryg og biceps. Siddende, træk håndtag mod maven.",
  "Pull-ups": "Ryg og biceps. Hæng fra stang, træk dig op til hagen over stangen.",
  "Face pulls": "Bagside skulder og øvre ryg. Træk reb mod ansigtet med overhåndsgreb.",
  "Squat": "Lår, baller og lænd. Stang på skuldrene, squat til parallelt eller dybere.",
  "Romanian deadlift": "Bagside lår og lænd. Bøj fra hoften med stang, hold ryggen neutral.",
  "Leg press": "Lår og baller. Siddende i maskine, pres med benene - skånsom for ryg.",
  "Hamstring curl": "Bagside lår. Liggende eller siddende, bøj knæene mod ballerne.",
  "Cable crunch": "Mave. Knælende, træk kabel ned mod knæene med maven.",
  "Hanging knee raise": "Mave og hoftebøjer. Hæng fra stang, løft knæene mod brystet.",
  "Pallof press": "Core og anti-rotation. Stående, pres kabel lige ud foran dig.",
  "Rower intervals": "Kondition og ryg. Hårdt i 30-60 sek, let i samme tid.",
  "Incline walk": "Kondition og baller. Gå på bænk med hældning - skånsom for led.",
  "Bike sprints": "Kondition. Maks indsats i 20-30 sek, pause, gentag.",
  "Sled push": "Lår, baller og kondition. Skub en slæde fremad med fuld kraft."
};

function isHighImpact(name) {
  const lc = name.toLowerCase();
  return highImpactKeywords.some((kw) => lc.includes(kw));
}

const splitNames = {
  2: ["Full body A", "Full body B"],
  3: ["Push", "Pull", "Legs"],
  4: ["Upper", "Lower", "Push", "Pull + legs"],
  5: ["Push", "Pull", "Legs", "Upper", "Conditioning"],
  6: ["Push", "Pull", "Legs", "Push volume", "Pull volume", "Legs + core"]
};

const weekDays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
const trainingDaySlots = {
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 2, 4, 5],
  6: [0, 1, 2, 3, 4, 5]
};

const groupExplanations = {
  push: "Pres-øvelser træner bryst, skuldre og triceps.",
  pull: "Træk-øvelser træner ryg, biceps og kropsholdning.",
  legs: "Ben-øvelser bygger lår, baller og stabilitet.",
  core: "Core gør mave, lænd og balance stærkere.",
  cardio: "Kondition får pulsen op og forbedrer udholdenhed."
};

const state = loadState();
let activeDay = 0;
let deferredInstallPrompt = null;

const elements = {
  tabs: document.querySelectorAll(".tab"),
  views: {
    setup: document.querySelector("#setupView"),
    plan: document.querySelector("#planView"),
    progress: document.querySelector("#progressView")
  },
  form: document.querySelector("#profileForm"),
  days: document.querySelector("#days"),
  daysLabel: document.querySelector("#daysLabel"),
  bmiValue: document.querySelector("#bmiValue"),
  bmiText: document.querySelector("#bmiText"),
  focusValue: document.querySelector("#focusValue"),
  formMessage: document.querySelector("#formMessage"),
  planTitle: document.querySelector("#planTitle"),
  calendarGrid: document.querySelector("#calendarGrid"),
  weekStrip: document.querySelector("#weekStrip"),
  workoutCard: document.querySelector("#workoutCard"),
  regenerateButton: document.querySelector("#regenerateButton"),
  weekSummary: document.querySelector("#weekSummary"),
  completionTitle: document.querySelector("#completionTitle"),
  meterFill: document.querySelector("#meterFill"),
  volumeStat: document.querySelector("#volumeStat"),
  calorieStat: document.querySelector("#calorieStat"),
  resetWeekButton: document.querySelector("#resetWeekButton"),
  notes: document.querySelector("#notes"),
  exportButton: document.querySelector("#exportButton"),
  importFile: document.querySelector("#importFile"),
  installButton: document.querySelector("#installButton"),
  streakValue: document.querySelector("#streakValue"),
  xpValue: document.querySelector("#xpValue"),
  pasValue: document.querySelector("#pasValue"),
  motivationBanner: document.querySelector("#motivationBanner"),
  topMascot: document.querySelector("#topMascot"),
  shopSection: document.querySelector("#shopSection"),
  coinsValue: document.querySelector("#coinsValue")
};

function defaultState() {
  const profile = {
    age: 28,
    weight: 82,
    height: 182,
    days: 4,
    duration: 45,
    goal: "muscle",
    level: "intermediate",
    equipment: "gym"
  };
  return {
    profile,
    plan: generatePlan(profile),
    completed: {},
    notes: "",
    xp: 0,
    coins: 0,
    ownedMascots: ["default"],
    activeMascot: "default",
    streak: { count: 0, lastDate: null }
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.profile && saved?.plan) {
      saved.profile.age = Math.max(10, Number(saved.profile.age) || 10);
      saved.profile.duration = Number(saved.profile.duration) || 45;
      saved.xp = saved.xp || 0;
      saved.coins = saved.coins || 0;
      saved.ownedMascots = saved.ownedMascots || ["default"];
      saved.activeMascot = saved.activeMascot || "default";
      saved.streak = saved.streak || { count: 0, lastDate: null };
      return saved;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
  return defaultState();
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getProfileFromForm() {
  const data = new FormData(elements.form);
  return {
    age: Number(data.get("age")),
    weight: Number(data.get("weight")),
    height: Number(data.get("height")),
    days: Number(data.get("days")),
    duration: Number(data.get("duration")),
    goal: data.get("goal"),
    level: data.get("level"),
    equipment: data.get("equipment")
  };
}

function generatePlan(profile) {
  const repMap = {
    strength: { reps: "4-6", rest: "2-3 min", focus: "Styrke" },
    muscle: { reps: "8-12", rest: "75-120 sek", focus: "Hypertrofi" },
    fatloss: { reps: "10-15", rest: "45-75 sek", focus: "Fedtforbrænding" },
    fitness: { reps: "12-18", rest: "30-60 sek", focus: "Kondition" }
  };
  const levelSets = { beginner: 3, intermediate: 4, advanced: 5 };
  const goalData = repMap[profile.goal];
  const split = splitNames[profile.days];
  const bank = exerciseBank[profile.equipment];
  const factors = calculateIntensity(profile);
  const seedKey = `${profile.age}-${profile.weight}-${profile.height}-${profile.goal}-${profile.level}-${profile.equipment}-${profile.days}-${profile.duration}`;
  let seed = 0;
  for (let i = 0; i < seedKey.length; i += 1) seed = (seed * 31 + seedKey.charCodeAt(i)) >>> 0;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  return split.map((name, index) => {
    const pattern = getPattern(name, profile.goal, profile.duration);
    const exercises = pattern.map((group, exerciseIndex) => {
      const names = bank[group];
      const exerciseName = pickExercise(names, index + exerciseIndex + Math.floor(random() * names.length), factors.preferLowImpact);
      const baseSets = levelSets[profile.level] + factors.setAdjustment + (factors.level === "høj" && exerciseIndex < 2 ? 1 : 0);
      const sets = Math.max(1, baseSets + getDurationSetAdjustment(profile.duration, exerciseIndex));
      return {
        group,
        name: exerciseName,
        sets,
        reps: group === "cardio" ? getCardioDose(profile) : goalData.reps,
        rest: group === "cardio" ? "aktiv pause" : adjustRest(goalData.rest, factors.restMultiplier),
        explanation: groupExplanations[group],
        description: exerciseDescriptions[exerciseName] || groupExplanations[group] || ""
      };
    });

    return {
      id: makeId(),
      name,
      focus: goalData.focus,
      duration: profile.duration,
      weekday: trainingDaySlots[profile.days][index],
      intensityLabel: factors.label,
      warmup: factors.needsWarmup,
      exercises
    };
  });
}

function getPattern(name, goal, duration) {
  let pattern;
  if (goal === "fitness") pattern = ["cardio", "legs", "push", "pull", "core"];
  else if (goal === "fatloss") pattern = ["legs", "push", "pull", "cardio", "core"];
  else if (name.includes("Push")) pattern = ["push", "push", "core", "cardio"];
  else if (name.includes("Pull")) pattern = ["pull", "pull", "legs", "core"];
  else if (name.includes("Leg")) pattern = ["legs", "legs", "core", "cardio"];
  else if (name.includes("Lower")) pattern = ["legs", "legs", "core", "cardio"];
  else if (name.includes("Conditioning")) pattern = ["cardio", "legs", "core", "push"];
  else pattern = ["push", "pull", "legs", "core"];

  if (duration <= 10) return pattern.slice(0, 2);
  if (duration <= 15) return pattern.slice(0, 3);
  if (duration <= 25) return pattern.slice(0, 4);
  return pattern;
}

function getDurationSetAdjustment(duration, exerciseIndex) {
  if (duration <= 10) return exerciseIndex === 0 ? -1 : -2;
  if (duration <= 15) return -1;
  if (duration <= 25) return exerciseIndex > 1 ? -1 : 0;
  return 0;
}

function getCardioDose(profile) {
  if (profile.duration <= 10) return "3 x 30 sek";
  if (profile.duration <= 15) return "5 x 30 sek";
  if (profile.duration <= 25) return "6-8 min";
  if (profile.goal === "fitness") return "8 x 45 sek";
  if (profile.goal === "fatloss") return "10-18 min";
  return "6-10 min";
}

function calculateIntensity(profile) {
  const heightM = profile.height / 100;
  const bmi = profile.weight / (heightM * heightM);
  const isVeryTall = profile.height >= 195;
  const isVeryShort = profile.height <= 160;

  const factors = {
    restMultiplier: 1,
    setAdjustment: 0,
    preferLowImpact: false,
    needsWarmup: false,
    level: "normal",
    label: "Normal",
    reason: []
  };

  if (profile.age >= 60) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.4);
    factors.setAdjustment = Math.min(factors.setAdjustment, -1);
    factors.needsWarmup = true;
    factors.level = "let";
    factors.label = "Let";
    factors.reason.push("alder 60+ kræver længere hvile og færre sæt");
  } else if (profile.age >= 50) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.25);
    factors.setAdjustment = Math.min(factors.setAdjustment, -1);
    factors.needsWarmup = true;
    factors.level = "moderat";
    factors.label = "Moderat";
    factors.reason.push("alder 50+ kræver mere restitution");
  } else if (profile.age >= 40) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.1);
    factors.level = "moderat";
    factors.label = "Moderat";
    factors.reason.push("alder 40+ kræver lidt mere hvile");
  }

  if (bmi >= 32) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.25);
    factors.setAdjustment = Math.min(factors.setAdjustment, -1);
    factors.preferLowImpact = true;
    factors.needsWarmup = true;
    factors.reason.push("høj BMI (over 32) - skåner led med lavere belastning");
  } else if (bmi >= 27) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.1);
    factors.preferLowImpact = true;
    factors.reason.push("BMI over 27 - foretrækker led-venlige øvelser");
  } else if (bmi < 18.5) {
    factors.setAdjustment += 1;
    factors.reason.push("lav BMI - kan klare lidt mere volumen");
  }

  if (isVeryTall) {
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.05);
    factors.reason.push("høj (195+ cm) - lidt mere tid i stræk");
  } else if (isVeryShort) {
    factors.setAdjustment += 1;
    factors.reason.push("lav (≤160 cm) - har udnyttet bevægelsesbanen godt");
  }

  if (profile.level === "beginner") {
    factors.setAdjustment = Math.min(factors.setAdjustment, -1);
    factors.restMultiplier = Math.max(factors.restMultiplier, 1.15);
    factors.needsWarmup = true;
    factors.reason.push("begynder - fokus på teknik med færre sæt");
  } else if (
    profile.level === "advanced" &&
    profile.age < 40 &&
    bmi < 27 &&
    !isVeryTall
  ) {
    factors.setAdjustment += 1;
    factors.label = "Høj";
    factors.level = "høj";
    factors.reason.push("øvet og ung - kan køre tungere");
  }

  if (factors.reason.length === 0) {
    factors.reason.push("standard plan baseret på dit mål");
  }

  return factors;
}

function adjustRest(rest, multiplier) {
  if (!rest) return rest;
  if (multiplier === 1) return rest;
  const match = rest.match(/^(\d+)(?:\s*-\s*(\d+))?\s*(.*)$/);
  if (!match) return rest;
  const low = Math.round(parseInt(match[1], 10) * multiplier);
  const high = match[2] ? Math.round(parseInt(match[2], 10) * multiplier) : null;
  return high ? `${low}-${high} ${match[3]}`.trim() : `${low} ${match[3]}`.trim();
}

function pickExercise(names, index, preferLowImpact) {
  if (!preferLowImpact) return names[index % names.length];
  const safe = names.filter((n) => !isHighImpact(n));
  const pool = safe.length > 0 ? safe : names;
  return pool[index % pool.length];
}

const motivationMessages = {
  1: { icon: "💪", texts: ["Første skridt! Du er i gang!", "Dag 1 i bogen - godt gået!"] },
  3: { icon: "🔥", texts: ["3 dage i træk! Rytmen bygger sig op!", "Tredje dag - du er på rette vej!"] },
  5: { icon: "⭐", texts: ["5 dage i træk! Du jager dine mål!", "Halvvejs til en vane!"] },
  7: { icon: "🌟", texts: ["En hel uge! Fantastisk!", "7 dage i træk - du gør det super!"] },
  14: { icon: "⚡", texts: ["14 dage! Du er en makine!", "To uger i streg - imponerende!"] },
  30: { icon: "👑", texts: ["30 dage! Du er en legende!", "En måned uden pause - kæmpe!"] },
  default: { icon: "💪", texts: ["Flot arbejde!", "Endnu en træning i bogen!", "Godt gået!", "Du bliver stærkere!"] }
};

function updateStreak() {
  const today = new Date().toDateString();
  if (state.streak.lastDate === today) return false;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.streak.lastDate === yesterday) {
    state.streak.count += 1;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
  saveState();
  return true;
}

const mascots = {
  default: { name: "Træno", cost: 0, colors: { body: "#5dd167", plate: "#ff9600", cheek: "#fff" }, label: "Den glade maskot" },
  fire: { name: "Ild", cost: 50, colors: { body: "#ff4b4b", plate: "#ff9600", cheek: "#ffd700" }, label: "Flammer igennem!" },
  ice: { name: "Is", cost: 60, colors: { body: "#1cb0f6", plate: "#00bcd4", cheek: "#fff" }, label: "Cool og rolig" },
  dark: { name: "Mørk", cost: 80, colors: { body: "#7c4dff", plate: "#4a148c", cheek: "#b388ff" }, label: "Mystisk og stærk" },
  gold: { name: "Guld", cost: 100, colors: { body: "#ffd700", plate: "#ffaa00", cheek: "#fff" }, label: "Skinner stærkest" },
  rainbow: { name: "Regnbue", cost: 150, colors: { body: "#e040fb", plate: "#ff4081", cheek: "#fff" }, label: "Alle farver!" }
};

function mascotSvgHtml(id, size) {
  const m = mascots[id] || mascots.default;
  const s = size || 42;
  return `<svg viewBox="0 0 512 512" width="${s}" height="${s}" fill="none">
    <rect x="166" y="180" width="180" height="152" rx="40" fill="${m.colors.body}"/>
    <rect x="80" y="198" width="86" height="116" rx="24" fill="${m.colors.plate}" opacity="0.9"/>
    <rect x="346" y="198" width="86" height="116" rx="24" fill="${m.colors.plate}" opacity="0.9"/>
    <circle cx="196" cy="248" r="16" fill="#fff"/>
    <circle cx="316" cy="248" r="16" fill="#fff"/>
    <circle cx="196" cy="248" r="7" fill="#0e1a14"/>
    <circle cx="316" cy="248" r="7" fill="#0e1a14"/>
    <circle cx="176" cy="270" r="10" fill="${m.colors.cheek}" opacity="0.25"/>
    <circle cx="336" cy="270" r="10" fill="${m.colors.cheek}" opacity="0.25"/>
    <path d="M224 276 Q256 314 288 276" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="256" cy="298" rx="12" ry="7" fill="#ff4b4b" opacity="0.6"/>
  </svg>`;
}

function awardXp(day) {
  const base = 10;
  const durationBonus = day.duration >= 45 ? 5 : day.duration >= 25 ? 3 : 0;
  const streakBonus = state.streak.count >= 7 ? 5 : state.streak.count >= 3 ? 2 : 0;
  state.xp += base + durationBonus + streakBonus;
  saveState();
  return base + durationBonus + streakBonus;
}

function awardCoins(day) {
  const base = 5;
  const durationBonus = day.duration >= 45 ? 3 : day.duration >= 25 ? 2 : 0;
  const streakBonus = state.streak.count >= 7 ? 3 : state.streak.count >= 3 ? 1 : 0;
  state.coins += base + durationBonus + streakBonus;
  saveState();
  return base + durationBonus + streakBonus;
}

function getMotivation(streakCount) {
  const thresholds = Object.keys(motivationMessages).filter((k) => k !== "default").map(Number).sort((a, b) => b - a);
  let key = "default";
  for (const t of thresholds) {
    if (streakCount >= t) { key = String(t); break; }
  }
  const pool = motivationMessages[key];
  return { icon: pool.icon, text: pool.texts[Math.floor(Math.random() * pool.texts.length)] };
}

function showCelebration(motivation, earnedXp, earnedCoins) {
  const el = document.createElement("div");
  el.className = "celebration";
  el.innerHTML = `
    <div class="celebration-inner">
      <div class="celebration-icon">${motivation.icon}</div>
      <div class="celebration-text">${motivation.text}</div>
      <p class="celebration-sub">+${earnedXp} XP <span class="celebration-divider">·</span> <span class="celebration-coins">+${earnedCoins} 🪙</span> <span class="celebration-divider">·</span> ${state.streak.count} dages stribe</p>
    </div>
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function renderProfile() {
  Object.entries(state.profile).forEach(([key, value]) => {
    const input = elements.form.elements[key];
    if (input) input.value = value;
  });
  updateProfileReadout();
}

function updateProfileReadout() {
  const profile = getProfileFromForm();
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  elements.daysLabel.textContent = `${profile.days} dage`;
  elements.bmiValue.textContent = bmi.toFixed(1);
  elements.bmiText.textContent = bmi < 18.5 ? "Lav vægt" : bmi < 25 ? "Normal vægt" : bmi < 30 ? "Over normal" : "Høj vægt";
  elements.focusValue.textContent = {
    strength: "Styrke",
    muscle: "Hypertrofi",
    fatloss: "Forbrænding",
    fitness: "Kondition"
  }[profile.goal];
  validateAge(profile.age);
}

function validateAge(age) {
  const isTooYoung = age < 10;
  elements.formMessage.textContent = isTooYoung ? "Alderen skal være mindst 10 år for at lave en plan." : "";
  elements.formMessage.classList.toggle("is-visible", isTooYoung);
  return !isTooYoung;
}

function getTodayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function groupLabel(group) {
  return {
    push: "Pres",
    pull: "Træk",
    legs: "Ben",
    core: "Core",
    cardio: "Kondition"
  }[group] || group;
}

function getWeekSummary() {
  const totalMinutes = state.plan.reduce((sum, d) => sum + d.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const time = hours > 0 ? `${hours}t ${mins}min` : `${mins} min`;
  const days = state.plan.map((d) => weekDays[d.weekday]);
  return { days, time, totalMinutes };
}

function getIntensityReason() {
  const factors = calculateIntensity(state.profile);
  return factors;
}

function renderWeekSummary() {
  if (!elements.weekSummary) return;
  const summary = getWeekSummary();
  const factors = getIntensityReason();
  const intensityClass = factors.level === "høj" ? "is-high" : factors.level === "moderat" ? "is-moderate" : factors.level === "let" ? "is-easy" : "";
  const reason = factors.reason.join(" · ");
  elements.weekSummary.innerHTML = `
    <div class="week-row">
      <div>
        <span class="week-eyebrow">Træningsdage</span>
        <strong>${summary.days.length > 0 ? summary.days.join(", ") : "Ingen plan"}</strong>
      </div>
      <div>
        <span class="week-eyebrow">Samlet tid</span>
        <strong>${summary.time}</strong>
      </div>
      <div>
        <span class="week-eyebrow">Intensitet</span>
        <strong class="intensity-pill ${intensityClass}">${factors.label}</strong>
      </div>
    </div>
    <p class="week-reason">${reason}</p>
  `;
}

function renderPlan() {
  const profile = state.profile;
  const focus = state.plan[0]?.focus || "Personlig";
  elements.planTitle.textContent = `${profile.days}-dages ${focus.toLowerCase()}`;
  elements.weekStrip.innerHTML = "";
  renderWeekSummary();
  renderCalendar();

  state.plan.forEach((day, index) => {
    const button = document.createElement("button");
    button.className = `day-pill${index === activeDay ? " is-active" : ""}${state.completed[day.id] ? " is-done" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>Dag ${index + 1}</span><strong>${day.name}</strong>`;
    button.addEventListener("click", () => {
      activeDay = index;
      renderPlan();
    });
    elements.weekStrip.appendChild(button);
  });

  renderWorkout();
  renderProgress();
}

function renderCalendar() {
  const daysBySlot = new Map(state.plan.map((day, index) => [day.weekday ?? trainingDaySlots[state.profile.days][index], { day, index }]));
  elements.calendarGrid.innerHTML = "";
  const today = getTodayIndex();

  weekDays.forEach((weekday, slot) => {
    const training = daysBySlot.get(slot);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    if (slot === today) button.classList.add("is-today");

    if (!training) {
      button.classList.add("is-rest");
      button.innerHTML = `<span>${weekday}</span><strong>Hviledag</strong><small>Gåtur, mobilitet eller fri</small>`;
      elements.calendarGrid.appendChild(button);
      return;
    }

    const isActive = training.index === activeDay;
    const isDone = state.completed[training.day.id];
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-done", isDone);
    const groups = [...new Set(training.day.exercises.map((e) => groupLabel(e.group)))].join(" · ");
    const count = training.day.exercises.length;
    button.innerHTML = `
      <span>${weekday}</span>
      <strong>${training.day.name}</strong>
      <small>${training.day.duration} min · ${training.day.focus}</small>
      <em class="calendar-meta">${count} øvelser · ${groups}</em>
      ${isDone ? '<em class="calendar-done">Klaret</em>' : ""}
    `;
    button.addEventListener("click", () => {
      activeDay = training.index;
      renderPlan();
    });
    elements.calendarGrid.appendChild(button);
  });
}

function formatHowTo(name) {
  const howto = exerciseHowTo[name];
  if (!howto) {
    return `<p class="howto-empty">Klik for at folde øvelsen ud og se mere information.</p>`;
  }
  const steps = (howto.steps || [])
    .map((s) => `<li>${s}</li>`)
    .join("");
  return `
    <div class="howto-grid">
      <div class="howto-block">
        <span class="howto-label">Forberedelse</span>
        <p>${howto.setup || ""}</p>
      </div>
      ${steps ? `<div class="howto-block"><span class="howto-label">Udførelse</span><ol class="howto-steps">${steps}</ol></div>` : ""}
      ${howto.breathe ? `<div class="howto-block"><span class="howto-label">Vejrtrækning</span><p>${howto.breathe}</p></div>` : ""}
      ${howto.tips ? `<div class="howto-block howto-tips"><span class="howto-label">Tips &amp; fejl at undgå</span><p>${howto.tips}</p></div>` : ""}
    </div>
  `;
}

function renderWorkout() {
  const day = state.plan[activeDay] || state.plan[0];
  if (!day) return;
  const completeText = state.completed[day.id] ? "Marker som ikke klaret" : "Marker som klaret";
  const factors = getIntensityReason();
  const warmupNote = day.warmup
    ? `<div class="warmup-note"><span class="warmup-icon">⚡</span><div><strong>Husk opvarmning</strong><p>5-8 min let cardio + dynamisk udstrækning anbefales før denne pas.</p></div></div>`
    : "";
  const intensityClass = factors.level === "høj" ? "is-high" : factors.level === "moderat" ? "is-moderate" : factors.level === "let" ? "is-easy" : "";
  const intensityBadge = day.intensityLabel
    ? `<span class="intensity-pill ${intensityClass}">${day.intensityLabel}</span>`
    : "";
  const dayFocus = day.focus;
  const dayName = day.name;
  elements.workoutCard.innerHTML = `
    <div class="workout-summary">
      <div class="workout-title">
        <p class="eyebrow">${dayFocus}</p>
        <h2>${dayName}</h2>
      </div>
      <div class="workout-tags">
        <span class="tag">${day.duration} min</span>
        ${intensityBadge}
      </div>
    </div>
    ${warmupNote}
    <div class="exercise-list"></div>
    <button class="primary-action complete-button" type="button">${completeText}</button>
  `;

  const list = elements.workoutCard.querySelector(".exercise-list");
  day.exercises.forEach((exercise, index) => {
    const item = document.querySelector("#exerciseTemplate").content.firstElementChild.cloneNode(true);
    item.classList.add("is-clickable");
    const nameEl = item.querySelector(".exercise-name");
    nameEl.textContent = exercise.name;
    item.querySelector(".exercise-meta").textContent = `${exercise.sets} sæt x ${exercise.reps} · pause ${exercise.rest}`;
    const help = document.createElement("small");
    help.className = "exercise-help";
    help.textContent = exercise.description || exercise.explanation || groupExplanations[exercise.group] || "Hold god teknik og stop ved smerte.";
    item.querySelector(".exercise-meta").after(help);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "expand-toggle";
    toggle.setAttribute("aria-label", "Vis detaljer");
    toggle.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    item.querySelector(".exercise-controls").prepend(toggle);

    const details = document.createElement("div");
    details.className = "exercise-details";
    details.innerHTML = formatHowTo(exercise.name);
    item.appendChild(details);

    const toggleExpansion = () => {
      const expanded = item.classList.toggle("is-expanded");
      toggle.classList.toggle("is-open", expanded);
      toggle.setAttribute("aria-label", expanded ? "Skjul detaljer" : "Vis detaljer");
    };

    item.addEventListener("click", toggleExpansion);
    toggle.addEventListener("click", (event) => event.stopPropagation());
    item.querySelector(".decrease").addEventListener("click", (event) => {
      event.stopPropagation();
      changeSets(index, -1);
    });
    item.querySelector(".increase").addEventListener("click", (event) => {
      event.stopPropagation();
      changeSets(index, 1);
    });
    item.querySelector(".swap").addEventListener("click", (event) => {
      event.stopPropagation();
      swapExercise(index);
    });

    list.appendChild(item);
  });

  elements.workoutCard.querySelector(".complete-button").addEventListener("click", () => {
    const nowDone = !state.completed[day.id];
    state.completed[day.id] = nowDone;
    if (nowDone) {
      updateStreak();
      const earnedXp = awardXp(day);
      const earnedCoins = awardCoins(day);
      const mot = getMotivation(state.streak.count);
      showCelebration(mot, earnedXp, earnedCoins);
    }
    saveState();
    renderPlan();
  });
}

function changeSets(index, amount) {
  const exercise = state.plan[activeDay].exercises[index];
  exercise.sets = Math.min(8, Math.max(1, exercise.sets + amount));
  saveState();
  renderWorkout();
  renderProgress();
}

function swapExercise(index) {
  const exercise = state.plan[activeDay].exercises[index];
  const choices = exerciseBank[state.profile.equipment][exercise.group];
  const factors = calculateIntensity(state.profile);
  const pool = factors.preferLowImpact ? choices.filter((c) => !isHighImpact(c)) : choices;
  const list = pool.length > 0 ? pool : choices;
  const current = list.indexOf(exercise.name);
  const next = list[(current + 1 + list.length) % list.length];
  exercise.name = next;
  exercise.description = exerciseDescriptions[next] || groupExplanations[exercise.group] || "";
  saveState();
  renderWorkout();
}

function renderShop() {
  const grid = elements.shopSection;
  let html = `<div class="shop-header"><span class="shop-coins">🪙 ${state.coins} mønter</span></div><div class="shop-grid">`;
  Object.entries(mascots).forEach(([id, m]) => {
    const owned = state.ownedMascots.includes(id);
    const active = state.activeMascot === id;
    const affordable = state.coins >= m.cost;
    html += `<div class="shop-item${owned ? " is-owned" : ""}${active ? " is-active" : ""}" data-mascot="${id}">`;
    html += mascotSvgHtml(id, 52);
    html += `<span class="shop-item-name">${m.name}</span>`;
    if (owned) {
      if (active) {
        html += `<span class="shop-badge">✅ Valgt</span>`;
      } else {
        html += `<button class="shop-select" type="button">Vælg</button>`;
      }
    } else {
      if (affordable) {
        html += `<button class="shop-buy" type="button">🪙 ${m.cost}</button>`;
      } else {
        html += `<span class="shop-price">🪙 ${m.cost}</span>`;
      }
    }
    html += `</div>`;
  });
  html += `</div>`;
  grid.innerHTML = html;
  grid.querySelectorAll(".shop-item").forEach((item) => {
    const id = item.dataset.mascot;
    const buyBtn = item.querySelector(".shop-buy");
    const selectBtn = item.querySelector(".shop-select");
    if (buyBtn) {
      buyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.coins >= mascots[id].cost && !state.ownedMascots.includes(id)) {
          state.coins -= mascots[id].cost;
          state.ownedMascots.push(id);
          state.activeMascot = id;
          saveState();
          renderProgress();
        }
      });
    }
    if (selectBtn) {
      selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.ownedMascots.includes(id)) {
          state.activeMascot = id;
          saveState();
          renderProgress();
        }
      });
    }
  });
}

function renderProgress() {
  const completedCount = state.plan.filter((day) => state.completed[day.id]).length;
  const total = state.plan.length || 1;
  const percent = Math.round((completedCount / total) * 100);
  const totalSets = state.plan.flatMap((day) => day.exercises).reduce((sum, exercise) => sum + exercise.sets, 0);
  const calories = Math.round(state.profile.weight * state.profile.duration * state.plan.length * 0.09);
  const todayStr = new Date().toDateString();
  const trainedToday = Object.values(state.completed).some(Boolean) && state.streak.lastDate === todayStr && state.streak.count > 0;

  elements.completionTitle.textContent = `${completedCount} af ${total} pas`;
  elements.meterFill.style.width = `${percent}%`;
  elements.volumeStat.textContent = `${totalSets} sæt`;
  elements.calorieStat.textContent = `${calories} kcal`;
  elements.notes.value = state.notes || "";

  if (elements.streakValue) elements.streakValue.textContent = `${state.streak.count} dage`;
  if (elements.xpValue) elements.xpValue.textContent = `${state.xp} XP`;
  if (elements.pasValue) elements.pasValue.textContent = `${completedCount}`;

  if (elements.motivationBanner) {
    if (trainedToday) {
      const mot = getMotivation(state.streak.count);
      elements.motivationBanner.innerHTML = `${mot.icon} ${mot.text}`;
      elements.motivationBanner.hidden = false;
    } else {
      elements.motivationBanner.hidden = true;
    }
  }

  if (elements.topMascot) {
    elements.topMascot.innerHTML = mascotSvgHtml(state.activeMascot, 42);
  }
  if (elements.coinsValue) {
    elements.coinsValue.textContent = `${state.coins} 🪙`;
  }
  if (elements.shopSection) {
    renderShop();
  }
}

function switchView(viewName) {
  elements.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewName));
  Object.entries(elements.views).forEach(([name, view]) => view.classList.toggle("is-active", name === viewName));
}

elements.tabs.forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));

elements.form.addEventListener("input", updateProfileReadout);

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = getProfileFromForm();
  if (!validateAge(profile.age)) return;
  state.profile = profile;
  state.plan = generatePlan(state.profile);
  state.completed = {};
  activeDay = 0;
  saveState();
  renderPlan();
  switchView("plan");
});

elements.regenerateButton.addEventListener("click", () => {
  state.plan = generatePlan(state.profile);
  state.completed = {};
  activeDay = 0;
  saveState();
  renderPlan();
});

elements.resetWeekButton.addEventListener("click", () => {
  state.completed = {};
  saveState();
  renderProgress();
  renderPlan();
});

elements.notes.addEventListener("input", () => {
  state.notes = elements.notes.value;
  saveState();
});

elements.exportButton.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "træningsplan.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

elements.importFile.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const imported = JSON.parse(await file.text());
  if (!imported.profile || !imported.plan) return;
  Object.assign(state, imported);
  activeDay = 0;
  saveState();
  renderProfile();
  renderPlan();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  elements.installButton.hidden = false;
});

elements.installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    alert("På iPhone: åbn siden i Safari, tryk Del, og vælg 'Føj til hjemmeskærm'.");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

renderProfile();
renderPlan();

function makeId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
