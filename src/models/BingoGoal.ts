import BingoGoalVersion from "./BingoGoalVersion";

export default class BingoGoal {
    key!: string;
    text!: string;
    tooltip?: string;
    currentVersion?: string;
    versions!: Array<BingoGoalVersion>;
}