function responseData(message , Data) {
    let obj = { 
        reqData :  Data ? Data : {},
        message : message
    }

    return obj 
}

module.exports = {
    responseData
}