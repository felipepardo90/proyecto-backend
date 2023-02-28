export function saveLocal(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        return new Error(error)
    }

}

