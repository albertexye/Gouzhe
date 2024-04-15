import anime from "./third-party/anime.es.js";
import gouzheList from "./data/gouzhe.json" with { type: "json" };

const h1El = document.querySelector("h1.ranking");
const bodyEl = document.querySelector("body");
const mainEl = document.querySelector('main');
const ulEl = document.querySelector('ul.ranking');

let lang;
let theme;

// Color theme
{
    function setTheme() {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme) {
            bodyEl.classList.add('dark');
            mainEl.classList.add('dark');
            ulEl.classList.add('dark');
        } else {
            bodyEl.classList.remove('dark');
            mainEl.classList.remove('dark');
            ulEl.classList.remove('dark');
        }
    }

    setTheme();
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', _=> { setTheme(); });
}

// Language
{
    function setLang() {
        const url = new URL(document.URL);
        lang = Boolean((url.searchParams.get("lang") || navigator.language).match("^en.*$"));
        if (lang) {
            document.title = "Gouzhe Ranking";
            h1El.innerText = "Gouzhe Ranking";
        } else {
            document.title = "狗者排行榜";
            h1El.innerText = "狗者排行榜";
        }
    }

    setLang();
    window.addEventListener("languagechange", setLang);
}

// JSON parsing
{
    for (const [i, gouzhe] of gouzheList.entries()) {
        const innerHTML = `
<a class="ranking" href="gouzhe/${gouzhe.name}/${gouzhe.name}.html">
    <span class="ranking-number">${i + 1}</span>
    <span class="ranking-name">${gouzhe.name}</span>
    <img class="ranking" src="data/photos/${gouzhe.photo}" alt="Gouzhe Image" />
</a>
`;
        const liEl = document.createElement("li");
        liEl.classList.add('ranking', 'hover');
        liEl.innerHTML = innerHTML;
        ulEl.appendChild(liEl);
    }
}

mainEl.style.display = 'block';

anime({
    targets: mainEl,
    duration: 1500,
    direction: 'normal',
    easing: 'linear',
    translateY: ['40vh', '0'],
    scale: {
        value: [2, 1],
        duration: 1500,
        easing: 'linear'
    }
});

// Disclaimer
{
    const disclaimerShown = localStorage.getItem("disclaimerShown") === "true";
    if (!disclaimerShown) {
        alert(lang ? "This site is just for fun. Don't take it serious. " : "这个网站只是一个玩笑，请勿当真。");
        localStorage.setItem("disclaimerShown", "true");
    }
}
