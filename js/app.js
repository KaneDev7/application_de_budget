const montantsEl = document.querySelectorAll('.card_montant p')
const form = document.querySelector('.formBox form')

const DEPENSE = 'depense'
const INCOME = 'income'

const depenseData =  new LocalelStorage().getDataFromLocaleStorage(DEPENSE)
const incomeData =  new LocalelStorage().getDataFromLocaleStorage(INCOME)

const domElement = new Dom()
depenseData.length > 0 && domElement.createAndInsertDataToTable(DEPENSE, depenseData)
incomeData.length > 0 && domElement.createAndInsertDataToTable(INCOME, incomeData)



form?.addEventListener('submit',(event) => {
    event.preventDefault()    
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const montant = formData.get('montant')

    if(title.trim() === '' || !montant) return

    if(form.id === 'income'){
        new MyBudjet().addInCommes(title, montant)
    }else{
        new MyBudjet().addDepense(title, montant)
    }
    window.location.href = window.location.origin
})




const bdgetObj = {
    budget: 10000,
    depense: 1000,
    solde: 10000,
}


for(const element of montantsEl){
    const budgetKey = element.dataset.montant
    element.innerText = bdgetObj[budgetKey]
}

