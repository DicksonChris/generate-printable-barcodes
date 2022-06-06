const timeout = (text, callback) => {
    if (text.length === 0) {
      callback(true)
      setTimeout(() => {
        callback(false)
      }, 5000)
      return true
    }
    return false
  }
  
  export default timeout