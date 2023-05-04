<template>
    <div 
        v-if="isGoal"
        class="tile w-full"
        :class="{
            'statusNotDone': isStatusNotDone(localTile.status),
            'statusPlanYes': isStatusPlanYes(localTile.status),
            'statusDone': isStatusDone(localTile.status)
        }"
        @click="cycleStatus($event)"
        :title="titleForTile(propTextSeed)"
    >
        <span>{{ textForTile(propTextSeed, isGoal, row, col) }}</span>
    </div>
    <td 
        v-if="!isGoal" 
        class="tile"
        :class="{
            'statusNotDone': isStatusNotDone(localTile.status),
            'statusPlanNo': isStatusPlanNo(localTile.status),
            'statusPlanYes': isStatusPlanYes(localTile.status),
            'statusDone': isStatusDone(localTile.status)
        }"
        @click="cycleStatus($event)"
        :title="titleForTile(propTextSeed)"
    >
        <span>{{ textForTile(propTextSeed, isGoal, row, col) }}</span>
    </td>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import BingoBoardModule from '@/store/modules/bingo-board/bingo-board-module';
import BingoTile from '@/models/BingoTile';
import BingoGoal from '@/models/BingoGoal';
import BingoTileStatus from '@/models/BingoTileStatus';

@Options({
    components: {
    },
    props: {
        textSeed: String,
        row: Number,
        col: Number,
        isGoal: Boolean
    },
    watch: {
        textSeed(val) {
            this.propTextSeed = val;
            this.isTextDirty = true;
            this.isTitleDirty = true;
            // this.loadBingoBoardTile(this.isGoal, this.row, this.col);
        }
    }
})
export default class BingoGeneratorBoardTile extends Vue {
    // propTextSeed - Store the prop in a differently-named attribute and always reference this
    //    instead of the prop unless the prop will remain static.
    propTextSeed: string;
    localSeed: string;
    isGoal: boolean = false;
    localTile: BingoTile;
    // localStatus: BingoTileStatus;
    row: number;
    col: number;
    isTextDirty: boolean;
    isTitleDirty: boolean;

    /**
     * 
     * @param obj - Contains all the props
     */
    constructor(obj: any) {
        super(obj);
        let goal = new BingoGoal();
        this.localTile = new BingoTile(goal);
        // this.localStatus = this.localTile.status;
        this.isGoal = obj.isGoal;
        this.propTextSeed = obj.textSeed;
        this.localSeed = obj.textSeed;
        this.isTextDirty = false;
        this.isTitleDirty = false;
        this.row = obj.row;
        this.col = obj.col;
        // this.loadBingoBoardTile(this.isGoal, this.row, this.col);
    }

    loadBingoBoardTile(isGoal: boolean, row: number, col: number) {
        // this.textSeed = val;
        this.isGoal = isGoal
        if (isGoal) {
            this.localTile = BingoBoardModule.endGoal;
        } else {
            this.row = row;
            this.col = col;
            this.localTile = BingoBoardModule.getBingoTile(row, col);
        }
    }

    textForTile(textSeed: string, isGoal: boolean, row: number, col: number) : string {
        if ((this.localSeed !== textSeed && this.isTextDirty === true) 
            || this.localSeed.trim() === ''
            || this.localTile === undefined 
            || this.localTile.goal === undefined
            || this.localTile.goal.text === undefined) {
            this.loadBingoBoardTile(isGoal, row, col);
            this.isTextDirty = false;
        }
        this.updateLocalSeed();
        return this.localTile.goal.text;
    }

    titleForTile(textSeed: string) : string | undefined {
        if ((this.localSeed !== textSeed && this.isTitleDirty === true)
            || this.localSeed.trim() === '') {
            this.loadBingoBoardTile(this.isGoal, this.row, this.col);
            this.isTitleDirty = false;
        }
        this.updateLocalSeed();
        return this.localTile.goal.tooltip;
    }

    updateLocalSeed() {
        if (this.isTextDirty === false && this.isTitleDirty === false) {
            this.localSeed = this.propTextSeed;
        }
    }

    statusTextForTile(bingoTile: BingoTile) : string {
        return bingoTile.status.status;
    }

    isStatusNotDone(status: BingoTileStatus) : boolean {
        return status.status === BingoTileStatus.NotDone.status;
    }

    isStatusPlanYes(status: BingoTileStatus) : boolean {
        return status.status === BingoTileStatus.PlanYes.status;
    }

    isStatusPlanNo(status: BingoTileStatus) : boolean {
        return status.status === BingoTileStatus.PlanNo.status;
    }

    isStatusDone(status: BingoTileStatus) : boolean {
        return status.status === BingoTileStatus.Done.status;
    }

    cycleStatus(mouseEvent: MouseEvent) {
        if (!mouseEvent.shiftKey) {
            this.localTile.status = BingoTileStatus.nextStatus(this.localTile.status, this.isGoal);
        } else { // mouseEvent.shiftKey === true
            this.localTile.status = BingoTileStatus.prevStatus(this.localTile.status, this.isGoal);
        }
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
        @apply text-center p-2 bg-opacity-75 border cursor-pointer
    }

    .statusNotDone {
        @apply bg-blueGray-500 bg-opacity-75
    }

    .statusPlanNo {
        @apply bg-red-800 bg-opacity-75
    }

    .statusPlanYes {
        @apply bg-yellow-400 bg-opacity-75 text-blueGray-900
    }

    .statusDone {
        @apply bg-green-200 bg-opacity-75 text-blueGray-900
    }
</style>