import { describe, expect, test } from 'vitest'
import { arrayLength } from '../arrayFunctions'
import { arrayPush } from '../arrayFunctions'
import { arrayPop } from '../arrayFunctions'
import { arrayShift } from '../arrayFunctions'
import { arrayUnshift } from '../arrayFunctions'

describe('array lenght function', () => {

    test('array vacio', () => {
        expect(arrayLength([])).toBe(0);
    })

    test('array un elemento', () => {
        expect(arrayLength([1])).toBe(1);
    })

    test('array 2 elementos', () => {
        expect(arrayLength([1, 2])).toBe(2);
    })
})

describe('array push function', () => {

    test('array vacio', () => {
        expect(arrayPush([], 1)).toEqual([1]);
    })

    test('array un elemento', () => {
        expect(arrayPush([1], 2)).toEqual([1, 2]);
    })

    test('array 2 elementos', () => {
        expect(arrayPush([1, 2], 3)).toEqual([1, 2, 3]);
    })
})

describe('array pop function', () => {

    test('array vacio', () => {
        expect(arrayPop([])).toEqual([]);
    })

    test('array un elemento', () => {
        expect(arrayPop([1])).toEqual([]);
    })

    test('array 2 elementos', () => {
        expect(arrayPop([1, 2])).toEqual([1]);
    })
})

describe('array shift function', () => {

    test('array vacio', () => {
        expect(arrayShift([])).toEqual([]);
    })

    test('array un elemento', () => {
        expect(arrayShift([1])).toEqual([]);
    })

    test('array 2 elementos', () => {
        expect(arrayShift([1, 2])).toEqual([2]);
    })
})

describe('array unshift function', () => {

    test('array vacio', () => {
        expect(arrayUnshift([], 1)).toEqual([1]);
    })

    test('array un elemento', () => {
        expect(arrayUnshift([1], 2)).toEqual([2, 1]);
    })

    test('array 2 elementos', () => {
        expect(arrayUnshift([1, 2], 3)).toEqual([3, 1, 2]);
    })
})