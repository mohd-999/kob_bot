<template>
    <ContentField>
        <table class="table table-striped table-hover" style="text-align: center;">
            <thead>
                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>对战结果</th>
                    <th>对战时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.record.id">
                    <td>
                        <img :src="record.a_photo" alt="" class="record-user-photo">
                        &nbsp;
                        <span class="record-user-username">{{ record.a_username }}</span>
                    </td>
                    <td>
                        <img :src="record.b_photo" alt="" class="record-user-photo">
                        &nbsp;
                        <span class="record-user-username">{{ record.b_username }}</span>
                    </td>
                    <td>{{ record.result }}</td>
                    <td>{{ record.record.createtime }}</td>
                    <td>
                        <button @click="open_record_content(record.record.id)" type="button" class="btn btn-outline-info">查看录像</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="...">
        <ul class="pagination" style="float: right;">
            <li class="page-item" @click="click_page(-2)">
                <a class="page-link" href="#">&laquo;</a>
            </li>
            <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
                <a class="page-link" href="#">{{ page.number }}</a>
            </li>
            <li class="page-item" @click="click_page(-1)">
                <a class="page-link" href="#">&raquo;</a>
            </li>
        </ul>
        </nav>

    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import $ from 'jquery';
import router from '@/router';

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let records = ref([]);
        let current_page = 1;
        let total_records = 1;
        let pages = ref([]);

        const click_page = page => {
            let max_pages = parseInt(Math.ceil(total_records / 10));
            if(page === -2) page = 1;
            else if(page === -1) page = max_pages;

            if(page >= 1 && page <= max_pages) {
                pull_page(page);
            }
        }

        const update_pages = () => {
            let max_pages = parseInt(Math.ceil(total_records / 10));
            let new_pages = [];
            for(let i = current_page - 2; i <= current_page + 2; ++i) {
                if(i >= 1 && i <= max_pages) {
                    new_pages.push({
                        number: i,
                        is_active: i === current_page ? "active" : "",
                    });
                }
            }
            pages.value = new_pages;
        }

        const pull_page = page => {
            current_page = page;
            $.ajax({
                // url: "http://127.0.0.1:3000/api/record/getlist/",
                url: "https://app4435.acapp.acwing.com.cn/api/record/getlist/",
                data: {
                    page,
                },
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    records.value = resp.records;
                    total_records = resp.records_count;
                    update_pages();
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        pull_page(current_page);

        const stringTo2D = map => {
            let g = [];
            for(let i = 0, k = 0; i < 13; ++i) {
                let line = [];
                for(let j = 0; j < 14; ++j, ++k) {
                    if(map[k] === '0') line.push(0);
                    else line.push(1);
                }
                g.push(line);
            }
            return g;
        }

        const open_record_content = recordId => {
            let l = 0, r = 9, mid;
            while(l <= r) { // 二分优化
                mid = Math.ceil((l+r) / 2);
                if(records.value[mid].record.id > recordId) l = mid + 1;
                else r = mid - 1;
            }
            store.commit("updateIsRecord", true);  // 说明是录像
                store.commit("updateGame", {  // 传游戏地图
                    map: stringTo2D(records.value[l].record.map),
                    a_id: records.value[l].record.aid,
                    a_sx: records.value[l].record.asx,
                    a_sy: records.value[l].record.asy,
                    b_id: records.value[l].record.bid,
                    b_sx: records.value[l].record.bsx,
                    b_sy: records.value[l].record.bsy,
                });
            store.commit("updateSteps", {
                a_steps: records.value[l].record.asteps,
                b_steps: records.value[l].record.bsteps,
            });
            store.commit("updateRecordLoser", records.value[l].record.loser);
            router.push({
                name:"record_content",
                params: {
                    recordId
                }
            });
        }

        return {
            records,
            open_record_content,
            pages,
            click_page,
        }
    }
}
</script>

<style scoped>
img.record-user-photo {
    width: 4vh;
    border-radius: 50%;
}
</style>
