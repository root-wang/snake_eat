import Food from './Food';
class Snake {
    //表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体(包括蛇头)
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake') as HTMLElement;
    }

    // 获取蛇头的坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        // X值的合法范围在0-290之间
        if (value < 0 || value > 300) {
            // 进入判断 说明蛇撞墙了
            throw new Error("你撞墙了");
        }

        // 如果新值和旧值相同 则直接返回不再修改
        if (this.X == value) {
            return;
        }

        // 修改X时 是在修改水平坐标 蛇在移动时向此刻的相反方向掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            // 如果发生了掉头 让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新值大于旧值 说明蛇在向右走 此时发生掉头 应该使蛇继续向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    set Y(value: number) {
        // X值的合法范围在0-290之间
        console.log('Y轴value是' + value);
        if (value < 0 || value > 290) {
            // 进入判断 说明蛇撞墙了
            throw new Error("你撞墙了");
        }

        // 如果新值和旧值相同 则直接返回不再修改
        if (this.Y == value) {
            return;
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
            // 如果发生了掉头 让蛇向反方向继续移动
            if (value > this.Y) {

                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    //设置蛇增加身体的方法
    addBody() {
        //向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }
    // 添加一个蛇身体移动的方法
    moveBody() {
        // console.log(this.bodies.length);


        /* 将后面的身体设置为前面身体的位置
            举例:
                第4节 = 第3节的位置
                第3节 = 第2节的位置
                第2节 = 蛇头的位置 */
        // 遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前面身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头撞到身体的方法
    checkHeadBody() {
        //获取所有身体 检测其是否和蛇头坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
                // 说明蛇头撞到了身体 游戏结束
                throw new Error("撞到自己了");
            }
        }
    }

    reset() {
        this.X = 0;
        this.Y = 0;
        this.element.innerHTML = '<div></div>';
    }
}


export default Snake;