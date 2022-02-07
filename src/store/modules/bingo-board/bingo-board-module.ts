import {Module, VuexModule, getModule, Mutation} from "vuex-module-decorators";
import store from '@/store/index';
import BingoGoal from "@/models/BingoGoal";
import BingoTile from "@/models/BingoTile";
import GeneratorOptions from "@/models/GeneratorOptions";
import BingoTileStatus from "@/models/BingoTileStatus";

@Module({
    name: 'bingoBoard',
    store,
    dynamic: true
})
class BingoBoardModule extends VuexModule {
    generatorOptions: GeneratorOptions = new GeneratorOptions();
    endGoal: BingoTile;
    // Reduce complexity of data structure, use math to determine row/column instead of Array of Arrays
    bingoBoard: Array<BingoTile> = new Array<BingoTile>(25);

    constructor(obj: any) {
        super(obj);
        let defaultGoal = new BingoGoal();
        defaultGoal.text = 'default';
        defaultGoal.difficultyWeight = 0;
        this.endGoal = new BingoTile(defaultGoal);
    }

    // getters
    get isBingoBoardLoaded(): boolean {
        return this.bingoBoard.every(tile => tile !== undefined && tile.goal !== undefined);
    }

    get getBingoTile() {
        let me = this;
        return (row: number, column: number) => {
            let index = (row * 5) + column;
            return me.bingoBoard[index];
        };
    }

    @Mutation
    resetBingoBoard() {
        if (this.endGoal !== undefined) {
            this.endGoal.status = BingoTileStatus.NotDone;
        }
        this.bingoBoard.forEach(tile => tile.status = BingoTileStatus.NotDone);
    }

    @Mutation
    setGeneratorOptions(options: GeneratorOptions) {
        this.generatorOptions = options;
    }

    @Mutation
    setSeed() {
        let textSeed = this.generatorOptions.textSeed;
        if (textSeed === undefined || textSeed.trim().length > 0) {
            textSeed = Math.ceil(Math.random() * 9999999999).toString();
            this.generatorOptions.textSeed = textSeed;
        }
    }
    
    @Mutation
    clearBingoBoardGoals() {
        let defaultGoal = new BingoGoal();
        defaultGoal.difficultyWeight = 0;
        defaultGoal.text = 'default';
        this.bingoBoard = new Array<BingoTile>(25);
        for (let i = 0; i < 25; i++) {
            this.bingoBoard[i] = new BingoTile(defaultGoal);
        }
        this.endGoal = new BingoTile(defaultGoal);
    }

    @Mutation
    setEndingGoal(goal: BingoGoal) {
        this.endGoal = new BingoTile(goal);
    }

    @Mutation
    addBingoBoardGoal(goal: BingoGoal, tileNum: number) {
        let tile = new BingoTile(goal);
        this.bingoBoard[tileNum] = tile;
    }

}

export default getModule(BingoBoardModule);