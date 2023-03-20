import type { Vector2 } from "./vector2";

/**
 * 
 * @param coords 
 * @returns Counterclockwise from terminal in degrees
 */
export function getRotationForVec(coords: Vector2): number {
    return (Math.atan(coords.y / coords.x)) / (2 * Math.PI) * 360;
}

export function rotateVector(vec: Vector2, ang: number) {
    ang = -ang * (Math.PI * 2 / 360);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return { x: vec.x * cos - vec.y * sin, y: vec.x * sin + vec.y * cos };
};