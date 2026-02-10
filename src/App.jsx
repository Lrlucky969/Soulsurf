import { useState, useEffect } from “react”;

const SURF_SPOTS = [
{ id: “bali”, name: “Bali, Indonesia”, emoji: “🌺”, difficulty: “beginner”, waveType: “Sanfte Riffwellen”, season: “Apr–Okt”, water: “28°C”, wetsuit: “none”, tips: [“Uluwatu und Padang Padang für Fortgeschrittene, Kuta Beach für Anfänger”, “Booties empfohlen wegen scharfem Riff”, “Beste Zeit: früher Morgen vor dem Onshore-Wind”] },
{ id: “portugal”, name: “Algarve, Portugal”, emoji: “🇵🇹”, difficulty: “beginner”, waveType: “Beachbreaks”, season: “Sep–Nov”, water: “20°C”, wetsuit: “3/2mm”, tips: [“Arrifana und Amado sind perfekte Anfänger-Spots”, “Neoprenanzug 3/2mm nötig, Wasser ist frisch”, “Starke Strömungen möglich – immer zwischen den Flaggen surfen”] },
{ id: “hawaii”, name: “Hawaii, USA”, emoji: “🌈”, difficulty: “advanced”, waveType: “Große Riffwellen”, season: “Nov–Feb”, water: “25°C”, wetsuit: “none”, tips: [“Waikiki für Anfänger, North Shore nur für Erfahrene”, “Respektiere die Locals – Hawaii hat strenge Lineup-Hierarchie”, “Riffschuhe sind Pflicht an vielen Spots”] },
{ id: “costarica”, name: “Costa Rica”, emoji: “🦜”, difficulty: “beginner”, waveType: “Warme Beachbreaks”, season: “Dez–Apr”, water: “29°C”, wetsuit: “none”, tips: [“Tamarindo und Nosara sind ideal für Anfänger”, “Kein Neopren nötig – Boardshorts reichen”, “Achtung Krokodile an Flussmündungen (kein Witz!)”] },
{ id: “australia”, name: “Gold Coast, Australien”, emoji: “🦘”, difficulty: “intermediate”, waveType: “Pointbreaks”, season: “Feb–Mai”, water: “23°C”, wetsuit: “springsuits”, tips: [“Snapper Rocks hat weltklasse Pointbreaks”, “Stinger Season beachten (Okt–Mai)”, “Surf-Kultur ist groß – respektiere die Locals”] },
{ id: “morocco”, name: “Taghazout, Marokko”, emoji: “🐪”, difficulty: “intermediate”, waveType: “Rechte Pointbreaks”, season: “Okt–Mär”, water: “18°C”, wetsuit: “3/2mm”, tips: [“Anchor Point ist ein legendärer Rechts-Pointbreak”, “3/2mm Neopren empfohlen im Winter”, “Günstige Surf-Camps mit Marokkanischem Essen”] },
{ id: “france”, name: “Hossegor, Frankreich”, emoji: “🥐”, difficulty: “intermediate”, waveType: “Kraftvolle Beachbreaks”, season: “Sep–Nov”, water: “19°C”, wetsuit: “4/3mm”, tips: [“La Gravière ist einer der besten Beachbreaks Europas”, “Wellen können sehr kraftvoll werden – kenne dein Limit”, “Herbst hat die besten Swells bei noch warmem Wasser”] },
{ id: “srilanka”, name: “Sri Lanka”, emoji: “🐘”, difficulty: “beginner”, waveType: “Sanfte Pointbreaks”, season: “Nov–Apr”, water: “28°C”, wetsuit: “none”, tips: [“Weligama Bay ist perfekt für absolute Anfänger”, “Arugam Bay für Fortgeschrittene – langer Rechts-Pointbreak”, “Günstigstes Surf-Reiseziel mit leckerem Essen”] },
{ id: “itacare”, name: “Itacaré, Brasilien”, emoji: “🇧🇷”, difficulty: “intermediate”, waveType: “Tropische Beachbreaks”, season: “Nov–Mär”, water: “27°C”, wetsuit: “none”, tips: [“Praia da Tiririca ist der Hauptspot – konsistent und spaßig”, “Regenwald trifft Meer – einzigartige Atmosphäre”, “Achte auf Strömungen bei Ebbe an den Flussmündungen”] },
{ id: “floripa”, name: “Florianópolis, Brasilien”, emoji: “🇧🇷”, difficulty: “beginner”, waveType: “Konstante Beachbreaks”, season: “Apr–Sep”, water: “21°C”, wetsuit: “springsuits”, tips: [“Praia Mole und Joaquina sind die beliebtesten Surf-Strände”, “Herbst/Winter bringt die besten Süd-Swells”, “Lebendige Surf-Szene mit vielen Surfschulen”] },
{ id: “saquarema”, name: “Saquarema, Brasilien”, emoji: “🇧🇷”, difficulty: “advanced”, waveType: “Kraftvoller Beachbreak”, season: “Mai–Sep”, water: “22°C”, wetsuit: “springsuits”, tips: [”‘Maracanã des Surfens’ – Austragungsort von WSL-Events”, “Praia de Itaúna hat kraftvolle, hohle Wellen”, “Nur für erfahrene Surfer bei großem Swell”] },
{ id: “canary”, name: “Fuerteventura, Kanaren”, emoji: “🏝”, difficulty: “beginner”, waveType: “Vielseitige Riffwellen”, season: “Okt–Mär”, water: “20°C”, wetsuit: “3/2mm”, tips: [“Nördliche Küste für Erfahrene, Süden für Anfänger”, “Ganzjährig surfbar – Europas Hawaii”, “Booties empfohlen wegen vulkanischem Riff”] },
{ id: “nicaragua”, name: “San Juan del Sur, Nicaragua”, emoji: “🌋”, difficulty: “beginner”, waveType: “Warme Beachbreaks”, season: “Mär–Nov”, water: “28°C”, wetsuit: “none”, tips: [“Playa Maderas ist der perfekte Lern-Spot”, “Offshore-Wind am Morgen fast garantiert”, “Noch wenig überlaufen – günstiges Surf-Paradies”] },
{ id: “maldives”, name: “Malediven”, emoji: “🐠”, difficulty: “intermediate”, waveType: “Perfekte Riffwellen”, season: “Mär–Okt”, water: “29°C”, wetsuit: “none”, tips: [“Surf-Charter-Boote sind der beste Weg zu den Wellen”, “Kristallklares Wasser – du siehst den Riffboden”, “Reef Booties sind absolute Pflicht”] },
{ id: “mentawai”, name: “Mentawai, Indonesien”, emoji: “🌴”, difficulty: “advanced”, waveType: “Weltklasse Riffwellen”, season: “Apr–Okt”, water: “28°C”, wetsuit: “none”, tips: [“Lance's Right und Macaronis sind Weltklasse-Wellen”, “Nur per Boot erreichbar – plane Surf-Charter”, “Scharfes Riff – Erste-Hilfe-Kit ist Pflicht”] },
{ id: “jeffreys”, name: “Jeffreys Bay, Südafrika”, emoji: “🦈”, difficulty: “advanced”, waveType: “Legendärer Pointbreak”, season: “Jun–Sep”, water: “17°C”, wetsuit: “4/3mm”, tips: [“Supertubes ist eine der besten Rechtswellen der Welt”, “4/3mm Neopren nötig – das Wasser ist kalt”, “Haie sind real – surfe in Gruppen und meide Flussmündungen”] },
{ id: “ericeira”, name: “Ericeira, Portugal”, emoji: “🇵🇹”, difficulty: “intermediate”, waveType: “World Surf Reserve”, season: “Sep–Apr”, water: “17°C”, wetsuit: “4/3mm”, tips: [“Ribeira d'Ilhas ist der bekannteste Spot”, “World Surf Reserve – geschützte Küste mit perfekten Wellen”, “Nur 45 Min von Lissabon – perfekt für Surf & City”] },
{ id: “siargao”, name: “Siargao, Philippinen”, emoji: “🏄”, difficulty: “intermediate”, waveType: “Cloud 9 Riffwellen”, season: “Aug–Nov”, water: “28°C”, wetsuit: “none”, tips: [“Cloud 9 ist weltberühmt – kräftige, hohle Rechtswelle”, “Für Anfänger: Jacking Horse oder Stimpy's”, “Tropenparadies – Palmen, türkises Wasser, entspannte Vibes”] },
];

const GOALS = [
{ id: “erste-welle”, name: “Erste Welle stehen”, emoji: “🌊”, level: “beginner” },
{ id: “grune-wellen”, name: “Grüne Wellen surfen”, emoji: “🟢”, level: “intermediate” },
{ id: “manover”, name: “Erste Manöver lernen”, emoji: “🔄”, level: “advanced” },
{ id: “surf-trip”, name: “Surf-Trip vorbereiten”, emoji: “✈️”, level: “beginner” },
{ id: “fitness”, name: “Surf-Fitness aufbauen”, emoji: “💪”, level: “beginner” },
{ id: “comeback”, name: “Comeback nach Pause”, emoji: “🔁”, level: “intermediate” },
];

const BOARD_TYPES = [
{ id: “none”, label: “Noch keins”, emoji: “❓”, desc: “Ich leihe vor Ort” },
{ id: “softboard”, label: “Softboard”, emoji: “🟡”, desc: “Schaumstoff, 7-9ft” },
{ id: “longboard”, label: “Longboard”, emoji: “🟠”, desc: “8-10ft, klassisch” },
{ id: “funboard”, label: “Funboard/Mid”, emoji: “🟢”, desc: “6’6-7’6ft” },
{ id: “shortboard”, label: “Shortboard”, emoji: “🔴”, desc: “5’6-6’4ft” },
{ id: “fish”, label: “Fish/Retro”, emoji: “🐟”, desc: “Breit, kurz, fun” },
];

const EXPERIENCE_LEVELS = [
{ id: “zero”, label: “Noch nie gesurft”, emoji: “🌱” },
{ id: “few”, label: “1-5 Sessions”, emoji: “🌿” },
{ id: “some”, label: “6-20 Sessions”, emoji: “🌳” },
{ id: “regular”, label: “20+ Sessions”, emoji: “🏔” },
];

const CONTENT_POOL = {
equipment: [
{ title: “Dein erstes Surfboard”, icon: “🏄”, duration: “10 Min”, level: “beginner”, phase: “intro”, content: “Das richtige Board macht den Unterschied zwischen Spaß und Frust. Anfänger brauchen Volumen und Stabilität.”, tips: [“Softboards sind ideal zum Start – sicher und verzeihend”, “Mindestens 7ft für Anfänger (8-9ft ideal)”, “Mehr Volumen = leichter paddeln = mehr Wellen fangen”, “Shortboards unter 6’6 sind für Anfänger nicht geeignet”], keyTerms: [“Volume”, “Softboard”, “Longboard”, “Rails”, “Stringer”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/types-of-surfboards/”, articleTitle: “📄 Surfboard-Typen – Barefoot Surf” },
{ title: “Wetsuit & Zubehör”, icon: “🧤”, duration: “8 Min”, level: “beginner”, phase: “intro”, content: “Je nach Wassertemperatur brauchst du unterschiedliche Neoprenanzüge. Dazu kommen Leash, Wax und optional Booties.”, tips: [“Ab 22°C: Boardshorts/Bikini reichen”, “18-22°C: Springsuits oder 3/2mm Fullsuit”, “Unter 18°C: 4/3mm oder dicker”, “Leash immer am hinteren Fuß befestigen”, “Wax passend zur Wassertemperatur wählen”], keyTerms: [“Neopren”, “Leash”, “Wax”, “Booties”, “3/2mm”, “4/3mm”] },
{ title: “Board-Pflege & Transport”, icon: “🔧”, duration: “6 Min”, level: “beginner”, phase: “intro”, content: “Ein gut gepflegtes Board hält Jahre. Dings reparieren, richtig lagern und transportieren.”, tips: [“Nie in der prallen Sonne liegen lassen”, “Kleine Dings sofort mit Solarez reparieren”, “Board immer mit Finnen nach oben lagern”, “Boardbag für Transport und UV-Schutz”] },
{ title: “Spot-Check: Worauf achten?”, icon: “👀”, duration: “10 Min”, level: “beginner”, phase: “intro”, content: “Bevor du ins Wasser gehst: 15 Minuten beobachten. Wo brechen die Wellen? Wo ist der Channel? Wie viele Leute sind im Wasser?”, tips: [“Beobachte wo erfahrene Surfer rauspaddeln”, “Suche den Channel – dort ist weniger Strömung”, “Achte auf Rip Currents (glattes Wasser zwischen Wellen)”, “Zähle die Leute im Wasser – zu voll = zu gefährlich”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/”, articleTitle: “📄 Beginner Guide – Barefoot Surf” },
],
warmup: [
{ title: “Schulter-Mobilität”, icon: “🔄”, duration: “5 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Öffne Schultern und Brustwirbelsäule für bessere Paddel-Power.”, steps: [“Armkreisen vorwärts: 15x”, “Armkreisen rückwärts: 15x”, “Cross-Body Shoulder Stretch: 20 Sek/Seite”, “Arm-Schwünge (vor/zurück): 15x”, “Hände hinter dem Rücken verschränken, Brust raus – 20 Sek”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/5-of-the-best-mobility-exercises-to-improve-your-surf-game-reduce-injuries/”, articleTitle: “📄 Mobility Exercises – Barefoot Surf” },
{ title: “Hüft-Opener & Beine”, icon: “🦵”, duration: “6 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Flexible Hüften sind essenziell für den Pop-Up und den Surf-Stance.”, steps: [“Tiefe Ausfallschritte: 10x/Seite”, “Hüftkreise: 10x jede Richtung”, “Knöcheldrehungen: 15x/Fuß”, “Kniehebelauf: 20 Sek”, “Beinschwünge seitlich: 10x/Seite”] },
{ title: “Core Activation”, icon: “🎯”, duration: “5 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Dein Core ist das Kontrollzentrum auf dem Board.”, steps: [“Plank: 30 Sek”, “Side Plank: 20 Sek/Seite”, “Dead Bug: 10x/Seite”, “Bird Dog: 8x/Seite”, “Hollow Body Hold: 20 Sek”] },
{ title: “Pop-Up Drill Warm-Up”, icon: “⚡”, duration: “5 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Aktiviere dein Pop-Up Muskelgedächtnis.”, steps: [“5x langsam und kontrolliert aufstehen”, “5x mit normalem Tempo”, “5x so explosiv wie möglich”, “Auf korrekte Fußposition achten”, “Speed-Round: 10 Pop-Ups so schnell wie möglich”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/what-take-off-technique-is-right-for-you/”, articleTitle: “📄 Take-Off Technik – Barefoot Surf” },
{ title: “Wirbelsäulen-Rotation”, icon: “🌀”, duration: “5 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Rotationsfähigkeit für Turns und Manöver.”, steps: [“Stehende Drehung: 10x/Seite”, “Open Books (Seitlage): 8x/Seite”, “Thread the Needle: 8x/Seite”, “Cat-Cow: 10x langsam”, “Seated Twist: 20 Sek/Seite”] },
{ title: “Atem & Apnoe-Training”, icon: “🌬️”, duration: “5 Min”, level: “intermediate”, phase: “any”, repeatable: true, content: “Kontrolliertes Atmen reduziert Panik bei Wipeouts.”, steps: [“Box Breathing: 4-4-4-4 Sek (5 Runden)”, “Progressive Apnoe: 15/20/25/30 Sek halten”, “Wim-Hof-Style: 20x Poweratmung + Halten”, “Recovery Breathing: 6 Sek ein, 8 Sek aus”, “Entspannungsatmung: 10 tiefe Atemzüge”] },
{ title: “Beach-Yoga Flow”, icon: “🧘”, duration: “8 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Ein kurzer Yoga-Flow kombiniert alle Surf-relevanten Bewegungen.”, steps: [“Sonnengruß A: 3x”, “Krieger I + II: je 20 Sek/Seite”, “Herabschauender Hund → Cobra: 5x Flow”, “Taubenhaltung: 30 Sek/Seite”, “Kind-Pose: 30 Sek Entspannung”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/5-of-the-best-mobility-exercises-to-improve-your-surf-game-reduce-injuries/”, articleTitle: “📄 Surf Mobility – Barefoot Surf” },
{ title: “Sprungkraft & Explosivität”, icon: “💥”, duration: “5 Min”, level: “intermediate”, phase: “any”, repeatable: true, content: “Explosive Kraft für schnelle Pop-Ups.”, steps: [“Jump Squats: 10x”, “Burpees (surf-style): 8x”, “Lateral Bounds: 8x/Seite”, “Tuck Jumps: 6x”, “Broad Jumps: 5x”] },
{ title: “Balance-Training”, icon: “⚖️”, duration: “7 Min”, level: “beginner”, phase: “any”, repeatable: true, content: “Gleichgewicht ist der Schlüssel zum Surfen.”, steps: [“Einbeinstand: 30 Sek pro Bein”, “Einbeinstand: 20 Sek (Augen zu!)”, “Surf-Stance auf weichem Sand: 30 Sek”, “Einbein-Squats: 8x pro Seite”, “Zehenstand gehen: 20 Schritte”] },
{ title: “Paddel-Power Warm-Up”, icon: “💪”, duration: “6 Min”, level: “intermediate”, phase: “any”, repeatable: true, content: “Aktiviere Schultern, Lat und Trizeps.”, steps: [“Resistance Band Pull-Aparts: 15x”, “Prone Y-T-W Raises: 8x je Form”, “Swimming auf dem Bauch: 30 Sek”, “Push-Up Plus: 10x”, “Arm-Haulers: 20x”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-paddle-on-a-surfboard/”, articleTitle: “📄 Paddeltechnik – Barefoot Surf” },
],
theory: [
{ title: “Ozean lesen lernen”, icon: “🌊”, duration: “15 Min”, level: “beginner”, phase: “early”, content: “Wellen entstehen durch Wind über der Wasseroberfläche. Je länger die Strecke (Fetch) und je stärker der Wind, desto größer die Wellen.”, tips: [“Beobachte das Meer 15 Min bevor du reingehst”, “Wellen kommen in Sets von 3-7 Wellen”, “Ruhige Phasen zwischen Sets nutzen”, “Schaumwellen (Whitewash) sind perfekt für Anfänger”], keyTerms: [“Set”, “Fetch”, “Whitewash”, “Lineup”, “Impact Zone”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-read-waves/”, articleTitle: “📄 Wellen lesen – Barefoot Surf” },
{ title: “Surf-Etikette & Vorfahrt”, icon: “🤝”, duration: “10 Min”, level: “beginner”, phase: “early”, content: “Im Wasser gibt es ungeschriebene Gesetze. Wer dem Peak am nächsten und zuerst auf der Welle steht, hat Vorfahrt.”, tips: [“Nie jemandem die Welle droppen”, “Beim Rauspaddeln hinter der Brechzone bleiben”, “Anfänger: nicht ins Lineup der Locals paddeln”, “Lächeln öffnet jedes Lineup”], keyTerms: [“Drop-In”, “Snaking”, “Lineup”, “Peak”, “Priority”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/surf-ethics-10-rules-beginner-needs-know/”, articleTitle: “📄 10 Surf-Regeln – Barefoot Surf” },
{ title: “Wellentypen verstehen”, icon: “📐”, duration: “12 Min”, level: “beginner”, phase: “early”, content: “Beachbreaks brechen über Sand. Reefbreaks über Riff/Fels. Pointbreaks an Landzungen.”, tips: [“Beachbreaks ideal für Anfänger”, “Reefbreaks: Booties tragen”, “Offshore = glatte Wellen, Onshore = unruhig”], keyTerms: [“Beachbreak”, “Reefbreak”, “Pointbreak”, “Offshore”, “Onshore”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/”, articleTitle: “📄 Beginner Guide – Barefoot Surf” },
{ title: “Sicherheit im Wasser”, icon: “⚠️”, duration: “15 Min”, level: “beginner”, phase: “early”, content: “Strömungen (Rip Currents) ziehen dich aufs Meer – niemals dagegen anschwimmen!”, tips: [“Rip Current: quer zur Strömung schwimmen”, “Board nie loslassen – Leash tragen!”, “Nie bei Gewitter oder Dunkelheit surfen”, “Rifffreundliche Sonnencreme benutzen”], keyTerms: [“Rip Current”, “Leash”, “Channel”, “Shorebreak”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/”, articleTitle: “📄 Sicherheits-Basics – Barefoot Surf” },
{ title: “Dein Board kennen”, icon: “🏄”, duration: “10 Min”, level: “beginner”, phase: “early”, content: “Anfänger brauchen Volumen! Ein Softboard (8-9 Fuß) gibt Stabilität.”, tips: [“Starte mit Softboard”, “Board mindestens 1 Fuß länger als du”, “Ohne Wax rutschst du sofort ab”, “Thruster-Setup für Anfänger”], keyTerms: [“Softboard”, “Longboard”, “Shortboard”, “Volume”, “Rails”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/types-of-surfboards/”, articleTitle: “📄 Surfboard-Typen – Barefoot Surf” },
{ title: “Gezeiten & Surf-Forecast”, icon: “🌙”, duration: “15 Min”, level: “intermediate”, phase: “mid”, content: “Bei Ebbe sind Wellen steiler, bei Flut weicher. Apps wie Surfline zeigen alle Daten.”, tips: [“Mid-Tide funktioniert am besten”, “Periode > 10 Sek = kraftvolle Wellen”, “Forecast am Abend vorher checken”, “Offshore-Wind am Morgen = bestes Fenster”], keyTerms: [“Tide”, “Swell Period”, “Swell Direction”, “Wind Speed”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-read-waves/”, articleTitle: “📄 Wellen & Gezeiten – Barefoot Surf” },
{ title: “Surf-Fitness verstehen”, icon: “💪”, duration: “12 Min”, level: “intermediate”, phase: “mid”, content: “Paddeln trainiert Schultern, Take-Off braucht explosive Kraft, Balance kommt aus der Körpermitte.”, tips: [“Schwimmen ist bestes Cross-Training”, “Yoga für Balance und Flexibilität”, “Schulter-Mobilität täglich dehnen”], keyTerms: [“Paddel-Fitness”, “Core-Stability”, “Pop-Up Kraft”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/5-of-the-best-mobility-exercises-to-improve-your-surf-game-reduce-injuries/”, articleTitle: “📄 5 Mobility Exercises – Barefoot Surf” },
{ title: “Wind & Wetter lesen”, icon: “🌬️”, duration: “10 Min”, level: “intermediate”, phase: “mid”, content: “Wind ist der wichtigste Faktor. Offshore-Wind glättet die Wellen. Onshore macht sie unruhig.”, tips: [“Morgenstunden haben oft die besten Bedingungen”, “Sideshore-Wind kann auch gut sein”, “Wetterumschwünge bringen die besten Swells”], keyTerms: [“Offshore”, “Onshore”, “Sideshore”, “Glasig”, “Choppy”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-read-waves/”, articleTitle: “📄 Wind & Wellen lesen – Barefoot Surf” },
{ title: “Board-Shapes & Finnen”, icon: “🔧”, duration: “12 Min”, level: “intermediate”, phase: “mid”, content: “Jedes Board-Shape surft anders. Mehr Rocker = wendiger, weniger Rocker = schneller.”, tips: [“Single Fin = Glide, Thruster = Kontrolle”, “Fish-Shape: schnell in kleinen Wellen”, “Gun: für große Wellen über 2m”], keyTerms: [“Rocker”, “Concave”, “Fish”, “Gun”, “Quad”], videoUrl: “https://www.youtube.com/embed/OHpG_rNj8eQ”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/types-of-surfboards/”, articleTitle: “📄 Board-Shapes – Barefoot Surf” },
{ title: “Surf-Psychologie & Fear”, icon: “🧠”, duration: “10 Min”, level: “advanced”, phase: “late”, content: “Angst im Wasser ist normal. Der Schlüssel ist, zwischen gesunder Vorsicht und limitierender Angst zu unterscheiden.”, tips: [“Atme bewusst wenn du Angst spürst”, “Steigere dich schrittweise”, “Visualisiere erfolgreiche Rides”, “Surfe mit Buddies”], keyTerms: [“Commitment”, “Fear Management”, “Visualization”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/”, articleTitle: “📄 Mindset & Tipps – Barefoot Surf” },
{ title: “Strömungen & Channels”, icon: “🔀”, duration: “12 Min”, level: “beginner”, phase: “mid”, content: “Strömungen können gefährlich sein, aber auch nützlich: Erfahrene Surfer nutzen Channels zum Rauspaddeln.”, tips: [“Channels sind tiefere Bereiche ohne Wellen”, “Rip Currents am glatten, dunklen Wasser erkennen”, “NIE gegen eine Strömung schwimmen”, “Channels beobachten bevor du reingehst”] },
{ title: “Surf-Kultur & Geschichte”, icon: “🏛”, duration: “10 Min”, level: “beginner”, phase: “mid”, content: “Surfen hat seinen Ursprung in Polynesien und Hawaii. Duke Kahanamoku brachte es in die Welt.”, tips: [“Duke Kahanamoku = Vater des modernen Surfens”, “Surfen wurde 2021 erstmals olympisch”, “Respekt vor der Kultur ist Teil des Sports”, “Lokale Surf-Szenen haben eigene Traditionen”] },
{ title: “Wave Positioning”, icon: “📍”, duration: “12 Min”, level: “intermediate”, phase: “mid”, content: “Die richtige Position im Lineup entscheidet ob du Wellen fängst oder nicht.”, tips: [“Nutze Landmarks am Strand”, “Triangulation: 2 Punkte am Ufer peilen”, “Sitze leicht hinter dem Peak”, “Beobachte wo die Locals sitzen”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/positioning-for-waves/”, articleTitle: “📄 Positioning – Barefoot Surf” },
{ title: “Speed & Pump Theorie”, icon: “🚀”, duration: “10 Min”, level: “advanced”, phase: “late”, content: “Speed ist die Grundlage aller Manöver. Pumping nutzt die Wellenenergie.”, tips: [“Pumpen = Gewicht verlagern in der Powerpocket”, “Vorderer Fuß = Beschleunigung”, “Speed vor jedem Turn aufbauen”, “Beobachte wie Pros die Wellenwand nutzen”] },
{ title: “Surfboard Volume & Sizing”, icon: “📏”, duration: “10 Min”, level: “intermediate”, phase: “mid”, content: “Volume in Litern bestimmt wie viel das Board dich trägt.”, tips: [“Anfänger: 100% Körpergewicht in Litern”, “Intermediate: 60-80%”, “Advanced: 35-50%”, “Volume-Rechner von Channel Islands nutzen”], articleUrl: “https://tutorials.barefootsurftravel.com/articles/surfboard-volume/”, articleTitle: “📄 Surfboard Volume – Barefoot Surf” },
{ title: “Surf-Apps & Forecast lesen”, icon: “📱”, duration: “10 Min”, level: “intermediate”, phase: “mid”, content: “Surfline, Windguru, Magic Seaweed – lerne die besten Tools.”, tips: [“Surfline zeigt Cam-Livestreams”, “Windguru ist kostenlos und detailliert”, “Wellenhöhe in Fuß ≠ Gesichtshöhe”, “Swell-Richtung muss zum Spot passen”] },
],
practice: [
{ title: “Pop-Up an Land üben”, icon: “🤸”, duration: “30 Min”, level: “beginner”, phase: “early”, repeatable: true, content: “Der Pop-Up ist DIE fundamentale Bewegung. Übe ihn 50x am Tag.”, steps: [“Flach auf den Bauch, Hände neben der Brust”, “Explosiv hochdrücken – NICHT auf die Knie!”, “Hinterer Fuß zuerst aufs Board (quer)”, “Vorderfuß zwischen die Hände”, “Knie gebeugt, Blick nach vorne”, “50x wiederholen!”], proTip: “Filme dich selbst! Die meisten denken sie machen es richtig, bis sie das Video sehen.”, videoUrl: “https://www.youtube.com/embed/dBmHlpliXfk”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-do-a-take-off”, articleTitle: “📄 Pop-Up Technik – Barefoot Surf” },
{ title: “Paddeltechnik perfektionieren”, icon: “💧”, duration: “45 Min”, level: “beginner”, phase: “early”, repeatable: true, content: “80% deiner Zeit verbringst du mit Paddeln.”, steps: [“Position: Nase ~5cm über Wasser”, “Arme tief eintauchen”, “Fingerspitzen zusammen”, “Kurze, kraftvolle Züge”, “Blick nach vorne”, “Beine zusammen und still!”], proTip: “20 Min nur paddeln ohne Wellen – baut Ausdauer.”, videoUrl: “https://www.youtube.com/embed/XCaiQYVEut4”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-paddle-on-a-surfboard/”, articleTitle: “📄 Paddeltechnik – Barefoot Surf” },
{ title: “Whitewash-Wellen reiten”, icon: “🫧”, duration: “60 Min”, level: “beginner”, phase: “early”, repeatable: true, content: “Gebrochene Schaumwellen sind perfekt zum Üben.”, steps: [“Hüfttief im Wasser stehen”, “Schaumwelle → zum Strand drehen”, “Aufs Board, 3-4 kräftige Züge”, “Welle schiebt → Pop-Up!”, “Zum Strand gleiten”, “Ziel: 10 Wellen stehen”], proTip: “2-3 Paddelzüge BEVOR du aufstehst. Speed = Stabilität!”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-complete-beginners-guide/”, articleTitle: “📄 Wellen fangen – Barefoot Surf” },
{ title: “Turtle Roll & Duck Dive”, icon: “🐢”, duration: “30 Min”, level: “beginner”, phase: “early”, content: “Um zu den guten Wellen zu kommen, musst du durch die Brechzone.”, steps: [“Turtle Roll: Rails fest greifen”, “Mit dem Board umdrehen”, “Festhalten während Welle rollt”, “Zurückdrehen und weiterpaddeln”, “Duck Dive: Nose runterdrücken”, “Knie drückt Tail nach”], proTip: “Starte den Turtle Roll 2m VOR der Welle!”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/paddle-turtle-roll”, articleTitle: “📄 Turtle Roll – Barefoot Surf” },
{ title: “Stance & Gewichtsverlagerung”, icon: “⚖️”, duration: “30 Min”, level: “beginner”, phase: “early”, content: “Dein Stance bestimmt alles: Speed, Kontrolle, Turns.”, steps: [“Füße schulterbreit, leicht angewinkelt”, “Hinterer Fuß über den Finnen”, “Vorderer Fuß auf Höhe des Brustbeins”, “Knie immer gebeugt”, “Arme locker seitlich”, “Teste: Gewicht vorne = schneller”], proTip: “Stelle dir vor du stehst auf einem Skateboard!” },
{ title: “Grüne Wellen anpaddeln”, icon: “🟢”, duration: “60 Min”, level: “intermediate”, phase: “mid”, repeatable: true, content: “Ungebrochene Wellen nehmen – positioniere dich im Lineup und paddle früh und hart.”, steps: [“Vor der Brechzone positionieren”, “Mittlere Welle im Set wählen”, “HART paddeln, 6-8 Züge”, “Moment des ‘Catch’ spüren”, “Pop-Up und schräg abfahren”], proTip: “Paddle früher und härter als du denkst – der #1 Anfängerfehler!”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/positioning-for-waves/”, articleTitle: “📄 Positioning – Barefoot Surf” },
{ title: “Bottom Turn Basics”, icon: “↩️”, duration: “45 Min”, level: “intermediate”, phase: “mid”, content: “Das Fundament aller Manöver.”, steps: [“Schräg die Welle hinunter”, “Gewicht auf Fersen/Zehen”, “Blick in Drehrichtung”, “Knie tief, Schwerpunkt niedrig”, “Speed mitnehmen”, “Zurück die Wand hoch”], proTip: “Schau IMMER dahin wo du hin willst, nie aufs Board.”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/bottom-turn/”, articleTitle: “📄 Bottom Turn – Barefoot Surf” },
{ title: “Linie halten & Trimmen”, icon: “〰️”, duration: “40 Min”, level: “intermediate”, phase: “mid”, content: “Auf der Welle bleiben: die richtige Linie finden.”, steps: [“Schulter anvisieren”, “Gewicht vorne = Speed”, “Gewicht hinten = bremsen”, “Powerpocket finden”, “Kleine Gewichtsverlagerungen”, “Arme zur Balance”], proTip: “Die Powerpocket ist direkt unter der brechenden Lippe.”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/how-to-surf-down-the-line/”, articleTitle: “📄 Down the Line – Barefoot Surf” },
{ title: “Angled Take-Off”, icon: “↗️”, duration: “45 Min”, level: “intermediate”, phase: “mid”, content: “Take-Off schräg zur Welle – direkt die Schulter entlang fahren.”, steps: [“Welle anpaddeln”, “Schultern leicht drehen beim Pop-Up”, “Vorderen Fuß in Fahrtrichtung”, “Blick die Welle entlang”, “Gewicht auf Toeside/Heelside”, “Direkt auf der Welle fahren”], proTip: “Der angled Take-Off ist DER Gamechanger vom Anfänger zum Intermediate!” },
{ title: “Lineup Navigation”, icon: “🧭”, duration: “45 Min”, level: “intermediate”, phase: “mid”, content: “Sicher durch die Brechzone und Position im Lineup finden.”, steps: [“Channel identifizieren”, “Zwischen Sets rauspaddeln”, “Position hinter dem Peak”, “Landmarks nutzen”, “Priority-Regeln beachten”, “Bei Unsicherheit: beobachten”], proTip: “Die besten Surfer sind die besten Beobachter.” },
{ title: “Cutback & Top Turn”, icon: “🔄”, duration: “60 Min”, level: “advanced”, phase: “late”, content: “Cutback bringt dich zurück zur Wellenkraft.”, steps: [“Speed durch 2-3 Pumps”, “Am Kamm: Gewicht hinten”, “Schultern und Kopf drehen”, “Vorderer Arm zeigt Richtung”, “Board folgt”, “Gewicht zentrieren”], proTip: “Keine Speed = kein Turn. Immer erst Speed aufbauen!”, articleUrl: “https://tutorials.barefootsurftravel.com/articles/cutback/”, articleTitle: “📄 Cutback Technik – Barefoot Surf” },
{ title: “Speed Pumping”, icon: “🚀”, duration: “40 Min”, level: “advanced”, phase: “late”, repeatable: true, content: “Generiere Speed durch rhythmisches Pumpen.”, steps: [“Gewicht von vorne nach hinten”, “Board auf und ab fahren”, “Knie als Stoßdämpfer”, “In der Powerpocket bleiben”, “Arme für Momentum”, “3-4 Pumps → Manöver”], proTip: “Wie Skateboard-Pumpen in einer Halfpipe!” },
{ title: “Surf-Meditation & Flow”, icon: “🧘”, duration: “20 Min”, level: “beginner”, phase: “any”, content: “Die besten Wellen fängst du wenn du aufhörst zu denken.”, steps: [“Auf dem Board sitzen”, “Augen schließen, Dünung spüren”, “10x atmen: 4 Sek ein, 6 Sek aus”, “Augen öffnen, Horizont beobachten”, “Gedanken weiterziehen lassen”, “Nächste Welle fühlen”], proTip: “Stress = steifer Körper = schlechtes Surfen. Relax!” },
{ title: “Wipeout Recovery”, icon: “🌪️”, duration: “30 Min”, level: “intermediate”, phase: “mid”, content: “Wipeouts gehören dazu. Wer sie meistert, surft mutiger.”, steps: [“Arme schützend über den Kopf”, “Fötus-Position unter Wasser”, “Warten bis Turbulenz nachlässt”, “Luftblasen zeigen nach oben”, “Board per Leash ziehen”, “Richtung checken”], proTip: “30 Sekunden Luft anhalten reichen für 95% aller Wipeouts.”, videoUrl: “https://www.youtube.com/embed/MyJJedytKR4” },
]
};

function generateProgram(numDays, goalId, spotId, equipment) {
const goal = GOALS.find(g => g.id === goalId);
const spot = SURF_SPOTS.find(s => s.id === spotId);
const days = parseInt(numDays);
let levels = [“beginner”];
if ([“intermediate”,“advanced”,“expert”].includes(goal?.level)) levels.push(“intermediate”);
if ([“advanced”,“expert”].includes(goal?.level)) levels.push(“advanced”);

const warmups = CONTENT_POOL.warmup.filter(w => levels.includes(w.level));
const theories = CONTENT_POOL.theory.filter(t => levels.includes(t.level));
const practices = CONTENT_POOL.practice.filter(p => levels.includes(p.level));
const equipmentLessons = CONTENT_POOL.equipment;

const earlyTheory = theories.filter(t => t.phase === “early”);
const midTheory = theories.filter(t => t.phase === “mid”);
const lateTheory = theories.filter(t => t.phase === “late”);
const earlyPractice = practices.filter(p => p.phase === “early”);
const midPractice = practices.filter(p => p.phase === “mid”);
const latePractice = practices.filter(p => p.phase === “late”);
const anyPractice = practices.filter(p => p.phase === “any”);

const usedTheory = new Set();
const usedPractice = new Set();

// Seeded RNG for consistent but varied programs per config
let seed = 0;
for (const ch of `${goalId}-${spotId}-${days}`) seed = ((seed << 5) - seed + ch.charCodeAt(0)) | 0;
seed = Math.abs(seed);
function seededRandom() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
function seededShuffle(arr) { const a = […arr]; for (let i = a.length - 1; i > 0; i–) { const j = Math.floor(seededRandom() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function pickTheory(dayNum) {
const progress = dayNum / days;
let pool;
if (progress <= 0.3) pool = […earlyTheory, …midTheory];
else if (progress <= 0.7) pool = […midTheory, …lateTheory, …earlyTheory];
else pool = […lateTheory, …midTheory];
const unused = seededShuffle(pool.filter(t => !usedTheory.has(t.title)));
if (unused.length > 0) { const pick = unused[0]; usedTheory.add(pick.title); return pick; }
return null;
}

function pickPractice(dayNum) {
const progress = dayNum / days;
let pool;
if (progress <= 0.3) pool = […earlyPractice, …anyPractice];
else if (progress <= 0.7) pool = […midPractice, …earlyPractice, …anyPractice];
else pool = […latePractice, …midPractice, …anyPractice];
const unused = seededShuffle(pool.filter(p => !usedPractice.has(p.title)));
if (unused.length > 0) { const pick = unused[0]; if (!pick.repeatable) usedPractice.add(pick.title); return pick; }
const repeatable = pool.filter(p => p.repeatable);
if (repeatable.length > 0) return repeatable[Math.floor(seededRandom() * repeatable.length)];
return null;
}

const program = [];
let wIdx = 0;

for (let d = 1; d <= days; d++) {
const dayLessons = [];
const dayId = `d${d}`;

```
if (d === 1) {
  const eqToAdd = [];
  if (!equipment || equipment.experience === "zero" || equipment.experience === "few") {
    eqToAdd.push(equipmentLessons[0], equipmentLessons[1], equipmentLessons[3]);
  } else {
    eqToAdd.push(equipmentLessons[2], equipmentLessons[3]);
  }
  eqToAdd.forEach((eq, i) => {
    dayLessons.push({ ...eq, id: `${dayId}-eq${i}`, type: "equipment" });
  });
}

if (warmups.length > 0) {
  dayLessons.push({ ...warmups[wIdx % warmups.length], id: `${dayId}-w`, type: "warmup" });
  wIdx++;
}

const theory = pickTheory(d);
if (theory) dayLessons.push({ ...theory, id: `${dayId}-t`, type: "theory" });

const practice1 = pickPractice(d);
if (practice1) dayLessons.push({ ...practice1, id: `${dayId}-p1`, type: "practice" });

if (days >= 7 && d % 2 === 0) {
  const practice2 = pickPractice(d);
  if (practice2 && practice2.title !== practice1?.title) {
    dayLessons.push({ ...practice2, id: `${dayId}-p2`, type: "practice" });
  }
}

if (d === days) {
  const meditation = CONTENT_POOL.practice.find(p => p.title.includes("Meditation"));
  if (meditation && !dayLessons.some(l => l.title.includes("Meditation"))) {
    dayLessons.push({ ...meditation, id: `${dayId}-med`, type: "practice" });
  }
}

program.push({ day: d, lessons: dayLessons });
```

}
return { program, goal, spot };
}

const VideoEmbed = ({ url }) => {
if (!url) return null;
return (
<div style={{ margin: “16px 0”, borderRadius: 16, overflow: “hidden”, background: “#111”, position: “relative”, paddingBottom: “56.25%”, height: 0 }}>
<iframe src={`${url}?rel=0&modestbranding=1`} title=“Tutorial Video” frameBorder=“0” allow=“accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture” allowFullScreen style={{ position: “absolute”, top: 0, left: 0, width: “100%”, height: “100%”, border: “none” }} />
</div>
);
};

const WaveBackground = () => (

  <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(0deg, rgba(255,183,77,0.15) 0%, transparent 100%)" }} />
    <svg style={{ position: "absolute", bottom: -5, left: 0, width: "200%", height: 80 }} viewBox="0 0 1440 80">
      <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1620,40 L1620,80 L0,80 Z" fill="rgba(0,150,136,0.08)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-720,0" dur="12s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
);

const LessonCard = ({ lesson, index, onOpen, dm }) => {
const colors = {
theory: { bg: dm ? “linear-gradient(135deg, #2d2510, #2d2010)” : “linear-gradient(135deg, #FFF8E1, #FFF3E0)”, border: “#FFB74D”, tag: dm ? “#FFB74D” : “#E65100”, tagBg: dm ? “rgba(255,183,77,0.15)” : “#FFF3E0”, label: “Theorie” },
practice: { bg: dm ? “linear-gradient(135deg, #0d2520, #0d2a25)” : “linear-gradient(135deg, #E0F2F1, #E0F7FA)”, border: “#4DB6AC”, tag: dm ? “#4DB6AC” : “#004D40”, tagBg: dm ? “rgba(77,182,172,0.15)” : “#E0F2F1”, label: “Praxis” },
warmup: { bg: dm ? “linear-gradient(135deg, #2d1520, #2d1025)” : “linear-gradient(135deg, #FCE4EC, #F3E5F5)”, border: “#F06292”, tag: dm ? “#F06292” : “#880E4F”, tagBg: dm ? “rgba(240,98,146,0.15)” : “#FCE4EC”, label: “Warm-Up” },
equipment: { bg: dm ? “linear-gradient(135deg, #1a1d2d, #151a2d)” : “linear-gradient(135deg, #E8EAF6, #E3F2FD)”, border: “#7986CB”, tag: dm ? “#7986CB” : “#283593”, tagBg: dm ? “rgba(121,134,203,0.15)” : “#E8EAF6”, label: “Equipment” }
};
const c = colors[lesson.type] || colors.theory;
return (
<div onClick={() => onOpen(lesson)} style={{ background: c.bg, border: `2px solid ${c.border}22`, borderRadius: 16, padding: “18px 20px”, cursor: “pointer”, transition: “all 0.3s ease”, animationDelay: `${index * 60}ms`, animation: “slideUp 0.5s ease forwards”, opacity: 0 }}
onMouseEnter={e => { e.currentTarget.style.transform = “translateY(-3px)”; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}33`; }}
onMouseLeave={e => { e.currentTarget.style.transform = “none”; e.currentTarget.style.boxShadow = “none”; }}
>
<div style={{ display: “flex”, alignItems: “flex-start”, gap: 12 }}>
<div style={{ fontSize: 28 }}>{lesson.icon}</div>
<div style={{ flex: 1 }}>
<div style={{ display: “flex”, gap: 6, marginBottom: 5, flexWrap: “wrap” }}>
<span style={{ fontSize: 10, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.08em”, color: c.tag, background: c.tagBg, padding: “2px 8px”, borderRadius: 20, fontFamily: “‘Space Mono’, monospace” }}>{c.label}</span>
<span style={{ fontSize: 10, fontWeight: 600, color: “#78909C”, background: “#ECEFF1”, padding: “2px 8px”, borderRadius: 20, fontFamily: “‘Space Mono’, monospace” }}>{lesson.duration}</span>
{lesson.videoUrl && <span style={{ fontSize: 10, fontWeight: 600, color: “#C62828”, background: “#FFEBEE”, padding: “2px 8px”, borderRadius: 20, fontFamily: “‘Space Mono’, monospace” }}>▶ Video</span>}
{lesson.articleUrl && <span style={{ fontSize: 10, fontWeight: 600, color: “#1565C0”, background: “#E3F2FD”, padding: “2px 8px”, borderRadius: 20, fontFamily: “‘Space Mono’, monospace” }}>📄 Artikel</span>}
</div>
<h3 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 17, fontWeight: 700, color: dm ? ‘#e8eaed’ : ‘#263238’, margin: 0, lineHeight: 1.3 }}>{lesson.title}</h3>
<p style={{ fontFamily: “‘DM Sans’, sans-serif”, fontSize: 13, color: dm ? ‘#9aa0a6’ : ‘#546E7A’, margin: “6px 0 0”, lineHeight: 1.5, display: “-webkit-box”, WebkitLineClamp: 2, WebkitBoxOrient: “vertical”, overflow: “hidden” }}>{lesson.content}</p>
</div>
<div style={{ fontSize: 18, color: c.border, marginTop: 2 }}>→</div>
</div>
</div>
);
};

const LessonModal = ({ lesson, onClose, dm }) => {
if (!lesson) return null;
const tc = { theory: “#E65100”, practice: “#004D40”, warmup: “#880E4F”, equipment: “#283593” };
const tl = { theory: “📖 Theorie”, practice: “🏄 Praxis”, warmup: “🔥 Warm-Up”, equipment: “🎒 Equipment” };
const tb = { theory: “#FFF3E0”, practice: “#E0F2F1”, warmup: “#FCE4EC”, equipment: “#E8EAF6” };
const sBg = { theory: “#FFF8E1”, practice: “#E0F2F1”, warmup: “#FCE4EC”, equipment: “#E8EAF6” };
const sC = { theory: “#4E342E”, practice: “#1B5E20”, warmup: “#880E4F”, equipment: “#1A237E” };
const sB = { theory: “#FFB74D”, practice: “#4DB6AC”, warmup: “#F06292”, equipment: “#7986CB” };
return (
<div onClick={onClose} style={{ position: “fixed”, inset: 0, zIndex: 1000, background: “rgba(0,0,0,0.5)”, backdropFilter: “blur(8px)”, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: 16, animation: “fadeIn 0.3s ease” }}>
<div onClick={e => e.stopPropagation()} style={{ background: dm ? “#1a2332” : “#FFFDF7”, borderRadius: 24, maxWidth: 620, width: “100%”, maxHeight: “85vh”, overflow: “auto”, padding: “28px 24px”, boxShadow: “0 25px 60px rgba(0,0,0,0.3)”, animation: “slideUp 0.4s ease” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 16 }}>
<span style={{ fontSize: 44 }}>{lesson.icon}</span>
<button onClick={onClose} style={{ background: dm ? “rgba(255,255,255,0.1)” : “#F5F5F5”, border: “none”, borderRadius: “50%”, width: 36, height: 36, fontSize: 18, cursor: “pointer”, color: dm ? “#9aa0a6” : “#546E7A”, display: “flex”, alignItems: “center”, justifyContent: “center” }}>✕</button>
</div>
<span style={{ fontSize: 11, fontWeight: 700, textTransform: “uppercase”, letterSpacing: “0.08em”, color: tc[lesson.type], background: tb[lesson.type], padding: “4px 12px”, borderRadius: 20, fontFamily: “‘Space Mono’, monospace” }}>{tl[lesson.type]} · {lesson.duration}</span>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 26, fontWeight: 800, color: dm ? ‘#e8eaed’ : ‘#1a1a1a’, margin: “14px 0 10px”, lineHeight: 1.2 }}>{lesson.title}</h2>
<p style={{ fontFamily: “‘DM Sans’, sans-serif”, fontSize: 15, color: dm ? ‘#9aa0a6’ : ‘#37474F’, lineHeight: 1.7, margin: “0 0 16px”, borderLeft: “3px solid #FFB74D”, paddingLeft: 14, fontStyle: “italic” }}>{lesson.content}</p>
{lesson.videoUrl && <VideoEmbed url={lesson.videoUrl} />}
{lesson.articleUrl && (
<a href={lesson.articleUrl} target=”_blank” rel=“noopener noreferrer” style={{ display: “flex”, alignItems: “center”, gap: 10, background: “linear-gradient(135deg, #E3F2FD, #BBDEFB)”, borderRadius: 14, padding: “14px 18px”, marginBottom: 16, textDecoration: “none”, border: “1px solid #90CAF9”, transition: “all 0.2s ease” }}
onMouseEnter={e => e.currentTarget.style.transform = “translateY(-2px)”} onMouseLeave={e => e.currentTarget.style.transform = “none”}>
<span style={{ fontSize: 24 }}>📄</span>
<div>
<div style={{ fontFamily: “‘Space Mono’, monospace”, fontSize: 10, color: “#1565C0”, textTransform: “uppercase”, letterSpacing: “0.08em” }}>Weiterführender Artikel</div>
<div style={{ fontFamily: “‘DM Sans’, sans-serif”, fontSize: 14, fontWeight: 600, color: “#0D47A1” }}>{lesson.articleTitle || “Artikel lesen →”}</div>
</div>
<span style={{ marginLeft: “auto”, fontSize: 18, color: “#1565C0” }}>↗</span>
</a>
)}
{lesson.tips && (<div style={{ marginBottom: 20 }}><h4 style={{ fontFamily: “‘Space Mono’, monospace”, fontSize: 12, color: tc[lesson.type], textTransform: “uppercase”, letterSpacing: “0.05em”, marginBottom: 10 }}>💡 Tipps</h4>
{lesson.tips.map((tip, i) => (<div key={i} style={{ display: “flex”, gap: 8, marginBottom: 6, padding: “8px 12px”, background: dm ? “rgba(255,248,225,0.08)” : “#FFF8E1”, borderRadius: 10, fontSize: 13, color: dm ? “#e8eaed” : “#4E342E”, fontFamily: “‘DM Sans’, sans-serif” }}><span style={{ color: “#FFB74D”, fontWeight: 700 }}>✦</span><span>{tip}</span></div>))}</div>)}
{lesson.steps && (<div style={{ marginBottom: 20 }}><h4 style={{ fontFamily: “‘Space Mono’, monospace”, fontSize: 12, color: tc[lesson.type], textTransform: “uppercase”, letterSpacing: “0.05em”, marginBottom: 10 }}>📋 Schritt für Schritt</h4>
{lesson.steps.map((step, i) => (<div key={i} style={{ display: “flex”, gap: 10, marginBottom: 6, padding: “10px 12px”, background: sBg[lesson.type], borderRadius: 10, fontSize: 13, color: sC[lesson.type], fontFamily: “‘DM Sans’, sans-serif” }}><span style={{ background: sB[lesson.type], color: “white”, borderRadius: “50%”, width: 22, height: 22, minWidth: 22, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 11, fontWeight: 700 }}>{i + 1}</span><span style={{ lineHeight: 1.5 }}>{step}</span></div>))}</div>)}
{lesson.proTip && (<div style={{ background: dm ? “rgba(255,183,77,0.1)” : “linear-gradient(135deg, #FFF3E0, #FFECB3)”, borderRadius: 14, padding: “14px 16px”, border: “2px dashed #FFB74D”, marginBottom: 12 }}><div style={{ fontFamily: “‘Space Mono’, monospace”, fontSize: 11, fontWeight: 700, color: “#E65100”, marginBottom: 4 }}>🤙 PRO-TIPP</div><p style={{ fontFamily: “‘DM Sans’, sans-serif”, fontSize: 14, color: dm ? ‘#e8eaed’ : ‘#4E342E’, margin: 0, fontWeight: 500 }}>{lesson.proTip}</p></div>)}
{lesson.keyTerms && (<div style={{ marginTop: 12 }}><div style={{ display: “flex”, flexWrap: “wrap”, gap: 5 }}>{lesson.keyTerms.map((t, i) => <span key={i} style={{ background: dm ? “rgba(255,255,255,0.08)” : “#ECEFF1”, color: dm ? “#9aa0a6” : “#546E7A”, padding: “3px 10px”, borderRadius: 20, fontSize: 11, fontFamily: “‘Space Mono’, monospace” }}>{t}</span>)}</div></div>)}
</div>
</div>
);
};

const STORAGE_KEY = “soulsurf_data”;
function loadSaved() { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveData(data) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ …data, savedAt: new Date().toISOString() })); } catch {} }
function clearData() { try { localStorage.removeItem(STORAGE_KEY); } catch {} }

export default function SurfApp() {
const [screen, setScreen] = useState(“home”);
const [days, setDays] = useState(7);
const [goal, setGoal] = useState(””);
const [spot, setSpot] = useState(””);
const [board, setBoard] = useState(””);
const [experience, setExperience] = useState(””);
const [program, setProgram] = useState(null);
const [openLesson, setOpenLesson] = useState(null);
const [filter, setFilter] = useState(“all”);
const [activeDay, setActiveDay] = useState(null);
const [completed, setCompleted] = useState({});
const [spotSearch, setSpotSearch] = useState(””);
const [showResetConfirm, setShowResetConfirm] = useState(false);
const [builderStep, setBuilderStep] = useState(1);
const [hydrated, setHydrated] = useState(false);

// SSR-safe: load saved data after mount
useEffect(() => {
const saved = loadSaved();
if (saved && saved.days && saved.goal && saved.spot) {
setDays(saved.days);
setGoal(saved.goal);
setSpot(saved.spot);
setBoard(saved.board || “”);
setExperience(saved.experience || “”);
setProgram(generateProgram(saved.days, saved.goal, saved.spot, saved.equipment));
setCompleted(saved.completed || {});
}
setHydrated(true);
}, []);
const [darkMode, setDarkMode] = useState(() => {
try { const s = localStorage.getItem(“soulsurf_dark”); if (s !== null) return s === “true”; } catch {}
return window.matchMedia?.(”(prefers-color-scheme: dark)”).matches || false;
});
const toggleDark = () => { const next = !darkMode; setDarkMode(next); try { localStorage.setItem(“soulsurf_dark”, String(next)); } catch {} };
const dm = darkMode;
const t = {
bg: dm ? “#0f1419” : “#FFFDF7”, bg2: dm ? “#1a2332” : “#FFF8E1”, bg3: dm ? “#1e2d3d” : “#E0F2F1”,
card: dm ? “rgba(30,45,61,0.8)” : “rgba(255,255,255,0.8)”, cardBorder: dm ? “rgba(255,255,255,0.08)” : “rgba(0,0,0,0.05)”,
text: dm ? “#e8eaed” : “#263238”, text2: dm ? “#9aa0a6” : “#546E7A”, text3: dm ? “#5f6368” : “#78909C”,
headerBg: dm ? “rgba(15,20,25,0.9)” : “rgba(255,253,247,0.85)”, headerBorder: dm ? “rgba(255,255,255,0.06)” : “rgba(0,0,0,0.05)”,
accent: “#009688”, accent2: “#4DB6AC”, warm: “#FFB74D”, warm2: “#FF7043”,
inputBg: dm ? “rgba(30,45,61,0.8)” : “rgba(255,255,255,0.8)”, inputBorder: dm ? “#2d3f50” : “#E0E0E0”,
};

const toggle = (id) => setCompleted(p => { const next = { …p, [id]: !p[id] }; saveData({ days, goal, spot, board, experience, equipment: { board, experience }, completed: next }); return next; });
const build = () => { if (!days || !goal || !spot) return; const eq = { board: board || “none”, experience: experience || “zero” }; const p = generateProgram(days, goal, spot, eq); setProgram(p); setScreen(“program”); setActiveDay(1); setCompleted({}); saveData({ days, goal, spot, board, experience, equipment: eq, completed: {} }); };
const continueSaved = () => { if (!hasSaved) return; setScreen(“program”); setActiveDay(1); };
const resetProgram = () => { clearData(); setProgram(null); setDays(7); setGoal(””); setSpot(””); setBoard(””); setExperience(””); setCompleted({}); setScreen(“home”); setShowResetConfirm(false); setBuilderStep(1); };

const hasSaved = hydrated && program !== null && days && goal && spot;
const total = program?.program?.reduce((s, d) => s + d.lessons.length, 0) || 0;
const done = Object.values(completed).filter(Boolean).length;
const spots = SURF_SPOTS.filter(s => s.name.toLowerCase().includes(spotSearch.toLowerCase()) || s.waveType.toLowerCase().includes(spotSearch.toLowerCase()));
const savedSpot = hasSaved ? SURF_SPOTS.find(s => s.id === spot) : null;
const savedGoal = hasSaved ? GOALS.find(g => g.id === goal) : null;

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap'); @keyframes slideUp { to { opacity: 1; transform: translateY(0); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } @keyframes wave { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-15deg); } 100% { transform: rotate(0deg); } } * { box-sizing: border-box; margin: 0; padding: 0; } html { height: -webkit-fill-available; } body { min-height: 100vh; min-height: -webkit-fill-available; } input:focus { outline: 2px solid #FFB74D; outline-offset: 2px; } input[type="range"] { -webkit-appearance: none; width: 100%; height: 8px; background: linear-gradient(90deg, #4DB6AC, #009688); border-radius: 4px; outline: none; } input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: ${dm ? "#1e2d3d" : "white"}; border: 3px solid #009688; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); } input[type="range"]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: ${dm ? "#1e2d3d" : "white"}; border: 3px solid #009688; cursor: pointer; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: ${dm ? "#2d3f50" : "#CFD8DC"}; border-radius: 3px; } @media (max-width: 480px) { .grid-4 { grid-template-columns: repeat(2, 1fr) !important; } .grid-3 { grid-template-columns: repeat(2, 1fr) !important; } .hero-title { font-size: 32px !important; } .hero-wave { font-size: 60px !important; } .builder-title { font-size: 26px !important; } } @media (max-width: 360px) { .grid-2 { grid-template-columns: 1fr !important; } }`}</style>
<div style={{ minHeight: “100vh”, background: dm ? `linear-gradient(170deg, ${t.bg} 0%, ${t.bg2} 30%, ${t.bg3} 70%, ${t.bg} 100%)` : “linear-gradient(170deg, #FFFDF7 0%, #FFF8E1 30%, #E0F2F1 70%, #FFFDF7 100%)”, fontFamily: “‘DM Sans’, sans-serif”, position: “relative”, color: t.text }}>
{!dm && <WaveBackground />}
<header style={{ position: “sticky”, top: 0, zIndex: 100, paddingTop: “max(12px, env(safe-area-inset-top))”, paddingBottom: 12, paddingLeft: 20, paddingRight: 20, background: t.headerBg, backdropFilter: “blur(20px)”, borderBottom: `1px solid ${t.headerBorder}` }}>
<div style={{ maxWidth: 700, margin: “0 auto”, display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<div onClick={() => setScreen(“home”)} style={{ cursor: “pointer”, display: “flex”, alignItems: “center”, gap: 10 }}>
<span style={{ fontSize: 28, animation: “float 3s ease-in-out infinite” }}>🏄</span>
<div><h1 style={{ fontFamily: “‘Playfair Display’, serif”, fontSize: 22, fontWeight: 900, color: t.text, lineHeight: 1 }}>Soul<span style={{ color: t.accent }}>Surf</span></h1>
<span style={{ fontFamily: “‘Space Mono’, monospace”, fontSize: 9, color: t.text3, letterSpacing: “0.15em”, textTransform: “uppercase” }}>ride the vibe ☮</span></div>
</div>
<div style={{ display: “flex”, gap: 8, alignItems: “center” }}>
<button onClick={toggleDark} style={{ background: dm ? “rgba(255,255,255,0.1)” : “rgba(0,0,0,0.05)”, border: “none”, borderRadius: “50%”, width: 36, height: 36, fontSize: 18, cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “center” }} title={dm ? “Light Mode” : “Dark Mode”}>{dm ? “☀️” : “🌙”}</button>
{screen === “program” && <button onClick={() => { setScreen(“builder”); setBuilderStep(1); }} style={{ background: “linear-gradient(135deg, #FF7043, #FFB74D)”, color: “white”, border: “none”, borderRadius: 20, padding: “8px 16px”, fontSize: 13, fontWeight: 700, cursor: “pointer”, fontFamily: “‘Space Mono’, monospace” }}>✎ Neu planen</button>}
</div>
</div>
</header>
<main style={{ maxWidth: 700, margin: “0 auto”, padding: “0 16px 100px”, position: “relative”, zIndex: 1 }}>

```
      {screen === "home" && (
        <div style={{ paddingTop: 50, textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 16, animation: "float 4s ease-in-out infinite" }}>🌊</div>
          <h2 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: t.text, lineHeight: 1.1, marginBottom: 12 }}>Lerne Surfen.<br /><span style={{ color: t.accent }}>Finde deinen Flow.</span></h2>
          <p style={{ fontSize: 17, color: t.text2, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.6 }}>Dein persönliches Surf-Programm – angepasst an dein Level, Ziel und deinen Spot. 3 bis 30 Tage, mit Equipment-Guide, Videos und Artikeln.</p>
          {hasSaved && (
            <div style={{ background: "linear-gradient(135deg, #004D40, #00695C)", borderRadius: 20, padding: "24px 20px", marginBottom: 24, textAlign: "left", color: "white", position: "relative", overflow: "hidden", animation: "slideUp 0.5s ease forwards", opacity: 0 }}>
              <div style={{ position: "absolute", top: -15, right: -15, fontSize: 80, opacity: 0.1 }}>🏄</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7, marginBottom: 8 }}>💾 Gespeichertes Programm</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{days} Tage · {savedGoal?.emoji} {savedGoal?.name}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>{savedSpot?.emoji} {savedSpot?.name}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>✓ {done}/{total} erledigt</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 6, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ background: "linear-gradient(90deg, #FFB74D, #FF7043)", height: "100%", borderRadius: 10, width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={continueSaved} style={{ flex: 1, background: "white", color: "#004D40", border: "none", borderRadius: 14, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>▶ Weiter surfen</button>
                <button onClick={() => setShowResetConfirm(true)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "14px 18px", fontSize: 14, cursor: "pointer" }}>🗑</button>
              </div>
            </div>
          )}
          {showResetConfirm && (
            <div style={{ background: dm ? "#2d2010" : "#FFF3E0", border: "2px solid #FFB74D", borderRadius: 16, padding: "20px", marginBottom: 24, textAlign: "center", animation: "slideUp 0.3s ease forwards", opacity: 0 }}>
              <p style={{ fontSize: 15, color: "#4E342E", marginBottom: 14 }}>Programm und Fortschritt wirklich löschen?</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={resetProgram} style={{ background: "#E53935", color: "white", border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Ja, löschen</button>
                <button onClick={() => setShowResetConfirm(false)} style={{ background: "#ECEFF1", color: "#546E7A", border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Abbrechen</button>
              </div>
            </div>
          )}
          <button onClick={() => { setScreen("builder"); setBuilderStep(1); }} style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 50, padding: "18px 44px", fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif", boxShadow: "0 8px 30px rgba(0,150,136,0.3)" }}>{hasSaved ? "Neues Programm erstellen" : "Programm erstellen 🤙"}</button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 60 }}>
            {[{ e: "🎒", t: "Equipment", d: "Board, Wetsuit & Basics" }, { e: "📖", t: "Theorie", d: "Ozean, Wellen & Sicherheit" }, { e: "🏄", t: "Praxis", d: "Pop-Up, Paddeln & Wellen" }, { e: "▶", t: "Videos", d: "Tutorials & Artikel" }].map((f, i) => (
              <div key={i} style={{ background: t.card, borderRadius: 20, padding: "24px 12px", border: `1px solid ${t.cardBorder}`, animation: "slideUp 0.5s ease forwards", animationDelay: `${i * 120}ms`, opacity: 0 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{f.e}</div>
                <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.text, marginBottom: 4 }}>{f.t}</h4>
                <p style={{ fontSize: 12, color: t.text3, lineHeight: 1.4 }}>{f.d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 50, padding: 24, background: t.card, borderRadius: 20, border: `1px dashed ${dm ? "#2d3f50" : "#CFD8DC"}` }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.text3, fontStyle: "italic" }}>☮ "The best surfer out there is the one having the most fun." — Phil Edwards</p>
          </div>
        </div>
      )}

      {screen === "builder" && (
        <div style={{ paddingTop: 30 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 40 }}>🛠</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: t.text, margin: "8px 0 6px" }}>Bau dein Programm</h2>
            <p style={{ fontSize: 15, color: t.text3 }}>Schritt {builderStep} von 4</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
              {[1,2,3,4].map(s => (<div key={s} style={{ width: s === builderStep ? 28 : 10, height: 10, borderRadius: 5, background: s <= builderStep ? "linear-gradient(135deg, #009688, #4DB6AC)" : "#E0E0E0", transition: "all 0.3s ease", cursor: s < builderStep ? "pointer" : "default" }} onClick={() => { if (s < builderStep) setBuilderStep(s); }} />))}
            </div>
          </div>

          {builderStep === 1 && (
            <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🏄 Dein Surfboard</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {BOARD_TYPES.map(b => (
                    <button key={b.id} onClick={() => setBoard(b.id)} style={{ background: board === b.id ? "linear-gradient(135deg, #5C6BC0, #7986CB)" : t.inputBg, color: board === b.id ? "white" : t.text, border: board === b.id ? "2px solid #5C6BC0" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "14px 10px", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "center", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{b.emoji}</span>
                      <span style={{ display: "block", fontWeight: 700, fontSize: 12 }}>{b.label}</span>
                      <span style={{ display: "block", fontSize: 10, color: board === b.id ? "rgba(255,255,255,0.7)" : "#90A4AE", marginTop: 2 }}>{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🌿 Deine Erfahrung</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {EXPERIENCE_LEVELS.map(e => (
                    <button key={e.id} onClick={() => setExperience(e.id)} style={{ background: experience === e.id ? "linear-gradient(135deg, #66BB6A, #43A047)" : t.inputBg, color: experience === e.id ? "white" : t.text, border: experience === e.id ? "2px solid #43A047" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 22, marginRight: 8 }}>{e.emoji}</span>{e.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setBuilderStep(2)} style={{ flex: 1, background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
                <button onClick={() => { setBoard(""); setExperience(""); setBuilderStep(2); }} style={{ background: t.inputBg, color: t.text3, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 13, cursor: "pointer" }}>Überspringen</button>
              </div>
            </div>
          )}

          {builderStep === 2 && (
            <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>📅 Wie viele Tage? <span style={{ fontSize: 28, fontWeight: 900, color: "#009688", fontFamily: "'Playfair Display', serif" }}>{days}</span></label>
                <input type="range" min="3" max="30" value={days} onChange={e => setDays(parseInt(e.target.value))} style={{ width: "100%", marginBottom: 8 }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.text3 }}>
                  <span>3 Tage</span>
                  <span style={{ color: "#009688", fontWeight: 700 }}>{days <= 5 ? "Quick Start" : days <= 10 ? "Solide Basis" : days <= 20 ? "Intensiv" : "Full Program"}</span>
                  <span>30 Tage</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setBuilderStep(1)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                <button onClick={() => setBuilderStep(3)} style={{ flex: 1, background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
              </div>
            </div>
          )}

          {builderStep === 3 && (
            <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🎯 Was ist dein Ziel?</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {GOALS.map(g => (
                    <button key={g.id} onClick={() => setGoal(g.id)} style={{ background: goal === g.id ? "linear-gradient(135deg, #FF7043, #FFB74D)" : t.inputBg, color: goal === g.id ? "white" : t.text, border: goal === g.id ? "2px solid #FF7043" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: 16, fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{g.emoji}</span>{g.name}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setBuilderStep(2)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                <button onClick={() => { if (goal) setBuilderStep(4); }} disabled={!goal} style={{ flex: 1, background: goal ? "linear-gradient(135deg, #009688, #4DB6AC)" : "#E0E0E0", color: goal ? "white" : "#9E9E9E", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: goal ? "pointer" : "not-allowed", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
              </div>
            </div>
          )}

          {builderStep === 4 && (
            <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🌍 Wo surfst du? ({SURF_SPOTS.length} Spots)</label>
                <input type="text" placeholder="🔍 Spot suchen..." value={spotSearch} onChange={e => setSpotSearch(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `2px solid ${t.inputBorder}`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 12, background: t.inputBg, color: t.text }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxHeight: 340, overflowY: "auto", paddingRight: 4 }}>
                  {spots.map(s => (
                    <button key={s.id} onClick={() => setSpot(s.id)} style={{ background: spot === s.id ? "linear-gradient(135deg, #5C6BC0, #7986CB)" : t.inputBg, color: spot === s.id ? "white" : t.text, border: spot === s.id ? "2px solid #5C6BC0" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 18, marginRight: 6 }}>{s.emoji}</span>{s.name}
                      <div style={{ fontSize: 11, color: spot === s.id ? "rgba(255,255,255,0.8)" : "#90A4AE", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{s.waveType}</div>
                      <div style={{ fontSize: 10, color: spot === s.id ? "rgba(255,255,255,0.6)" : "#B0BEC5", marginTop: 1, fontFamily: "'Space Mono', monospace" }}>{s.season} · {s.water}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setBuilderStep(3)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                <button onClick={build} disabled={!spot} style={{ flex: 1, background: spot ? "linear-gradient(135deg, #009688, #00796B)" : "#E0E0E0", color: spot ? "white" : "#9E9E9E", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: spot ? "pointer" : "not-allowed", fontFamily: "'Playfair Display', serif", boxShadow: spot ? "0 8px 30px rgba(0,150,136,0.3)" : "none" }}>🏄 Programm generieren</button>
              </div>
            </div>
          )}
        </div>
      )}

      {screen === "program" && program && (
        <div style={{ paddingTop: 24 }}>
          <div style={{ background: "linear-gradient(135deg, #004D40, #00695C, #00897B)", borderRadius: 24, padding: "28px 24px", color: "white", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, opacity: 0.1, transform: "rotate(-15deg)" }}>🌊</div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7 }}>Dein Surf-Programm</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, margin: "6px 0 12px", lineHeight: 1.2 }}>{days} Tage · {program.goal?.emoji} {program.goal?.name}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[`${program.spot?.emoji} ${program.spot?.name}`, `${total} Lektionen`, `🌡 ${program.spot?.water} · ${program.spot?.season}`].map((t,i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 12px", fontSize: 12 }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.8, marginBottom: 5 }}><span>Fortschritt</span><span>{done}/{total}</span></div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 7, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(90deg, #FFB74D, #FF7043)", height: "100%", borderRadius: 10, transition: "width 0.5s ease", width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          {program.spot?.tips && (
            <div style={{ background: t.card, borderRadius: 16, padding: "14px 18px", marginBottom: 20, border: `1px solid ${t.cardBorder}` }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#5C6BC0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📍 Spot-Tipps: {program.spot.name}</div>
              {program.spot.tips.map((tip, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 13, color: t.text2 }}><span style={{ color: "#5C6BC0" }}>•</span><span>{tip}</span></div>))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {[{ k: "all", l: "Alle", e: "📚" }, { k: "equipment", l: "Equipment", e: "🎒" }, { k: "warmup", l: "Warm-Up", e: "🔥" }, { k: "theory", l: "Theorie", e: "📖" }, { k: "practice", l: "Praxis", e: "🏄" }].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)} style={{ background: filter === f.k ? (dm ? "#4DB6AC" : "#263238") : t.inputBg, color: filter === f.k ? "white" : t.text2, border: `1px solid ${filter === f.k ? (dm ? "#4DB6AC" : "#263238") : t.inputBorder}`, borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{f.e} {f.l}</button>
            ))}
          </div>
          {program.program.map(dayData => {
            const fl = dayData.lessons.filter(l => filter === "all" || l.type === filter);
            if (fl.length === 0) return null;
            return (
              <div key={dayData.day} style={{ marginBottom: 20 }}>
                <button onClick={() => setActiveDay(activeDay === dayData.day ? null : dayData.day)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "12px 16px", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13 }}>D{dayData.day}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: t.text }}>Tag {dayData.day}{dayData.day === 1 && dayData.lessons.some(l => l.type === "equipment") ? " · Equipment" : ""}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#90A4AE" }}>{fl.length} Lektionen{fl.some(l => l.videoUrl) ? " · ▶ Videos" : ""}{fl.some(l => l.articleUrl) ? " · 📄" : ""}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 16, color: "#90A4AE", transition: "transform 0.2s ease", transform: activeDay === dayData.day ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                </button>
                {(activeDay === dayData.day) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, paddingLeft: 6 }}>
                    {fl.map((lesson, idx) => (
                      <div key={lesson.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <button onClick={e => { e.stopPropagation(); toggle(lesson.id); }} style={{ marginTop: 18, width: 24, height: 24, minWidth: 24, borderRadius: 7, border: completed[lesson.id] ? "2px solid #4DB6AC" : `2px solid ${dm ? "#2d3f50" : "#CFD8DC"}`, background: completed[lesson.id] ? "#4DB6AC" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", transition: "all 0.2s ease" }}>{completed[lesson.id] && "✓"}</button>
                        <div style={{ flex: 1, opacity: completed[lesson.id] ? 0.5 : 1, transition: "opacity 0.3s ease" }}>
                          <LessonCard lesson={lesson} index={idx} onOpen={setOpenLesson} dm={dm} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ textAlign: "center", padding: "36px 20px", marginTop: 16, borderTop: `1px dashed ${dm ? "#2d3f50" : "#CFD8DC"}` }}>
            <span style={{ fontSize: 46, display: "block", marginBottom: 10, animation: "wave 2s ease-in-out infinite" }}>🤙</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 4 }}>
              {done === total && total > 0 ? "Gnarly! Alle Lektionen abgeschlossen! 🎉" : "Keep paddling, die perfekte Welle kommt!"}
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.text3 }}>☮ surf · learn · repeat</p>
          </div>
        </div>
      )}
    </main>
    <LessonModal lesson={openLesson} onClose={() => setOpenLesson(null)} dm={dm} />
  </div>
</>
```

);
}