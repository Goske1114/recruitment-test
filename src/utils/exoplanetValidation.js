import isNumber from 'is-number'

export const createValidation = (data) => {
    if (data.name === '' ||
        data.discoverYear === '' ||
        data.distance === '' ||
        !isNumber(data.distance) ||
        !isNumber(data.discoverYear)
    ) {
        return false
    }
    return true
}