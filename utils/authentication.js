
function authentication (req , res , next) {
    const userData = req.body.userData ;
    console.log(req.body)
    
    if(userData.userName = 'admin' && userData.password =='admin') {
        next();
    }
    else {
        res.status(501).json({message : "Bad Auth"})
    }
}

module.exports = {
    authentication
}