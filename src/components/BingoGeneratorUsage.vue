<template>
    <ul>
        <li>Hover over a goal when you want an explanation about that goal.</li>
        <li>Click on a goal to advance forward. Board goals loop from "Done" to "Failed", while the End Goal loops from "Done" to "Not Done".</li>
        <li>Shift-Click on a goal to advance backward. Status loops to Done from the least done status.</li>
        <li>
            <span>Goal coloration and order:</span>
            <ul>
                <li>Red: "Not going to complete" or "Failed challenge"</li>
                <li>Gray: "Not Done" (starting/default)</li>
                <li>Yellow: "Planning to complete" or "In Progress"</li>
                <li>Green: "Done!"</li>
            </ul>
        </li>
    </ul>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
export default class BingoGeneratorUsage extends Vue {
    
}
</script>

<style lang="postcss" scoped>

</style>