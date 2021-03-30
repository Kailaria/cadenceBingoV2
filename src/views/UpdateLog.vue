<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-3 list-group">
                <a
                    class="update-sidebar-item list-group-item list-group-item-action" 
                    v-for="update in updateLog" :key="update.version"
                    @click="selectUpdate(update.version)"
                >
                    <h2>{{ update.version }}</h2>
                    <div>{{ update.date }}</div>
                </a>
            </div>
            <div class="col-sm-9" id="displayUpdateDiv">
                <!-- style="flex:flex-grow;" id="displayUpdateDiv"> -->
                <h2>{{ displayedUpdate.title }}</h2>
                <h4>{{ displayedUpdate.date }}</h4>
                <h5>{{ displayedUpdate.version }}</h5>
                <p>{{ displayedUpdate.summary }}</p>
                <div v-for="change in displayedUpdate.changeLog" :key="change.id">
                    <button v-if="change.details !== '' && !change.isDisplayDetails" 
                        @click="toggleChangeDetails(displayedUpdate.version, change.id)">
                        >>
                    </button>
                    <button v-else-if="change.details !== '' && change.isDisplayDetails" 
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
import Update from '../models/Update';

@Options({
    created(){
        this.displayedUpdate = this.updateLog[0];
    }
})
export default class UpdateLog extends Vue
{
    updateLog: Update[] = [
        {
            title: 'Beginning of the Vue refactor',
            version: '1.02.01',
            date: '2020-11-22',
            summary: 'This is a test summary',
            changeLog: [
                {
                    id: '001',
                    summary: 'Change #1',
                    isDisplayDetails: false,
                    details: 'details for change #1 displayed',
                },
                {
                    id: '002',
                    summary: 'Change #2',
                    isDisplayDetails: false,
                    details: '',
                },
            ]
        }
    ];
    displayedUpdate: Update = new Update();

    toggleChangeDetails(updateVersion: string, changeId: string) {
        let theUpdate = this.updateLog.find(update => update.version === updateVersion)
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
    selectUpdate(updateVersion: string) {
        this.displayedUpdate.changeLog.every(change => change.isDisplayDetails = false);
        let foundUpdate = this.updateLog.find(update => update.version === updateVersion);
        this.displayedUpdate = foundUpdate === undefined ? this.displayedUpdate : foundUpdate;
    }
}
</script>

<style scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>