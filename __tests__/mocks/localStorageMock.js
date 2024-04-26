export const localStorageMockFn = () => {
    let store =  {};

    return {
        getItem: (key) => store[key] ?? null,

        setItem: (key, value) => {
            store[key] = JSON.stringify(value);
        },

        removeItem: (key) => {
            delete store[key];
        },

        clear: ()  => {
            store = {};
        },
        
        key: (index) => "",
        length: Object.keys(store).length
    };
};