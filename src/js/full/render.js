import anime from 'animejs';
const $ = window.$ || window.jQuery;

import allKeywords from '../keywords';
import { handleHasPlayed } from './move';

const startBtn = document.getElementById("start-btn");
const paltes = document.querySelectorAll(".container .each-item .turnplate");
const types = ["Health", "Love", "Career", "Money"];

function renderSpin() {
    renderKeywords();
    startBtn.addEventListener('touchend', function(e) {
        if (window.isSpinning) return;
        // if (window.results[window.index]) return;
        if (window.LuckySpin) {
            window.LuckySpin.onStarted('Fullscreen', types[window.index]);
        }
        anime({
            targets: paltes[window.index],
            rotate: 0,
            duration: 0
        });

        $(`#container .${types[window.index].toLowerCase()} .shadow`).hide();
        
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

            const resultIndex = getResultByAngle(deg % 360);
            const result = window.keywords[window.index][resultIndex];
            
            window.results[window.index] = result;
            setTimeout(() => {
                handleHasPlayed();
            }, 200);

            if (window.LuckySpin) {
                window.LuckySpin.onFinished('Fullscreen', types[window.index]);
            }
        };
    }, true);
}

function getKeywords(keywords) {
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
        const type = types[i].toLowerCase();
        const keywords = getKeywords(allKeywords[type]);
        const dom = $(`#container .${type} .turnplate`);
        window.keywords.push(keywords);
        keywords.forEach((item) => {
            dom.append(
                `<div class="each-result"><p class="result-text">${item.toUpperCase()}</p></div>`
            );
        });
    }
}

function getResultByAngle(angle) {
    const offset = 1;
    switch(true) {
        case angle <= 30 - offset:
            return 0;
            break;
        case angle <= 90 - offset:
            return 5;
            break;
        case angle <= 150 - offset: 
            return 4;
            break;
        case angle <= 210 - offset:
            return 3;
            break;
        case angle <= 270 - offset: 
            return 2;
            break;
        case angle <= 330 - offset:
            return 1;
            break;
        case angle <= 360 - offset:
            return 0;
            break;
        default:
            return 0;
    }
}

export default renderSpin;
 