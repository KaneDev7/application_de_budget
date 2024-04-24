class Dom {

    createAndInsertDataToTable(tbodyId, data) {

        if (window.location.pathname !== '/') return
        if(data.length < 1) return

        const tbody = document.querySelector(`table #${tbodyId}`)
        const lastTrEl = tbody.querySelector('#lastTrEl')


        for (const item of [...data]) {
            const tr = document.createElement('tr')
            const titleTd = document.createElement('td')
            const montantTd = document.createElement('td')
            const buttonTd = document.createElement('td')
            const button = document.createElement('button')
            button.title = 'Supprimer'

            button.innerText =
                titleTd.innerText = item.title
            montantTd.innerText = item.montant + ' F CFA'
            button.innerText = 'supprimer'

            tr.appendChild(titleTd)
            tr.appendChild(montantTd)
            buttonTd.appendChild(button)
            tr.appendChild(buttonTd)
            tbody.insertBefore(tr, lastTrEl)

            button.addEventListener('click', () => {
                const confirm = window.confirm('Voulez-vous continuer')
                if (!confirm) return
                const budget = new MyBudjet()
                if (tbodyId === 'depense') {
                    budget.deleteDepense(item.id)
                } else {
                    budget.deleteIncomne(item.id)
                }
            })
        }

    }

    insertBudgtInfos() {
        const bdgetInfos = new MyBudjet().getTotalBudgetInfo()
        const montantsEl = document.querySelectorAll('.card_montant p')


        for(const element of montantsEl){
            const budgetKey = element.dataset.montant
            if(!bdgetInfos[budgetKey]){
                element.innerText  = '0 F CFA'
            }else{
                element.innerText = bdgetInfos[budgetKey]  + ' F CFA'
            }
        }
    }


    insertErrorMessage(message){
        const errorMessage = document.querySelector('.errorMessage')
        errorMessage.style.display = 'block' 
        errorMessage.innerText = message
    }



}