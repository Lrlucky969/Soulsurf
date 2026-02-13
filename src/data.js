// SoulSurf – Data Constants (v2.7)

export const SURF_SPOTS = [
  { id: "bali", name: "Bali, Indonesia", emoji: "🌺", difficulty: "beginner", waveType: "Sanfte Riffwellen", breakType: "reef", hazards: ["reef"], season: "Apr–Okt", water: "28°C", wetsuit: "none", lat: -8.72, lng: 115.17, tips: ["Uluwatu und Padang Padang für Fortgeschrittene, Kuta Beach für Anfänger", "Booties empfohlen wegen scharfem Riff", "Beste Zeit: früher Morgen vor dem Onshore-Wind"] },
  { id: "portugal", name: "Algarve, Portugal", emoji: "🇵🇹", difficulty: "beginner", waveType: "Beachbreaks", breakType: "beach", hazards: ["rip", "current"], season: "Sep–Nov", water: "20°C", wetsuit: "3/2mm", lat: 37.09, lng: -8.81, tips: ["Arrifana und Amado sind perfekte Anfänger-Spots", "Neoprenanzug 3/2mm nötig, Wasser ist frisch", "Starke Strömungen möglich – immer zwischen den Flaggen surfen"] },
  { id: "hawaii", name: "Hawaii, USA", emoji: "🌈", difficulty: "advanced", waveType: "Große Riffwellen", breakType: "reef", hazards: ["reef", "locals", "current"], season: "Nov–Feb", water: "25°C", wetsuit: "none", lat: 21.59, lng: -158.10, tips: ["Waikiki für Anfänger, North Shore nur für Erfahrene", "Respektiere die Locals – Hawaii hat strenge Lineup-Hierarchie", "Riffschuhe sind Pflicht an vielen Spots"] },
  { id: "costarica", name: "Costa Rica", emoji: "🦜", difficulty: "beginner", waveType: "Warme Beachbreaks", breakType: "beach", hazards: ["rip"], season: "Dez–Apr", water: "29°C", wetsuit: "none", lat: 10.30, lng: -85.84, tips: ["Tamarindo und Nosara sind ideal für Anfänger", "Kein Neopren nötig – Boardshorts reichen", "Achtung Krokodile an Flussmündungen (kein Witz!)"] },
  { id: "australia", name: "Gold Coast, Australien", emoji: "🦘", difficulty: "intermediate", waveType: "Pointbreaks", breakType: "point", hazards: ["locals", "current"], season: "Feb–Mai", water: "23°C", wetsuit: "springsuits", lat: -28.17, lng: 153.53, tips: ["Snapper Rocks hat weltklasse Pointbreaks", "Stinger Season beachten (Okt–Mai)", "Surf-Kultur ist groß – respektiere die Locals"] },
  { id: "morocco", name: "Taghazout, Marokko", emoji: "🐪", difficulty: "intermediate", waveType: "Rechte Pointbreaks", breakType: "point", hazards: ["locals", "reef"], season: "Okt–Mär", water: "18°C", wetsuit: "3/2mm", lat: 30.54, lng: -9.71, tips: ["Anchor Point ist ein legendärer Rechts-Pointbreak", "3/2mm Neopren empfohlen im Winter", "Günstige Surf-Camps mit Marokkanischem Essen"] },
  { id: "france", name: "Hossegor, Frankreich", emoji: "🥐", difficulty: "intermediate", waveType: "Kraftvolle Beachbreaks", breakType: "beach", hazards: ["rip", "current"], season: "Sep–Nov", water: "19°C", wetsuit: "4/3mm", lat: 43.66, lng: -1.44, tips: ["La Gravière ist einer der besten Beachbreaks Europas", "Wellen können sehr kraftvoll werden – kenne dein Limit", "Herbst hat die besten Swells bei noch warmem Wasser"] },
  { id: "srilanka", name: "Sri Lanka", emoji: "🐘", difficulty: "beginner", waveType: "Sanfte Pointbreaks", breakType: "point", hazards: [], season: "Nov–Apr", water: "28°C", wetsuit: "none", lat: 5.97, lng: 80.43, tips: ["Weligama Bay ist perfekt für absolute Anfänger", "Arugam Bay für Fortgeschrittene – langer Rechts-Pointbreak", "Günstigstes Surf-Reiseziel mit leckerem Essen"] },
  { id: "itacare", name: "Itacaré, Brasilien", emoji: "🇧🇷", difficulty: "intermediate", waveType: "Tropische Beachbreaks", breakType: "beach", hazards: ["rip", "current"], season: "Nov–Mär", water: "27°C", wetsuit: "none", lat: -14.28, lng: -38.99, tips: ["Praia da Tiririca ist der Hauptspot – konsistent und spaßig", "Regenwald trifft Meer – einzigartige Atmosphäre", "Achte auf Strömungen bei Ebbe an den Flussmündungen"] },
  { id: "floripa", name: "Florianópolis, Brasilien", emoji: "🇧🇷", difficulty: "beginner", waveType: "Konstante Beachbreaks", breakType: "beach", hazards: ["rip"], season: "Apr–Sep", water: "21°C", wetsuit: "springsuits", lat: -27.60, lng: -48.45, tips: ["Praia Mole und Joaquina sind die beliebtesten Surf-Strände", "Herbst/Winter bringt die besten Süd-Swells", "Lebendige Surf-Szene mit vielen Surfschulen"] },
  { id: "saquarema", name: "Saquarema, Brasilien", emoji: "🇧🇷", difficulty: "advanced", waveType: "Kraftvoller Beachbreak", breakType: "beach", hazards: ["rip", "current"], season: "Mai–Sep", water: "22°C", wetsuit: "springsuits", lat: -22.92, lng: -42.49, tips: ["'Maracanã des Surfens' – Austragungsort von WSL-Events", "Praia de Itaúna hat kraftvolle, hohle Wellen", "Nur für erfahrene Surfer bei großem Swell"] },
  { id: "canary", name: "Fuerteventura, Kanaren", emoji: "🏝", difficulty: "beginner", waveType: "Vielseitige Riffwellen", breakType: "reef", hazards: ["reef"], season: "Okt–Mär", water: "20°C", wetsuit: "3/2mm", lat: 28.36, lng: -14.05, tips: ["Nördliche Küste für Erfahrene, Süden für Anfänger", "Ganzjährig surfbar – Europas Hawaii", "Booties empfohlen wegen vulkanischem Riff"] },
  { id: "nicaragua", name: "San Juan del Sur, Nicaragua", emoji: "🌋", difficulty: "beginner", waveType: "Warme Beachbreaks", breakType: "beach", hazards: ["rip"], season: "Mär–Nov", water: "28°C", wetsuit: "none", lat: 11.25, lng: -85.87, tips: ["Playa Maderas ist der perfekte Lern-Spot", "Offshore-Wind am Morgen fast garantiert", "Noch wenig überlaufen – günstiges Surf-Paradies"] },
  { id: "maldives", name: "Malediven", emoji: "🐠", difficulty: "intermediate", waveType: "Perfekte Riffwellen", breakType: "reef", hazards: ["reef", "current"], season: "Mär–Okt", water: "29°C", wetsuit: "none", lat: 3.20, lng: 73.22, tips: ["Surf-Charter-Boote sind der beste Weg zu den Wellen", "Kristallklares Wasser – du siehst den Riffboden", "Reef Booties sind absolute Pflicht"] },
  { id: "mentawai", name: "Mentawai, Indonesien", emoji: "🌴", difficulty: "advanced", waveType: "Weltklasse Riffwellen", breakType: "reef", hazards: ["reef", "current"], season: "Apr–Okt", water: "28°C", wetsuit: "none", lat: -2.08, lng: 99.53, tips: ["Lance's Right und Macaronis sind Weltklasse-Wellen", "Nur per Boot erreichbar – plane Surf-Charter", "Scharfes Riff – Erste-Hilfe-Kit ist Pflicht"] },
  { id: "jeffreys", name: "Jeffreys Bay, Südafrika", emoji: "🦈", difficulty: "advanced", waveType: "Legendärer Pointbreak", breakType: "point", hazards: ["locals", "current"], season: "Jun–Sep", water: "17°C", wetsuit: "4/3mm", lat: -34.05, lng: 24.93, tips: ["Supertubes ist eine der besten Rechtswellen der Welt", "4/3mm Neopren nötig – das Wasser ist kalt", "Haie sind real – surfe in Gruppen und meide Flussmündungen"] },
  { id: "ericeira", name: "Ericeira, Portugal", emoji: "🇵🇹", difficulty: "intermediate", waveType: "World Surf Reserve", breakType: "mixed", hazards: ["reef", "locals", "current"], season: "Sep–Apr", water: "17°C", wetsuit: "4/3mm", lat: 38.96, lng: -9.42, tips: ["Ribeira d'Ilhas ist der bekannteste Spot", "World Surf Reserve – geschützte Küste mit perfekten Wellen", "Nur 45 Min von Lissabon – perfekt für Surf & City"] },
  { id: "siargao", name: "Siargao, Philippinen", emoji: "🏄", difficulty: "intermediate", waveType: "Cloud 9 Riffwellen", breakType: "reef", hazards: ["reef", "current"], season: "Aug–Nov", water: "28°C", wetsuit: "none", lat: 9.85, lng: 126.16, tips: ["Cloud 9 ist weltberühmt – kräftige, hohle Rechtswelle", "Für Anfänger: Jacking Horse oder Stimpy's", "Tropenparadies – Palmen, türkises Wasser, entspannte Vibes"] },
];

