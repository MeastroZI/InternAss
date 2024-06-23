function validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

}

function validateZipCode(zip) {
    const zipRegex = /^\d{8}$/;
    return zipRegex.test(zip);

}

function validateId(id) {
    const Idregex = /^[a-zA-Z]{3}\d{5}$/;
    return Idregex.test(id);
}

function validate (Data) {
    if (validateEmail(Data.Email) && validateZipCode(Data.Zip) && validateId(Data._Id_)){
        return true ;
    }
    else {
        return false;
    }
}


module.exports ={
    validate
}