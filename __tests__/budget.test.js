import { describe, expect, it } from "vitest";
import { MyBudjet } from "../js/budget";


describe('get total Money', () => {
    it('should return 60', () => {
        const budget = new MyBudjet()
        const data = [{ montant: 10 }, { montant: 20 }, { montant: 30 }]
        expect(budget.getTotalMoney(data)).toEqual(60)
    })

    it('should return -60', () => {
        const budget = new MyBudjet()
        const data = [{ montant: -10 }, { montant: -20 }, { montant: -30 }]
        expect(budget.getTotalMoney(data)).toEqual(-60)
    })

    
    it('should return 20', () => {
        const budget = new MyBudjet()
        const data =[{ montant: 10 }, { montant: -20 }, { montant: 30 }]
        expect(budget.getTotalMoney(data)).toEqual(20)
    })

    it('should return 61.5', () => {
        const budget = new MyBudjet()
        const data =[{ montant: 10.50 }, { montant: 20.25 }, { montant: 30.75 }] 
        expect(budget.getTotalMoney(data)).toEqual(61.5)
    })

    it('should return 60', () => {
        const budget = new MyBudjet()
        const data = [{ montant: '10' }, { montant: '20' }, { montant: '30' }] 
        expect(budget.getTotalMoney(data)).toEqual(60)
    })

    it('should return 30', () => {
        const budget = new MyBudjet()
        const data = [{ montant: 10 }, { montant: 20 }, { }]
        expect(budget.getTotalMoney(data)).toEqual(30)
    })

    it('should return 0', () => {
        const budget = new MyBudjet()
        expect(budget.getTotalMoney([])).toEqual(0)
    })

    it('should return 0', () => {
        const budget = new MyBudjet()
        expect(budget.getTotalMoney()).toEqual(0)
    })
})


describe("get total budget infos", () =>{
    it("should work", () =>{
       
    })
})