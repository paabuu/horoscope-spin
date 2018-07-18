import anime from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/animejs';
import $ from 'jquery';

import keywords from './keywords';
import { handleTrigger, handleHasPlayed } from './move';

const startBtn = document.getElementById("start-btn");
const paltes = document.querySelectorAll(".container .each-item .turnplate");
// const singleResultButton = document.getElementById("single-next-button");
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
            // handleTrigger(-300);
            alert("广告！");
            setTimeout(() => {
                handleHasPlayed();
            }, 200);
            // 显示单个结果页
            // $("#result-keywords").text(result);
            // $(".horoscope-spin").hide();
            // $(".single-result").show();
            // anime({
            //     targets: '.single-result',
            //     top: 0,
            //     duration: 500,
            //     easing: 'linear'
            // });
        };
    }, true);

    // singleResultButton.addEventListener("touchend", function() {
    //     const finalResults = window.results.filter(item => !!item);

    //     // 显示总结果页
    //     if (finalResults.length === 4) {
    //         finalResults.forEach((item, i) => {
    //             $("#result-all").append($(
    //                 `<li>
    //                     <p class="_type">${types[i]}</p>
    //                     <p class="_keywords">${item}</p>
    //                 </li>`
    //             ));
    //         });
    //         anime({
    //             targets: '.final-result',
    //             left: 0,
    //             duration: 300,
    //             easing: 'linear'
    //         });

    //         anime({
    //             targets: '.single-result',
    //             left: "-100%",
    //             duration: 500,
    //             easing: 'linear'
    //         });

    //         document
    //         .getElementById("final-next-button")
    //         .addEventListener("touchend", function() {
    //             window.location.reload();
    //         }, true);

    //     } else {
    //         anime({
    //             targets: '.single-result',
    //             top: '-200vh',
    //             duration: 500,
    //             easing: 'linear'
    //         }).complete = () => {
    //             handleTrigger(-300);
    //         };
    //     }
    // }, true);
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
 