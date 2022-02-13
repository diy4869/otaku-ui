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