// import { describe, expect, it } from "vitest";
import { describe } from "vitest";
import { MyBudjet } from "../js/budget";
import { BUDGET_KEY, DEPENSE_KEY, INCOME_KEY } from "../js/constants";


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
        const data = [{ montant: 10 }, { montant: -20 }, { montant: 30 }]
        expect(budget.getTotalMoney(data)).toEqual(20)
    })

    it('should return 61.5', () => {
        const budget = new MyBudjet()
        const data = [{ montant: 10.50 }, { montant: 20.25 }, { montant: 30.75 }]
        expect(budget.getTotalMoney(data)).toEqual(61.5)
    })

    it('should return 60', () => {
        const budget = new MyBudjet()
        const data = [{ montant: '10' }, { montant: '20' }, { montant: '30' }]
        expect(budget.getTotalMoney(data)).toEqual(60)
    })

    it('should return 30', () => {
        const budget = new MyBudjet()
        const data = [{ montant: 10 }, { montant: 20 }, {}]
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


describe('calcul total budget service',() =>{

    afterEach(() => {
        localStorage.clear()
    })

    describe('getTotalBudgetInfo', () => {
    
        it('should returns correct budget information with valid data', () => {
            // Données de test
            const budjetMock = 20000
            const depensesMock = [
                {
                    id: 1,
                    title: 'Electricité',
                    montant: 2000,
                },
    
                {
                    id: 2,
                    title: 'Nouritures',
                    montant: 3000,
                }
            ]
    
            const incomesMock = [
                {
                    id: 1,
                    title: 'Salaire',
                    montant: 10000,
                },
    
                {
                    id: 2,
                    title: 'Benefice commerce',
                    montant: 1500,
                }
            ]
    
            localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock))
            localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock))
            localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock))
    
            // Appel de la fonction
            const budget = new MyBudjet()
    
            expect(budget.getTotalBudgetInfo()).toEqual({
                budget: 15000,
                depenses: 5000, // Somme des dépenses
                solde: 26500  // Budget + (Revenus - Dépenses)
            });
        });
    
        it('should handle zero budget correctly', () => {
            const budjetMock = 0;
            const depensesMock = [
                {
                    id: 1,
                    title: 'Electricité',
                    montant: 2000,
                },
    
                {
                    id: 2,
                    title: 'Nouritures',
                    montant: 3000,
                }
            ]
    
            const incomesMock = [
                {
                    id: 1,
                    title: 'Salaire',
                    montant: 10000,
                },
    
                {
                    id: 2,
                    title: 'Benefice commerce',
                    montant: 1500,
                }
            ]
    
            localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
            localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock))
            localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock))
    
            const budget = new MyBudjet();
    
            expect(budget.getTotalBudgetInfo()).toEqual({
                budget: -5000,
                depenses: 5000, // ou autre valeur si nécessaire
                solde: 6500 // Somme des revenus - Somme des dépenses
            });
        });
    
        it('should handle zero expenses and incomes correctly', () => {
            const budjetMock = 20000;
            const depensesMock = [];
            const incomesMock = [];
    
            localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
            localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock));
            localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock));
    
            const budget = new MyBudjet();
    
            expect(budget.getTotalBudgetInfo()).toEqual({
                budget: 20000,
                depenses: 0,
                solde: 20000
            });
        });
    
        it('should handle missing data correctly', () => {
            // budget présent, mais pas de dépenses ni de revenus
            const budjetMock = 20000;
            localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
            localStorage.removeItem(DEPENSE_KEY);
            localStorage.removeItem(INCOME_KEY);
        
            const budget = new MyBudjet();
        
            expect(budget.getTotalBudgetInfo()).toEqual({
                budget: 20000,
                depenses: 0,
                solde: 20000
            });
        });
    });
})




