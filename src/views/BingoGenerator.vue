<template>
    <div>
        <generate-new-board expandedOptions="true" />
            <!-- @update-text-seed=""/> -->
        <bingo-generator-board v-if="isBingoBoardLoaded"
            :textSeed="generatorOptions.textSeed"/>
        <bingo-generator-usage/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import BingoBoardModule from '@/store/modules/bingo-board/bingo-board-module';
import GoalsLibraryModule from '@/store/modules/bingo-library/goals-library-module';
// import BingoTile from '@/models/BingoTile';
import GeneratorOptions from '@/models/GeneratorOptions';
import BingoGeneratorService from '@/services/BingoGeneratorService';
// import BingoGoal from '@/models/BingoGoal';
import BingoGeneratorBoard from '@/components/BingoGeneratorBoard.vue';
import BingoGeneratorUsage from '@/components/BingoGeneratorUsage.vue';
import GenerateNewBoard from '@/components/GenerateNewBoard.vue';

@Options({
    components: {
        BingoGeneratorBoard,
        BingoGeneratorUsage,
        GenerateNewBoard
    }
})
export default class BingoGenerator extends Vue
{
    generatorOptions: GeneratorOptions;

    generatorService = new BingoGeneratorService();

    constructor(obj: any) {
        super(obj);
        let me = this;
        this.generatorOptions = new GeneratorOptions('BoI','1.1.1');
        if (!GoalsLibraryModule.isGoalsLibraryLoaded) {
            GoalsLibraryModule.initGoalsLibrary().then(
                () => {
                    me.generatorOptions.textSeed = '1';
                    me.generatorOptions.enableDifficultyRandomness = true;
                    if (!me.isBingoBoardLoaded) {
                        me.generatorService.generateBingoBoard(this.generatorOptions);
                    }
                }
            );
        } else {
            this.generatorOptions.textSeed = '1';
            this.generatorOptions.enableDifficultyRandomness = true;
            if (!this.isBingoBoardLoaded) {
                this.generatorService.generateBingoBoard(this.generatorOptions);
            }
        }
    }

    get isBingoBoardLoaded() : boolean {
        return BingoBoardModule.isBingoBoardLoaded;
    }

    // updateTextSeed()
}
</script>
<style lang="postcss" scoped>

</style>