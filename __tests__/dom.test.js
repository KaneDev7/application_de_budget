import { describe } from "vitest";
import { Dom } from "../js/dom";
import { BUDGET_KEY, DEPENSE_KEY, INCOME_KEY } from "../js/constants";

describe('createAndInsertDataToTable', () => {
    beforeEach(() => {
        // Créez un faux élément de tableau (tbody) et un faux dernier élément de ligne (lastTrEl)
        document.body.innerHTML = `
            <table>
                <tbody id="depense">
                   <tr id="lastTrEl"></tr>
                </tbody>
            </table>
        `;

    });

    it('should insert data into table body', () => {
        const data = [
            { id: 1, title: 'Test 1', montant: 100 },
            { id: 2, title: 'Test 2', montant: 200 }
        ];
        const tbodyId = 'depense';

        const dom = new Dom()
        dom.createAndInsertDataToTable(tbodyId, data);

        // Vérifiez si les éléments ont été insérés correctement dans le tableau
        const tbody = document.getElementById(tbodyId);
        expect(tbody.children.length).toBe(data.length + 1); // +1 pour le lastTrEl
    });

    it('should not insert any data when data array is empty', () => {
        const data = [];
        const tbodyId = 'depense';

        const dom = new Dom();
        dom.createAndInsertDataToTable(tbodyId, data);

        // Vérifiez si aucun élément n'a été inséré dans le tableau
        const tbody = document.getElementById(tbodyId);
        expect(tbody.children.length).toBe(1); // Il devrait y avoir seulement le lastTrEl
    });

    it('should handle invalid tbody ID correctly', () => {
        const data = [
            { id: 1, title: 'Test 1', montant: 100 },
            { id: 2, title: 'Test 2', montant: 200 }
        ];
        const tbodyId = ''; // ID vide

        const dom = new Dom();
        dom.createAndInsertDataToTable(tbodyId, data);

        // Vérifiez si aucun élément n'a été inséré dans le tableau (tbody invalide)
        const tbody = document.getElementById(tbodyId);
        expect(tbody).toBeNull(); 
    });


    it('should handle tbody with no lastTrEl correctly', () => {

        document.body.innerHTML = `
            <table>
                <tbody id="testTbody"></tbody>
            </table>
        `;

        const data = [
            { id: 1, title: 'Test 1', montant: 100 },
            { id: 2, title: 'Test 2', montant: 200 },
        ];
        const tbodyId = 'testTbody';

        const dom = new Dom();
        dom.createAndInsertDataToTable(tbodyId, data);

        // Vérifiez si les éléments ont été insérés correctement dans le tableau
        const tbody = document.getElementById(tbodyId);
        expect(tbody.children.length).toBe(data.length); // Il ne devrait pas y avoir de lastTrEl
    });
});


describe('insertBudgetInfos', () => {

    beforeEach(() => {
        
        document.body.innerHTML = `
        <div class="card_montant">
           <p data-montant="budget"></p>
           <p data-montant="depenses"></p>
           <p data-montant="solde"></p>
        </div>
        `;
    });

    afterEach(() => {
        localStorage.clear()
    })

    it('should update montant elements with budget information', () => {

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

        const dom = new Dom()
        dom.insertBudgetInfos()

        // Vérifier si les éléments de montant ont été mis à jour correctement avec les données de budget
        const montantElements = document.querySelectorAll('.card_montant p');
        expect(montantElements[0].innerText).toBe('15000 F CFA');
        expect(montantElements[1].innerText).toBe('5000 F CFA');
        expect(montantElements[2].innerText).toBe('21500 F CFA');
        expect(montantElements[2].style.color).toBe('black');
    });

    it('should handle zero expenses correctly', () => {
        const budjetMock = 20000;
        const depensesMock = [];
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
        ];
    
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
        localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock));
        localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock));
    
        const dom = new Dom();
        dom.insertBudgetInfos();
    
        const montantElements = document.querySelectorAll('.card_montant p');
        expect(montantElements[0].innerText).toBe('20000 F CFA');
        expect(montantElements[1].innerText).toBe('0 F CFA');
        expect(montantElements[2].innerText).toBe('31500 F CFA');
        expect(montantElements[2].style.color).toBe('black');
    });

    it('should handle zero incomes correctly', () => {
        const budjetMock = 20000;
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
        ];
        const incomesMock = [];
    
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
        localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock));
        localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock));
    
        const dom = new Dom();
        dom.insertBudgetInfos();
    
        const montantElements = document.querySelectorAll('.card_montant p');
        expect(montantElements[2].innerText).toBe('10000 F CFA');
        expect(montantElements[2].style.color).toBe('black');
    });

    it('should handle negative balance correctly', () => {
        const budjetMock = 20000;
        const depensesMock = [
            {
                id: 1,
                title: 'Electricité',
                montant: 25000,
            }
        ];
        const incomesMock = [];
    
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budjetMock));
        localStorage.setItem(DEPENSE_KEY, JSON.stringify(depensesMock));
        localStorage.setItem(INCOME_KEY, JSON.stringify(incomesMock));
    
        const dom = new Dom();
        dom.insertBudgetInfos();
    
        const montantElements = document.querySelectorAll('.card_montant p');

        expect(montantElements[2].innerText).toBe('-30000 F CFA');
        expect(montantElements[2].style.color).toBe('red');
    });
})