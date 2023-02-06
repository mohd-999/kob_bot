<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from '@/assets/scripts/GameMap'
import { ref, onMounted } from 'vue'
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        let parent = ref(null);  // ref实现响应式实时更新数据
        let canvas = ref(null);  // ref实现响应式实时更新数据

        onMounted(() => {
            store.commit(
                "updateGameObject",
                new GameMap(canvas.value.getContext('2d'), parent.value, store)
            );  // canvas 标签用于绘制图像，parent 监听父组件
        });

        return {
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
