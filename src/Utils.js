export function tanDegrees(degrees) {
    return Math.tan(degrees * Math.PI/180)
}

export function compareVectors(vectorA, vectorB) {
    return vectorA.x == vectorB.x &&
        vectorA.y == vectorB.y &&
        vectorA.z == vectorB.z
}