import GeneratorOptions from "@/models/GeneratorOptions";
import BingoBoardModule from "@/store/modules/bingo-board/bingo-board-module";
import GoalsLibraryModule from "@/store/modules/bingo-library/goals-library-module";

export default class BingoGeneratorService {
    /**
     * generateBingoBoard
     * 
     * Generates a bingo board based on the options sent in. This the the main entry point,
     * use it over any of the specific generator calls.
     */
    generateBingoBoard(options: GeneratorOptions) {
        BingoBoardModule.clearBingoBoardGoals();
        BingoBoardModule.setGeneratorOptions(options);
        BingoBoardModule.setSeed();

        let seedRandom = require('seedrandom');
        let rng = seedRandom(BingoBoardModule.generatorOptions.textSeed);
        let genType = options.generatorType;
        let genVersion = options.generatorVersion;
        if (options.enableDifficultyRandomness) {
            // Do the fully randomized version without care for difficulty
            // TODO: check for mutual exclusivity type.
            this.generateFullRandomBoard(genType, genVersion, rng);
        }
        // switch (genType) {}
    }

    /**
     * generateFullRandomBoard
     * 
     * Generates a bingo board with no logic involved, just randomly drawing from the full pool of
     * a given version.
     */
    generateFullRandomBoard(generatorName: string, generatorVersion: string, rng: any) {
        // Shuffle Population order
        let populationOrder = this.getDefaultRandomizedPopulationOrder(rng);
        let generatorGoals = GoalsLibraryModule.filterByGeneratorVersion(generatorName, generatorVersion);

        // Set ending goal 
        let endingGoals = this.shuffle(generatorGoals.filter(goal => goal.isEnding), rng);
        let endingGoal = endingGoals[0];
        BingoBoardModule.setEndingGoal(endingGoal);

        // Fill the board in the population order
        let boardGoalsDeck = this.shuffle(generatorGoals.filter(goal => !goal.isEnding), rng);
        let boardDeckIndex = 0;
        for (let i = 0; i < populationOrder.length; i++) {
            let index = populationOrder[i];
            // Add the goal to the population order's next index
            BingoBoardModule.addBingoBoardGoal({goal: boardGoalsDeck[boardDeckIndex], tileNum: index});
            boardDeckIndex++;
        }
    }

    /**
     * generateIsaacBoard
     * 
     * Generates a bingo board using a modification of the Binding of Isaac bingo generator, which uses
     * 3 discrete difficulties (Easy, Medium, Hard) plus a challenge tile in the central tile.
     */

    /** 
     * generateSrlBoard
     * 
     * Generates a bingo board using a modification of the SpeedRunsLive 1-25 perfect magic square
     * generators used on BingoSync.com. Borrows heavily from v8 of the generator:
     * https://github.com/kbuzsaki/bingosync/blob/master/bingosync-app/generators/generator_bases/srl_generator_v8.js
     */


    /* Other local methods */
    shuffle<T>(items: Array<T>, rng: any): Array<T> {
        // Shallow copy
        let shuffledItems = items.slice();

        // Uniformly shuffle the goals.
        for (let i = 1; i < items.length; i++) {
            let randomIndex = Math.floor(rng() * (i + 1));
            let temp = shuffledItems[i];
            shuffledItems[i] = shuffledItems[randomIndex];
            shuffledItems[randomIndex] = temp;
        }

        return shuffledItems;
    }

    getDefaultRandomizedPopulationOrder(rng: any): Array<number> {
        let populationOrder = new Array<number>();

        let centerPosition = 12;
        populationOrder[0] = centerPosition;

        let diagonalPositions = [0,6,18,24,4,8,16,20];
        diagonalPositions = this.shuffle(diagonalPositions, rng);
        populationOrder = populationOrder.concat(diagonalPositions);

        let nonDiagonalPositions = [1,2,3,5,7,9,10,11,13,14,15,17,19,21,22,23];
        nonDiagonalPositions = this.shuffle(nonDiagonalPositions, rng);
        populationOrder = populationOrder.concat(nonDiagonalPositions);

        return populationOrder;
    }
}