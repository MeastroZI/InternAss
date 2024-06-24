const { error } = require("console");

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

function validateAge(age) {
    if (typeof age == "number" && age >= 18 && age <= 70) {
        return true;
    }
    else {
        return false;
    }
}

function userValidator (Data) {
    // Not able to think anything else :p 
    const resultObj = {
        Email : validateEmail(Data.Email),
        Zip_Code : validateZipCode(Data.Zip_Code),
        Age : validateAge(Data.Age),
        Id : validateId(Data.Id),
        All :  validateEmail(Data.Email) &&  validateZipCode(Data.Zip_Code) && validateAge(Data.Age) &&  validateId(Data.Id)
    }
    
    return resultObj ;
}


module.exports ={
    userValidator,
    validateId
}