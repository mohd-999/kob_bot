import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(info, gamemap) {  // 构造函数
        super();
        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.speed = 5;  // 蛇每秒走5个格子
        this.cells = [new Cell(info.r, info.c)]; // 存放蛇身 蛇头cells[0]
        this.next_cell = null;  // 下一回合位置

        this.direction = -1;  // -1 没指令  0 1 2 3 上右下左
        this.status = "idle"; // idle 静止， move 移动， die 死亡

        this.dr = [-1, 0, 1, 0];  // 列的方向
        this.dc = [0, 1, 0, -1];  // 行的方向

        this.step = 0;  // 回合数
        this.eps = 1e-2; // 允许的误差

        this.eye_direction = 0;  // 左下角的蛇初始朝上，右上角的蛇初始朝下
        if(this.id === 1) this.eye_direction = 2;

        this.eye_dx = [ // 蛇眼睛不同方向的偏移量
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ];
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
        ];
    }

    start() { //只执行一次等于初始化

    }

    set_direction(d) {
        this.direction = d;
    }

    check_tail_increasing() { // 检查当前回合蛇，长度是否增加
        if(this.step <= 10) return true;
        if(this.step % 3 === 1) return true;
        return false;
    }



    next_step() {  // 将蛇的状态变为下一回合
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.eye_direction = d;
        this.direction = -1; // 清空操作
        this.status = "move";
        this.step++;

        const k = this.cells.length;
        for(let i = k; i > 0; --i) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i-1]));
        }
    }

    update_move() {
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.eps) {
            this.cells[0] = this.next_cell; // 添加新蛇头
            this.next_cell = null;
            this.status = "idle"; // 走完 静止状态

            if(!this.check_tail_increasing()) {  // 蛇不变长
                this.cells.pop();
            }
        } else {
            const move_distance = this.speed * this.timedelta / 1000; // 每两帧之间走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if(!this.check_tail_increasing()) {
                const k = this.cells.length;
                const tail = this.cells[k-1], tail_target = this.cells[k-2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }
    }

    update() { // 每一帧执行一次，除了第一帧之外
        if(this.status === 'move') {
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        if(this.status === 'die') {
            ctx.fillStyle = 'white';
        }

        for(const cell of this.cells) {
            ctx.beginPath();  // 起始一条路径，或重置当前路径。
            ctx.arc(cell.x * L, cell.y * L, 0.8 * L / 2, 0, Math.PI * 2);
            // arc(x, y, r, sAngle, eAngle) 创建弧/曲线（用于创建圆形或部分圆）
            // x，y圆心的坐标 r圆半径 sAngle：起始角 eAngle：结束角
            // counterclockwise：规定应该(False = 顺时针，true = 逆时针)绘图
            ctx.fill();  // 填充当前绘图（路径），填充颜色和fillStyle搭配使用
        }

        for(let i = 1; i < this.cells.length; ++i) {
            const a = this.cells[i - 1], b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue;
            if(Math.abs(a.x - b.x) < this.eps) {  // 向上下走
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else if(Math.abs(a.y - b.y) < this.eps) {  // 向左右走
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
            // fillRect(x,y,width,height)->绘制"被填充"的矩形，使用fillStyle修改填充色
        }

        ctx.fillStyle = "black";  // 黑色眼睛
        for(let i = 0; i < 2; ++i) {
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i]*0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i]*0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, L * 0.05, 0, Math.PI * 2);
            ctx.fill();

        }
    }
}
