
function codeGenerator() {
    const randomCode = (Math.random() + 1).toString(36).substring(6).toUpperCase()
    const formattedCode = "#" + randomCode.slice(0, 3) + "-" + randomCode.slice(3)

    return formattedCode
}

export { codeGenerator }