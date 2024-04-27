import { BUDGET_KEY, DEPENSE_KEY, INCOME_KEY } from "./constants"
import { LocalelStorage } from "./storage"

export class MyBudjet {
    #depenses = []
    #incomes = []
    storage = new LocalelStorage()
    
    addDepense(title, montant) {
        const newDepense = {
            id: Date.now(),
            title,
            montant
        }
        
        this.#depenses = this.storage.getDataFromLocaleStorage(DEPENSE_KEY)
        this.#depenses.push(newDepense)
        this.storage.setDataToLocalStorage(DEPENSE_KEY, this.#depenses)
    }

    addInCommes(title, montant) {
        const newIncome = {
            id: Date.now(),
            title,
            montant
        }

        this.#incomes = this.storage.getDataFromLocaleStorage(INCOME_KEY)
        this.#incomes.push(newIncome)
        this.storage.setDataToLocalStorage(INCOME_KEY, this.#incomes)
    }

    iniitBudget(montant) {
        this.storage.setDataToLocalStorage(BUDGET_KEY, montant)
    }

    deleteDepense(id) {
        this.#depenses = this.storage.getDataFromLocaleStorage(DEPENSE_KEY)
        this.#depenses = [...this.#depenses].filter(item => item.id !== id)
        this.storage.setDataToLocalStorage(DEPENSE_KEY, this.#depenses)
    }

    deleteIncomne(id) {
        this.#incomes = this.storage.getDataFromLocaleStorage(INCOME_KEY)
        this.#incomes = [...this.#incomes].filter(item => item.id !== id)
        this.storage.setDataToLocalStorage(INCOME_KEY, this.#incomes)
    }
 
    getTotalMoney(array = []) {
        return array.reduce((acc, item) => {
            if (item.hasOwnProperty('montant')) {
                return acc += parseFloat(item.montant);
            } else {
                return acc; 
            }
        }, 0);
    }

    getTotalBudgetInfo() {
        const budget = this.storage.getDataFromLocaleStorage(BUDGET_KEY)
        this.#depenses = this.storage.getDataFromLocaleStorage(DEPENSE_KEY)
        this.#incomes = this.storage.getDataFromLocaleStorage(INCOME_KEY)

        const totalDepense = this.getTotalMoney(this.#depenses)
        const totalIncome = this.getTotalMoney(this.#incomes)
        const solde = budget + (totalIncome - totalDepense)

        return {
            budget: budget,
            depenses: totalDepense,
            solde
        }
    }


}

