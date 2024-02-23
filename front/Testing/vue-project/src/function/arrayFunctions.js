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

export function arrayPush(array, value) {
    let i = 0;
    while (array[i] !== undefined) {
        i++;
    }
    array[i] = value;
    return array;
}

export function arrayPop(array) {
    if (array.length === 0) {
        return array;
    }

    const newArray = [];
    for (let i = 0; i < array.length - 1; i++) {
        newArray[i] = array[i];
    }
    return newArray;
}

export function arrayShift(array) {
    if (array.length === 0) {
        return array;
    }

    const newArray = [];
    for (let i = 1; i < array.length; i++) {
        newArray[i - 1] = array[i];
    }
    return newArray;
}

export function arrayUnshift(array, value) {
    const newArray = [value];
    for (let i = 0; i < array.length; i++) {
        newArray[i + 1] = array[i];
    }
    return newArray;
} 