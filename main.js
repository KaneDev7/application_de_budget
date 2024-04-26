import { MyBudjet } from "./js/budget"
import { Dom } from "./js/dom"
import { LocalelStorage } from "./js/storage"

const form = document.querySelector('.formBox form')

const DEPENSE = 'depense'
const INCOME = 'income'
const BUDGET = 'budget'

// get data
const storage = new LocalelStorage()
const depenseData = storage.getDataFromLocaleStorage(DEPENSE)
const incomeData = storage.getDataFromLocaleStorage(INCOME)



// insert elements
const domElement = new Dom()
domElement.createAndInsertDataToTable(DEPENSE, depenseData)
domElement.createAndInsertDataToTable(INCOME, incomeData)
domElement.insertBudgetInfos()


form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const montant = formData.get('montant')

    if (form.id !== 'budjet') {
        if (title.trim() === '') {
            new Dom().insertErrorMessage('Ce champs est obligatoire')
            return
        }
    }

    const budget = new MyBudjet()

    if (form.id === 'income') {
        budget.addInCommes(title, montant)
    } else if (form.id === 'depense') {
        budget.addDepense(title, montant)
    } else {
        budget.iniitBudget(montant)
    }

    window.location.href = window.location.origin
})






