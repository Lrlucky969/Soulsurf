import { useState } from "react";

const SURF_SPOTS = [
  { id: "bali", name: "Bali, Indonesia", emoji: "🌺", difficulty: "beginner", waveType: "Sanfte Riffwellen", season: "Apr–Okt", water: "28°C", tips: ["Uluwatu und Padang Padang für Fortgeschrittene, Kuta Beach für Anfänger", "Booties empfohlen wegen scharfem Riff", "Beste Zeit: früher Morgen vor dem Onshore-Wind"] },
  { id: "portugal", name: "Algarve, Portugal", emoji: "🇵🇹", difficulty: "beginner", waveType: "Beachbreaks", season: "Sep–Nov", water: "20°C", tips: ["Arrifana und Amado sind perfekte Anfänger-Spots", "Neoprenanzug 3/2mm nötig, Wasser ist frisch", "Starke Strömungen möglich – immer zwischen den Flaggen surfen"] },
  { id: "hawaii", name: "Hawaii, USA", emoji: "🌈", difficulty: "advanced", waveType: "Große Riffwellen", season: "Nov–Feb", water: "25°C", tips: ["Waikiki für Anfänger, North Shore nur für Erfahrene", "Respektiere die Locals – Hawaii hat strenge Lineup-Hierarchie", "Riffschuhe sind Pflicht an vielen Spots"] },
  { id: "costarica", name: "Costa Rica", emoji: "🦜", difficulty: "beginner", waveType: "Warme Beachbreaks", season: "Dez–Apr", water: "29°C", tips: ["Tamarindo und Nosara sind ideal für Anfänger", "Kein Neopren nötig – Boardshorts reichen", "Achtung Krokodile an Flussmündungen (kein Witz!)"] },
  { id: "australia", name: "Gold Coast, Australien", emoji: "🦘", difficulty: "intermediate", waveType: "Pointbreaks", season: "Feb–Mai", water: "23°C", tips: ["Snapper Rocks hat weltklasse Pointbreaks", "Stinger Season beachten (Okt–Mai)", "Surf-Kultur ist groß – respektiere die Locals"] },
  { id: "morocco", name: "Taghazout, Marokko", emoji: "🐪", difficulty: "intermediate", waveType: "Rechte Pointbreaks", season: "Okt–Mär", water: "18°C", tips: ["Anchor Point ist ein legendärer Rechts-Pointbreak", "3/2mm Neopren empfohlen im Winter", "Günstige Surf-Camps mit Marokkanischem Essen"] },
  { id: "france", name: "Hossegor, Frankreich", emoji: "🥐", difficulty: "intermediate", waveType: "Kraftvolle Beachbreaks", season: "Sep–Nov", water: "19°C", tips: ["La Gravière ist einer der besten Beachbreaks Europas", "Wellen können sehr kraftvoll werden – kenne dein Limit", "Herbst hat die besten Swells bei noch warmem Wasser"] },
  { id: "srilanka", name: "Sri Lanka", emoji: "🐘", difficulty: "beginner", waveType: "Sanfte Pointbreaks", season: "Nov–Apr", water: "28°C", tips: ["Weligama Bay ist perfekt für absolute Anfänger", "Arugam Bay für Fortgeschrittene – langer Rechts-Pointbreak", "Günstigstes Surf-Reiseziel mit leckerem Essen"] },
  { id: "itacare", name: "Itacaré, Brasilien", emoji: "🇧🇷", difficulty: "intermediate", waveType: "Tropische Beachbreaks", season: "Nov–Mär", water: "27°C", tips: ["Praia da Tiririca ist der Hauptspot – konsistent und spaßig", "Regenwald trifft Meer – einzigartige Atmosphäre", "Achte auf Strömungen bei Ebbe an den Flussmündungen"] },
  { id: "floripa", name: "Florianópolis, Brasilien", emoji: "🇧🇷", difficulty: "beginner", waveType: "Konstante Beachbreaks", season: "Apr–Sep", water: "21°C", tips: ["Praia Mole und Joaquina sind die beliebtesten Surf-Strände", "Herbst/Winter bringt die besten Süd-Swells", "Lebendige Surf-Szene mit vielen Surfschulen"] },
  { id: "saquarema", name: "Saquarema, Brasilien", emoji: "🇧🇷", difficulty: "advanced", waveType: "Kraftvoller Beachbreak", season: "Mai–Sep", water: "22°C", tips: ["'Maracanã des Surfens' – Austragungsort von WSL-Events", "Praia de Itaúna hat kraftvolle, hohle Wellen", "Nur für erfahrene Surfer bei großem Swell"] },
  { id: "canary", name: "Fuerteventura, Kanaren", emoji: "🏝", difficulty: "beginner", waveType: "Vielseitige Riffwellen", season: "Okt–Mär", water: "20°C", tips: ["Nördliche Küste für Erfahrene, Süden für Anfänger", "Ganzjährig surfbar – Europas Hawaii", "Booties empfohlen wegen vulkanischem Riff"] },
  { id: "nicaragua", name: "San Juan del Sur, Nicaragua", emoji: "🌋", difficulty: "beginner", waveType: "Warme Beachbreaks", season: "Mär–Nov", water: "28°C", tips: ["Playa Maderas ist der perfekte Lern-Spot", "Offshore-Wind am Morgen fast garantiert", "Noch wenig überlaufen – günstiges Surf-Paradies"] },
  { id: "maldives", name: "Malediven", emoji: "🐠", difficulty: "intermediate", waveType: "Perfekte Riffwellen", season: "Mär–Okt", water: "29°C", tips: ["Surf-Charter-Boote sind der beste Weg zu den Wellen", "Kristallklares Wasser – du siehst den Riffboden", "Reef Booties sind absolute Pflicht"] },
  { id: "mentawai", name: "Mentawai, Indonesien", emoji: "🌴", difficulty: "advanced", waveType: "Weltklasse Riffwellen", season: "Apr–Okt", water: "28°C", tips: ["Lance's Right und Macaronis sind Weltklasse-Wellen", "Nur per Boot erreichbar – plane Surf-Charter", "Scharfes Riff – Erste-Hilfe-Kit ist Pflicht"] },
  { id: "jeffreys", name: "Jeffreys Bay, Südafrika", emoji: "🦈", difficulty: "advanced", waveType: "Legendärer Pointbreak", season: "Jun–Sep", water: "17°C", tips: ["Supertubes ist eine der besten Rechtswellen der Welt", "4/3mm Neopren nötig – das Wasser ist kalt", "Haie sind real – surfe in Gruppen und meide Flussmündungen"] },
  { id: "ericeira", name: "Ericeira, Portugal", emoji: "🇵🇹", difficulty: "intermediate", waveType: "World Surf Reserve", season: "Sep–Apr", water: "17°C", tips: ["Ribeira d'Ilhas ist der bekannteste Spot", "World Surf Reserve – geschützte Küste mit perfekten Wellen", "Nur 45 Min von Lissabon – perfekt für Surf & City"] },
  { id: "siargao", name: "Siargao, Philippinen", emoji: "🏄", difficulty: "intermediate", waveType: "Cloud 9 Riffwellen", season: "Aug–Nov", water: "28°C", tips: ["Cloud 9 ist weltberühmt – kräftige, hohle Rechtswelle", "Für Anfänger: Jacking Horse oder Stimpy's", "Tropenparadies – Palmen, türkises Wasser, entspannte Vibes"] },
];

