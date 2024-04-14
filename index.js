import anime from "./third-party/anime.es.js";
import gouzheList from "./data/gouzhe.json" with { type: "json" };

const bodyEl = document.querySelector("body");
const mainEl = document.querySelector('main');
const ulEl = document.querySelector('ul.ranking');

function setTheme(isDark) {
    if (isDark) {
        bodyEl.classList.add('dark');
        mainEl.classList.add('dark');
        ulEl.classList.add('dark');
    } else {
        bodyEl.classList.remove('dark');
        mainEl.classList.remove('dark');
        ulEl.classList.remove('dark');
    }
}

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(isDark);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const isDark = event.matches;
    setTheme(isDark);
});

for (const [i, gouzhe] of gouzheList.entries()) {
    const innerHTML = `
<a class="ranking" href="gouzhe/${gouzhe.name}.html">
    <span class="ranking-number">${i+1}</span>
    <span class="ranking-name">${gouzhe.name}</span>
    <img class="ranking" src="data/photos/${gouzhe.photo}" alt="Gouzhe Image" />
</a>
`;
    const liEl = document.createElement("li");
    liEl.classList.add('ranking', 'hover');
    liEl.innerHTML = innerHTML;
    ulEl.appendChild(liEl);
}

mainEl.style.display = 'block';

anime({
    targets: mainEl,
    duration: 3000,
    direction: 'normal',
    easing: 'linear',
    translateY: ['40vh', '0'],
    scale: {
        value: [2, 1],
        duration: 3000,
        easing: 'easeInOutSine'
    }
});
