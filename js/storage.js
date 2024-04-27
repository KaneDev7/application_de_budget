import { BUDGET_KEY } from "./constants"

export class LocalelStorage {

    setDataToLocalStorage(name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    }

    getDataFromLocaleStorage(name) {
        if (name === BUDGET_KEY) {
            const resulte  = JSON.parse(localStorage.getItem(name)) || 0
            return parseFloat(resulte)
        }
        return JSON.parse(localStorage.getItem(name)) || []
    }
} 