import Snake from './Snake';
import Food from "./Food";
import ScorePanel from "./ScorePanel";

var ID: unknown;

//游戏控制器 控制其他所有类
class GameControl {
    //定义三个属性
    //蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向
    direction = 'ArrowRight';
    // 创建一个属性来记录游戏是否结束
    isLive: boolean;

    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);
        this.snake = new Snake();
        this.isLive = true;
    }

    // 调用后游戏开始
    init() {

        document.addEventListener('keydown', this.keydownHandler.bind(this))

        // this.isLive = true;
        // this.restart();
        this.run();

    }

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        /* 
        ArrowLeft
        ArrowRight
        ArrowDown
        ArrowUp
        */
        //需要检查event.key的值是否合法
        this.direction = event.key;
        console.log(this.direction);

    }

    // count = 0;
    // 控制蛇的一代方法
    run() {
        /* 
        根据方向(this.direction) 来使蛇的位置改变
                向上 top 减少
                向下 top 增加
                向左 left 减少
                向右 left 增加
                 */

        let X = this.snake.X;
        let Y = this.snake.Y;
        // console.log(X, Y);

        // console.log(this.direction);

        // 根据按键的方向更改X 和 Y的值
        switch (this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
            default:
                break;
        }

        // 检查是否吃到了食物
        this.checkEat(X, Y);
        console.log('改变之后', X, Y);

        // 修改蛇的X Y值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
            console.log(this.snake.X, this.snake.Y);

        } catch (e: any) {
            // 进入catch 说明出现了异常 游戏结束 弹出一个提示信息
            alert(e.message + ' game over');
            this.isLive = false;
            clearTimeout(ID as NodeJS.Timeout);

        }
        // 
        // 开启一个定时调用+
        if (this.isLive) {
            ID = setTimeout(this.run.bind(this), 450 - (this.scorePanel.level - 1) * 30);
        }

        // console.log("执行第" + this.count + '次移动');
        // this.count++;
    }


    restart() {
        this.direction = 'ArrowRight';
        this.snake.reset();
        this.scorePanel.reset();
        this.scorePanel = new ScorePanel(10, 5);
        this.snake = new Snake();
        this.food = new Food();
        this.isLive = true;
        // this.isLive && setTimeout(this.run.bind(this), 450 - (this.scorePanel.level - 1) * 30);
        this.run();
    }

    // 检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X == this.food.X && Y == this.food.Y) {
            console.log("吃到食物");
            // 食物位置进行重置
            this.food.change();
            //分数要增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();

            // this.snake.moveBody();
        }
    }
}

export default GameControl;