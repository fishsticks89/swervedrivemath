<script lang="ts">
    import { getRotationForVec, rotateVector } from "./getRotationVector";
    import Rect from "./Rect.svelte";
    import type { Vector2 } from "./vector2";
    import {
        addVector,
        getMagnitude,
        scaleVector,
        setMagnitude,
    } from "./vectorMath";

    export let width: number;
    export let height: number;

    export let xpos: number;
    export let ypos: number;

    export let orientation: number;

    export let movement: Vector2;
    export let rotation: number;

    function getCoords(i: number) {
        let x = height / 2;
        let y = width / 2;
        if (i % 2 == 1) {
            x *= -1;
        }
        if (i >= 2) {
            y *= -1;
        }
        return {
            x,
            y,
        };
    }

    function getRotationForWheel(i: number, movement: Vector2, rotation: number) {
        const rotationalMovement = setMagnitude(
            rotateVector(getCoords(i), 90),
            (rotation / 360) * getMagnitude({ x: height, y: width }) * Math.PI
        );
        const directionalMovement = movement;
        const rot = -getRotationForVec(
            addVector(rotationalMovement, directionalMovement)
        );
        return rot;
    }
</script>

<div class="robot" style={`
width: ${width}px;
height: ${height}px;

top: ${ypos}px;
left: ${xpos}px;
transform: translate(-50%, -50%) rotate(${orientation}deg);
`}>
    {#each [0, 1, 2, 3] as i}
        <Rect
            x={getCoords(i).x + width / 2}
            y={-getCoords(i).y + height / 2}
            rotation={getRotationForWheel(i, movement, rotation)}
            width={15}
            height={5}
        />
    {/each}
</div>

<style>
    .robot {
        position: fixed;
    }
</style>
