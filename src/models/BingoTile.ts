import BingoGoal from "./BingoGoal";
import BingoTileStatus from "./BingoTileStatus";

export default class BingoTile {
    goal!: BingoGoal;
    difficulty!: number;
    status!: BingoTileStatus;
    rowsContainingTile!: Array<string>;

    constructor(goal: BingoGoal) {
        this.goal = goal === undefined ? new BingoGoal() : goal;
        this.difficulty = goal.difficultyWeight === undefined ? 0 : goal.difficultyWeight;
        this.status = BingoTileStatus.NotDone;
        this.rowsContainingTile = new Array<string>();
    }
}