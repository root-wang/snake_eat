import './style/index.less';
import GameControl from './modules/GameControl';
import Snake from './modules/Snake';



// 测试代码
// const food = new Food();
// console.log(food.X,food.Y);


// //
// const scorePanel = new ScorePanel(100,2);
// for (let index = 0; index <200; index++) {
//     scorePanel.addScore();  
// }

// const snake = new Snake();
// snake.X = 40;
// snake.Y = 20;
// snake.addBody();

// let restart = document.getElementById('start')!;
// let game: GameControl;

// restart.onclick = function (): void {
//     console.log('123');
//     game = new GameControl();
// }
// let snake = new Snake();
const game = new GameControl();
let start = document.getElementById('start')!;

start.onclick = function () {
    game.init();
}

let restart = document.getElementById('restart')!;
restart.onclick = function () {
    game.restart();
}

