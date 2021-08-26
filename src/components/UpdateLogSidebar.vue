<template>
    <div 
        id="update-log"
        v-if="isUpdateLogLoaded" 
        class="flex-none flex flex-col mx-4 space-y-0.5 bg-transparent"
    > <!--class="col-sm-3 list-group"-->
        <!--<a class="list-group-item list-group-item-action update-sidebar-item" -->
        <a
            class="border-2 p-2 cursor-pointer bg-opacity-75 text-white hover:text-blueGray-300"
            :class="{
                'selected': isSelectedUpdate(update.version),
                'unselected': !isSelectedUpdate(update.version),
            }"
            v-for="update in updateLog"
            :key="update.version"
            @click="selectUpdate(update.version)"
        >
            <h1 class="text-2xl font-bold">Version {{ update.version }}</h1>
            <div
                class="font-bold" 
                :class="{
                    'unselected': !isSelectedUpdate(update.version),
                    'selected': isSelectedUpdate(update.version),
                }">
                Released {{ update.date }}
            </div>
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
        if (!this.isUpdateLogLoaded) {
            return;
        }
        this.selectedUpdateVersion = this.updateLog[0].version;
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

    isSelectedUpdate(updateVersion: string) : boolean {
        return updateVersion === this.selectedUpdateVersion;
    }

    selectUpdate(updateVersion: string) {
        this.selectedUpdateVersion = updateVersion;
        this.$emit('selectUpdate', updateVersion);
    }
}
</script>

<style lang="postcss" scoped>
#update-log a.update {
    @apply border-2 p-2 cursor-pointer bg-opacity-75 text-white hover:text-blueGray-300
}

#update-log a.unselected {
    @apply bg-gray-700 border-white
}

#update-log a.selected {
    @apply bg-gray-500 border-orange-400
}

#update-log a.unselected div.unselected {
    @apply text-gray-300
}

#update-log a.selected div.selected {
    @apply text-orange-300
}
</style>