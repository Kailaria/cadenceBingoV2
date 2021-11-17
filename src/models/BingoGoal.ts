// import BingoGoalVersion from "./BingoGoalVersion";

export default class BingoGoal {
    key!: string;
    text!: string;
    tooltip?: string;
    generatorType!: string;
    generatorVersion!: string;
    expirationVersion?: string;
    difficultyWeight!: number;
    isChallenge?: boolean = false;
    isEnding?: boolean = false;
    exclusionKeys?: Array<string>;
    // synergyTags?: Array<string>;
}