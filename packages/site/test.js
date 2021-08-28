
function count() {
  let i = 0

  function run () {
    i++

    return i
  }

  run.reset = () => {
    i = 0
  }

  return run
}

const c = count()

console.log(c())
console.log(c())
console.log(c())

console.log(c.reset())

console.log(c())
