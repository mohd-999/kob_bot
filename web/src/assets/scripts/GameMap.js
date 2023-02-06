import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {  // 构造函数
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        this.L = 0;

        this.rows = 13;  // *****
        this.cols = 14;  // *****

        this.walls = [];

        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),
        ];
    }

    set_rows(r) {
        this.rows = r;
    }
    set_cols(c) {
        this.cols = c;
    }


    create_walls() {
        const g = this.store.state.pk.gamemap;

        for(let r = 0; r < this.rows; ++r) {
            for(let c = 0; c < this.cols; ++c) {
                if(g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
    }

    add_listening_events() {
        this.ctx.canvas.focus();

        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1;
            if(e.key === 'w') d = 0;
            else if(e.key === 'd') d = 1;
            else if(e.key === 's') d = 2;
            else if(e.key === 'a') d = 3;

            if(d >= 0) {
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    direction: d,
                }));
            }
        });
    }

    start() { // 只执行一次
        this.create_walls();
        this.add_listening_events();
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready() {  // 判断两条蛇是否都准备好进入下一回合
        for(const snake of this.snakes) {
            if(snake.status !== "idle") return false;
            if(snake.direction === -1) return false;
        }
        return true;
    }

    next_step() {  // 让两条蛇进入下一回合
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    update() { // 每一帧执行一次，除了第一帧之外
        this.update_size();
        if(this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    render() {  // 地图染色
        const color_even = '#AAD751', color_odd = '#A2D149';
        for(let r = 0; r < this.rows; r++) {
            for(let c = 0; c < this.cols; c++) {
                if((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;  // 设置或返回用于填充绘画的颜色、渐变或模式。
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
                  // 绘制"被填充"的矩形。使用fillStyle修改填充色  （x,y,width,height）
            }
        }
    }
}
