function userDTO (Data) {
//     Id (Generated)
// Email
// Name
// Age
// City
// Zip code

    let obj = {
        // will be handle by validator module;
        Id : Data.Id ? Data.Id :"" ,
        Email : Data.Email ? Data.Email : "",
        Name : Data.Name?Data.Name : "" ,
        Age : Data.Age ? Data.Age : "",
        City : Data.City ?Data.City : "",
        Zip_Code : Data.Zip_Code ? Data.Zip_Code : ""
    };

    return obj ;
}

module.exports = {
    userDTO
}