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
                    v-for="(row, rowIndex) in dataRows"
                    :key="row.header">
                    <th>{{ row.header }}</th>
                    <td 
                        v-for="colIndex in row.cols"
                        :key="colIndex">
                        {{ textForTile(rowIndex, colIndex) }}
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
import BingoTile from '@/models/BingoTile';
import GeneratorOptions from '@/models/GeneratorOptions';
import BingoGeneratorService from '@/services/BingoGeneratorService';

@Options({
    components: {
    }
})
export default class BingoBoard extends Vue
{
    //TODO: Get localized version of the board for reactivity
    columnHeaders: Array<string> = ['tl-br','col1','col2','col3','col4','col5'];
    colIndexes: Array<number> = [0,1,2,3,4];
    dataRows: Array<object> = [
        {header: 'row1', cols: this.colIndexes},
        {header: 'row2', cols: this.colIndexes},
        {header: 'row3', cols: this.colIndexes},
        {header: 'row4', cols: this.colIndexes},
        {header: 'row5', cols: this.colIndexes}
    ];
    blTrHeader: string = 'bl-tr';

    generatorService = new BingoGeneratorService();

    constructor(obj: any) {
        super(obj);
        let options: GeneratorOptions = new GeneratorOptions('BoI','1.1.1');
        options.textSeed = '1';
        options.enableDifficultyRandomness = true;
        this.generatorService.generateBingoBoard(options);
    }

    get isBingoBoardLoaded() : boolean {
        return BingoBoardModule.isBingoBoardLoaded;
    }

    bingoTile(row: number, column: number) : BingoTile {
        if (!this.isBingoBoardLoaded) {
            BingoBoardModule.clearBingoBoardGoals();
        }
        let tile = BingoBoardModule.getBingoTile(row, column);
        return tile;
    }

    get endingTile() : BingoTile {
        return BingoBoardModule.endGoal;
    }

    textForTile(row: number, column: number) : string {
        let tile = this.bingoTile(row, column);
        if (tile === undefined || tile.goal === undefined) {
            return '';
        }
        return tile.goal.text;
    }

    statusForTile(row: number, column: number) : string {
        return this.bingoTile(row, column).status.status;
    }

    difficultyForTile(row: number, column: number) : string {
        let bingoTile = this.bingoTile(row, column);
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