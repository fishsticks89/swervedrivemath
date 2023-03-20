import type { Vector2 } from "./vector2";

export function multVector(...vecs: Vector2[]) {
    return vecs.reduce((prev, curr) => {
        return {
            x: prev.x * curr.x,
            y: prev.y * curr.y
        }
    }, { x: 1, y: 1 })
}

export function addVector(...vecs: Vector2[]) {
    return vecs.reduce((prev, curr) => {
        return {
            x: prev.x + curr.x,
            y: prev.y + curr.y
        }
    }, { x: 0, y: 0 })
}

export function scaleVector(vec: Vector2, magnitude: number) {
    return multVector(vec, {
        x: magnitude,
        y: magnitude
    })
}

export function getMagnitude(vec: Vector2) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}

export function setMagnitude(vec: Vector2, magnitude: number): Vector2 {
    if (magnitude === 0) {
        return {
            x: 0,
            y: 0
        }
    }
    const scale = magnitude / getMagnitude(vec);
    return {
        x: vec.x * scale,
        y: vec.y * scale
    }
}