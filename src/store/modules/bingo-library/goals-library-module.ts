import {Module, VuexModule, getModule, MutationAction} from "vuex-module-decorators";
import store from '@/store/index';
import axios from 'axios';
import BingoGoal from "@/models/BingoGoal";
import * as common from '@/static/GoalLibraryCommon';

@Module({
    name: 'goalsLibrary',
    store,
    dynamic: true
})
class GoalsLibraryModule extends VuexModule {
    bingoGoals: Array<BingoGoal> = new Array<BingoGoal>();
    filesLoaded: Array<string> = new Array<string>();

    get isGoalsLibraryLoaded(): boolean {
        return this.filesLoaded.length >= common.bingoGoalFileNames.length;
    }

    get filterByKey() {
        return (key: string) => this.bingoGoals.filter(goal => goal.key === key);
    }

    get filterByGeneratorVersion() {
        return (generatorName: string, generatorVersion: string) => 
            this.bingoGoals.filter(goal => {
                let includeGoal = goal.generatorType === generatorName &&
                    goal.generatorVersion >= generatorVersion;
                // If the goal currently would be included but there's an expiration version, only
                //   include it if generatorVersion requested is strictly before its expirationVersion.
                if (includeGoal && goal.expirationVersion !== undefined) {
                    includeGoal = goal.expirationVersion > generatorVersion;
                }
                return includeGoal;
            });
    }

    // @Mutation
    // sort() {
    //     return (...args : any[]) => {
            
    //     };
    // }

    @MutationAction
    async initGoalsLibrary() {
        const parser = require('fast-xml-parser');
        const baseUrl = window.location.origin + '/goals/';
        let bingoLibrary = new Array<BingoGoal>();
        let files = new Array<string>();

        for (let i = 0; i < common.bingoGoalFileNames.length; i++) {
            let fileName = common.bingoGoalFileNames[i];
            let goalLibraryXml = await axios.get(baseUrl + fileName);
            let jsonLibrary = parser.parse(goalLibraryXml.data);
            jsonLibrary.goals.goal.forEach((jsonGoal: any) =>
                bingoLibrary.push(BingoGoal.CopyFromJson(jsonGoal))
            );
            files.push(fileName);
        }
        return {
            bingoGoals: bingoLibrary,
            filesLoaded: files
        };
    }
}

export default getModule(GoalsLibraryModule);