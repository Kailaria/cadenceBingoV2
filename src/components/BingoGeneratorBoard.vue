<template>
    <div>
        <bingo-generator-board-tile 
            :textSeed="textSeed"
            :isGoal="true"
            class="w-full"/>
        <table>
            <thead>
                <th 
                    v-for="header in columnHeaders"
                    :key="header"
                    class="text-center">
                    {{ header }}
                </th>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in dataRows"
                    :key="row.header">
                    <th class="text-center">
                        {{ row.header }}
                    </th>
                    <bingo-generator-board-tile 
                        v-for="(bingoTile, colIndex) in row.data"
                        :key="'row' + rowIndex + 'col' + colIndex"
                        :textSeed="textSeed"
                        :isGoal="false"
                        :row="rowIndex"
                        :col="colIndex"/>
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
import BingoGoal from '@/models/BingoGoal';
import BingoGeneratorBoardTile from '@/components/BingoGeneratorBoardTile.vue';

@Options({
    components: {
        BingoGeneratorBoardTile
    },
    props: {
        textSeed: String
    },
    watch: {
        textSeed(val) {
            this.loadBingoBoard(val);
        }
    }
})
export default class BingoGeneratorBoard extends Vue {
    propTextSeed: string = '';
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

    constructor(obj: any) {
        super(obj);
        if (BingoBoardModule.isBingoBoardLoaded) {
            this.loadBingoBoard(this.propTextSeed);
        }
    }

    loadBingoBoard(textSeed: string) {
        this.propTextSeed = textSeed;
        let storeIndex = 0;
        for (let row in this.dataRows) {
            for (let col in this.colIndexes) {
                this.dataRows[row].data[col] = BingoBoardModule.bingoBoard[storeIndex];
                storeIndex++;
            }
        }
        this.endGoal = BingoBoardModule.endGoal;
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
}
</script>

<style lang="postcss" scoped>

</style>