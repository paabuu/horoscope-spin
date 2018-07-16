import './index.scss';
import addSwipeEvent from './event';

addSwipeEvent();


// window.mySwipe = new Swipe(document.getElementById('slider'), {
//     startSlide: 2,
//     speed: 400,
//     continuous: true,
//     disableScroll: false,
//     stopPropagation: false,
//     callback: function(index, elem) {
//         // console.log(index)
//     },
//     transitionEnd: function(index, elem) {}
// });

// function handleSwipe() {
//     console.log('swiping');
// }

// document.body.addEventListener('touchstart', function() {
//     document.body.addEventListener('touchmove', handleSwipe);
// });

// document.body.addEventListener('touchend', function() {
//     document.body.removeEventListener('touchmove', handleSwipe);
// })

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const array = ['CLINGY', 'UNDER-', 'TENDER', 'LOYAL', 'FRESH', 'AROUND'];

// // 外环
// ctx.beginPath();
// ctx.moveTo(150, 150);
// const grd = ctx.createRadialGradient(150, 150, 120, 150, 150, 105);
// grd.addColorStop(1, '#ff8400');
// grd.addColorStop(0, '#ffcc00');
// ctx.arc(150, 150, 120, 0, 2 * Math.PI);
// ctx.fillStyle = grd;
// ctx.fill();
// ctx.closePath();

// // 矩形
// for (let i = 0; i < 8; i++) {
//     ctx.beginPath();
//     ctx.moveTo(150, 150);
//     ctx.arc(150, 150, 120, Math.PI / 4 * i, Math.PI / 4 * i + Math.PI / 18);
//     ctx.fillStyle = '#fff';
//     ctx.fill();
//     ctx.closePath();
// }

// // 中环
// ctx.beginPath();
// ctx.moveTo(150, 150);
// ctx.arc(150, 150, 105, 0, 2 * Math.PI);
// ctx.fillStyle = '#f17009';
// ctx.globalAlpha = 0.4;
// ctx.fill();
// ctx.closePath();

// // 饼
// array.forEach((item, i) => {
//     ctx.beginPath();
//     ctx.globalAlpha = 1;
//     ctx.moveTo(150, 150);
//     ctx.arc(150, 150, 100, Math.PI / 3 * i, Math.PI / 3 * (i + 1));
//     ctx.fillStyle = i % 2 === 0 ? '#ff6f7a' : '#ff94ab';
//     ctx.fill();
//     ctx.closePath();
// });
 
// // 中心阴影
// ctx.beginPath();
// ctx.moveTo(150, 150);
// ctx.arc(150, 150, 50, 0, 2 * Math.PI);
// ctx.fillStyle = '#000';
// ctx.globalAlpha = 0.1;
// ctx.fill();
// ctx.closePath();

// // 白色圆
// ctx.beginPath();
// ctx.moveTo(150, 150);
// ctx.arc(150, 150, 25, 0, 2 * Math.PI);
// ctx.globalAlpha = 1;
// ctx.fillStyle = '#fff';
// ctx.fill();
// ctx.closePath();

// // 文字
// ctx.translate(150, 150);
// array.forEach(item => {
//     ctx.fillStyle = '#fff';
//     ctx.font = '12px Airal';
//     ctx.textAlign = 'center';
//     ctx.shadowColor = 'rgba(0, 0, 0, .6)';
//     ctx.shadowOffsetX = -1;
//     ctx.shadowOffsetY = 1;
//     ctx.rotate(Math.PI / 3);
//     ctx.fillText(item, 0, -75);
// })