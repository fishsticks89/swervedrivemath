<script lang="ts">
    export let width: number;
    export let height: number;
    export let rotation: number;

    export let x: number;
    export let y: number;
</script>
    
<div class="rect"
style={`
width: ${width}px;
height: ${height}px;

position: absolute;
left: ${x}px;
top: ${y}px;
transform: translate(-50%, -50%) rotate(${rotation}deg);
`}>
    
</div>
    
<style>
    .rect {
        background-color: black;
    }
</style>