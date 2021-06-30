<template>
    <div v-if="isUpdateLogLoaded" class="col-sm-3 list-group">
        <a
            class="list-group-item list-group-item-action update-sidebar-item" 
            v-for="update in updateLog"
            :key="update.version"
            @click="selectUpdate(update.version)"
        >
            <h2>{{ update.version }}</h2>
            <div>{{ update.date }}</div>
        </a>
    </div>
    <div v-if="!isUpdateLogLoaded" class="col-sm-3 list-group">
        <a class="list-group-item update-sidebar-item">
            <h2>LOADING</h2>
            <div>????-??-??</div>
        </a>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';

@Options({
    emits: [
        'selectUpdate'
        ]
})
export default class UpdateLogSidebar extends Vue
{
    selectedUpdateVersion: string = '';
    mounted(){
        
    }

    get isUpdateLogLoaded() : boolean {
        return UpdateLogsModule.isLoaded;
    }

    get updateLog() : Array<Update> {
        if (!this.isUpdateLogLoaded) {
            return new Array<Update>();
        }
        return UpdateLogsModule.updates;
    }

    selectUpdate(updateVersion: string) {
        this.selectedUpdateVersion = updateVersion;
        this.$emit('selectUpdate', updateVersion);
    }
}
</script>

<style scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>