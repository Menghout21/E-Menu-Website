const flags = [
    { src: "img/cambodia_flag.png", alt: "Khmer", code: "km" },
    { src: "img/english_flag.png", alt: "English", code: "en" },
    { src: "img/china_flag.png", alt: "Chinese", code: "zh" }
];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    const flag = document.getElementById("language-flag");
    if (!flag) return;

    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
        const index = flags.findIndex(f => f.code === savedLang);
        if (index !== -1) {
            currentIndex = index;
            flag.src = flags[currentIndex].src;
            flag.alt = flags[currentIndex].alt;
        }
    } else {
        // Set default
        localStorage.setItem("lang", flags[currentIndex].code);
    }
});

function cycleLanguage() {
    currentIndex = (currentIndex + 1) % flags.length;
    const flag = document.getElementById("language-flag");
    if (!flag) return;

    flag.src = flags[currentIndex].src;
    flag.alt = flags[currentIndex].alt;
    localStorage.setItem("lang", flags[currentIndex].code);
    console.log("Language set to:", flags[currentIndex].code);
}