// Sprint 11: Local Points of Interest per spot
export const LOCAL_POIS = {
  bali: [
    { name: "Rip Curl School of Surf", type: "school", lat: -8.722, lng: 115.169, desc: "Offizielle Rip-Curl-Surfschule am Kuta Beach" },
    { name: "Drifter Surf Shop", type: "shop", lat: -8.651, lng: 115.138, desc: "Premium Surfshop in Canggu mit Board-Rental" },
    { name: "Kuta Beach", type: "spot", lat: -8.718, lng: 115.168, desc: "Anfänger-Spot mit sanften Wellen" },
    { name: "Padang Padang", type: "spot", lat: -8.815, lng: 115.098, desc: "Berühmter Riff-Spot, nur für Erfahrene" },
  ],
  portugal: [
    { name: "Surf Guide Algarve", type: "school", lat: 37.29, lng: -8.86, desc: "Geführte Surf-Sessions an den besten Spots" },
    { name: "Amado Surfcamp", type: "school", lat: 37.17, lng: -8.90, desc: "Surfcamp direkt am Praia do Amado" },
    { name: "Aljezur Surf Shop", type: "shop", lat: 37.32, lng: -8.80, desc: "Lokaler Shop mit Boards, Wetsuits & Repair" },
    { name: "Praia da Arrifana", type: "spot", lat: 37.29, lng: -8.87, desc: "Geschützter Beachbreak, ideal für Anfänger" },
    { name: "Praia do Amado", type: "spot", lat: 37.17, lng: -8.90, desc: "Konstanter Beachbreak, viele Surfschulen" },
  ],
  hawaii: [
    { name: "Hans Hedemann Surf School", type: "school", lat: 21.276, lng: -157.827, desc: "Legendäre Surfschule in Waikiki seit 1994" },
    { name: "Hawaiian South Shore", type: "shop", lat: 21.282, lng: -157.834, desc: "Lokaler Surfshop in Honolulu" },
    { name: "Waikiki Beach", type: "spot", lat: 21.276, lng: -157.827, desc: "Sanfte Longboard-Wellen, perfekt für Anfänger" },
    { name: "Pipeline", type: "spot", lat: 21.665, lng: -158.054, desc: "Weltberühmte Barrel – nur für Profis!" },
  ],
  costarica: [
    { name: "Witch's Rock Surf Camp", type: "school", lat: 10.30, lng: -85.84, desc: "All-inclusive Surfcamp in Tamarindo" },
    { name: "Surf Shop Tamarindo", type: "shop", lat: 10.30, lng: -85.84, desc: "Board-Rental und Zubehör" },
    { name: "Playa Tamarindo", type: "spot", lat: 10.30, lng: -85.84, desc: "Konsistenter Beachbreak für alle Levels" },
  ],
  france: [
    { name: "Rip Curl Surf School Hossegor", type: "school", lat: 43.66, lng: -1.44, desc: "Top-Surfschule an der französischen Atlantikküste" },
    { name: "Boardriders Hossegor", type: "shop", lat: 43.66, lng: -1.44, desc: "Quiksilver/Roxy Flagship mit allem Equipment" },
    { name: "La Gravière", type: "spot", lat: 43.64, lng: -1.44, desc: "Einer der besten Beachbreaks Europas" },
  ],
  morocco: [
    { name: "Surf Berbere", type: "school", lat: 30.54, lng: -9.71, desc: "Bekanntes Surfcamp in Taghazout" },
    { name: "Dynamic Loisirs", type: "shop", lat: 30.54, lng: -9.71, desc: "Lokaler Shop mit Board-Rental" },
    { name: "Anchor Point", type: "spot", lat: 30.55, lng: -9.72, desc: "Legendärer Rechts-Pointbreak" },
  ],
  australia: [
    { name: "Get Wet Surf School", type: "school", lat: -28.17, lng: 153.53, desc: "Surfschule am Surfers Paradise Beach" },
    { name: "Snapper Rocks", type: "spot", lat: -28.17, lng: 153.55, desc: "Weltklasse Pointbreak, Superbank" },
    { name: "Kirra Surf", type: "shop", lat: -28.16, lng: 153.51, desc: "Lokaler Surfshop in Coolangatta" },
  ],
  srilanka: [
    { name: "Surf School Sri Lanka", type: "school", lat: 5.97, lng: 80.43, desc: "Surfunterricht in Weligama Bay" },
    { name: "Weligama Bay", type: "spot", lat: 5.97, lng: 80.43, desc: "Sanfte Wellen, perfekt für Anfänger" },
    { name: "Arugam Bay", type: "spot", lat: 6.84, lng: 81.83, desc: "Langer Rechts-Pointbreak" },
  ],
  canary: [
    { name: "Flag Beach Fuerteventura", type: "school", lat: 28.73, lng: -13.86, desc: "Surfschule am Flag Beach, Corralejo" },
    { name: "Quemao Surf Shop", type: "shop", lat: 28.74, lng: -13.86, desc: "Surfshop mit Board-Rental in Corralejo" },
  ],
  ericeira: [
    { name: "Ericeira Surf School", type: "school", lat: 38.96, lng: -9.42, desc: "Im Herzen der World Surf Reserve" },
    { name: "Ribeira d'Ilhas", type: "spot", lat: 38.98, lng: -9.42, desc: "Bekanntester Spot in Ericeira" },
    { name: "58 Surf Shop", type: "shop", lat: 38.96, lng: -9.42, desc: "Lokaler Shop in der Altstadt" },
  ],
  itacare: [
    { name: "Easy Drop Surf Camp", type: "school", lat: -14.28, lng: -38.99, desc: "Surfschule mit Camps direkt am Regenwald" },
    { name: "Itacaré Surf School", type: "school", lat: -14.28, lng: -39.00, desc: "Lokale Surfschule mit erfahrenen Instructors" },
    { name: "Praia da Tiririca", type: "spot", lat: -14.28, lng: -38.99, desc: "Hauptspot – konsistenter Beachbreak, oft hohl" },
    { name: "Praia da Ribeira", type: "spot", lat: -14.27, lng: -39.01, desc: "Ruhigerer Spot im Ort, gut für Anfänger" },
    { name: "Itacaré Surf Shop", type: "shop", lat: -14.28, lng: -38.99, desc: "Board-Rental und Wax im Zentrum" },
  ],
  floripa: [
    { name: "Floripa Surf School", type: "school", lat: -27.60, lng: -48.45, desc: "Surfunterricht an Praia Mole und Joaquina" },
    { name: "East Coast Surf School", type: "school", lat: -27.63, lng: -48.45, desc: "Surfcamp am Joaquina Beach" },
    { name: "Praia Mole", type: "spot", lat: -27.60, lng: -48.44, desc: "Beliebtester Surf-Strand, lebendige Szene" },
    { name: "Joaquina", type: "spot", lat: -27.63, lng: -48.45, desc: "Konsistenter Beachbreak, WSL-Events" },
    { name: "Mormaii Surf Shop", type: "shop", lat: -27.60, lng: -48.47, desc: "Brasiliens bekannteste Surf-Marke, Flagship Store" },
  ],
  saquarema: [
    { name: "Saquarema Surf School", type: "school", lat: -22.93, lng: -42.49, desc: "Surfunterricht am berühmten Itaúna Beach" },
    { name: "Praia de Itaúna", type: "spot", lat: -22.93, lng: -42.49, desc: "'Maracanã des Surfens' – WSL-Championship-Spot" },
    { name: "Barrinha", type: "spot", lat: -22.92, lng: -42.51, desc: "Geschützter Spot, besser für Intermediates" },
    { name: "Saquá Surf Shop", type: "shop", lat: -22.92, lng: -42.49, desc: "Lokaler Shop mit Boards und Repairs" },
  ],
  nicaragua: [
    { name: "Surf Ranch Nicaragua", type: "school", lat: 11.25, lng: -85.87, desc: "Surfcamp mit Pool und Unterricht" },
    { name: "Arena Caliente Surf School", type: "school", lat: 11.23, lng: -85.88, desc: "Lokale Surfschule in San Juan del Sur" },
    { name: "Playa Maderas", type: "spot", lat: 11.22, lng: -85.92, desc: "Perfekter Lern-Spot, Offshore-Wind am Morgen" },
    { name: "Playa Remanso", type: "spot", lat: 11.21, lng: -85.90, desc: "Ruhiger Beachbreak südlich von San Juan" },
    { name: "SJDS Surf Shop", type: "shop", lat: 11.25, lng: -85.87, desc: "Board-Rental und Zubehör in der Stadt" },
  ],
  maldives: [
    { name: "Tropicsurf Maldives", type: "school", lat: 3.20, lng: 73.22, desc: "Luxus-Surf-Coaching auf den Atollen" },
    { name: "Pasta Point", type: "spot", lat: 4.26, lng: 73.52, desc: "Legendäre Linkswelle – nur per Boot erreichbar" },
    { name: "Sultans", type: "spot", lat: 4.19, lng: 73.52, desc: "Langer Rechts-Pointbreak im Nord-Malé-Atoll" },
    { name: "Cinnamon Dhonveli", type: "spot", lat: 4.30, lng: 73.48, desc: "Resort mit eigenem Surf-Break direkt vor der Tür" },
  ],
  mentawai: [
    { name: "Mentawai Surf Charters", type: "school", lat: -2.08, lng: 99.53, desc: "Boat-Trips zu den besten Breaks" },
    { name: "Lance's Right (HT's)", type: "spot", lat: -2.08, lng: 99.53, desc: "Weltklasse Rechts-Barrel über Riff" },
    { name: "Macaronis", type: "spot", lat: -2.15, lng: 99.42, desc: "Perfekte Linkswelle – einer der besten Spots der Welt" },
    { name: "Kandui Resort", type: "spot", lat: -2.10, lng: 99.50, desc: "Resort mit Zugang zu mehreren Weltklasse-Wellen" },
  ],
  jeffreys: [
    { name: "J-Bay Surf School", type: "school", lat: -34.05, lng: 24.93, desc: "Surfunterricht an der legendären J-Bay" },
    { name: "Supertubes", type: "spot", lat: -34.05, lng: 24.94, desc: "Eine der besten Rechtswellen der Welt" },
    { name: "Kitchen Windows", type: "spot", lat: -34.04, lng: 24.92, desc: "Langer Point für Longboarder und Intermediates" },
    { name: "Country Feeling Surf Shop", type: "shop", lat: -34.05, lng: 24.93, desc: "Lokaler Surfshop mit Board-Rental" },
  ],
  siargao: [
    { name: "Kermit Surf School", type: "school", lat: 9.85, lng: 126.16, desc: "Beliebte Surfschule in General Luna" },
    { name: "Harana Surf Resort", type: "school", lat: 9.85, lng: 126.16, desc: "Surf-Resort mit täglichem Unterricht" },
    { name: "Cloud 9", type: "spot", lat: 9.85, lng: 126.17, desc: "Weltberühmte hohle Rechtswelle über Riff" },
    { name: "Jacking Horse", type: "spot", lat: 9.84, lng: 126.16, desc: "Sanfterer Break, gut für Intermediates" },
    { name: "Stimpy's", type: "spot", lat: 9.84, lng: 126.15, desc: "Anfängerfreundlicher Spot nahe General Luna" },
    { name: "Siargao Surf Shop", type: "shop", lat: 9.85, lng: 126.16, desc: "Board-Rental und Repairs in General Luna" },
  ],
};

