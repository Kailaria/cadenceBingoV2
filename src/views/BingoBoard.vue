<!--TODO: Copy(?) the bingo board over to this Single-file component -->
<template>
    <div>
        <div>
            {{ endingTile.goal.text }}
        </div>
        <table>
            <thead>
                <th 
                    v-for="header in columnHeaders"
                    :key="header">
                    {{ header }}
                </th>
            </thead>
            <tbody>
                <tr
                    v-for="row in dataRows"
                    :key="row.header">
                    <th>{{ row.header }}</th>
                    <td 
                        v-for="(bingoTile, colIndex) in row.data"
                        :key="colIndex">
                        {{ textForTile(bingoTile) }}
                    </td>
                </tr>
                <tr>
                    <th>{{ blTrHeader }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import BingoBoardModule from '@/store/modules/bingo-board/bingo-board-module';
import GoalsLibraryModule from '@/store/modules/bingo-library/goals-library-module';
import BingoTile from '@/models/BingoTile';
import GeneratorOptions from '@/models/GeneratorOptions';
import BingoGeneratorService from '@/services/BingoGeneratorService';
import BingoGoal from '@/models/BingoGoal';

@Options({
    components: {
    }
})
export default class BingoBoard extends Vue
{
    //TODO: Get localized version of the board for reactivity
    columnHeaders: Array<string> = ['tl-br','col1','col2','col3','col4','col5'];
    colIndexes: Array<number> = [0,1,2,3,4];
    dataRows: Array<{header: string, data: Array<BingoTile>}> = [
        {header: 'row1', data: new Array<BingoTile>(5)},
        {header: 'row2', data: new Array<BingoTile>(5)},
        {header: 'row3', data: new Array<BingoTile>(5)},
        {header: 'row4', data: new Array<BingoTile>(5)},
        {header: 'row5', data: new Array<BingoTile>(5)}
    ];
    blTrHeader: string = 'bl-tr';
    endGoal: BingoTile = new BingoTile(new BingoGoal());

    generatorService = new BingoGeneratorService();

    constructor(obj: any) {
        super(obj);
        let me = this;
        let options: GeneratorOptions = new GeneratorOptions('BoI','1.1.1');
        options.textSeed = '1';
        options.enableDifficultyRandomness = true;
        GoalsLibraryModule.initGoalsLibrary().then(
            () => {
                me.generatorService.generateBingoBoard(options);
                let storeIndex = 0;
                for (let row in me.dataRows) {
                    for (let col in me.colIndexes) {
                        me.dataRows[row].data[col] = BingoBoardModule.bingoBoard[storeIndex];
                        storeIndex++;
                    }
                }
                me.endGoal = BingoBoardModule.endGoal;
            }
        );
    }

    get isBingoBoardLoaded() : boolean {
        return BingoBoardModule.isBingoBoardLoaded;
    }

    bingoTile(row: number, column: number) : BingoTile {
        if (!this.isBingoBoardLoaded) {
            BingoBoardModule.clearBingoBoardGoals();
        }
        let bingoTile = BingoBoardModule.getBingoTile(row, column);
        return bingoTile;
    }

    get endingTile() : BingoTile {
        return BingoBoardModule.endGoal;
    }

    textForTile(bingoTile: BingoTile) : string {
        if (bingoTile === undefined || bingoTile.goal === undefined) {
            return '';
        }
        return bingoTile.goal.text;
    }

    statusForTile(bingoTile: BingoTile) : string {
        return bingoTile.status.status;
    }

    difficultyForTile(bingoTile: BingoTile) : string {
        let label = "" + bingoTile.difficulty;
        if (bingoTile.goal.generatorType === "BoI") {
            switch (bingoTile.difficulty) {
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

    difficultyLabel(bingoTile: BingoTile) : string {
        let label = "" + bingoTile.difficulty;
        if (bingoTile.goal.generatorType === "BoI") {
            switch (bingoTile.difficulty) {
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
}
</script>
<style lang="postcss" scoped>

</style>