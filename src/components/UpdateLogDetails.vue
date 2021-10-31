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
        <update-log-details-change 
            v-for="change in displayedUpdate.changeLog"
            :key="change.id"
            :displayedUpdateVersion="displayedUpdate.version"
            :changeId="change.id"
        />
    </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import Update from '@/models/Update';
import UpdateLogsModule from '@/store/modules/update-logs/update-log-module';
import UpdateLogDetailsChange from '@/components/UpdateLogDetailsChange.vue';

@Options({
    components: {
        UpdateLogDetailsChange
    },
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
        let foundUpdate = UpdateLogsModule.updates.find(update => update.version === updateVersion);
        this.theDisplayedUpdateVersion = foundUpdate === undefined ? this.theDisplayedUpdateVersion : updateVersion;
    }

    get isUpdateLogLoaded() : boolean {
        return UpdateLogsModule.isLoaded;
    }

    get displayedUpdate() : Update {
        let me = this;
        if (!this.isUpdateLogLoaded) {
            return new Update();
        }
        if (this.theDisplayedUpdateVersion === '') {
            let routedUpdate = UpdateLogsModule.updates.find(update => update.date === me.$route.params.date);
            this.theDisplayedUpdateVersion = (routedUpdate !== undefined ? routedUpdate : UpdateLogsModule.updates[0]).version;
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