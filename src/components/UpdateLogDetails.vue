<template>
    <div 
        v-if="displayedUpdate !== undefined" 
        class="p-2 bg-gray-600 bg-opacity-75" 
        id="displayUpdateDiv"
    >
        <h1 class="title">{{ displayedUpdate.title }}</h1>
        <h4 class="text-blueGray-300">Released: {{ displayedUpdate.date }}</h4>
        <h5 class="text-orange-500 font-bold pb-1">Version {{ displayedUpdate.version }}</h5>
        <p class="text-gray-100 pb-1">{{ displayedUpdate.summary }}</p>
        <div class="text-gray-100" v-for="change in displayedUpdate.changeLog" :key="change.id">
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
            <div class="ml-4" v-if="change.isDisplayDetails">
                {{ change.details }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import {Vue, Options} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';

// const UpdateLogDetailsProps = Vue.extend({
//     props: {

//     }
// })

@Options({
    props: {
        displayedUpdateVersion: String
    },
    watch: {
        displayedUpdateVersion(val) {
            this.onSelectUpdate(val);
        }
    }
})
export default class UpdateLogDetails extends Vue {
    private theDisplayedUpdateVersion: string = "";

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
        this.theDisplayedUpdateVersion = foundUpdate === undefined ? this.theDisplayedUpdateVersion : updateVersion;
    }

    get isUpdateLogLoaded() : boolean {
        return UpdateLogsModule.isLoaded;
    }

    get displayedUpdate() : Update {
        if (!this.isUpdateLogLoaded) {
            return new Update();
        }
        if (this.theDisplayedUpdateVersion === '') {
            this.theDisplayedUpdateVersion = UpdateLogsModule.updates[0].version;
        }
        let theUpdate = UpdateLogsModule.findByVersion(this.theDisplayedUpdateVersion);
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

<style lang="postcss" scoped>
    #displayUpdateDiv h1.title {
        @apply text-4xl text-orange-400 filter drop-shadow-xl font-bold
    }
</style>