import { describe, expect, it, test } from "vitest";
import { multi, sum } from "../js/sum";



describe('additionnal', () =>{
    it('add 1 + 2 to equal 3', () =>{
        expect(sum(1, 2)).toBe(3)
    })

    it('add 5 + 6 to equal 3', () =>{
        expect(sum(5, 6)).toBe(11)
    })
})


describe('multipilcate', () =>{
    it('muliplie 1 * 2 to equal 3', () =>{
        expect(multi(1, 2)).toBe(2)
    })

    it('muliplie 3 * 4 to equal 3', () =>{
        expect(multi(3, 4)).toBe(12)
    })
})