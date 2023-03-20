<script lang="ts">
    import { browser } from "$app/environment";
    import Robot from "./../lib/Robot.svelte";
    import { spring } from "svelte/motion";
    import { createDebounce } from "../lib/debounce";
    import { onDestroy } from "svelte";
    import { rotateVector } from "../lib/getRotationVector";
    import { scaleVector } from "../lib/vectorMath";

    let robotDelta = spring(
        {
            x: 0,
            y: 0,
        },
        {
            damping: 1,
            stiffness: 0.03,
        }
    );
    let robotx = 0;
    let roboty = 0;

    let robotRotation = 0;

    let robotOrientation = 0;

    if (browser) {
        window.onmousemove = function (e) {
            robotx = e.clientX;
            roboty = e.clientY;
        };
        const lastMousePos = {
            x: 0,
            y: 0,
        };
        const dTime = 0.5;
        const int2 = setInterval(() => {
            robotDelta.update(() => {
                return {
                    x: (robotx - lastMousePos.x) / dTime,
                    y: (roboty - lastMousePos.y) / dTime,
                };
            });

            lastMousePos.x = robotx;
            lastMousePos.y = roboty;
        }, dTime);

        const interval = setInterval(() => {
            const now = performance.now();

            const rot = Math.sin(now / 1000) * 10;

            robotRotation = rot > 0 ? rot : 0;
            robotOrientation += robotRotation * dTime;
        }, dTime);
        onDestroy(() => {
            clearInterval(int2);
            clearInterval(interval);
            window.onmousemove = null;
        });
    }
</script>

<Robot
    xpos={robotx}
    ypos={roboty}
    width={80}
    height={80}
    movement={rotateVector(
        {
            x: $robotDelta.x,
            y: -$robotDelta.y,
        },
        -robotOrientation
    )}
    rotation={robotRotation}
    orientation={robotOrientation}
/>

<style>
</style>
