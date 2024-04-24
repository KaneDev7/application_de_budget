
class MyBudjet {
    #depenses = []
    #incomes = []
    #storage = new LocalelStorage()


    addDepense(title, montant) {
        const newDepense = {
            id : Date.now(),
            title,
            montant
        }
        this.#depenses = this.#storage.getDataFromLocaleStorage('depense')
        this.#depenses.push(newDepense)
        this.#storage.setDataToLocalStorage('depense', this.#depenses)
    }

    addInCommes(title, montant) {
        const newIncome =  {
            id : Date.now(),
            title,
            montant
        }

        this.#incomes = this.#storage.getDataFromLocaleStorage('income')
        this.#incomes.push(newIncome)
        this.#storage.setDataToLocalStorage('income', this.#incomes)
    }

    iniitBudget(montant){
        this.#storage.setDataToLocalStorage('budget', montant)
    }

    deleteDepense(id){
        this.#depenses = this.#storage.getDataFromLocaleStorage('depense')
        this.#depenses = [...this.#depenses].filter(item => item.id !== id)
        this.#storage.setDataToLocalStorage('depense', this.#depenses)
        window.location.reload()
    }

    deleteIncomne(id){
        this.#incomes = this.#storage.getDataFromLocaleStorage('income')
        this.#incomes = [...this.#incomes].filter(item => item.id !== id)
        this.#storage.setDataToLocalStorage('income', this.#incomes)
        window.location.reload()
    }

    getTotalBudgetInfo(){
 
        const budget = parseFloat(this.#storage.getDataFromLocaleStorage('budget'))

        this.#depenses = this.#storage.getDataFromLocaleStorage('depense')
        this.#incomes = this.#storage.getDataFromLocaleStorage('income')

        const totalDepense = this.#depenses.reduce((acc, item) => {
           return acc += parseFloat(item.montant)
        },0)

        const totalIncome =  this.#incomes.reduce((acc, item) => {
            return acc += parseFloat(item.montant)
         },0)


         const solde = budget +  (totalIncome - totalDepense)

        const bdgetInfos = {
            budget :  budget,
            depenses: totalDepense,
            solde
        }

        return bdgetInfos
        
        
     
    }


}

