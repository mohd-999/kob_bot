<template>
    <ContentField>
        <div>
            游戏说明：
            <div>本游戏为在线双人对战游戏：</div>
            <div>游戏的操作为&nbsp;w(上)&nbsp;s(下)&nbsp;a(左)&nbsp;d(右)</div>
            <div>1.&nbsp;游戏采取同步回合制，只有在两人都进行了下一步操作的时候，游戏才会进行一回合。</div>
            <div>2.&nbsp;如果其中一人当前回合超过5秒没有进行下一步操作，系统将直接判断本人输，游戏结束。</div>
            <div>3.&nbsp;如果其中一人下一步撞墙，系统将判断另一人获胜，游戏结束。</div>
            <div>4.&nbsp;如果都进行下一步操作，并且没有撞墙，重复以上操作，直到游戏结束</div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'

export default {
    components: {
        ContentField,
    },
    setup() {

    }
}
</script>

<style scoped>
</style>