// Trip packing checklist
export const PACKING_LIST = {
  essential: [
    { id: "board", label: "Surfboard / Board-Rental buchen", emoji: "🏄" },
    { id: "wetsuit", label: "Neoprenanzug", emoji: "🧤", condition: (spot) => spot?.wetsuit !== "none" },
    { id: "leash", label: "Leash", emoji: "🔗" },
    { id: "wax", label: "Wax (passend zur Temperatur)", emoji: "🕯️" },
    { id: "sunscreen", label: "Reef-safe Sonnencreme", emoji: "☀️" },
    { id: "water", label: "Trinkwasser", emoji: "💧" },
  ],
  recommended: [
    { id: "booties", label: "Booties", emoji: "👟", condition: (spot) => spot?.breakType === "reef" },
    { id: "rashguard", label: "Rashguard / Lycra", emoji: "👕" },
    { id: "towel", label: "Handtuch / Poncho", emoji: "🏖️" },
    { id: "firstaid", label: "Erste-Hilfe-Kit", emoji: "🩹" },
    { id: "camera", label: "GoPro / Wasserdichte Kamera", emoji: "📷" },
    { id: "earplugs", label: "Surf-Ohrstöpsel", emoji: "👂" },
    { id: "boardbag", label: "Boardbag (Transport)", emoji: "💼" },
    { id: "repair", label: "Solarez / Ding-Repair", emoji: "🔧" },
  ],
};

export const GOALS = [
  { id: "erste-welle", name: "Erste Welle stehen", emoji: "🌊", level: "beginner" },
  { id: "grune-wellen", name: "Grüne Wellen surfen", emoji: "🟢", level: "intermediate" },
  { id: "manover", name: "Erste Manöver lernen", emoji: "🔄", level: "advanced" },
  { id: "surf-trip", name: "Surf-Trip vorbereiten", emoji: "✈️", level: "beginner" },
  { id: "fitness", name: "Surf-Fitness aufbauen", emoji: "💪", level: "beginner" },
  { id: "comeback", name: "Comeback nach Pause", emoji: "🔁", level: "intermediate" },
];

