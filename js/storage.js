
class LocalelStorage {

    setDataToLocalStorage(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }

    getDataFromLocaleStorage(name){
        return JSON.parse(localStorage.getItem(name)) || []
    }

    teste(){
        console.log('hello')
    }
} 