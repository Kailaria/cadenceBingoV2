<template>
    <div>
        <table>
            <thead>
                <th>
                    Goal
                </th>
                <th>
                    Generator Type
                </th>
                <th>
                    Version
                </th>
                <th>
                    Difficulty
                </th>
                <th>
                    Challenge?
                </th>
                <th>
                    End Goal?
                </th>
            </thead>
            <tbody>
                <tr 
                    v-for="bingoGoal in goalsLibrary"
                    :key="bingoGoal.key">
                    <td>{{ bingoGoal.text }}</td>
                    <td>{{ bingoGoal.generatorType }}</td>
                    <td>{{ bingoGoal.generatorVersion }}</td>
                    <td>{{ difficultyLabel(bingoGoal) }}</td>
                    <td>{{ yesNoLabel(bingoGoal.isChallenge) }}</td>
                    <td>{{ yesNoLabel(bingoGoal.isEnding) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import GoalsLibraryModule from '@/store/modules/bingo-library/goals-library-module'
import BingoGoal from '@/models/BingoGoal';

@Options({
    components: {
    }
})
export default class GoalsLibrary extends Vue
{
    constructor(obj: any) {
        super(obj);
    }

    get isGoalsLibraryLoaded() : boolean {
        return GoalsLibraryModule.isGoalsLibraryLoaded;
    }

    get goalsLibrary() : Array<BingoGoal> {
        this.initGoalsLibrary();
        return GoalsLibraryModule.bingoGoals;
    }

    initGoalsLibrary() {
        if (this.isGoalsLibraryLoaded) {
            return;
        }
        GoalsLibraryModule.initGoalsLibrary();
    }

    difficultyLabel(bingoGoal: BingoGoal) : string {
        let label = "" + bingoGoal.difficultyWeight;
        if (bingoGoal.generatorType === "BoI") {
            switch (bingoGoal.difficultyWeight) {
                case 5:
                    label = "Easy";
                    break;
                case 15:
                    label = "Medium";
                    break;
                case 25:
                    label = "Hard";
                    break;
                case 6:
                    label = "Challenge";
                    break;
                case 20:
                    label = "Ending";
                    break;
                default:
                    label = "N/A"
                    break;
            }
        }
        return label;
    }

    yesNoLabel(flag: boolean) : string {
        if (flag === true) {
            return "Yes";
        } else {
            return "No";
        }
    }
}
</script>
