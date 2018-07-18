import './scss/full/index.scss';
import addSwipeEvent from './js/full/move';
import renderSpin from './js/full/render';

/**
 * 全局变量
 * @param {number} index: 当前的方向(0-3)
 * @param {boolean} isSpinning: 是否正在转
 * @param {array} keywords: 每个方向的关键字数组 
 * @param {array} results: 每个转盘的结果
 */
window.index = 1;
window.isSpinning = false;
window.keywords = [];
window.results = [];

addSwipeEvent();
renderSpin();