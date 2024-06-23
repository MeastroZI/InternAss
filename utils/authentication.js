
function authentication (req , res) {
    const userData = req.body.userData ;

    if(userData.userName = 'admin' && userData.userName =='admin') {
        next();
    }
    else {
        res.status(501).json({message : "Bad Auth"})
    }
}

module.exports = {
    authentication
}