const GOALS = [
  { id: "firstwave", name: "Erste Welle stehen", emoji: "🌊", level: "beginner" },
  { id: "greenwave", name: "Grüne Wellen surfen", emoji: "🟢", level: "intermediate" },
  { id: "cutback", name: "Cutbacks & Turns", emoji: "🔄", level: "advanced" },
  { id: "tube", name: "Tube Riding", emoji: "🤙", level: "expert" },
];

const CONTENT_POOL = {
  warmup: [
    { title: "Schulter-Mobilität", icon: "🔄", duration: "5 Min", level: "beginner", content: "Schultern sind der Motor beim Paddeln. Diese Übungen beugen Verletzungen vor und verbessern deine Paddelpower.", steps: ["Armkreisen vorwärts – 15x groß und kontrolliert", "Armkreisen rückwärts – 15x", "Schulter-Shrugs: hoch zu den Ohren, 3 Sek halten, fallen lassen – 10x", "Arm quer über die Brust ziehen, 20 Sek pro Seite", "Hände hinter dem Rücken verschränken, Brust raus – 20 Sek"], videoUrl: "https://www.youtube.com/embed/SHbk-L_8xZU" },
    { title: "Hüft-Opener & Beine", icon: "🦵", duration: "5 Min", level: "beginner", content: "Offene Hüften sind entscheidend für den Pop-Up und tiefe Turns auf der Welle.", steps: ["Tiefe Ausfallschritte – 10x pro Seite", "Sumo-Squats: breiter Stand, tief – 15x", "Hüftkreisen: große Kreise – 10x pro Richtung", "Pigeon Stretch: 30 Sek pro Seite", "Knie-zur-Brust im Stehen – 10x pro Seite"], videoUrl: "https://www.youtube.com/embed/NG9qbvAN3gQ" },
    { title: "Core Activation", icon: "🔥", duration: "7 Min", level: "beginner", content: "Dein Core verbindet Ober- und Unterkörper. Ohne starken Core kein stabiler Stand.", steps: ["Plank halten – 30 Sek (steigere auf 60)", "Side Plank – 20 Sek pro Seite", "Dead Bugs: gegengleich Arm/Bein – 10x pro Seite", "Bicycle Crunches – 20x langsam", "Superman Hold: 15 Sek, 3x", "Cat-Cow: 10x im Wechsel"], videoUrl: "https://www.youtube.com/embed/DHD1-2P94DI" },
    { title: "Pop-Up Drill Warm-Up", icon: "⚡", duration: "5 Min", level: "beginner", content: "Aufwärmen und den wichtigsten Move gleichzeitig trainieren.", steps: ["5 Burpees zum Aufwärmen", "10 langsame Push-Ups", "Push-Up → explosiv aufspringen in Surf-Stance – 10x", "Surf-Stance halten: 10 Sek pro Seite", "Speed-Round: 10 Pop-Ups so schnell wie möglich"], videoUrl: "https://www.youtube.com/embed/wn5KqWwP6uQ" },
    { title: "Wirbelsäulen-Rotation", icon: "🌀", duration: "5 Min", level: "beginner", content: "Beim Surfen rotierst du ständig. Mobilisiere deine Wirbelsäule vor jeder Session.", steps: ["Thread the Needle: 8x pro Seite", "Sitzende Rotation: 15 Sek pro Seite", "Open Book: 8x pro Seite", "Standing Windmill: 10x abwechselnd", "Scorpion Stretch: 8x pro Seite"], videoUrl: "https://www.youtube.com/embed/4BOTvaRaDjI" },
    { title: "Atem & Apnoe-Training", icon: "🫁", duration: "8 Min", level: "intermediate", content: "Wer entspannt unter Wasser bleiben kann, hat einen enormen Vorteil bei Wipeouts.", steps: ["Box Breathing: 4-4-4-4 Sek – 5 Zyklen", "Verlängertes Ausatmen: 4 ein, 8 aus – 5 Zyklen", "Atem anhalten: Stoppuhr, 3x Maximum", "Recovery Breathing: 3x schnell nach Anhalten", "Unterwasser-Sim: Atem halten + 10 Squats"], videoUrl: "https://www.youtube.com/embed/LU6Oi80n5J4" },
    { title: "Beach-Yoga Flow", icon: "🧘", duration: "10 Min", level: "beginner", content: "Ein fließender Yoga-Flow der alle surf-relevanten Muskelgruppen aktiviert und dehnt.", steps: ["Sonnengruß A – 3 Durchgänge", "Krieger I: 30 Sek pro Seite", "Krieger II: 30 Sek pro Seite", "Herabschauender Hund: 45 Sek halten", "Kobra: 15 Sek, 3x (wichtig für Paddel-Position)", "Kind-Pose: 30 Sek Entspannung"], videoUrl: "https://www.youtube.com/embed/7kgZnJqzNaU" },
    { title: "Sprungkraft & Explosivität", icon: "💥", duration: "6 Min", level: "intermediate", content: "Der Pop-Up erfordert explosive Kraft. Trainiere schnelle Muskelrekrutierung.", steps: ["Squat Jumps: 10x so hoch wie möglich", "Tuck Jumps: 8x Knie zur Brust", "Lateral Bounds: 10x seitlich springen", "Burpee to Pop-Up: 8x", "Box Jumps (oder Stufe): 10x"], videoUrl: "https://www.youtube.com/embed/tKBMiSq0lVE" },
    { title: "Balance-Training am Strand", icon: "⚖️", duration: "7 Min", level: "beginner", content: "Gleichgewicht ist der Schlüssel zum Surfen. Trainiere auf instabilem Untergrund.", steps: ["Einbeinstand: 30 Sek pro Bein (Augen offen)", "Einbeinstand: 20 Sek pro Bein (Augen zu!)", "Surf-Stance auf weichem Sand: 30 Sek", "Einbein-Squats: 8x pro Seite", "Zehenstand gehen: 20 Schritte vor und zurück"], videoUrl: "https://www.youtube.com/embed/7kgZnJqzNaU" },
    { title: "Paddel-Power Warm-Up", icon: "💪", duration: "6 Min", level: "intermediate", content: "Aktiviere Schultern, Lat und Trizeps für maximale Paddelkraft.", steps: ["Resistance Band Pull-Aparts: 15x", "Prone Y-T-W Raises (Bauchlage): 8x je Form", "Swimming auf dem Bauch: 30 Sek", "Push-Up Plus (Schulterblätter spreizen): 10x", "Arm-Haulers: 20x (Bauchlage, Arme vor-zurück)"], videoUrl: "https://www.youtube.com/embed/rvJMijyKaBw" },
  ],
  theory: [
    { title: "Ozean lesen lernen", icon: "🌊", duration: "15 Min", level: "beginner", content: "Wellen entstehen durch Wind über der Wasseroberfläche. Je länger die Strecke (Fetch) und je stärker der Wind, desto größer die Wellen.", tips: ["Beobachte das Meer 15 Min bevor du reingehst", "Wellen kommen in Sets von 3-7 Wellen", "Ruhige Phasen zwischen Sets zum Rauspaddeln nutzen", "Schaumwellen (Whitewash) sind perfekt für Anfänger"], keyTerms: ["Set", "Fetch", "Whitewash", "Lineup", "Impact Zone"], videoUrl: "https://www.youtube.com/embed/bpSq3VVj-AI" },
    { title: "Surf-Etikette & Vorfahrt", icon: "🤝", duration: "10 Min", level: "beginner", content: "Im Wasser gibt es ungeschriebene Gesetze. Die wichtigste Regel: Wer dem Peak am nächsten und zuerst auf der Welle steht, hat Vorfahrt.", tips: ["Nie jemandem die Welle droppen", "Beim Rauspaddeln hinter der Brechzone bleiben", "Anfänger: nicht ins Lineup der Locals paddeln", "Lächeln öffnet jedes Lineup"], keyTerms: ["Drop-In", "Snaking", "Lineup", "Peak", "Priority"], videoUrl: "https://www.youtube.com/embed/RhdHGahIjKQ" },
    { title: "Wellentypen verstehen", icon: "📐", duration: "12 Min", level: "beginner", content: "Beachbreaks brechen über Sand (unberechenbar, verzeihend). Reefbreaks über Riff/Fels (konstant, gefährlicher). Pointbreaks an Landzungen (lange Rides).", tips: ["Beachbreaks ideal für Anfänger", "Reefbreaks: Booties tragen", "Offshore = glatte Wellen, Onshore = unruhig"], keyTerms: ["Beachbreak", "Reefbreak", "Pointbreak", "Offshore", "Onshore"], videoUrl: "https://www.youtube.com/embed/JMJ2PfMGfRY" },
    { title: "Sicherheit im Wasser", icon: "⚠️", duration: "15 Min", level: "beginner", content: "Strömungen (Rip Currents) ziehen dich aufs Meer – niemals dagegen anschwimmen! Schwimme parallel zum Strand.", tips: ["Rip Current: quer zur Strömung schwimmen", "Board nie loslassen – Leash tragen!", "Nie bei Gewitter oder Dunkelheit surfen", "Rifffreundliche Sonnencreme benutzen"], keyTerms: ["Rip Current", "Leash", "Channel", "Shorebreak"], videoUrl: "https://www.youtube.com/embed/PuAlDTC_gAI" },
    { title: "Dein Board kennen", icon: "🏄", duration: "10 Min", level: "beginner", content: "Anfänger brauchen Volumen! Ein Softboard (8-9 Fuß) gibt Stabilität. Shortboards sind für Anfänger frustrierend.", tips: ["Starte mit Softboard – sicherer und verzeihender", "Board mindestens 1 Fuß länger als du", "Ohne Wax rutschst du sofort ab", "Thruster-Setup für Anfänger"], keyTerms: ["Softboard", "Longboard", "Shortboard", "Volume", "Rails"], videoUrl: "https://www.youtube.com/embed/gyUaRwLfdXg" },
    { title: "Gezeiten & Surf-Forecast", icon: "🌙", duration: "15 Min", level: "intermediate", content: "Bei Ebbe sind Wellen steiler und kraftvoller, bei Flut weicher. Apps wie Surfline zeigen Wellenhöhe, Periode, Wind und Gezeiten.", tips: ["Meiste Spots funktionieren bei Mid-Tide am besten", "Periode > 10 Sek = kraftvolle Wellen", "Forecast am Abend vorher checken", "Offshore-Wind am Morgen = bestes Fenster"], keyTerms: ["Tide", "Swell Period", "Swell Direction", "Wind Speed"], videoUrl: "https://www.youtube.com/embed/TjvWDMBSklI" },
    { title: "Surf-Fitness verstehen", icon: "💪", duration: "12 Min", level: "intermediate", content: "Paddeln trainiert Schultern und Rücken, Take-Off braucht explosive Kraft, Balance kommt aus der Körpermitte.", tips: ["Schwimmen ist bestes Cross-Training", "Yoga für Balance und Flexibilität", "Schulter-Mobilität täglich dehnen", "Aufwärmen vor jeder Session"], keyTerms: ["Paddel-Fitness", "Core-Stability", "Pop-Up Kraft"], videoUrl: "https://www.youtube.com/embed/DHD1-2P94DI" },
    { title: "Wind & Wetter lesen", icon: "🌬️", duration: "10 Min", level: "intermediate", content: "Wind ist der wichtigste Faktor für die Wellenqualität. Offshore-Wind (vom Land aufs Meer) glättet die Wellen. Onshore (vom Meer ans Land) macht sie unruhig.", tips: ["Morgenstunden haben oft die besten Bedingungen", "Sideshore-Wind kann auch gute Wellen erzeugen", "Wetterumschwünge bringen oft die besten Swells", "Lerne Wetterkarten zu lesen"], keyTerms: ["Offshore", "Onshore", "Sideshore", "Glasig", "Choppy"], videoUrl: "https://www.youtube.com/embed/bpSq3VVj-AI" },
    { title: "Board-Shapes & Finnen", icon: "🔧", duration: "12 Min", level: "intermediate", content: "Jedes Board-Shape surft anders. Mehr Rocker = wendiger, weniger Rocker = schneller. Finnen beeinflussen Stabilität und Drehfreude.", tips: ["Single Fin = lässiger Glide, Thruster = Kontrolle", "Fish-Shape: schnell in kleinen Wellen", "Gun: für große Wellen über 2m", "Experimentiere mit verschiedenen Finnen-Setups"], keyTerms: ["Rocker", "Concave", "Fish", "Gun", "Quad"], videoUrl: "https://www.youtube.com/embed/gyUaRwLfdXg" },
    { title: "Surf-Psychologie & Fear", icon: "🧠", duration: "10 Min", level: "advanced", content: "Angst im Wasser ist normal und gesund. Der Schlüssel ist, zwischen gesunder Vorsicht und limitierender Angst zu unterscheiden.", tips: ["Atme bewusst wenn du Angst spürst", "Steigere dich schrittweise in größere Wellen", "Visualisiere erfolgreiche Rides vor der Session", "Surfe mit Buddies – Sicherheit reduziert Angst"], keyTerms: ["Commitment", "Fear Management", "Visualization"], videoUrl: "https://www.youtube.com/embed/dKYg3u5r9Zc" },
  ],
  practice: [
    { title: "Pop-Up an Land üben", icon: "🤸", duration: "30 Min", level: "beginner", content: "Der Pop-Up ist DIE fundamentale Bewegung. Übe ihn 50x am Tag am Strand.", steps: ["Flach auf den Bauch, Hände neben der Brust", "Explosiv hochdrücken – NICHT auf die Knie!", "Hinterer Fuß zuerst aufs Board (quer)", "Vorderfuß zwischen die Hände", "Knie gebeugt, Blick nach vorne", "50x wiederholen – Muskelgedächtnis!"], proTip: "Filme dich selbst! Die meisten denken sie machen es richtig, bis sie das Video sehen.", videoUrl: "https://www.youtube.com/embed/wn5KqWwP6uQ" },
    { title: "Paddeltechnik perfektionieren", icon: "💧", duration: "45 Min", level: "beginner", content: "80% deiner Zeit verbringst du mit Paddeln. Effiziente Technik spart Energie.", steps: ["Position finden: Nase ~5cm über Wasser", "Arme tief eintauchen, nicht an Oberfläche kratzen", "Fingerspitzen zusammen, Unterwasser = Power", "Kurze, kraftvolle Züge", "Blick nach vorne", "Beine zusammen und still!"], proTip: "20 Min nur paddeln ohne Wellen zu nehmen – baut Ausdauer.", videoUrl: "https://www.youtube.com/embed/rvJMijyKaBw" },
    { title: "Whitewash-Wellen reiten", icon: "🫧", duration: "60 Min", level: "beginner", content: "Gebrochene Schaumwellen sind perfekt zum Üben: konstant, verzeihend und nah am Strand.", steps: ["Hüfttief im Wasser stehen", "Schaumwelle kommt → zum Strand drehen", "Aufs Board springen, 3-4 kräftige Züge", "Welle schiebt dich → Pop-Up!", "Zum Strand gleiten", "Ziel: 10 Wellen hintereinander stehen"], proTip: "2-3 Paddelzüge BEVOR du aufstehst. Speed = Stabilität!", videoUrl: "https://www.youtube.com/embed/dqOPEZJVmMU" },
    { title: "Turtle Roll & Duck Dive", icon: "🐢", duration: "30 Min", level: "beginner", content: "Um zu den guten Wellen zu kommen, musst du durch die Brechzone.", steps: ["Turtle Roll: Rails fest greifen", "Mit dem Board umdrehen (du unten)", "Festhalten während Welle über dich rollt", "Zurückdrehen und weiterpaddeln", "Duck Dive: Nose runterdrücken", "Knie drückt Tail nach – unter die Welle"], proTip: "Starte den Turtle Roll 2m VOR der Welle!", videoUrl: "https://www.youtube.com/embed/GjyntY-Xr6U" },
    { title: "Grüne Wellen anpaddeln", icon: "🟢", duration: "60 Min", level: "intermediate", content: "Ungebrochene grüne Wellen nehmen – positioniere dich im Lineup und paddle früh und hart.", steps: ["Leicht vor der Brechzone positionieren", "Mittlere Welle im Set wählen", "Früh Richtung Strand drehen, HART paddeln", "6-8 kraftvolle Paddelzüge", "Moment des 'Catch' spüren", "Pop-Up und schräg zur Welle abfahren"], proTip: "Paddle früher und härter als du denkst – der #1 Anfängerfehler!", videoUrl: "https://www.youtube.com/embed/wM4vjaKBM_Q" },
    { title: "Bottom Turn Basics", icon: "↩️", duration: "45 Min", level: "intermediate", content: "Das Fundament aller Manöver. Welle hinunterfahren, unten Turn einleiten.", steps: ["Schräg die Welle hinunterfahren", "Gewicht auf Fersen (Backside) oder Zehen (Frontside)", "Blick und Schultern in Drehrichtung", "Knie tief, Schwerpunkt niedrig", "Geschwindigkeit aus dem Turn mitnehmen", "Zurück die Wellenwand hoch"], proTip: "Schau IMMER dahin wo du hin willst, nie aufs Board.", videoUrl: "https://www.youtube.com/embed/X3S_9BgrHJU" },
    { title: "Linie halten & Trimmen", icon: "〰️", duration: "40 Min", level: "intermediate", content: "Auf der Welle bleiben heißt die richtige Linie finden – nicht zu hoch, nicht zu tief auf der Wellenwand.", steps: ["Nach dem Take-Off sofort die Schulter anvisieren", "Gewicht leicht nach vorne = mehr Speed", "Gewicht nach hinten = abbremsen", "Die Powerpocket finden (steilster Teil der Welle)", "Kleine Gewichtsverlagerungen statt großer Bewegungen", "Arme zur Balance nutzen – wie ein Seiltänzer"], proTip: "Die Powerpocket ist direkt unter der brechenden Lippe – dort hast du maximale Energie.", videoUrl: "https://www.youtube.com/embed/jAFycMFMHVg" },
    { title: "Cutback & Top Turn", icon: "🔄", duration: "60 Min", level: "advanced", content: "Cutback bringt dich zurück zur Wellenkraft. Top Turn am Kamm leitet neue Manöver ein.", steps: ["Speed durch 2-3 Pumps aufbauen", "Am Kamm: Gewicht auf hinteren Fuß", "Schultern und Kopf in neue Richtung", "Vorderer Arm zeigt die Richtung", "Board folgt durch den Arc", "Gewicht beim Ausfahren zentrieren"], proTip: "Keine Speed = kein Turn. Immer erst Speed aufbauen!", videoUrl: "https://www.youtube.com/embed/jAFycMFMHVg" },
    { title: "Surf-Meditation & Flow", icon: "🧘", duration: "20 Min", level: "beginner", content: "Die besten Wellen fängst du, wenn du aufhörst zu denken und anfängst zu fühlen.", steps: ["Auf dem Board im ruhigen Wasser sitzen", "Augen schließen, Dünung spüren", "10x atmen: 4 Sek ein, 6 Sek aus", "Augen öffnen, Horizont beobachten", "Gedanken weiterziehen lassen", "Nächste Welle fühlen bevor du sie siehst"], proTip: "Stress = steifer Körper = schlechtes Surfen. Relax!", videoUrl: "https://www.youtube.com/embed/dKYg3u5r9Zc" },
    { title: "Wipeout Recovery", icon: "🌪️", duration: "30 Min", level: "intermediate", content: "Wipeouts gehören dazu. Wer sie meistert, surft mutiger und progressiver.", steps: ["Beim Fallen: Arme schützend über den Kopf", "Unter Wasser: Fötus-Position, schütze den Kopf", "Nicht sofort auftauchen – warte bis die Turbulenz nachlässt", "Orientiere dich an den Luftblasen (zeigen nach oben)", "Board per Leash zu dir ziehen", "Sofort Richtung checken und nächste Welle beobachten"], proTip: "Übe Atem anhalten im Pool. 30 Sekunden unter Wasser reichen für 95% aller Wipeouts.", videoUrl: "https://www.youtube.com/embed/PuAlDTC_gAI" },
  ]
};

