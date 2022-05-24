<template>
    <div v-if="isGoal" class="tile">
        <span>{{ textForTile(textSeed, isGoal, row, col) }}</span>
    </div>
    <td v-if="!isGoal" class="tile">
        <span>{{ textForTile(textSeed, isGoal, row, col) }}</span>
    </td>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import BingoBoardModule from '@/store/modules/bingo-board/bingo-board-module';
import BingoTile from '@/models/BingoTile';
import BingoGoal from '@/models/BingoGoal';

@Options({
    components: {
    },
    props: {
        textSeed: String,
        row: Number,
        col: Number,
        isGoal: Boolean
    },
    // watch: {
    // }
})
export default class BingoGeneratorBoardTile extends Vue {
    textSeed: string;
    endGoal: boolean = false;
    localTile: BingoTile;

    constructor(obj: any) {
        super(obj);
        let goal = new BingoGoal();
        this.localTile = new BingoTile(goal);
        this.textSeed = '';
    }

    loadBingoBoardTile(isGoal: boolean, row: number, col: number) {
        // this.textSeed = val;
        if (isGoal) {
            this.localTile = BingoBoardModule.endGoal;
            this.endGoal = true;
        } else {
            this.localTile = BingoBoardModule.getBingoTile(row, col);
        }
    }

    textForTile(textSeed: string, isGoal: boolean, row: number, col: number) : string {
        if (this.textSeed !== textSeed 
            || this.textSeed.trim() === ''
            || this.localTile === undefined 
            || this.localTile.goal === undefined
            || this.localTile.goal.text === undefined) {
            this.loadBingoBoardTile(isGoal, row, col);
        }
        return this.localTile.goal.text;
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
    .tile {
        @apply text-center
    }
</style>