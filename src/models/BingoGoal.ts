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

    get generatorToString(): string {
        return this.generatorType + "-" + this.generatorVersion;
    }

    static CopyFromJson(jsonObj: any): BingoGoal {
        let theCopy = new BingoGoal();
        theCopy.key = jsonObj.key;
        theCopy.text = jsonObj.text;
        if (jsonObj.tooltip !== undefined) {
            theCopy.tooltip = jsonObj.tooltip;
        }
        theCopy.generatorType = jsonObj.generatorType;
        theCopy.generatorVersion = jsonObj.generatorVersion;
        if (jsonObj.expirationVersion !== undefined) {
            theCopy.expirationVersion = jsonObj.expirationVersion;
        }
        theCopy.difficultyWeight = jsonObj.difficultyWeight;
        if (jsonObj.isChallenge !== undefined) {
            theCopy.isChallenge = jsonObj.isChallenge;
        } else {
            theCopy.isChallenge = false;
        }
        if (jsonObj.isEnding !== undefined) {
            theCopy.isEnding = jsonObj.isEnding;
        } else {
            theCopy.isEnding = false;
        }
        // The XML format when it converts to JSON has "exclusionKeys" as a wrapper around an array
        //   of "exclusionKey"s. It looks cleaner when entering data to keep that wrapper, even though
        //   it makes this bit of code look weird.
        if (jsonObj.exclusionKeys !== undefined && 
            jsonObj.exclusionKeys.exclusionKey !== undefined && 
            jsonObj.exclusionKeys.exclusionKey.length > 0) {
            theCopy.exclusionKeys = jsonObj.exclusionKeys.exclusionKey;
        }

        return theCopy;
    }
}