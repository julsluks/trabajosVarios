import { describe, expect, test } from 'vitest'
import { arrayLength } from '../arrayFunctions'

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