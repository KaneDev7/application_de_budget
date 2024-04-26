
export class LocalelStorage {

    setDataToLocalStorage(name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    }

    getDataFromLocaleStorage(name) {
        if (name === 'budget') {
            return JSON.parse(localStorage.getItem(name)) || ''
        }
        return JSON.parse(localStorage.getItem(name)) || []
    }
} 