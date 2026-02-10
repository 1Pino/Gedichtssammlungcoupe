// === SUBJEKTE (mit Artikel) ===
const subjectsPositive = [
  'die arbeiterinnen',
  'die arbeiter',
  'die frauen',
  'das proletariat',
  'die emanzipation',
  'die freiheit',
  'die unabhängigkeit',
  'die sozialisten',
  'die bewegung',
  'die revolution'
];
 
const subjectsNegative = [
  'die bourgeoisie',
  'der kapitalist',
  'die kapitalisten',
  'die ausbeutung',
  'die unterdrückung',
  'die sklaverei',
  'die herrschaft',
  'der arbeitgeber',
  'das kapital'
];

const subjectsNeutral = [
  'die maschine',
  'die maschinen',
  'die industrie',
  'die produktion',
  'die fabrik',
  'die löhne',
  'die entwicklung',
  'die arbeitskraft',
  'die familie'
];

// === VERBEN MIT KONJUGATION ===
// Format: [Infinitiv, Singular, Plural]
const verbsPositive = [
  { inf: 'befreien', sg: 'befreit', pl: 'befreien' },
  { inf: 'kämpfen', sg: 'kämpft', pl: 'kämpfen' },
  { inf: 'organisieren', sg: 'organisiert', pl: 'organisieren' },
  { inf: 'fordern', sg: 'fordert', pl: 'fordern' },
  { inf: 'gewinnen', sg: 'gewinnt', pl: 'gewinnen' },
  { inf: 'revolutionieren', sg: 'revolutioniert', pl: 'revolutionieren' },
  { inf: 'schaffen', sg: 'schafft', pl: 'schaffen' },
  { inf: 'ermöglichen', sg: 'ermöglicht', pl: 'ermöglichen' },
  { inf: 'stärken', sg: 'stärkt', pl: 'stärken' },
  { inf: 'erkämpfen', sg: 'erkämpft', pl: 'erkämpfen' }
];

const verbsNegative = [
  { inf: 'unterdrücken', sg: 'unterdrückt', pl: 'unterdrücken' },
  { inf: 'ausbeuten', sg: 'beutet aus', pl: 'beuten aus' },
  { inf: 'unterwerfen', sg: 'unterwirft', pl: 'unterwerfen' },
  { inf: 'zerstören', sg: 'zerstört', pl: 'zerstören' },
  { inf: 'verhindern', sg: 'verhindert', pl: 'verhindern' },
  { inf: 'beschränken', sg: 'beschränkt', pl: 'beschränken' },
  { inf: 'schwächen', sg: 'schwächt', pl: 'schwächen' }
];

const verbsNeutral = [
  { inf: 'produzieren', sg: 'produziert', pl: 'produzieren' },
  { inf: 'verändern', sg: 'verändert', pl: 'verändern' },
  { inf: 'erzeugen', sg: 'erzeugt', pl: 'erzeugen' },
  { inf: 'entwickeln', sg: 'entwickelt', pl: 'entwickeln' },
  { inf: 'bestimmen', sg: 'bestimmt', pl: 'bestimmen' },
  { inf: 'prägen', sg: 'prägt', pl: 'prägen' }
];

// === OBJEKTE (mit Artikel) ===
const objectsPositive = [
  'die freiheit',
  'die rechte',
  'die gleichberechtigung',
  'die emanzipation',
  'die unabhängigkeit',
  'die gesellschaft',
  'die zukunft',
  'die kraft',
  'die solidarität'
];

const objectsNegative = [
  'die ketten',
  'die abhängigkeit',
  'die sklaverei',
  'die ausbeutung',
  'die unterdrückung',
  'die armut',
  'die herrschaft',
  'die unfreiheit'
];

const objectsNeutral = [
  'die arbeit',
  'die produktion',
  'die löhne',
  'die bedingungen',
  'die verhältnisse',
  'die produktionsmittel',
  'die industrie',
  'die existenz'
];

// === FUNKTIONEN ===
function generateText() {
  const output = document.getElementById('output');
  output.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const sentence = generateSentence();
    output.appendChild(sentence);
  }
}

function generateSentence() {
  const p = document.createElement('p');
  p.className = 'generated-sentence';
  
  const tone = Math.random();
  let subj, verbObj, obj;
  
  if (tone < 0.35) {
    // POSITIVE Kombination
    subj = random(subjectsPositive);
    verbObj = random(verbsPositive);
    obj = random(objectsPositive);
    
  } else if (tone < 0.65) {
    // NEGATIVE Kombination
    subj = random(subjectsNegative);
    verbObj = random(verbsNegative);
    obj = random(objectsNegative);
    
  } else {
    // NEUTRAL
    const allSubjects = [...subjectsPositive, ...subjectsNegative, ...subjectsNeutral];
    const allVerbs = [...verbsPositive, ...verbsNegative, ...verbsNeutral];
    const allObjects = [...objectsPositive, ...objectsNegative, ...objectsNeutral];
    
    subj = random(allSubjects);
    verbObj = random(allVerbs);
    obj = random(allObjects);
  }
  
  // Verhindere identische Subjekt-Objekt-Kombinationen
  let attempts = 0;
  while (subj === obj && attempts < 10) {
    if (tone < 0.35) {
      obj = random(objectsPositive);
    } else if (tone < 0.65) {
      obj = random(objectsNegative);
    } else {
      obj = random([...objectsPositive, ...objectsNegative, ...objectsNeutral]);
    }
    attempts++;
  }
  
  // Konjugiere Verb basierend auf Subjekt
  const verb = conjugateVerb(verbObj, subj);
  
  // Satzbau: Subjekt + Verb + Objekt
  p.appendChild(createWordSpan(subj, 'subject'));
  p.appendChild(createWordSpan(verb, 'verb'));
  p.appendChild(createWordSpan(obj, 'object'));
  p.appendChild(createWordSpan('.', 'punctuation'));
  
  return p;
}

function conjugateVerb(verbObj, subject) {
  // Bestimme ob Subjekt Singular oder Plural ist
  const pluralSubjects = [
    'die arbeiterinnen', 'die arbeiter', 'die frauen', 'die sozialisten',
    'die kapitalisten', 'die maschinen', 'die löhne', 'die bedingungen',
    'die verhältnisse', 'die produktionsmittel'
  ];
  
  const isPlural = pluralSubjects.includes(subject);
  
  return isPlural ? verbObj.pl : verbObj.sg;
}

function createWordSpan(word, category) {
  const span = document.createElement('span');
  span.className = `word ${category}`;
  span.textContent = word + ' ';
  return span;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}