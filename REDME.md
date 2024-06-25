* ```clone the website```
* ```npm install```
* ```npm run test``` To run the test
* ```npm start``` To start the server


# Routes 

NOTE : Accept GET request every method requere the userData property in the json body to authenticate the API req , All req examples are given below 

### ```/listUsers```  METHOD : GET , RESPONSE TYPE : Render HTml 
#### req example 

Note make this req from browser :)
```js
import axios from "axios";

let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
}

let reqOptions = {
  url: "http://localhost:8000/listUsers",
  method: "GET",
  headers: headersList,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```

### ```/listUsersJson```  METHOD : POST ,RESPONSE TYPE : JSON DATA
```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
   "userData": {
    "userName": "admin",
    "password": "admin"
  }
});

let reqOptions = {
  url: "http://localhost:8000/listUsersJson",
  method: "POST",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```


### ```/updateUser```  METHOD : POST ,RESPONSE TYPE : JSON DATA

```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "userData": {
    "userName": "admin",
    "password": "admin"
  },
  "reqData": {
    "_Id_": "Vis12385",
    "Email": "Wrong@gmail.com",
    "Name": "newName",
    "Age": 19,
    "City": "newCity",
    "Zip_Code": "12345678"
  }
});

let reqOptions = {
  url: "http://localhost:8000/updateUser/Vis12385",
  method: "PUT",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```

### ```/updateUser```  METHOD : PATCH ,RESPONSE TYPE : JSON DATA

```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "userData": {
    "userName": "admin",
    "password": "admin"
  },
  "reqData": {
    "Email": "Wrong@gmail.com"
  }
});

let reqOptions = {
  url: "http://localhost:8000/updateUser/Vis12385",
  method: "PATCH",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```

### ```/creatUser```  METHOD : POST ,RESPONSE TYPE : JSON DATA

```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "userData": {
    "userName": "admin",
    "password": "admin"
  },
  "reqData": {
    "_Id_": "Vis12384",
    "Email": "Wrong@gmail.com",
    "Name": "newName",
    "Age": 19,
    "City": "newCity",
    "Zip_Code": "12345678"
  }
});

let reqOptions = {
  url: "http://localhost:8000/creatUser",
  method: "POST",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);
```

### ```/deleteUser/Id```  METHOD : POST ,RESPONSE TYPE : JSON DATA

```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "userData": {
    "userName": "admin",
    "password": "admin"
  }
});

let reqOptions = {
  url: "http://localhost:8000/deleteUser/Vis12384",
  method: "DELETE",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```

### ```/getUser/Id```  METHOD : POST ,RESPONSE TYPE : JSON DATA
```js
import axios from "axios";

let headersList = {
 "Content-Type": "application/json" 
}

let bodyContent = JSON.stringify({
  "userData": {
    "userName": "admin",
    "password": "admin"
  }
});

let reqOptions = {
  url: "http://localhost:8000/getUser/Vis12384",
  method: "GET",
  headers: headersList,
  data: bodyContent,
}

let response = await axios.request(reqOptions);
console.log(response.data);

```


