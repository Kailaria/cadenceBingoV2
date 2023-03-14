<template>
    <div
        id="generateNew-container">
        <label for="newSeed">Seed: </label>
        <input v-model="newSeed" type="text">
        <button @click="updateTextSeed()"></button>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import GeneratorOptions from '@/models/GeneratorOptions';

@Options({
    props: {
        expandedOptions: Boolean,
    },
    emits: [
        'updateTextSeed'
    ]
})
export default class GenerateNewBoard extends Vue
{
    newSeed!: string;
    generatorOptions!: GeneratorOptions;

    updateTextSeed() {
        this.$emit('updateTextSeed', this.newSeed);
    }
}
</script>

<style lang="postcss" scoped>

</style>