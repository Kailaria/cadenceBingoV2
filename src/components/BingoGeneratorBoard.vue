<template>
    <div class="bingoboard">
        <bingo-generator-board-tile 
            :textSeed="propTextSeed"
            :isGoal="true"
        />
        <table>
            <thead>
                <th 
                    v-for="header in columnHeaders"
                    :key="header"
                    class="text-center border-l border-r">
                    {{ header }}
                </th>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in dataRows"
                    :key="row.header">
                    <th class="text-center border-l border-t border-b">
                        {{ row.header }}
                    </th>
                    <bingo-generator-board-tile 
                        v-for="(cellId, colIndex) in row.cellIds"
                        :key="cellId"
                        :textSeed="propTextSeed"
                        :isGoal="false"
                        :row="rowIndex"
                        :col="colIndex"
                    />
                    <th class="text-center border-r border-t border-b">
                        {{ row.header }}
                    </th>
                </tr>
                <tr>
                    <th 
                        v-for="header in columnHeadersBottom()"
                        :key="header"
                        class="text-center border-l border-r border-b">
                        {{ header }}
                    </th>
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
            this.propTextSeed = val;
            // this.loadBingoBoard(val);
        }
    }
})
export default class BingoGeneratorBoard extends Vue {
    propTextSeed: string = '1';
    columnHeaders: Array<string> = ['tl-br','col1','col2','col3','col4','col5','bl-tr'];
    colIndexes: Array<number> = [0,1,2,3,4];
    dataRows: Array<{header: string, cellIds: Array<string>}> = [
        {header: 'row1', cellIds: new Array<string>(5)},
        {header: 'row2', cellIds: new Array<string>(5)},
        {header: 'row3', cellIds: new Array<string>(5)},
        {header: 'row4', cellIds: new Array<string>(5)},
        {header: 'row5', cellIds: new Array<string>(5)}
    ];
    endGoal: BingoTile = new BingoTile(new BingoGoal());

    constructor(obj: any) {
        super(obj);
        if (BingoBoardModule.isBingoBoardLoaded) {
            this.loadBingoBoard(this.propTextSeed);
        }
    }

    loadBingoBoard(textSeed: string) {
        this.propTextSeed = textSeed;
        // let storeIndex = 0;
        for (let row in this.dataRows) {
            for (let col in this.colIndexes) {
                this.dataRows[row].cellIds[col] = 'row' + row + 'col' + col;
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

    columnHeadersBottom() : Array<string> {
        let headers = Array<string>();
        this.columnHeaders.forEach(head => headers.push(head));
        let tl_br = headers.shift();
        let bl_tr = headers.pop();
        if (bl_tr !== undefined) {
            headers.unshift(bl_tr);
        }
        if (tl_br !== undefined) {
            headers.push(tl_br);
        }
        return headers;
    }
}
</script>

<style lang="postcss" scoped>
    .bingoboard {
        @apply bg-gray-700 bg-opacity-75 text-blueGray-100
    }
</style>