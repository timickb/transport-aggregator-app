const getReadableMonth = (month: number): string => {
    let months = {
        1: 'января',
        2: 'февраля',
        3: 'марта',
        4: 'апреля',
        5: 'мая',
        6: 'июня',
        7: 'июля',
        8: 'августа',
        9: 'сентября',
        10: 'октября',
        11: 'ноября',
        12: 'декабря'
    }
    return months[month];
}

const getReadableDate = (date: Date, year:boolean = true): string => {
    const result = date.getDate() + ' ' + getReadableMonth(date.getMonth() + 1);
    return year ? result + ' ' + date.getFullYear() : result;
}

const getReadableTime = (date: Date) : string => {
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}

export {getReadableMonth, getReadableDate, getReadableTime}