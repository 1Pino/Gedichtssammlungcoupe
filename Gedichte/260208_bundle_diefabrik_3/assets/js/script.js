



// ================================
// Top-Capture Container
// ================================
const topCapture = document.createElement("div");
topCapture.id = "top-capture";
document.body.appendChild(topCapture);
// ================================
// Wörter erfassen
// ================================
const words = [...document.querySelectorAll("span, h1")];
const usedWords = new Set();
// ================================
// Scroll-Logik
// ================================
window.addEventListener("scroll", () => {
words.forEach(word => {
if (usedWords.has(word)) return;
const rect = word.getBoundingClientRect();
if (rect.top <= 0) {
usedWords.add(word);
const clone = word.cloneNode(true);
clone.classList.add("captured-word", "smoke-word");
// ----------------------------
// Buchstaben aufteilen (nur Klon)
// ----------------------------
const text = clone.textContent;
clone.textContent = "";
            [...text].forEach(char => {
const span = document.createElement("span");
span.classList.add("char");
span.textContent = char;
// Rauch ist nie synchron
span.style.animationDelay = `${Math.random() * 4}s`;
span.style.animationDuration = `${4 + Math.random() * 6}s`;
clone.appendChild(span);
            });
// ----------------------------
// Positionierung - ERWEITERT
// ----------------------------
clone.style.position = "fixed";
const x = Math.random() * (window.innerWidth - 150);
const y = 80 + Math.random() * 400; // NOCH größerer Bereich (war 60 + 200)
clone.style.left = `${x}px`;
clone.style.top = `${y}px`;
// ----------------------------
// Rauch-Parameter - ERWEITERT
// ----------------------------
clone.style.setProperty("--rot", `${(Math.random() - 0.5) * 60}deg`); // Mehr Rotation
clone.style.setProperty("--driftX", `${40 + Math.random() * 100}px`); // Mehr Drift (war 20 + 60)
clone.style.setProperty("--rise", `${40 + Math.random() * 80}px`); // Mehr Aufstieg (war 20 + 40)
clone.style.setProperty("--floatTime", `${12 + Math.random() * 12}s`);
clone.style.display = "inline-block";
topCapture.appendChild(clone);
// Original unsichtbar
word.style.visibility = "hidden";
        }
    });
});

// ================================
// Fade-Out am oberen Rand
// ================================
function updateFadeOut() {
    const allCaptured = document.querySelectorAll(".captured-word");
    allCaptured.forEach(word => {
        const rect = word.getBoundingClientRect();
        const distanceFromTop = rect.top;
        
        // Fade-out Bereich: 0-100px vom oberen Rand
        if (distanceFromTop < 100) {
            const opacity = distanceFromTop / 100; // 0 = unsichtbar, 1 = sichtbar
            word.style.opacity = Math.max(0, opacity);
        }
    });
}

// Fade-Out kontinuierlich prüfen
setInterval(updateFadeOut, 50);