export const BOARD_TYPES = [
  { id: "none", label: "Noch keins", emoji: "❓", desc: "Ich leihe vor Ort" },
  { id: "softboard", label: "Softboard", emoji: "🟡", desc: "Schaumstoff, 7-9ft" },
  { id: "longboard", label: "Longboard", emoji: "🟠", desc: "8-10ft, klassisch" },
  { id: "funboard", label: "Funboard/Mid", emoji: "🟢", desc: "6'6-7'6ft" },
  { id: "shortboard", label: "Shortboard", emoji: "🔴", desc: "5'6-6'4ft" },
  { id: "fish", label: "Fish/Retro", emoji: "🐟", desc: "Breit, kurz, fun" },
];

export const EXPERIENCE_LEVELS = [
  { id: "zero", label: "Noch nie gesurft", emoji: "🌱" },
  { id: "few", label: "1-5 Sessions", emoji: "🌿" },
  { id: "some", label: "6-20 Sessions", emoji: "🌳" },
  { id: "regular", label: "20+ Sessions", emoji: "🏔" },
];

export const CONTENT_POOL = {
  equipment: [
    { title: "Dein erstes Surfboard", icon: "🏄", duration: "10 Min", level: "beginner", phase: "intro", content: "Das richtige Board macht den Unterschied zwischen Spaß und Frust. Anfänger brauchen Volumen und Stabilität.", tips: ["Softboards sind ideal zum Start – sicher und verzeihend", "Mindestens 7ft für Anfänger (8-9ft ideal)", "Mehr Volumen = leichter paddeln = mehr Wellen fangen", "Shortboards unter 6'6 sind für Anfänger nicht geeignet"], keyTerms: ["Volume", "Softboard", "Longboard", "Rails", "Stringer"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/types-of-surfboards/", articleTitle: "📄 Surfboard-Typen – Barefoot Surf" },
    { title: "Wetsuit & Zubehör", icon: "🧤", duration: "8 Min", level: "beginner", phase: "intro", content: "Je nach Wassertemperatur brauchst du unterschiedliche Neoprenanzüge. Dazu kommen Leash, Wax und optional Booties.", tips: ["Ab 22°C: Boardshorts/Bikini reichen", "18-22°C: Springsuits oder 3/2mm Fullsuit", "Unter 18°C: 4/3mm oder dicker", "Leash immer am hinteren Fuß befestigen", "Wax passend zur Wassertemperatur wählen"], keyTerms: ["Neopren", "Leash", "Wax", "Booties", "3/2mm", "4/3mm"] },
    { title: "Board-Pflege & Transport", icon: "🔧", duration: "6 Min", level: "beginner", phase: "intro", content: "Ein gut gepflegtes Board hält Jahre. Dings reparieren, richtig lagern und transportieren.", tips: ["Nie in der prallen Sonne liegen lassen", "Kleine Dings sofort mit Solarez reparieren", "Board immer mit Finnen nach oben lagern", "Boardbag für Transport und UV-Schutz"] },
    { title: "Spot-Check: Worauf achten?", icon: "👀", duration: "10 Min", level: "beginner", phase: "intro", content: "Bevor du ins Wasser gehst: 15 Minuten beobachten. Wo brechen die Wellen? Wo ist der Channel? Wie viele Leute sind im Wasser?", tips: ["Beobachte wo erfahrene Surfer rauspaddeln", "Suche den Channel – dort ist weniger Strömung", "Achte auf Rip Currents (glattes Wasser zwischen Wellen)", "Zähle die Leute im Wasser – zu voll = zu gefährlich"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/", articleTitle: "📄 Beginner Guide – Barefoot Surf" },
  ],
  warmup: [
    { title: "Schulter-Mobilität", icon: "🔄", duration: "5 Min", level: "beginner", phase: "any", repeatable: true, content: "Öffne Schultern und Brustwirbelsäule für bessere Paddel-Power.", steps: ["Armkreisen vorwärts: 15x", "Armkreisen rückwärts: 15x", "Cross-Body Shoulder Stretch: 20 Sek/Seite", "Arm-Schwünge (vor/zurück): 15x", "Hände hinter dem Rücken verschränken, Brust raus – 20 Sek"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/5-of-the-best-mobility-exercises-to-improve-your-surf-game-reduce-injuries/", articleTitle: "📄 Mobility Exercises – Barefoot Surf" },
    { title: "Hüft-Opener & Beine", icon: "🦵", duration: "6 Min", level: "beginner", phase: "any", repeatable: true, content: "Flexible Hüften sind essenziell für den Pop-Up und den Surf-Stance.", steps: ["Tiefe Ausfallschritte: 10x/Seite", "Hüftkreise: 10x jede Richtung", "Knöcheldrehungen: 15x/Fuß", "Kniehebelauf: 20 Sek", "Beinschwünge seitlich: 10x/Seite"] },
    { title: "Core Activation", icon: "🎯", duration: "5 Min", level: "beginner", phase: "any", repeatable: true, content: "Dein Core ist das Kontrollzentrum auf dem Board.", steps: ["Plank: 30 Sek", "Side Plank: 20 Sek/Seite", "Dead Bug: 10x/Seite", "Bird Dog: 8x/Seite", "Hollow Body Hold: 20 Sek"] },
    { title: "Pop-Up Drill Warm-Up", icon: "⚡", duration: "5 Min", level: "beginner", phase: "any", repeatable: true, content: "Aktiviere dein Pop-Up Muskelgedächtnis.", steps: ["5x langsam und kontrolliert aufstehen", "5x mit normalem Tempo", "5x so explosiv wie möglich", "Auf korrekte Fußposition achten", "Speed-Round: 10 Pop-Ups so schnell wie möglich"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/what-take-off-technique-is-right-for-you/", articleTitle: "📄 Take-Off Technik – Barefoot Surf" },
    { title: "Wirbelsäulen-Rotation", icon: "🌀", duration: "5 Min", level: "beginner", phase: "any", repeatable: true, content: "Rotationsfähigkeit für Turns und Manöver.", steps: ["Stehende Drehung: 10x/Seite", "Open Books (Seitlage): 8x/Seite", "Thread the Needle: 8x/Seite", "Cat-Cow: 10x langsam", "Seated Twist: 20 Sek/Seite"] },
    { title: "Atem & Apnoe-Training", icon: "🌬️", duration: "5 Min", level: "intermediate", phase: "any", repeatable: true, content: "Kontrolliertes Atmen reduziert Panik bei Wipeouts.", steps: ["Box Breathing: 4-4-4-4 Sek (5 Runden)", "Progressive Apnoe: 15/20/25/30 Sek halten", "Wim-Hof-Style: 20x Poweratmung + Halten", "Recovery Breathing: 6 Sek ein, 8 Sek aus", "Entspannungsatmung: 10 tiefe Atemzüge"] },
    { title: "Beach-Yoga Flow", icon: "🧘", duration: "8 Min", level: "beginner", phase: "any", repeatable: true, content: "Ein kurzer Yoga-Flow kombiniert alle Surf-relevanten Bewegungen.", steps: ["Sonnengruß A: 3x", "Krieger I + II: je 20 Sek/Seite", "Herabschauender Hund → Cobra: 5x Flow", "Taubenhaltung: 30 Sek/Seite", "Kind-Pose: 30 Sek Entspannung"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/5-of-the-best-mobility-exercises-to-improve-your-surf-game-reduce-injuries/", articleTitle: "📄 Surf Mobility – Barefoot Surf" },
    { title: "Sprungkraft & Explosivität", icon: "💥", duration: "5 Min", level: "intermediate", phase: "any", repeatable: true, content: "Explosive Kraft für schnelle Pop-Ups.", steps: ["Jump Squats: 10x", "Burpees (surf-style): 8x", "Lateral Bounds: 8x/Seite", "Tuck Jumps: 6x", "Broad Jumps: 5x"] },
    { title: "Balance-Training", icon: "⚖️", duration: "7 Min", level: "beginner", phase: "any", repeatable: true, content: "Gleichgewicht ist der Schlüssel zum Surfen.", steps: ["Einbeinstand: 30 Sek pro Bein", "Einbeinstand: 20 Sek (Augen zu!)", "Surf-Stance auf weichem Sand: 30 Sek", "Einbein-Squats: 8x pro Seite", "Zehenstand gehen: 20 Schritte"] },
    { title: "Paddel-Power Warm-Up", icon: "💪", duration: "6 Min", level: "intermediate", phase: "any", repeatable: true, content: "Aktiviere Schultern, Lat und Trizeps.", steps: ["Resistance Band Pull-Aparts: 15x", "Prone Y-T-W Raises: 8x je Form", "Swimming auf dem Bauch: 30 Sek", "Push-Up Plus: 10x", "Arm-Haulers: 20x"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-paddle-on-a-surfboard/", articleTitle: "📄 Paddeltechnik – Barefoot Surf" },
  ],
  theory: [
    { title: "Ozean lesen lernen", icon: "🌊", duration: "15 Min", level: "beginner", phase: "early", content: "Wellen entstehen durch Wind über der Wasseroberfläche. Je länger die Strecke (Fetch) und je stärker der Wind, desto größer die Wellen.", tips: ["Beobachte das Meer 15 Min bevor du reingehst", "Wellen kommen in Sets von 3-7 Wellen", "Ruhige Phasen zwischen Sets nutzen", "Schaumwellen (Whitewash) sind perfekt für Anfänger"], keyTerms: ["Set", "Fetch", "Whitewash", "Lineup", "Impact Zone"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-read-waves/", articleTitle: "📄 Wellen lesen – Barefoot Surf" },
    { title: "Surf-Etikette & Vorfahrt", icon: "🤝", duration: "10 Min", level: "beginner", phase: "early", content: "Im Wasser gibt es ungeschriebene Gesetze. Wer dem Peak am nächsten und zuerst auf der Welle steht, hat Vorfahrt.", tips: ["Nie jemandem die Welle droppen", "Beim Rauspaddeln hinter der Brechzone bleiben", "Anfänger: nicht ins Lineup der Locals paddeln", "Lächeln öffnet jedes Lineup"], keyTerms: ["Drop-In", "Snaking", "Lineup", "Peak", "Priority"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/surf-ethics-10-rules-beginner-needs-know/", articleTitle: "📄 10 Surf-Regeln – Barefoot Surf" },
    { title: "Sicherheit im Wasser", icon: "🛟", duration: "12 Min", level: "beginner", phase: "early", content: "Ozean-Sicherheit ist kein optionales Extra – es kann dein Leben retten.", tips: ["Nie alleine surfen gehen", "Kenne dein Limit", "Wenn du in einer Strömung bist: quer dazu schwimmen", "Board nie zwischen dich und die Welle", "Immer wissen wo der Strand ist"], keyTerms: ["Rip Current", "Wipeout", "Leash", "Channels"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/top-10-tips-to-stay-safe-in-the-water/", articleTitle: "📄 Safety Tips – Barefoot Surf" },
    { title: "Strömungen & Channels", icon: "💨", duration: "10 Min", level: "beginner", phase: "early", content: "Rip Currents sind der gefährlichste Aspekt beim Surfen.", tips: ["Rip Currents erkennen: glattes, fließendes Wasser", "NIE gegen die Strömung schwimmen", "Quer zur Strömung paddeln", "Channels nutzen um rauszupaddeln (wo keine Wellen brechen)", "Im Zweifel: treiben lassen und Hilfe rufen"], keyTerms: ["Rip Current", "Channel", "Longshore Current", "Undertow"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/what-is-a-rip-current-and-how-to-use-it-to-your-advantage/", articleTitle: "📄 Rip Currents – Barefoot Surf" },
    { title: "Wellentypen verstehen", icon: "📊", duration: "12 Min", level: "beginner", phase: "early", content: "Beachbreaks, Pointbreaks und Reefbreaks brechen alle unterschiedlich.", tips: ["Beachbreaks: wechselnde Peaks über Sandbänken", "Pointbreaks: lange Wellen entlang einer Landspitze", "Reefbreaks: brechen über festem Riff – präzise, aber gefährlich", "Close-Outs: Wellen die auf einmal brechen – nicht surfbar"], keyTerms: ["Beachbreak", "Pointbreak", "Reefbreak", "Close-Out", "A-Frame"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/types-of-waves/", articleTitle: "📄 Wellentypen – Barefoot Surf" },
    { title: "Gezeiten & ihr Einfluss", icon: "🌙", duration: "10 Min", level: "beginner", phase: "mid", content: "Ebbe und Flut verändern die Wellen komplett.", tips: ["Tide Charts checken BEVOR du zum Strand gehst", "Ebbe: flacheres Wasser, hohle Wellen", "Flut: tieferes Wasser, gemäßigtere Wellen", "Mid-Tide ist oft der beste Kompromiss", "Jeder Spot hat seine beste Tide – Locals fragen!"], keyTerms: ["Ebbe", "Flut", "Mid-Tide", "Tide Chart", "Spring Tide"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-understand-tides-for-surfing/", articleTitle: "📄 Gezeiten – Barefoot Surf" },
    { title: "Wind & Swell verstehen", icon: "💨", duration: "12 Min", level: "intermediate", phase: "mid", content: "Onshore-Wind zerstört Wellen, Offshore-Wind macht sie perfekt.", tips: ["Offshore: Wind vom Land → saubere Wellen", "Onshore: Wind vom Meer → choppy", "Sideshore: kann trotzdem gut sein", "Swell-Richtung muss zum Spot passen", "Morgenstunden = oft weniger Wind"], keyTerms: ["Offshore", "Onshore", "Swell Period", "Ground Swell", "Wind Swell"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-read-a-surf-forecast/", articleTitle: "📄 Surf Forecast – Barefoot Surf" },
    { title: "Wave Positioning", icon: "📍", duration: "12 Min", level: "intermediate", phase: "mid", content: "Position ist alles – stehe am richtigen Ort zur richtigen Zeit.", tips: ["Landmarks setzen (Bäume, Häuser am Strand)", "Hinter dem Peak sitzen, nicht im Impact Zone", "Wellen kommen in Sets – zwischen Sets repositionieren", "Beobachte die Peaks: Wellen brechen IMMER an bestimmten Stellen", "3-Wellen-Regel: Erste beobachten, zweite paddeln, dritte fangen"], keyTerms: ["Peak", "Shoulder", "Impact Zone", "Lineup", "Landmarks"] },
    { title: "Surf-Ernährung & Hydration", icon: "🍌", duration: "8 Min", level: "beginner", phase: "mid", content: "Surfen verbrennt bis zu 500 kcal/Stunde.", tips: ["2h vor dem Surfen essen (Banane, Haferflocken)", "Wasser: mindestens 500ml vorher", "Salzwasser dehydriert – danach extra trinken", "Finger weg von schwerem Essen vorher"], keyTerms: ["Carb Loading", "Hydration", "Magnesium", "Elektrolyte"] },
    { title: "Surf-Fotografie Basics", icon: "📸", duration: "10 Min", level: "beginner", phase: "late", content: "Deine Sessions festhalten – GoPro-Tipps und Wasser-Fotografie.", tips: ["GoPro auf dem Board: Klebehalterung auf der Nose", "Burst Mode für Action-Shots", "Sonnenposition beachten (Gegenlicht = schlecht)", "Wasserdichte Tasche für Handy am Strand"], keyTerms: ["GoPro", "Burst Mode", "POV", "Water Housing"] },
    { title: "Dein Board kennen", icon: "🔍", duration: "8 Min", level: "beginner", phase: "early", content: "Nose, Tail, Rails, Finnen – jedes Teil hat eine Funktion.", tips: ["Nose: spitz = schnell, rund = stabil", "Tail: beeinflusst Wendigkeit (Round, Squash, Pin)", "Rails: dick = stabiler, dünn = schneller", "Finnen: 3er Setup (Thruster) am häufigsten"], keyTerms: ["Nose", "Tail", "Rails", "Stringer", "Thruster", "Rocker"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/surfboard-anatomy/", articleTitle: "📄 Board Anatomy – Barefoot Surf" },
    { title: "Surf-Fitness Grundlagen", icon: "🏋️", duration: "10 Min", level: "beginner", phase: "mid", content: "Die drei Säulen der Surf-Fitness: Paddel-Ausdauer, Core-Stabilität und Flexibilität.", tips: ["Schwimmen ist das beste Surf-Training", "Push-Ups für Paddel-Power", "Yoga für Flexibilität und Balance", "Burpees simulieren den Pop-Up"], keyTerms: ["Paddel-Ausdauer", "Pop-Up Power", "Core", "Flexibility"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/best-workouts-to-improve-surfing/", articleTitle: "📄 Surf Workouts – Barefoot Surf" },
    { title: "Surf-Geschichte & Kultur", icon: "🏛️", duration: "12 Min", level: "beginner", phase: "late", content: "Von polynesischen Königen zu einer Milliarden-Industrie.", tips: ["Duke Kahanamoku brachte Surfen in die Welt", "Die Shortboard-Revolution der 60er veränderte alles", "Surfen ist seit Tokyo 2020 olympisch", "Jeder Spot hat seine eigene Kultur – respektiere sie"], keyTerms: ["Duke Kahanamoku", "Pipeline", "WSL", "Soul Surfing"] },
    { title: "Surfboard Volume & Sizing", icon: "📏", duration: "10 Min", level: "intermediate", phase: "mid", content: "Volume in Litern bestimmt wie viel das Board dich trägt.", tips: ["Anfänger: 100% Körpergewicht in Litern", "Intermediate: 60-80%", "Advanced: 35-50%", "Volume-Rechner von Channel Islands nutzen"], articleUrl: "https://tutorials.barefootsurftravel.com/articles/surfboard-volume/", articleTitle: "📄 Surfboard Volume – Barefoot Surf" },
    { title: "Surf-Apps & Forecast lesen", icon: "📱", duration: "10 Min", level: "intermediate", phase: "mid", content: "Surfline, Windguru, Magic Seaweed – lerne die besten Tools.", tips: ["Surfline zeigt Cam-Livestreams", "Windguru ist kostenlos und detailliert", "Wellenhöhe in Fuß ≠ Gesichtshöhe", "Swell-Richtung muss zum Spot passen"] },
  ],
  practice: [
    { title: "Pop-Up an Land üben", icon: "🤸", duration: "30 Min", level: "beginner", phase: "early", repeatable: true, content: "Der Pop-Up ist DIE fundamentale Bewegung. Übe ihn 50x am Tag.", steps: ["Flach auf den Bauch, Hände neben der Brust", "Explosiv hochdrücken – NICHT auf die Knie!", "Hinterer Fuß zuerst aufs Board (quer)", "Vorderfuß zwischen die Hände", "Knie gebeugt, Blick nach vorne", "50x wiederholen!"], proTip: "Filme dich selbst! Die meisten denken sie machen es richtig, bis sie das Video sehen.", videoUrl: "https://www.youtube.com/embed/dBmHlpliXfk", articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-do-a-take-off", articleTitle: "📄 Pop-Up Technik – Barefoot Surf" },
    { title: "Paddeltechnik perfektionieren", icon: "💧", duration: "45 Min", level: "beginner", phase: "early", repeatable: true, content: "80% deiner Zeit verbringst du mit Paddeln.", steps: ["Position: Nase ~5cm über Wasser", "Arme tief eintauchen", "Fingerspitzen zusammen", "Kurze, kraftvolle Züge", "Blick nach vorne", "Beine zusammen und still!"], proTip: "20 Min nur paddeln ohne Wellen – baut Ausdauer.", videoUrl: "https://www.youtube.com/embed/XCaiQYVEut4", articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-paddle-on-a-surfboard/", articleTitle: "📄 Paddeltechnik – Barefoot Surf" },
    { title: "Whitewash-Wellen reiten", icon: "🫧", duration: "60 Min", level: "beginner", phase: "early", repeatable: true, content: "Gebrochene Schaumwellen sind perfekt zum Üben.", steps: ["Hüfttief im Wasser stehen", "Schaumwelle → zum Strand drehen", "Aufs Board, 3-4 kräftige Züge", "Welle schiebt → Pop-Up!", "Zum Strand gleiten", "Ziel: 10 Wellen stehen"], proTip: "2-3 Paddelzüge BEVOR du aufstehst. Speed = Stabilität!", articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/", articleTitle: "📄 Wellen fangen – Barefoot Surf" },
    { title: "Turtle Roll & Duck Dive", icon: "🐢", duration: "30 Min", level: "beginner", phase: "early", content: "Um zu den guten Wellen zu kommen, musst du durch die Brechzone.", steps: ["Turtle Roll: Rails fest greifen", "Mit dem Board umdrehen", "Festhalten während Welle rollt", "Zurückdrehen und weiterpaddeln", "Duck Dive: Nose runterdrücken", "Knie drückt Tail nach"], proTip: "Starte den Turtle Roll 2m VOR der Welle!", articleUrl: "https://tutorials.barefootsurftravel.com/articles/paddle-turtle-roll", articleTitle: "📄 Turtle Roll – Barefoot Surf" },
    { title: "Stance & Gewichtsverlagerung", icon: "⚖️", duration: "30 Min", level: "beginner", phase: "early", content: "Dein Stance bestimmt alles: Speed, Kontrolle, Turns.", steps: ["Füße schulterbreit, leicht angewinkelt", "Hinterer Fuß über den Finnen", "Vorderer Fuß auf Höhe des Brustbeins", "Knie immer gebeugt", "Arme locker seitlich", "Teste: Gewicht vorne = schneller"], proTip: "Stelle dir vor du stehst auf einem Skateboard!" },
    { title: "Grüne Wellen anpaddeln", icon: "🟢", duration: "60 Min", level: "intermediate", phase: "mid", repeatable: true, content: "Ungebrochene Wellen nehmen – positioniere dich im Lineup und paddle früh und hart.", steps: ["Vor der Brechzone positionieren", "Mittlere Welle im Set wählen", "HART paddeln, 6-8 Züge", "Moment des 'Catch' spüren", "Pop-Up und schräg abfahren"], proTip: "Paddle früher und härter als du denkst – der #1 Anfängerfehler!", articleUrl: "https://tutorials.barefootsurftravel.com/articles/positioning-for-waves/", articleTitle: "📄 Positioning – Barefoot Surf" },
    { title: "Bottom Turn Basics", icon: "↩️", duration: "45 Min", level: "intermediate", phase: "mid", content: "Das Fundament aller Manöver.", steps: ["Schräg die Welle hinunter", "Gewicht auf Fersen/Zehen", "Blick in Drehrichtung", "Knie tief, Schwerpunkt niedrig", "Speed mitnehmen", "Zurück die Wand hoch"], proTip: "Schau IMMER dahin wo du hin willst, nie aufs Board.", articleUrl: "https://tutorials.barefootsurftravel.com/articles/bottom-turn/", articleTitle: "📄 Bottom Turn – Barefoot Surf" },
    { title: "Linie halten & Trimmen", icon: "〰️", duration: "40 Min", level: "intermediate", phase: "mid", content: "Auf der Welle bleiben: die richtige Linie finden.", steps: ["Schulter anvisieren", "Gewicht vorne = Speed", "Gewicht hinten = bremsen", "Powerpocket finden", "Kleine Gewichtsverlagerungen", "Arme zur Balance"], proTip: "Die Powerpocket ist direkt unter der brechenden Lippe.", articleUrl: "https://tutorials.barefootsurftravel.com/articles/how-to-surf-down-the-line/", articleTitle: "📄 Down the Line – Barefoot Surf" },
    { title: "Angled Take-Off", icon: "↗️", duration: "45 Min", level: "intermediate", phase: "mid", content: "Take-Off schräg zur Welle – direkt die Schulter entlang fahren.", steps: ["Welle anpaddeln", "Schultern leicht drehen beim Pop-Up", "Vorderen Fuß in Fahrtrichtung", "Blick die Welle entlang", "Gewicht auf Toeside/Heelside", "Direkt auf der Welle fahren"], proTip: "Der angled Take-Off ist DER Gamechanger vom Anfänger zum Intermediate!" },
    { title: "Lineup Navigation", icon: "🧭", duration: "45 Min", level: "intermediate", phase: "mid", content: "Sicher durch die Brechzone und Position im Lineup finden.", steps: ["Channel identifizieren", "Zwischen Sets rauspaddeln", "Position hinter dem Peak", "Landmarks nutzen", "Priority-Regeln beachten", "Bei Unsicherheit: beobachten"], proTip: "Die besten Surfer sind die besten Beobachter." },
    { title: "Cutback & Top Turn", icon: "🔄", duration: "60 Min", level: "advanced", phase: "late", content: "Cutback bringt dich zurück zur Wellenkraft.", steps: ["Speed durch 2-3 Pumps", "Am Kamm: Gewicht hinten", "Schultern und Kopf drehen", "Vorderer Arm zeigt Richtung", "Board folgt", "Gewicht zentrieren"], proTip: "Keine Speed = kein Turn. Immer erst Speed aufbauen!", articleUrl: "https://tutorials.barefootsurftravel.com/articles/cutback/", articleTitle: "📄 Cutback Technik – Barefoot Surf" },
    { title: "Speed Pumping", icon: "🚀", duration: "40 Min", level: "advanced", phase: "late", repeatable: true, content: "Generiere Speed durch rhythmisches Pumpen.", steps: ["Gewicht von vorne nach hinten", "Board auf und ab fahren", "Knie als Stoßdämpfer", "In der Powerpocket bleiben", "Arme für Momentum", "3-4 Pumps → Manöver"], proTip: "Wie Skateboard-Pumpen in einer Halfpipe!" },
    { title: "Surf-Meditation & Flow", icon: "🧘", duration: "20 Min", level: "beginner", phase: "any", content: "Die besten Wellen fängst du wenn du aufhörst zu denken.", steps: ["Auf dem Board sitzen", "Augen schließen, Dünung spüren", "10x atmen: 4 Sek ein, 6 Sek aus", "Augen öffnen, Horizont beobachten", "Gedanken weiterziehen lassen", "Nächste Welle fühlen"], proTip: "Stress = steifer Körper = schlechtes Surfen. Relax!" },
    { title: "Wipeout Recovery", icon: "🌪️", duration: "30 Min", level: "intermediate", phase: "mid", content: "Wipeouts gehören dazu. Wer sie meistert, surft mutiger.", steps: ["Arme schützend über den Kopf", "Fötus-Position unter Wasser", "Warten bis Turbulenz nachlässt", "Luftblasen zeigen nach oben", "Board per Leash ziehen", "Richtung checken"], proTip: "30 Sekunden Luft anhalten reichen für 95% aller Wipeouts.", videoUrl: "https://www.youtube.com/embed/MyJJedytKR4" },
  ]
};

// B3: Equipment-Berater – Board Volume & Sizing
export function recommendBoard(weightKg, experience) {
  // Volume multipliers based on experience
  const multipliers = { zero: 1.0, few: 0.85, some: 0.65, regular: 0.45 };
  const mult = multipliers[experience] || 1.0;
  const volume = Math.round(weightKg * mult);

  // Board type recommendation
  const boards = [];
  if (experience === "zero" || experience === "few") {
    boards.push(
      { type: "Softboard 8'0", emoji: "🟡", volume: `${Math.round(weightKg * 0.95)}-${Math.round(weightKg * 1.1)}L`, reason: "Maximale Stabilität und Sicherheit, perfekt zum Lernen", best: true },
      { type: "Longboard 9'0", emoji: "🟠", volume: `${Math.round(weightKg * 0.85)}-${Math.round(weightKg * 1.0)}L`, reason: "Klassisch, viel Gleiten, gut für kleine Wellen" },
    );
    if (experience === "few") {
      boards.push({ type: "Funboard 7'6", emoji: "🟢", volume: `${Math.round(weightKg * 0.7)}-${Math.round(weightKg * 0.85)}L`, reason: "Kompromiss aus Stabilität und Wendigkeit" });
    }
  } else if (experience === "some") {
    boards.push(
      { type: "Funboard 7'0", emoji: "🟢", volume: `${Math.round(weightKg * 0.6)}-${Math.round(weightKg * 0.75)}L`, reason: "Vielseitig, gutes Übergangsboard", best: true },
      { type: "Fish 5'10", emoji: "🐟", volume: `${Math.round(weightKg * 0.55)}-${Math.round(weightKg * 0.65)}L`, reason: "Breit und schnell, perfekt für kleinere Wellen" },
      { type: "Longboard 9'0", emoji: "🟠", volume: `${Math.round(weightKg * 0.7)}-${Math.round(weightKg * 0.85)}L`, reason: "Für small days und Noseriding" },
    );
  } else {
    boards.push(
      { type: "Shortboard 6'0", emoji: "🔴", volume: `${Math.round(weightKg * 0.38)}-${Math.round(weightKg * 0.48)}L`, reason: "Maximale Performance und Manövrierfähigkeit", best: true },
      { type: "Fish 5'8", emoji: "🐟", volume: `${Math.round(weightKg * 0.45)}-${Math.round(weightKg * 0.55)}L`, reason: "Alternativ für kleinere, kraftlose Wellen" },
      { type: "Step-Up 6'6", emoji: "🔵", volume: `${Math.round(weightKg * 0.42)}-${Math.round(weightKg * 0.52)}L`, reason: "Für größere, kraftvollere Tage" },
    );
  }

  // Fin setup
  const fins = experience === "zero" || experience === "few"
    ? { setup: "Single Fin oder 2+1", reason: "Stabil, geradeaus, verzeihend" }
    : experience === "some"
    ? { setup: "Thruster (3 Finnen)", reason: "Vielseitig, guter Halt in Turns" }
    : { setup: "Thruster oder Quad", reason: "Thruster für Power, Quad für Speed" };

  return { volume, boards, fins };
}

// D3: Skill Tree – Skill definitions mapped to lesson titles
export const SKILL_TREE = [
  { id: "ocean", name: "Ozean verstehen", icon: "🌊", tier: 1, lessons: ["Ozean lesen lernen", "Wellentypen verstehen"], desc: "Wellen, Sets und Breaks lesen" },
  { id: "safety", name: "Sicherheit", icon: "🛟", tier: 1, lessons: ["Sicherheit im Wasser", "Strömungen & Channels"], desc: "Rip Currents, Gefahren, Channels" },
  { id: "equipment", name: "Equipment", icon: "🏄", tier: 1, lessons: ["Dein erstes Surfboard", "Dein Board kennen", "Wetsuit & Zubehör"], desc: "Board, Wetsuit, Zubehör wählen" },
  { id: "paddle", name: "Paddeln", icon: "💪", tier: 1, lessons: ["Paddeltechnik perfektionieren"], desc: "Effizient und kraftvoll paddeln" },
  { id: "popup", name: "Pop-Up", icon: "⚡", tier: 2, requires: ["paddle"], lessons: ["Pop-Up an Land üben", "Whitewash-Wellen reiten"], desc: "Vom Liegen zum Stehen in einer Bewegung" },
  { id: "etiquette", name: "Etikette", icon: "🤝", tier: 2, requires: ["ocean"], lessons: ["Surf-Etikette & Vorfahrt"], desc: "Lineup-Regeln und Respekt" },
  { id: "stance", name: "Stance", icon: "⚖️", tier: 2, requires: ["popup"], lessons: ["Stance & Gewichtsverlagerung"], desc: "Balance und Gewichtskontrolle" },
  { id: "greenwaves", name: "Grüne Wellen", icon: "🟢", tier: 3, requires: ["popup", "ocean"], lessons: ["Grüne Wellen anpaddeln", "Angled Take-Off"], desc: "Ungebrochene Wellen fangen" },
  { id: "lineup", name: "Lineup", icon: "🧭", tier: 3, requires: ["etiquette", "safety"], lessons: ["Lineup Navigation", "Wave Positioning"], desc: "Position und Timing im Lineup" },
  { id: "bottomturn", name: "Bottom Turn", icon: "↩️", tier: 3, requires: ["stance", "greenwaves"], lessons: ["Bottom Turn Basics", "Linie halten & Trimmen"], desc: "Fundament aller Manöver" },
  { id: "advanced", name: "Manöver", icon: "🔄", tier: 4, requires: ["bottomturn"], lessons: ["Cutback & Top Turn", "Speed Pumping"], desc: "Cutback, Top Turn, Speed Generation" },
];

// Sprint 10: Smart Coaching – Keyword → Lesson matching
const COACHING_RULES = [
  { keywords: ["pop-up", "popup", "aufstehen", "hochkommen", "knie", "zu langsam aufgestanden"], lessons: ["Pop-Up an Land üben"], tip: "Übe den Pop-Up 50x am Tag an Land – Muskelgedächtnis ist der Schlüssel!", icon: "⚡" },
  { keywords: ["paddeln", "paddle", "arme", "ausdauer", "müde", "nicht rangekommen"], lessons: ["Paddeltechnik perfektionieren"], tip: "Fingerspitzen zusammen, tief eintauchen, kurze kraftvolle Züge.", icon: "💪" },
  { keywords: ["timing", "zu spät", "zu früh", "welle verpasst", "nicht erwischt", "anpaddeln"], lessons: ["Grüne Wellen anpaddeln", "Ozean lesen lernen"], tip: "Paddle früher und härter als du denkst – der #1 Anfängerfehler!", icon: "🎯" },
  { keywords: ["balance", "gleichgewicht", "wackelig", "hingefallen", "umgekippt", "stance", "fuß"], lessons: ["Stance & Gewichtsverlagerung", "Balance-Training"], tip: "Knie gebeugt, Blick nach vorne – nie aufs Board schauen!", icon: "⚖️" },
  { keywords: ["angst", "mutig", "trau", "panik", "unsicher", "nervös", "wipeout"], lessons: ["Wipeout Recovery", "Atem & Apnoe-Training"], tip: "Kontrolliertes Atmen und Wipeout-Übungen bauen Vertrauen auf.", icon: "🧘" },
  { keywords: ["strömung", "rip", "abgetrieben", "current", "gefährlich", "channel"], lessons: ["Strömungen & Channels", "Sicherheit im Wasser"], tip: "Bei Strömung IMMER quer schwimmen, nie dagegen.", icon: "🛟" },
  { keywords: ["board zu", "brett zu", "wackelig", "sinkt", "zu klein", "zu groß", "volume"], lessons: ["Dein erstes Surfboard", "Surfboard Volume & Sizing"], tip: "Mehr Volume = mehr Stabilität. Lieber zu groß als zu klein!", icon: "🏄", boardHint: true },
  { keywords: ["wellen lesen", "welche welle", "set", "position", "wo sitz"], lessons: ["Ozean lesen lernen", "Wave Positioning", "Lineup Navigation"], tip: "15 Min beobachten bevor du reingehst – beste Surfer sind beste Beobachter.", icon: "🌊" },
  { keywords: ["turn", "cutback", "bottom turn", "kurve", "drehen"], lessons: ["Bottom Turn Basics", "Cutback & Top Turn"], tip: "Schau dahin wo du hin willst. Dein Körper folgt deinem Blick.", icon: "↩️" },
  { keywords: ["speed", "geschwindigkeit", "pumpen", "langsam auf der welle"], lessons: ["Speed Pumping", "Linie halten & Trimmen"], tip: "Speed kommt aus der Powerpocket – nah an der brechenden Lippe bleiben.", icon: "🚀" },
  { keywords: ["vorfahrt", "droppen", "drop-in", "angeschrien", "local"], lessons: ["Surf-Etikette & Vorfahrt"], tip: "Wer dem Peak am nächsten, hat Vorfahrt. Im Zweifel: abbrechen und lächeln.", icon: "🤝" },
  { keywords: ["duck dive", "turtle roll", "durchkommen", "brechzone"], lessons: ["Turtle Roll & Duck Dive"], tip: "Turtle Roll 2m VOR der Welle starten – Timing ist alles!", icon: "🐢" },
];

export function analyzeDiary(diary, contentPool) {
  const allText = Object.values(diary).map(e =>
    [e.whatFailed || "", e.whatWorked || "", e.notes || "", e.focusTomorrow || ""].join(" ")
  ).join(" ").toLowerCase();
  if (!allText.trim()) return { tips: [], patterns: [], boardHint: null };

  const matched = [];
  const patternCounts = {};
  for (const rule of COACHING_RULES) {
    const hits = rule.keywords.filter(kw => allText.includes(kw));
    if (hits.length > 0) {
      matched.push({ ...rule, hitCount: hits.length });
      hits.forEach(h => { patternCounts[h] = (patternCounts[h] || 0) + 1; });
    }
  }
  matched.sort((a, b) => b.hitCount - a.hitCount);

  const seenLessons = new Set();
  const tips = [];
  let boardHint = null;
  for (const match of matched) {
    if (tips.length >= 3) break;
    const newLessons = match.lessons.filter(l => !seenLessons.has(l));
    if (newLessons.length === 0) continue;
    newLessons.forEach(l => seenLessons.add(l));
    const lessonObjs = newLessons.map(title => {
      for (const cat of Object.values(contentPool)) {
        const found = cat.find(l => l.title === title);
        if (found) return found;
      }
      return null;
    }).filter(Boolean);
    if (lessonObjs.length > 0) tips.push({ icon: match.icon, tip: match.tip, lessons: lessonObjs });
    if (match.boardHint) boardHint = match.tip;
  }
  const patterns = Object.entries(patternCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([keyword, count]) => ({ keyword, count }));
  return { tips, patterns, boardHint };
}
