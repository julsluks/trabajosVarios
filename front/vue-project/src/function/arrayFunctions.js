export function arrayLength(array) {
    let i = 0;
    while (
        array[i] !== undefined ||
        (array[i] === undefined && array[i + 1] !== undefined)
    ) {
        i++;
    }
    return i;
}