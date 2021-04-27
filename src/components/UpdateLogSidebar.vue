<template>
    <div v-if="!updateLogEmptyOrNull" class="col-sm-3 list-group">
        <a
            class="list-group-item list-group-item-action update-sidebar-item" 
            v-for="update in updateLog"
            :key="update.version"
            @click="$emit('selectUpdate', update.version)"
        >
            <h2>{{ update.version }}</h2>
            <div>{{ update.date }}</div>
        </a>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Update from '@/models/Update';

class UpdateLogSidebarProps {
    updateLog!: Array<Update>
}

@Options({
})
export default class UpdateLogSidebar extends Vue.with(UpdateLogSidebarProps)
{
    mounted(){
        
    }

    get updateLogEmptyOrNull() {
        return this.updateLog === undefined || this.updateLog.length === 0;
    }
}
</script>

<style scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>