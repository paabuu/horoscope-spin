import anime from 'animejs';
import $ from 'jquery';

window.index = 1;
let x = 0;
const container = document.getElementById("container");
const targets = document.querySelectorAll(".container .each-item");
const lights = document.querySelectorAll(".lights .light");
const typeDom = document.getElementById("type");

const w = document.body.clientWidth * 0.7;
const MIN_SWIPE_DISTANCE = 70;
const DURATION = 200;
const COLORS = ["#0b004a", "#400009", "#2e005f", "#3c002c"];
const TYPES = ["HEALTH", "LOVE", "CAREER", "MONEY"];
const OPACITY = .6;

function handleMove(e) {
    const { clientX } = e.targetTouches[0];
    const distance = clientX - x;
    // handleAnime(distance);
}

function addSwipeEvent() {
    container.addEventListener("touchstart", function(e) {
        const { clientX } = e.targetTouches[0];
        x = clientX;

        container.addEventListener("touchmove", handleMove);
    });

    container.addEventListener("touchend", function(e) {
        if (window.isSpinning) return;

        const { clientX } = e.changedTouches[0];
        const distance = clientX - x;

        handleTrigger(distance);
        // setTimeout(() => {
        //     handleAnime(0);
        //     handleAnime(0);
        //     handleAnime(0);
        // }, 500);
        container.removeEventListener("touchmove", handleMove);
    });
}


/*
 * 动画描述：
 * 滑动时背景颜色需要随着滑动方向及距离变化
 * 轮盘需左右切换
 * 文字需改变为对应文字
 */

// 手指未离开屏幕
function handleAnime(distance) {
    console.log(distance);
    if (Math.abs(distance) > MIN_SWIPE_DISTANCE) return;
    const direction = distance / Math.abs(distance);
    // const distance = Math.abs
    // const distance = Math.abs(dis) > MIN_SWIPE_DISTANCE ? MIN_SWIPE_DISTANCE : Math.abs(dis);
    const rate = Math.abs(distance / MIN_SWIPE_DISTANCE) > 1 ? 1 : Math.abs(distance / MIN_SWIPE_DISTANCE);
    
    // middle
    anime({
        targets: targets[index],
        left: `${0 + distance}px`,
        scale: 1 - 0.2 * rate,
        top: 30 * rate,
        duration: 0,
        easing: 'linear'
    });

    // left 
    anime({
        targets: targets[index - 1 < 0 ? 3 : index - 1],
        left: `${-w + distance}px`,
        scale: 0.8 + Math.abs(.2 * rate),
        top: 30 * (1 - rate),
        easing: 'linear',
        duration: 0
    });

    // right
    anime({
        targets: targets[index + 1 > 3 ? 0 : index + 1],
        left: `${w + distance}px`,
        scale: 0.8 + Math.abs(.2 * rate),
        top: 30 * (1 - rate),
        easing: 'linear',
        duration: 0
    });
}

// 手指离开屏幕
export function handleTrigger(distance) {
    if (distance > MIN_SWIPE_DISTANCE) {
        const next = index - 1 < 0 ? 3 : index - 1;
        handleLightChange(next);
        typeDom.innerHTML = TYPES[next];

        // 背景颜色
        anime({
            targets: ".horoscope-spin",
            backgroundColor: COLORS[next],
            duration: DURATION,
            easing: 'linear'
        });

        // 中间向右移
        anime({
            targets: targets[index],
            left: `${w}px`,
            scale: 0.8,
            top: '30px',
            duration: DURATION,
            easing: 'linear',
            opacity: OPACITY
        });

        // 左边向中间移
        anime({
            targets: targets[next],
            left: `0px`,
            scale: 1,
            top: 0,
            duration: DURATION,
            easing: 'linear',
            opacity: 1
        });

        // 右边移走
        anime({
            targets: targets[index + 1 > 3 ? 0 : index + 1],
            left: `${2 * w}px`,
            duration: 0
        });
        
        // 左边补位
        anime({
            targets: targets[index - 2 < 0 ? index + 2 : index - 2],
            left: `-100%`,
            scale: 0.8,
            top: '30px',
            duration: 0,
            opacity: OPACITY,
            // delay: 1000
        });

        anime({
            targets: targets[index - 2 < 0 ? index + 2 : index - 2],
            left: `-70%`,
            duration: 180,
            easing: 'linear'
        });

        index = next;

    } else if (distance < -MIN_SWIPE_DISTANCE) {
        const next = index + 1 > 3 ? 0 : index + 1;

        handleLightChange(next);
        typeDom.innerHTML = TYPES[next];

        // 背景颜色
        anime({
            targets: ".horoscope-spin",
            backgroundColor: COLORS[next],
            duration: DURATION,
            easing: 'linear'
        });

        // 中间向左移
        anime({
            targets: targets[index],
            left: `${-w}px`,
            scale: 0.8,
            opacity: OPACITY,
            top: '30px',
            duration: DURATION,
            easing: 'linear',
            zIndex: 1000
        });

        // 右边向中间移
        anime({
            targets: targets[next],
            left: `0px`,
            scale: 1,
            top: 0,
            duration: DURATION,
            easing: 'linear',
            opacity: 1,
        });

        // 左边移走
        anime({
            targets: targets[index - 1 < 0 ? 3 : index - 1],
            left: `${-2 * w}px`,
            duration: 0
        });

        // 右边补位
        anime({
            targets: targets[index + 2 > 3 ? index - 2 : index + 2],
            left: "100%",
            scale: 0.8,
            top: '30px',
            opacity: OPACITY,
            duration: 0,
            delay: 0
        });

        anime({
            targets: targets[index + 2 > 3 ? index - 2 : index + 2],
            left: "70%",
            duration: 180,
            easing: 'linear',
            delay: 0
        });
        
        index = next;
    }
    handleHasPlayed();
}

export function handleHasPlayed() {
    const result = window.results[window.index];
    if (result) {
        $("#start-btn").addClass("has-played");
        $(`#container .${TYPES[window.index].toLowerCase()} .shadow`).text(result.toUpperCase()).show();
    } else {
        $("#start-btn").removeClass("has-played");
    }
}

function handleLightChange(index) {
    for (let i = 0; i < 4; i++) {
        lights[i].style.opacity = 0;
    }
    lights[index].style.opacity = 1;
}

export default addSwipeEvent;