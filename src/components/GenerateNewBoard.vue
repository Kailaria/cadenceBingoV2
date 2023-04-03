<template>
    <div
        id="generateNew-container"
    >
        <label for="newSeed">Seed: </label>
        <input v-model="newSeed" type="text">
        <button @click="updateTextSeed()">Generate</button>
    </div>
    <div>Current Seed: {{ currentSeed }}</div>
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
        'updateTextSeed'
    ]
})
export default class GenerateNewBoard extends Vue
{
    newSeed!: string;
    generatorOptions!: GeneratorOptions;
    expandableOptions!: boolean;
    expandOptions!: boolean;

    mounted() {
        this.expandOptions = false;
        this.generatorOptions = new GeneratorOptions('BoI', '1.1.1');
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

    // Emits the updated text seed so that the parent component can load the 
    updateTextSeed() {
        this.$emit('updateTextSeed', this.newSeed);
    }
}
</script>

<style lang="postcss" scoped>

</style>