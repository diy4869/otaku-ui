const toString = type => Object.prototype.toString.call(type)

const objectToString = obj => {
    return Object.entries(obj).reduce((str, current) => {
        const [key, value] = current

        switch (toString(value)) {
            case '[object Array]':
                break
            case '[object Object]':
                break
            default:
                str.push([
                    key,
                    value
                ].join(': '))
                break
        }

        return str
    }, [])
}




console.log(toString({}))

const arrayToString = arr => {
    if (arr.length === 0) return '[]'
    return arr.reduce((total, current) => {
        if (toString(current) === '[object Object]') {
            objectToString(current)
        }
        return current
    }, [])
}

// arrayToString([
//     {
//         a: 1
//     }
// ])

const result = objectToString({
    a: 1,
    b: '3',
    c: [],
    d: [
        {
            a: 1
        }
    ]
})

console.log(`{  \n${result.join('\n')}\n}`)

function getDates(format, date) {
    const str = format.replace(/(\w)\1+|(\w)/g, ({ length }, w, s) => {
        return `(?<${w || s}>${s ? '\\d+' : '\\d'.repeat(length)})`
    })
    const regex = new RegExp(str)
    
    const match = date.match(regex);
    // console.log(result)
    const dateList = Object.entries(match.groups)
    const result = dateList.reduce((str, current, index) => {
        const [format, time] = current

        str += format === 'D' ? `${time} ` : `${time}${index !== dateList.length - 1 ? ':' : ''}`

        return str
    }, '')

    console.log(result)
  }

getDates('DD hh:mm:ss', '23 01:23:11')
getDates('hh:mm:ss', '23 01:23:11')
getDates('mm:ss', '23 01:23:11')
getDates('ss', '23 01:23:11')

