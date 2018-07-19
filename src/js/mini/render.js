import anime from 'animejs';
import $ from 'jquery';

import keywords from '../keywords';
import { handleHasPlayed } from './move';

const startBtn = document.getElementById("start-btn");
const paltes = document.querySelectorAll(".container .each-item .turnplate");
const types = ["health", "love", "career", "money"];

function renderSpin() {
    renderKeywords();
    startBtn.addEventListener('touchend', function(e) {
        if (window.isSpinning) return;
        if (window.results[window.index]) return;

        window.isSpinning = true;
        const deg = 720 + parseInt(Math.random() * 720);
        const duration = (3 + parseInt(Math.random() * 2)) * 1000;
        anime({
            targets: paltes[window.index],
            rotate: `${deg}deg`,
            easing: 'easeOutSine',
            duration
        }).complete = function() {
            window.isSpinning = false;

            const resultIndex = getResultByAngel(deg % 360);
            const result = window.keywords[window.index][resultIndex];
            
            window.results[window.index] = result;
            setTimeout(() => {
                handleHasPlayed();
            }, 200);
            window.showAd.showExpressAd();
        };
    }, true);
}

function getKeywords() {
    const arr = [];
    while(arr.length < 6) {
        const randomIndex = parseInt(Math.random() * keywords.length);
        if (!arr.includes(randomIndex)) {
            arr.push(keywords[randomIndex]);
        }
    }
    return arr;
}

function renderKeywords() {
    for (let i = 0; i < 4; i++) {
        const keywords = getKeywords();
        const dom = $(`#container .${types[i]} .turnplate`);
        window.keywords.push(keywords);
        keywords.forEach((item) => {
            dom.append(
                `<div class="each-result"><p class="result-text">${item.toUpperCase()}</p></div>`
            );
        });
    }
}

function getResultByAngel(angel) {
    const offset = 1;
    switch(true) {
        case angel <= 30 - offset:
            return 0;
            break;
        case angel <= 90 - offset:
            return 5;
            break;
        case angel <= 150 - offset: 
            return 4;
            break;
        case angel <= 210 - offset:
            return 3;
            break;
        case angel <= 270 - offset: 
            return 2;
            break;
        case angel <= 330 - offset:
            return 1;
            break;
        case angel <= 360 - offset:
            return 0;
            break;
        default:
            return 0;
    }
}

export default renderSpin;
 