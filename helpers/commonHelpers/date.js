exports.TodaysDate = (date) => {
    const month = ["JAN" , "FEB" ,"MAR" , "APR" , "MAY" , "JUN" , "JUL" , "AUG" , "SEP" , "OCT" , "NOV" , "DEC"]
    return date.getDate() + ' ' + month[date.getMonth() + 1] + ' ' + date.getFullYear()
}

exports.TodaysDate2 = (date) => {
    const arr = []
    if(date.getDate().length === 1) {
        arr.push('0'+date.getDate())
    } else {
        arr.push(date.getDate())
    }
    if(parseInt(date.getMonth()) + 1 <= 9) {
        arr.push('0' + (parseInt(date.getMonth() + 1)))
    } else {
        arr.push(parseInt(date.getMonth()) + 1)
    }
    arr.push(date.getFullYear())
    return arr
}

exports.convertIntoIsoDate = (date) => {
   try {
    const [hour, minute] = date.split(':').map(num => parseInt(num));
    const d = new Date();
    d.setHours(hour + (date.includes('pm') && hour !== 12 ? 12 : 0));
    d.setMinutes(minute);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d.getHours();
   } catch (err) {
    return undefined
   }
}

exports.convertTime = (time) => {
    try {
        var [hour, minute] = time.split(':').map(num => parseInt(num));
        if(time.includes('pm') && parseInt(hour) !== 12) {
            hour = parseInt(hour) + 12
            console.log(hour);
        }
        let t = hour + parseFloat('.'.concat(minute))
        console.log(t);
        return t
    } catch (err) {
        
    }
}

exports.convertInToNum = (time) => {
    try {
        let hour = parseInt(time.split(':')[0])
        let minute = parseFloat('.' + time.split(':')[1])
        if(time.includes('pm')) {
            hour += 12
        }
        return hour + minute
    } catch (err) {
        console.log(err);
    }
}