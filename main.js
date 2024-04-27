import { MyBudjet } from "./js/budget"
import {BUDGET_KEY, DEPENSE_KEY, INCOME_KEY } from "./js/constants"
import { Dom } from "./js/dom"
import { LocalelStorage } from "./js/storage"

const form = document.querySelector('.formBox form')



// get data
const storage = new LocalelStorage()
const depenseData = storage.getDataFromLocaleStorage(DEPENSE_KEY)
const incomeData = storage.getDataFromLocaleStorage(INCOME_KEY)



// insert elements
const domElement = new Dom()
domElement.createAndInsertDataToTable(DEPENSE_KEY, depenseData)
domElement.createAndInsertDataToTable(INCOME_KEY, incomeData)
domElement.insertBudgetInfos()


form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const montant = formData.get('montant')

    if (form.id !== BUDGET_KEY) {
        if (title.trim() === '') {
            new Dom().insertErrorMessage('Ce champs est obligatoire')
            return
        }
    }

    const budget = new MyBudjet()

    if (form.id === INCOME_KEY) {
        budget.addInCommes(title, montant)
    } else if (form.id === DEPENSE_KEY) {
        budget.addDepense(title, montant)
    } else {
        budget.iniitBudget(montant)
    }

    window.location.href = window.location.origin
})






