export default class GeneratorOptions {
    generatorType!: string;
    generatorVersion!: string;
    textSeed?: string;

    // Determines whether mutually exclusive goals can show up in the same board.
    exclusionLogicType!: string; // "board" for board-wide, "row" for only row-level, "none" for ignore
    // Determines whether to use the logic of the generator type or fully randomize
    enableDifficultyRandomness!: boolean;

    // glitchCategory?: string; // "NMG" default, "No Restrictions" as alt.
    // characterStory?: string; // "Story" for default, individual characters for Single-char
    // enablePermadeath?: boolean;
    // enableMystery?: boolean;
    // beatMode?: string; // Not sure if some goals will be different among RT/DT/FB

    constructor(type: string = "BoI",
        version: string = "1.1.1",
        exclusionLogicType: string = 'none',
        enableDifficultyRandomness: boolean = true) {
        this.generatorType = type;
        this.generatorVersion = version;
        this.exclusionLogicType = exclusionLogicType;
        this.enableDifficultyRandomness = enableDifficultyRandomness;
    }
}