function generateProgram(numDays, goalId, spotId) {
  const goal = GOALS.find(g => g.id === goalId);
  const spot = SURF_SPOTS.find(s => s.id === spotId);
  const days = parseInt(numDays);
  
  let levels = ["beginner"];
  if (["intermediate","advanced","expert"].includes(goal?.level)) levels.push("intermediate");
  if (["advanced","expert"].includes(goal?.level)) levels.push("advanced");

  const warmups = CONTENT_POOL.warmup.filter(w => levels.includes(w.level));
  const theories = CONTENT_POOL.theory.filter(t => levels.includes(t.level));
  const practices = CONTENT_POOL.practice.filter(p => levels.includes(p.level));

  const program = [];
  let wIdx = 0, tIdx = 0, pIdx = 0;

  for (let d = 1; d <= days; d++) {
    const dayLessons = [];
    const dayId = `d${d}`;

    // Every day gets a warmup
    if (warmups.length > 0) {
      const w = warmups[wIdx % warmups.length];
      dayLessons.push({ ...w, id: `${dayId}-w`, type: "warmup" });
      wIdx++;
    }

    // Alternate emphasis: odd days = more theory, even = more practice
    if (d % 2 === 1) {
      if (theories.length > 0) {
        dayLessons.push({ ...theories[tIdx % theories.length], id: `${dayId}-t1`, type: "theory" });
        tIdx++;
      }
      if (practices.length > 0) {
        dayLessons.push({ ...practices[pIdx % practices.length], id: `${dayId}-p1`, type: "practice" });
        pIdx++;
      }
      if (days <= 5 && theories.length > 1) {
        dayLessons.push({ ...theories[tIdx % theories.length], id: `${dayId}-t2`, type: "theory" });
        tIdx++;
      }
    } else {
      if (practices.length > 0) {
        dayLessons.push({ ...practices[pIdx % practices.length], id: `${dayId}-p1`, type: "practice" });
        pIdx++;
      }
      if (theories.length > 0) {
        dayLessons.push({ ...theories[tIdx % theories.length], id: `${dayId}-t1`, type: "theory" });
        tIdx++;
      }
      if (practices.length > 1) {
        dayLessons.push({ ...practices[pIdx % practices.length], id: `${dayId}-p2`, type: "practice" });
        pIdx++;
      }
    }

    // Last day: add a meditation/flow session
    if (d === days) {
      const meditation = CONTENT_POOL.practice.find(p => p.title.includes("Meditation"));
      if (meditation && !dayLessons.some(l => l.title.includes("Meditation"))) {
        dayLessons.push({ ...meditation, id: `${dayId}-med`, type: "practice" });
      }
    }

    program.push({ day: d, lessons: dayLessons });
  }
  return { program, goal, spot };
}

