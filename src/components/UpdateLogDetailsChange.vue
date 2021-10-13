<template>
    <div class="text-gray-100">
        <button v-if="change.details !== undefined && change.details !== '' && !change.isDisplayDetails" 
            @click="toggleChangeDetails()">
            >>
        </button>
        <button v-else-if="change.details !== undefined && change.details !== '' && change.isDisplayDetails" 
            @click="toggleChangeDetails()">
            VV
        </button>
        <button v-else disabled="true">
            --
        </button>
        <span>{{ change.summary }}</span>
        <div class="ml-4" v-if="change.isDisplayDetails">
            {{ change.details }}
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, prop /*, Options*/} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';
import Change from '@/models/Change';

class Props {
    displayedUpdateVersion = prop({
        type: String,
        required: true
    });
    changeId = prop({
        type: Number,
        required: true
    })
}

export default class UpdateLogDetails extends Vue.with(Props) {
    get change() : Change {
        if (!this.isUpdateLogLoaded || this.displayedUpdateVersion === '' || this.changeId === -1) {
            return new Change();
        }
        let theUpdate = UpdateLogsModule.findByVersion(this.displayedUpdateVersion);
        let theChange = theUpdate === undefined ? 
            new Change() : theUpdate.changeLog.find(change => change.id === this.changeId);
        return theChange === undefined ? new Change() : theChange;
    }

    toggleChangeDetails() {
        let theUpdate = this.updateLog.find(update => update.version === this.displayedUpdateVersion)
        if (theUpdate === undefined)
        {
            return;
        }
        let theChange = theUpdate.changeLog.find(change => change.id === this.changeId);
        if (theChange !== undefined)
        {
            theChange.isDisplayDetails = !theChange.isDisplayDetails;
        }
    }

    get isUpdateLogLoaded() : boolean {
        return UpdateLogsModule.isLoaded;
    }

    get updateLog() : Array<Update> {
        if (!UpdateLogsModule.isLoaded) {
            return new Array<Update>();
        }
        return UpdateLogsModule.updates;
    }
}
</script>
<style lang="postcss" scoped>

</style>