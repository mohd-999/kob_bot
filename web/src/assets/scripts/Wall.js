import { AcGameObject } from "./AcGameObject";

export class Wall extends AcGameObject {
    constructor(r, c, gamemap) {  // 构造函数
        super();

        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37226";
    }

    update() { // 每一帧执行一次，除了第一帧之外
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }
}