const VideoEmbed = ({ url }) => {
  if (!url) return null;
  return (
    <div style={{ margin: "16px 0", borderRadius: 16, overflow: "hidden", background: "#111", position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={`${url}?rel=0&modestbranding=1`}
        title="Tutorial Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
      />
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

const LessonCard = ({ lesson, index, onOpen }) => {
  const colors = {
    theory: { bg: "linear-gradient(135deg, #FFF8E1, #FFF3E0)", border: "#FFB74D", tag: "#E65100", tagBg: "#FFF3E0", label: "Theorie" },
    practice: { bg: "linear-gradient(135deg, #E0F2F1, #E0F7FA)", border: "#4DB6AC", tag: "#004D40", tagBg: "#E0F2F1", label: "Praxis" },
    warmup: { bg: "linear-gradient(135deg, #FCE4EC, #F3E5F5)", border: "#F06292", tag: "#880E4F", tagBg: "#FCE4EC", label: "Warm-Up" }
  };
  const c = colors[lesson.type] || colors.theory;
  return (
    <div onClick={() => onOpen(lesson)} style={{
      background: c.bg, border: `2px solid ${c.border}22`, borderRadius: 16,
      padding: "18px 20px", cursor: "pointer", transition: "all 0.3s ease",
      animationDelay: `${index * 60}ms`, animation: "slideUp 0.5s ease forwards", opacity: 0,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ fontSize: 28 }}>{lesson.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c.tag, background: c.tagBg, padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{c.label}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#78909C", background: "#ECEFF1", padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{lesson.duration}</span>
            {lesson.videoUrl && <span style={{ fontSize: 10, fontWeight: 600, color: "#C62828", background: "#FFEBEE", padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>▶ Video</span>}
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#263238", margin: 0, lineHeight: 1.3 }}>{lesson.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#546E7A", margin: "6px 0 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{lesson.content}</p>
        </div>
        <div style={{ fontSize: 18, color: c.border, marginTop: 2 }}>→</div>
      </div>
    </div>
  );
};

const LessonModal = ({ lesson, onClose }) => {
  if (!lesson) return null;
  const tc = { theory: "#E65100", practice: "#004D40", warmup: "#880E4F" };
  const tl = { theory: "📖 Theorie", practice: "🏄 Praxis", warmup: "🔥 Warm-Up" };
  const tb = { theory: "#FFF3E0", practice: "#E0F2F1", warmup: "#FCE4EC" };
  const stepBg = { theory: "#FFF8E1", practice: "#E0F2F1", warmup: "#FCE4EC" };
  const stepColor = { theory: "#4E342E", practice: "#1B5E20", warmup: "#880E4F" };
  const stepBadge = { theory: "#FFB74D", practice: "#4DB6AC", warmup: "#F06292" };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "fadeIn 0.3s ease"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#FFFDF7", borderRadius: 24, maxWidth: 620, width: "100%",
        maxHeight: "85vh", overflow: "auto", padding: "28px 24px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "slideUp 0.4s ease"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 44 }}>{lesson.icon}</span>
          <button onClick={onClose} style={{ background: "#F5F5F5", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: "#546E7A", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: tc[lesson.type], background: tb[lesson.type], padding: "4px 12px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{tl[lesson.type]} · {lesson.duration}</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: "#1a1a1a", margin: "14px 0 10px", lineHeight: 1.2 }}>{lesson.title}</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#37474F", lineHeight: 1.7, margin: "0 0 16px", borderLeft: "3px solid #FFB74D", paddingLeft: 14, fontStyle: "italic" }}>{lesson.content}</p>

        {lesson.videoUrl && <VideoEmbed url={lesson.videoUrl} />}

        {lesson.tips && (
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#E65100", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>💡 Tipps</h4>
            {lesson.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, padding: "8px 12px", background: "#FFF8E1", borderRadius: 10, fontSize: 13, color: "#4E342E", fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: "#FFB74D", fontWeight: 700 }}>✦</span><span>{tip}</span>
              </div>
            ))}
          </div>
        )}
        {lesson.steps && (
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: tc[lesson.type], textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>📋 Schritt für Schritt</h4>
            {lesson.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, padding: "10px 12px", background: stepBg[lesson.type], borderRadius: 10, fontSize: 13, color: stepColor[lesson.type], fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ background: stepBadge[lesson.type], color: "white", borderRadius: "50%", width: 22, height: 22, minWidth: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                <span style={{ lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        )}
        {lesson.proTip && (
          <div style={{ background: "linear-gradient(135deg, #FFF3E0, #FFECB3)", borderRadius: 14, padding: "14px 16px", border: "2px dashed #FFB74D", marginBottom: 12 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "#E65100", marginBottom: 4 }}>🤙 PRO-TIPP</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#4E342E", margin: 0, fontWeight: 500 }}>{lesson.proTip}</p>
          </div>
        )}
        {lesson.keyTerms && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {lesson.keyTerms.map((t, i) => <span key={i} style={{ background: "#ECEFF1", color: "#546E7A", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>{t}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SurfApp() {
  const [screen, setScreen] = useState("home");
  const [days, setDays] = useState("");
  const [goal, setGoal] = useState("");
  const [spot, setSpot] = useState("");
  const [program, setProgram] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);
  const [filter, setFilter] = useState("all");
  const [activeDay, setActiveDay] = useState(null);
  const [completed, setCompleted] = useState({});
  const [spotSearch, setSpotSearch] = useState("");

  const toggle = (id) => setCompleted(p => ({ ...p, [id]: !p[id] }));
  const build = () => { if (!days || !goal || !spot) return; setProgram(generateProgram(days, goal, spot)); setScreen("program"); setActiveDay(null); setCompleted({}); };
  const total = program?.program?.reduce((s, d) => s + d.lessons.length, 0) || 0;
  const done = Object.values(completed).filter(Boolean).length;
  const spots = SURF_SPOTS.filter(s => s.name.toLowerCase().includes(spotSearch.toLowerCase()) || s.waveType.toLowerCase().includes(spotSearch.toLowerCase()));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wave { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-15deg); } 100% { transform: rotate(0deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: 2px solid #FFB74D; outline-offset: 2px; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #CFD8DC; border-radius: 3px; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #FFFDF7 0%, #FFF8E1 30%, #E0F2F1 70%, #FFFDF7 100%)", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
        <WaveBackground />
        <header style={{ position: "sticky", top: 0, zIndex: 100, padding: "12px 20px", background: "rgba(255,253,247,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div onClick={() => { setScreen("home"); setProgram(null); setCompleted({}); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28, animation: "float 3s ease-in-out infinite" }}>🏄</span>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#263238", lineHeight: 1 }}>Soul<span style={{ color: "#009688" }}>Surf</span></h1>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#78909C", letterSpacing: "0.15em", textTransform: "uppercase" }}>ride the vibe ☮</span>
              </div>
            </div>
            {screen === "program" && <button onClick={() => setScreen("builder")} style={{ background: "linear-gradient(135deg, #FF7043, #FFB74D)", color: "white", border: "none", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>✎ Neu planen</button>}
          </div>
        </header>

        <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 100px", position: "relative", zIndex: 1 }}>

          {screen === "home" && (
            <div style={{ paddingTop: 50, textAlign: "center" }}>
              <div style={{ fontSize: 80, marginBottom: 16, animation: "float 4s ease-in-out infinite" }}>🌊</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 12 }}>Lerne Surfen.<br /><span style={{ color: "#009688" }}>Finde deinen Flow.</span></h2>
              <p style={{ fontSize: 17, color: "#546E7A", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.6 }}>Dein persönliches Surf-Programm mit Warm-Ups, Theorie, Praxis und Video-Tutorials – angepasst an dein Level, Ziel und deinen Spot.</p>
              <button onClick={() => setScreen("builder")} style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 50, padding: "18px 44px", fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif", boxShadow: "0 8px 30px rgba(0,150,136,0.3)", transition: "all 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >Programm erstellen 🤙</button>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 60 }}>
                {[{ e: "🔥", t: "Warm-Up", d: "Aufwärmen vor jeder Session" }, { e: "📖", t: "Theorie", d: "Ozean, Wellen & Sicherheit" }, { e: "🏄", t: "Praxis", d: "Pop-Up, Paddeln & Wellen" }, { e: "▶", t: "Videos", d: "Tutorials in jeder Lektion" }].map((f, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "24px 12px", border: "1px solid rgba(0,0,0,0.05)", animation: "slideUp 0.5s ease forwards", animationDelay: `${i * 120}ms`, opacity: 0 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{f.e}</div>
                    <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#263238", marginBottom: 4 }}>{f.t}</h4>
                    <p style={{ fontSize: 12, color: "#78909C", lineHeight: 1.4 }}>{f.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 50, padding: 24, background: "rgba(255,255,255,0.5)", borderRadius: 20, border: "1px dashed #CFD8DC" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#90A4AE", fontStyle: "italic" }}>☮ "The best surfer out there is the one having the most fun." — Phil Edwards</p>
              </div>
            </div>
          )}

          {screen === "builder" && (
            <div style={{ paddingTop: 30 }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <span style={{ fontSize: 40 }}>🛠</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#1a1a1a", margin: "8px 0 6px" }}>Bau dein Programm</h2>
                <p style={{ fontSize: 15, color: "#78909C" }}>Wähle deine Filter für dein perfektes Surf-Programm.</p>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#546E7A", display: "block", marginBottom: 10 }}>📅 Wie viele Tage?</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["3", "5", "7", "10", "14"].map(d => (
                    <button key={d} onClick={() => setDays(d)} style={{ background: days === d ? "linear-gradient(135deg, #009688, #4DB6AC)" : "rgba(255,255,255,0.8)", color: days === d ? "white" : "#263238", border: days === d ? "2px solid #009688" : "2px solid #E0E0E0", borderRadius: 14, padding: "14px 22px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Mono', monospace", transition: "all 0.2s ease", minWidth: 60 }}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#546E7A", display: "block", marginBottom: 10 }}>🎯 Was ist dein Ziel?</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {GOALS.map(g => (
                    <button key={g.id} onClick={() => setGoal(g.id)} style={{ background: goal === g.id ? "linear-gradient(135deg, #FF7043, #FFB74D)" : "rgba(255,255,255,0.8)", color: goal === g.id ? "white" : "#263238", border: goal === g.id ? "2px solid #FF7043" : "2px solid #E0E0E0", borderRadius: 14, padding: 16, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{g.emoji}</span>{g.name}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 36 }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#546E7A", display: "block", marginBottom: 10 }}>🌍 Wo surfst du? ({SURF_SPOTS.length} Spots)</label>
                <input type="text" placeholder="🔍 Spot suchen..." value={spotSearch} onChange={e => setSpotSearch(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #E0E0E0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 12, background: "rgba(255,255,255,0.8)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxHeight: 340, overflowY: "auto", paddingRight: 4 }}>
                  {spots.map(s => (
                    <button key={s.id} onClick={() => setSpot(s.id)} style={{ background: spot === s.id ? "linear-gradient(135deg, #5C6BC0, #7986CB)" : "rgba(255,255,255,0.8)", color: spot === s.id ? "white" : "#263238", border: spot === s.id ? "2px solid #5C6BC0" : "2px solid #E0E0E0", borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left", transition: "all 0.2s ease" }}>
                      <span style={{ fontSize: 18, marginRight: 6 }}>{s.emoji}</span>{s.name}
                      <div style={{ fontSize: 11, color: spot === s.id ? "rgba(255,255,255,0.8)" : "#90A4AE", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{s.waveType}</div>
                      <div style={{ fontSize: 10, color: spot === s.id ? "rgba(255,255,255,0.6)" : "#B0BEC5", marginTop: 1, fontFamily: "'Space Mono', monospace" }}>{s.season} · {s.water}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={build} disabled={!days || !goal || !spot} style={{ width: "100%", background: days && goal && spot ? "linear-gradient(135deg, #009688, #00796B)" : "#E0E0E0", color: days && goal && spot ? "white" : "#9E9E9E", border: "none", borderRadius: 16, padding: 18, fontSize: 18, fontWeight: 700, cursor: days && goal && spot ? "pointer" : "not-allowed", fontFamily: "'Playfair Display', serif", boxShadow: days && goal && spot ? "0 8px 30px rgba(0,150,136,0.3)" : "none", transition: "all 0.3s ease" }}>
                {days && goal && spot ? "🏄 Programm generieren" : "Bitte alle Filter auswählen"}
              </button>
            </div>
          )}

          {screen === "program" && program && (
            <div style={{ paddingTop: 24 }}>
              {/* Header Card */}
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

              {/* Spot Tips */}
              {program.spot?.tips && (
                <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: "14px 18px", marginBottom: 20, border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#5C6BC0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📍 Spot-Tipps: {program.spot.name}</div>
                  {program.spot.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 13, color: "#37474F", fontFamily: "'DM Sans', sans-serif" }}>
                      <span style={{ color: "#5C6BC0" }}>•</span><span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Filters */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                {[{ k: "all", l: "Alle", e: "📚" }, { k: "warmup", l: "Warm-Up", e: "🔥" }, { k: "theory", l: "Theorie", e: "📖" }, { k: "practice", l: "Praxis", e: "🏄" }].map(f => (
                  <button key={f.k} onClick={() => setFilter(f.k)} style={{ background: filter === f.k ? "#263238" : "rgba(255,255,255,0.8)", color: filter === f.k ? "white" : "#546E7A", border: "1px solid " + (filter === f.k ? "#263238" : "#E0E0E0"), borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{f.e} {f.l}</button>
                ))}
              </div>

              {/* Days */}
              {program.program.map(dayData => {
                const fl = dayData.lessons.filter(l => filter === "all" || l.type === filter);
                if (fl.length === 0) return null;
                return (
                  <div key={dayData.day} style={{ marginBottom: 20 }}>
                    <button onClick={() => setActiveDay(activeDay === dayData.day ? null : dayData.day)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: "12px 16px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13 }}>D{dayData.day}</span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: "#263238" }}>Tag {dayData.day}</div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#90A4AE" }}>{fl.length} Lektionen{fl.some(l => l.videoUrl) && " · ▶ Videos"}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 16, color: "#90A4AE", transition: "transform 0.2s ease", transform: activeDay === dayData.day ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                    </button>
                    {(activeDay === dayData.day || activeDay === null) && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, paddingLeft: 6 }}>
                        {fl.map((lesson, idx) => (
                          <div key={lesson.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <button onClick={e => { e.stopPropagation(); toggle(lesson.id); }} style={{ marginTop: 18, width: 24, height: 24, minWidth: 24, borderRadius: 7, border: completed[lesson.id] ? "2px solid #4DB6AC" : "2px solid #CFD8DC", background: completed[lesson.id] ? "#4DB6AC" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", transition: "all 0.2s ease" }}>{completed[lesson.id] && "✓"}</button>
                            <div style={{ flex: 1, opacity: completed[lesson.id] ? 0.5 : 1, transition: "opacity 0.3s ease" }}>
                              <LessonCard lesson={lesson} index={idx} onOpen={setOpenLesson} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ textAlign: "center", padding: "36px 20px", marginTop: 16, borderTop: "1px dashed #CFD8DC" }}>
                <span style={{ fontSize: 46, display: "block", marginBottom: 10, animation: "wave 2s ease-in-out infinite" }}>🤙</span>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#263238", marginBottom: 4 }}>
                  {done === total && total > 0 ? "Gnarly! Alle Lektionen abgeschlossen! 🎉" : "Keep paddling, die perfekte Welle kommt!"}
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#90A4AE" }}>☮ surf · learn · repeat</p>
              </div>
            </div>
          )}
        </main>
        <LessonModal lesson={openLesson} onClose={() => setOpenLesson(null)} />
      </div>
    </>
  );
}
