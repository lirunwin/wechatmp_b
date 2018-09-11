const { miniProgram, ready } = require('weixin-js-sdk')
function IllegalAPIException(name) {
  this.message = 'No Such API [' + name + ']'
  this.name = 'IllegalAPIException'
}
let services = {
  sleep: time => {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, time)
    })
  },
  stop: () => {
    return new Promise(function(resolve, reject) {})
  },
  tasks: () => {
    return new Promise(function(resolve, reject) {
      resolve()
    })
  }
}
const mini = new Proxy(services, {
  get: (target, property) => {
    if (property in target) {
      return target[property]
    } else if (property in miniProgram) {
      return obj => {
        return new Promise((resolve, reject) => {
          obj = obj || ((...arg) => resolve(...arg))
          miniProgram[property](obj)
        })
      }
    } else {
      throw new IllegalAPIException(property)
    }
  }
})

export { ready, mini }
export default mini
