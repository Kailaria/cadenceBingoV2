<template>
    <div class="container">
        <div class="row justify-content-center">
            <div v-if="!isUpdateLogEmptyOrNull" class="col-sm-3 list-group">
                <a
                    class="list-group-item list-group-item-action update-sidebar-item" 
                    v-for="update in updateLog"
                    :key="update.version"
                    @click="onSelectUpdate(update.version)"
                >
                    <h2>{{ update.version }}</h2>
                    <div>{{ update.date }}</div>
                </a>
            </div>
            <!-- <update-log-sidebar :update-log="updateLog" @select-update="onSelectUpdate()"/> -->
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
import axios from 'axios';
import Update from '@/models/Update';
import * as common from '@/static/UpdateLogCommon';

@Options({})
export default class UpdateLog extends Vue
{
    updateLog: Array<Update> = new Array<Update>();
    displayedUpdateVersion: string = "";

    constructor(obj: any) {
        super(obj);
        this.updateLog = new Array<Update>();
    }

    toggleChangeDetails(updateVersion: string, changeId: number) {
        // This block is here solely to make the compiler happy that updateLog is valid.
        if (this.updateLog === undefined || this.updateLog.length === 0) {
            this.initUpdateLog();
            if (this.updateLog === undefined || this.updateLog.length === 0) {
                return;
            }
        }
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
    onSelectUpdate(updateVersion: string) {
        if ((this.updateLog === undefined || this.updateLog.length === 0)) {
            this.initUpdateLog();
            if (this.updateLog === undefined || this.updateLog.length === 0) {
                return;
            }
        }
        if (this.displayedUpdate !== undefined && this.displayedUpdate.changeLog.length > 0) {
            this.displayedUpdate.changeLog.every(change => change.isDisplayDetails = false);
        }
        let foundUpdate = this.updateLog.find(update => update.version === updateVersion);
        this.displayedUpdateVersion = foundUpdate === undefined ? this.displayedUpdateVersion : updateVersion;
    }

    initUpdateLog() {
        if (!this.isUpdateLogEmptyOrNull) {
            return;
        }
        const parser = require('fast-xml-parser');
        const baseUrl = window.location.origin + '/updateLogs/Update_';
        const xmlSuffix = '.xml';
        let _self = this;
        // TODO: Make async...?
        common.updateFileNames.forEach(fileName => {
            axios(baseUrl + fileName + xmlSuffix).then(response => {
                let jsonObj = parser.parse(response.data);
                if (_self.updateLog !== undefined) {
                    _self.updateLog.push(Update.CopyFromJson(jsonObj.update));
                    if (_self.displayedUpdateVersion === undefined) {
                        _self.displayedUpdateVersion = _self.updateLog[0].version;
                    }
                }
            })
            .catch(err => console.log(err))
        });
    }

    get isUpdateLogEmptyOrNull() : boolean {
        return this.updateLog === undefined || this.updateLog.length === 0;
    }

    get displayedUpdate() : Update {
        if ((this.updateLog === undefined || this.updateLog.length === 0)) {
            this.initUpdateLog();
            if (this.updateLog === undefined || this.updateLog.length === 0) {
                return new Update();
            }
        }
        if (this.displayedUpdateVersion === '') {
            this.displayedUpdateVersion = this.updateLog[0].version;
        }
        let theUpdate = this.updateLog.find(update => update.version === this.displayedUpdateVersion);
        return theUpdate === undefined ? new Update() : theUpdate;
    }
}
</script>

<style scoped>
a.update-sidebar-item {
    cursor: pointer;
}
</style>