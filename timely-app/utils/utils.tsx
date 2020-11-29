export const getFormattedDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return "" + month + '/' + day + '/' + year + ' ' + hour + ':' + minute
}

export const createRandomString = () =>{
    return Math.random().toString(36).substr(2, 9);
}