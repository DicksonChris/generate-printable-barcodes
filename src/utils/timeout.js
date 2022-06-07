const timeout = (text, setShowAlert, setAlertText) => {
    // Check if the text is empty
    if (text.length === 0) {
      setShowAlert(true)
        setAlertText("Please enter a barcode")
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
      return true
    }

    // Check if the text starts with a space
    if (text.charAt(0) === " ") {
        setShowAlert(true)
          setAlertText("Barcode should not START with a space")
        setTimeout(() => {
          setShowAlert(false)
        }, 5000)
        return true
      } 

  // Check if the text ends with a space
    const endsWithSpace = (text) => {
        if (text.charAt(text.length - 1) === " ") {
            return true
        }
        return false
    }

    if (endsWithSpace(text)) {
        setShowAlert(true)
            setAlertText(`Barcode should not END with a space`)
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)
        return true
    }
    return false
}

  
  export default timeout