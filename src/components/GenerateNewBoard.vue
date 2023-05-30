<template>
    <div
        id="generateNew-container"
        class="pb-1"
    >
        <label for="newSeed" class="font-bold">Seed: </label>
        <input v-model="newSeed" type="text">
        <button @click="generate()" class="btn primary">Generate</button>
        <div class="float-right"><b>Current Seed:</b> {{ currentSeed }}</div>
    </div>
    <div v-if="areOptionsExpanded">
        options expanded :3
    </div>
</template>

<script lang="ts">
// The main goal here is to just store, modify, and provide the generator options upward.
// DO NOT generate the board in here, only emit the updated text seed.
import {Options, Vue} from 'vue-class-component';
import GeneratorOptions from '@/models/GeneratorOptions';

@Options({
    props: {
        expandableOptions: Boolean,
    },
    emits: [
        'generate'
    ]
})
export default class GenerateNewBoard extends Vue
{
    newSeed!: string;
    generatorOptions!: GeneratorOptions;
    expandableOptions!: boolean;
    expandOptions!: boolean;

    constructor(obj: any) {
        super(obj);

        this.newSeed = "";
        this.expandableOptions = obj.expandableOptions;
        this.expandOptions = false;

        this.generatorOptions = new GeneratorOptions('BoI', '1.1.1');
        this.generatorOptions.textSeed = '1';
        this.generatorOptions.enableDifficultyRandomness = true;
    }

    get areOptionsExpanded() : boolean {
        return this.expandableOptions && this.expandOptions;
    }

    get currentSeed() : string {
        let seed = 'loading';
        if (this.generatorOptions !== undefined && this.generatorOptions.textSeed !== undefined) {
            seed = this.generatorOptions.textSeed;
        }
        return seed;
    }

    // Emits the generator options
    generate() {
        this.generatorOptions.textSeed = this.newSeed;
        this.$emit('generate', this.generatorOptions);
        this.newSeed = "";
    }
}
</script>

<style lang="postcss" scoped>

</style>