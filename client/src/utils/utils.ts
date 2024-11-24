export const  convertLocaleTimeString = (timeToConvert: string) => {
    const date = new Date(timeToConvert) 
    return date.toLocaleString() 
}

export const isOnlyLetters = (str: string): boolean => /^[a-zA-Z]+$/.test(str);