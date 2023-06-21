<template>
    <div >
        <button @click="togglePanel()">
            <img src="../assets/Details_arrow.png"
                class="transform transition-transform"
                :class="{
                    'rotate-90': isDisplayPanel,
                }"
            >
        </button>
        <span>
            <slot name="header"></slot>
        </span>
        <slot v-if="isDisplayPanel"></slot>
    </div>
</template>

<script lang="ts">
import {Vue, /*prop */ Options} from 'vue-class-component';

@Options({
})
export default class GenericShowHidePanel extends Vue {
    isDisplayPanel: boolean;

    constructor(obj: any) {
        super(obj);

        this.isDisplayPanel = false;
    }

    togglePanel() {
        this.isDisplayPanel = !this.isDisplayPanel;
    }
}

</script>

<style lang="postcss" scoped>

</style>