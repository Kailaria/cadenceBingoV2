import {Module, VuexModule, getModule, MutationAction} from "vuex-module-decorators"
import store from '@/store/index'
import axios from 'axios';
import Update from '@/models/Update';
import * as common from '@/static/UpdateLogCommon';

@Module({
    name: 'updateLog', 
    store, 
    dynamic: true
})
class UpdateLogsModule extends VuexModule {
    updates: Array<Update> = new Array<Update>();
    
    get isUpdateLogLoaded(): boolean {
        return this.updates.length >= common.updateFileNames.length;
    }

    get findByVersion() {
        return (versionId: string) => this.updates.find(update => update.version === versionId);
    }

    @MutationAction
    async initUpdateLog() {
        const parser = require('fast-xml-parser');
        const baseUrl = window.location.origin + '/updateLogs/Update_';
        const xmlSuffix = '.xml';
        let updateLog = new Array<Update>();
        
        for(let i = 0; i < common.updateFileNames.length; i++) {
            let fileName = common.updateFileNames[i];
            let update = await axios.get(baseUrl + fileName + xmlSuffix);
            let jsonObj = parser.parse(update.data);
            updateLog.push(Update.CopyFromJson(jsonObj.update));
        }
        return {updates: updateLog};
    }
}

export default getModule(UpdateLogsModule);