const request = require('supertest');
const { app } = require("../app");
const axios = require('axios');

// Function to clear database or perform cleanup
async function clearing() {
  try {
    let headersList = {
      "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
      "userData": {
        "userName": "admin",
        "password": "admin"
      }
    });

    let reqOptions = {
      url: "http://localhost:8000/deleteUser/New1234",
      method: "DELETE",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data.message)
    return response.data.message === "All done"; // Check response message
  } catch (error) {
    console.error('Error during clearing:', error.message,);
    return error.response.data.message === "No user with this Id"
  }
}

describe('POST /creatUser', () => {
  test("creat user with invalid Id", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "InValid",
      "Email": "25eeee2@gmail.com",
      "Name": "aa",
      "Age": 22,
      "City": "asde",
      "Zip_Code": "85413654"
    };

    expect(await clearing()).toEqual(true);
    const response = await request(app).post('/creatUser').send({ userData, reqData });
    expect(response.status).toBe(501); // Adjust status code expectation
    expect(response.body.message).toEqual("\"Id\" with value \"InValid\" fails to match the required pattern: /^[a-zA-Z]{3}\\d{5}$/"
    );
  })
  test("creat user with invalid Zip_Code", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "New12345",
      "Email": "25eeee2@gmail.com",
      "Name": "aa",
      "Age": 22,
      "City": "asde",
      "Zip_Code": "123456789"
    };
    expect(await clearing()).toEqual(true);
    const response = await request(app).post('/creatUser').send({ userData, reqData });
    expect(response.status).toBe(501); // Adjust status code expectation
    expect(response.body.message).toEqual("\"Zip_Code\" with value \"123456789\" fails to match the required pattern: /^\\d{8}$/"
    );
  })
  test("successfully create the user", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "New12345",
      "Email": "25eeee2@gmail.com",
      "Name": "aa",
      "Age": 22,
      "City": "asde",
      "Zip_Code": "85413654"
    };

    // Perform clearing function before creating user
    expect(await clearing()).toEqual(true);
    const response = await request(app).post('/creatUser').send({ userData, reqData });
    expect(response.status).toBe(201); // Adjust status code expectation
    expect(response.body.message).toEqual("All done");
  });
  test("should not create the user with same Id", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "New12345",
      "Email": "25eeee2@gmail.com",
      "Name": "aa",
      "Age": 22,
      "City": "asde",
      "Zip_Code": "85413654"
    };
    const response = await request(app).post('/creatUser').send({ userData, reqData });
    expect(response.status).toBe(501); // Adjust status code expectation
    expect(response.body.message).toEqual("User with this Id is already present");
  });


});

describe('POST /listUserJson', () => {

  test('should get the response as an array of objects with Id property', async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const response = await request(app).post('/listUsersJson').send({ userData });
    expect(response.status).toBe(200); // Adjust status code expectation
    expect(response.body.message).toEqual("All done"); // Check response structure
    expect(response.body.reqData).toEqual(expect.any(Array));
    response.body.reqData.forEach(user => {
      expect(user).toEqual(expect.any(Object));
      expect('Id' in user).toEqual(true); // Ensure 'Id' property exists in each user
    });
  });

});

describe('PUT /updateUser/Id', () => {
  test("updating the userData with invalid data", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "New12345",
      "Email": "WrongEmail",
      "Name": "newName",
      "Age": "invalid Age",
      "City": "newCity",
      "Zip_Code": "123456789"
    };
    const response = await request(app).put('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual(
      "\"Email\" with value \"WrongEmail\" fails to match the required pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,\"Zip_Code\" with value \"123456789\" fails to match the required pattern: /^\\d{8}$/,\"Age\" must be a number");
   
    

  })
  test("updating the userData", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "_Id_": "New12345",
      "Email": "newmailId@gmail.com",
      "Name": "newName",
      "Age": 22,
      "City": "newCity",
      "Zip_Code": "85413654"
    };
    // {
    //   "reqData": {
    //     "acknowledged": true,
    //     "modifiedCount": 1,
    //     "upsertedId": null,
    //     "upsertedCount": 0,
    //     "matchedCount": 1
    //   },
    //   "message": "All done"
    // }
    const response = await request(app).put('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("All done");
    console.log(response.body.reqData)
    expect(response.body.reqData.modifiedCount).toEqual(1)

  })
  test("Id can't be null in Data", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "Email": "newmailId@gmail.com",
      "Name": "newName",
      "Age": 22,
      "City": "newCity",
      "Zip_Code": "85413654"
    };
    const response = await request(app).put('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("Id can't be null");
  })
  test("Should not update the Id of user", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    // No user with this Id
    const reqData = {
      "_Id_": "Orw12348"
    };
    // {
    //   "reqData": {},
    //   "message": "Data is not valid"
    // }
    const response = await request(app).put('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("Id can't be change");
  })
  test("Should not update user which is not present", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    // No user with this Id
    const reqData = {
      "_Id_": "Orw12345"
    };
    // {
    //   "reqData": {},
    //   "message": "Data is not valid"
    // }
    const response = await request(app).put('/updateUser/Orw12345').send({ userData, reqData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("No user with this Id");
  })
})

describe('PATCH /updateUser/Id', () => {
  test("updating the userData", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const reqData = {
      "Email": "newPatchmailId@gmail.com",
    };
    // {
    //   "reqData": {
    //     "acknowledged": true,
    //     "modifiedCount": 1,
    //     "upsertedId": null,
    //     "upsertedCount": 0,
    //     "matchedCount": 1
    //   },
    //   "message": "All done"
    // }
    const response = await request(app).patch('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("All done");
    console.log(response.body.reqData)
    expect(response.body.reqData.modifiedCount).toEqual(1)

  })
  test("Should not update Id of User", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    // No user with this Id
    const reqData = {
      "_Id_": "Orw12348"
    };
    const response = await request(app).patch('/updateUser/New12345').send({ userData, reqData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("Id can't be change cannont put the Id in data for PATCH req");
  })
})

describe('GET /getUser/Id', () => {
  test("geting the user", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const response = await request(app).get('/getUser/New12345');
    expect(response.status).toBe(201);
    expect(response.body.reqData.Id).toEqual("New12345")
    expect(response.body.message).toEqual("All done");
  })

  test("geting the user", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const response = await request(app).get('/getUser/New12348');
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("No user with this Id");
  })

})

describe('DELETE /deleteUser', () => {
  test("should delete the user", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const response = await request(app).delete('/deleteUser/New12345').send({ userData });
    expect(response.status).toBe(201); // Adjust status code expectation
    expect(response.body.message).toEqual("All done");
    expect(response.body.reqData.deletedCount).toBe(1); // Verify deletedCount if applicable
  });
  test("deletion is not done when id is not present", async () => {
    const userData = {
      userName: "admin",
      password: "admin"
    };
    const response = await request(app).delete('/deleteUser/New12345').send({ userData });
    expect(response.status).toBe(501);
    expect(response.body.message).toEqual("No user with this Id")
  })
});



