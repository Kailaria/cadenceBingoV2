<template>
    <div class="container">
        <div class="row justify-content-center">
            <!-- <div v-if="isUpdateLogLoaded" class="col-sm-3 list-group">
                <a
                    class="list-group-item list-group-item-action update-sidebar-item" 
                    v-for="update in updateLog"
                    :key="update.version"
                    @click="onSelectUpdate(update.version)"
                >
                    <h2>{{ update.version }}</h2>
                    <div>{{ update.date }}</div>
                </a>
            </div> -->
            <update-log-sidebar @select-update="onSelectUpdate"/>
            <div v-if="displayedUpdate !== undefined" class="col-sm-9" id="displayUpdateDiv">
                <!-- style="flex:flex-grow;" id="displayUpdateDiv"> -->
                <h2>{{ displayedUpdate.title }}</h2>
                <h4>{{ displayedUpdate.date }}</h4>
                <h5>{{ displayedUpdate.version }}</h5>
                <p>{{ displayedUpdate.summary }}</p>
                <div v-for="change in displayedUpdate.changeLog" :key="change.id">
                    <button v-if="change.details !== undefined && change.details !== '' && !change.isDisplayDetails" 
                        @click="toggleChangeDetails(displayedUpdate.version, change.id)">
                        >>
                    </button>
                    <button v-else-if="change.details !== undefined && change.details !== '' && change.isDisplayDetails" 
                        @click="toggleChangeDetails(displayedUpdate.version, change.id)">
                        VV
                    </button>
                    <button v-else disabled="true">
                        --
                    </button>
                    <span>{{ change.summary }}</span>
                    <div v-if="change.isDisplayDetails">
                        {{ change.details }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';
import UpdateLogSidebar from '@/components/UpdateLogSidebar.vue';

@Options({
    components: {
        UpdateLogSidebar
    }
})
export default class UpdateLog extends Vue
{
    displayedUpdateVersion: string = "";

    constructor(obj: any) {
        super(obj);
        UpdateLogsModule.initUpdateLog();
    }

    toggleChangeDetails(updateVersion: string, changeId: number) {
        let theUpdate = UpdateLogsModule.updates.find(update => update.version === updateVersion)
        if (theUpdate === undefined)
        {
            return;
        }
        let theChange = theUpdate.changeLog.find(change => change.id === changeId);
        if (theChange !== undefined)
        {
            theChange.isDisplayDetails = !theChange.isDisplayDetails;
        }
    }
    onSelectUpdate(updateVersion: string) {
        if (this.displayedUpdate !== undefined && this.displayedUpdate.changeLog.length > 0) {
            this.displayedUpdate.changeLog.every(change => change.isDisplayDetails = false);
        }
        let foundUpdate = UpdateLogsModule.updates.find(update => update.version === updateVersion);
        this.displayedUpdateVersion = foundUpdate === undefined ? this.displayedUpdateVersion : updateVersion;
    }

    initUpdateLog() {
        if (this.isUpdateLogLoaded) {
            return;
        }
        UpdateLogsModule.initUpdateLog();
    }

    get isUpdateLogLoaded() : boolean {
        return UpdateLogsModule.isLoaded;
    }

    get displayedUpdate() : Update {
        if (!this.isUpdateLogLoaded) {
            return new Update();
        }
        if (this.displayedUpdateVersion === '') {
            this.displayedUpdateVersion = UpdateLogsModule.updates[0].version;
        }
        let theUpdate = UpdateLogsModule.findByVersion(this.displayedUpdateVersion);
        return theUpdate === undefined ? new Update() : theUpdate;
    }

    get updateLog() : Array<Update> {
        if (!UpdateLogsModule.isLoaded) {
            return new Array<Update>();
        }
        return UpdateLogsModule.updates;
    }
}
</script>

<style scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>