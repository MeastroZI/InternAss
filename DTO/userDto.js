function userDTO (Data) {
//     Id (Generated)
// Email
// Name
// Age
// City
// Zip code

// can also be pass directly but as per assignment i need to show my understanding of the DTO
    let obj = {
        // will be handle by validator module;
        Id : Data._Id_ ? Data._Id_ :"" ,
        Email : Data.Email ? Data.Email : "",
        Name : Data.Name?Data.Name : "" ,
        Age : Data.Age ? Data.Age : "",
        City : Data.City ?Data.City : "",
        Zip_Code : Data.Zip_Code ? Data.Zip_Code : ""
    };

    return obj ;
}

function updateUserDto (Id , Data , MTH) {
    let obj = {
        Id : Id?Id : "",
        change : MTH=="PUT"?userDTO(Data):Data,
        method : MTH
    }
    return obj
}

module.exports = {
    userDTO , updateUserDto
}