import { MyBudjet } from "./budget"

export class Dom {

    createAndInsertDataToTable(tbodyId, data) {
        const pathname = window.location.pathname

        if (pathname === '/' || pathname.includes('/index.html')) {
            if(data.length < 1) return 

            const tbody = document.querySelector(`table #${tbodyId}`)
            const lastTrEl = tbody.querySelector('#lastTrEl')

            for (const item of [...data]) {
                // create elements
                const tr = document.createElement('tr')
                const titleTd = document.createElement('td')
                const montantTd = document.createElement('td')
                const buttonTd = document.createElement('td')
                const button = document.createElement('button')

                // insert texte
                button.title = 'Supprimer'
                titleTd.innerText = item.title
                montantTd.innerText = item.montant + ' F CFA'
                button.innerText = 'supprimer'

                // insert to html
                tr.appendChild(titleTd)
                tr.appendChild(montantTd)
                buttonTd.appendChild(button)
                tr.appendChild(buttonTd)
                tbody.insertBefore(tr, lastTrEl)

                button.addEventListener('click', () => this.deleteItemFromBudget(item, tbodyId))
           
            }
        }
    }


     deleteItemFromBudget(item, tbodyId) {
        const confirmDelete = window.confirm('Voulez-vous continuer ?');
        if (!confirmDelete) return;
        
        const budget = new MyBudjet();
        if (tbodyId === 'depense') {
            budget.deleteDepense(item.id);
        } else {
            budget.deleteIncomne(item.id);
        }
        window.location.reload()
    }
    

    insertBudgetInfos() {
        const bdgetInfos = new MyBudjet().getTotalBudgetInfo()
        const montantsEl = document.querySelectorAll('.card_montant p')

        for (const element of montantsEl) {
            const budgetKey = element.dataset.montant
            if (!bdgetInfos[budgetKey]) {
                element.innerText = '0 F CFA'
            } else {
                // si la valuer est inferieur à 0 on applique la couleur rouge
                // sinon la couleur noire pour une experience utilisateur réussi
                if (bdgetInfos[budgetKey] < 0) {
                    element.style.color = 'red'
                } else {
                    element.style.color = 'black'
                }
                element.innerText = bdgetInfos[budgetKey] + ' F CFA'
            }
        }
    }


    insertErrorMessage(message) {
        const errorMessage = document.querySelector('.errorMessage')
        errorMessage.style.display = 'block'
        errorMessage.innerText = message
    }



}