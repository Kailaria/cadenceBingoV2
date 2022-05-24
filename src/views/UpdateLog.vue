<template>
    <div>
        <div class="flex flex-row">
            <update-log-sidebar @select-update="onSelectUpdate"/>
            <update-log-details :displayedUpdateVersion="displayedUpdateVersion"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';
import UpdateLogSidebar from '@/components/UpdateLogSidebar.vue';
import UpdateLogDetails from '@/components/UpdateLogDetails.vue';

@Options({
    components: {
        UpdateLogSidebar,
        UpdateLogDetails
    }
})
export default class UpdateLog extends Vue
{
    displayedUpdateVersion: string = "";

    constructor(obj: any) {
        super(obj);
        UpdateLogsModule.initUpdateLog();
    }

    onSelectUpdate(updateVersion: string) {
        if (this.displayedUpdate !== undefined && this.displayedUpdate.changeLog.length > 0) {
            for (let change of this.displayedUpdate.changeLog) {
                change.isDisplayDetails = false;
            }
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
        return UpdateLogsModule.isUpdateLogLoaded;
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
        if (!UpdateLogsModule.isUpdateLogLoaded) {
            return new Array<Update>();
        }
        return UpdateLogsModule.updates;
    }
}
</script>

<style lang="postcss" scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>