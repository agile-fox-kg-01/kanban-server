
# Kanban-Server

Deploy Here:

[Kanban-Server](https://kanban-fiah.web.app/)

## API Documentation

----
**User Register**
---
  
  * **URL**
   
    /register

  * **Method**

    `POST`

  * **Request Headers**

    | key | value | required |
    | :--- | :---: | :---:|
    | Content-Type | application/x-www-form-urlencoded | true |

  * **URL Params**

    none

  * **Data Params**
    
    | key | value | required |
    | :--: | :--: | :--: |
    | fullname | "Nurfiah"| true |
    | email | "nurfiahidris098gmail.com"| true |
    | password | "nurfiah12345" |true |

  * **Success Response**


    * **Code:** 201 CREATED <br />
    **Content:**
    ```json
      {
      "id": 9,
      "fullname": "Nurfiah",
      "email": "nurfiahidris098@gmail.com",
      "organization": "Hacktiv8",
      "password": "$2a$10$OYGYolF/2v7UT9xoSiRXyOWtHexv9d.Jk9xrIzfhmj56xDqq0Xjmu",
      "updatedAt": "2020-07-06T23:29:58.677Z",
      "createdAt": "2020-07-06T23:29:58.677Z"
      }
      ```
  * **Errors Response**

    * **Code:** 400 BAD REQUEST <br />
      **Content**
      ```json
      {
        "status": 400,
        "error": "email must be unique"
      }
      ```

**User Login**
---
  
  * **URL**
   
   /login

  * **Method**

    `POST`

  * **Request Headers**

    | key | value | required |
    | :--- | :---: | :---:|
    | Content-Type | application/x-www-form-urlencoded | true |

  * **URL Params**

    none

  * **Data Params**
    
    | key | value | required |
    | :--: | :--: | :--: |
    | email | "nurfiahidris098gmail.com"| true |
    | password | "nurfiah12345" |true |

  * **Success Response**


    * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4"
      }
      ```
  * **Errors Response**

    * **Code:** 400 BAD REQUEST <br />
      **Content**
      ```json
      {
        "status": 400,
        "error": "invalid username/password"
      }
      
      ```

**User Create New Task**
---

* **URL**

  /tasks

* **Method**

  `POST`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | "Generate Register and Login Route" | true |   
  | description | "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",| true |   
  | status | true | true |

* **Success Response**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```json
    {
    "id":3,
    "title" : "Generate Register and Login Route",
    "description": "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",
    "UserId":2,
    "category":"Back-log",
    "due_date": "2021-12-07T00:00:00.000Z",
    "createdAt": "2020-07-06T06:38:13.913Z",
    "updatedAt": "2020-07-06T09:30:44.848Z"
    }
    ```

* **Error Response**

  * **Code:** 400 BAD REQUEST <br />
    **Content**
    ```json
     {
        "status": 400,
        "error":[ "Title field shouldn't be empty" ]
    }
    ```

    OR

    ```json
    {
        "status": 400,
        "error":[ "Description field shouldn't be empty" ]
    }
    ```
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
        "status": 500,
        "error":"internal server error"
    }
    ```
**User Update Task By Id**
---
* **URL**

  /tasks/:id

* **Method**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**
 ```json
  {
    "id": 3
  }
  ```
  
* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | "Generate Register and Login Route", | true |   
  | description | "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah" | true |    

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
    "id":3,
    "title" : "Generate Register and Login Route",
    "description": "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",
    "UserId":2,
    "category":"Back-log",
    "due_date": "2021-12-07T00:00:00.000Z",
    "createdAt": "2020-07-06T06:38:13.913Z",
    "updatedAt": "2020-07-06T09:30:44.848Z"
    }
    ```

* **Error Response**

  * **Code:** 400 BAD REQUEST <br />
    **Content**
    ```json
     {
        "status": 400,
        "error":[ "Title field shouldn't be empty" ]
    }
    ```

    OR

    ```json
    {
        "status": 400,
        "error":[ "Description field shouldn't be empty" ]
    }
    ```
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
        "status": 500,
        "error":"internal server error"
    }
    ```

**User Request All Tasks**
---
* **URL**

  /tasks

* **Method**

  `GET`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**

  none

* **Data Params**

  none  

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
    "id":3,
    "title" : "Generate Register and Login Route",
    "description": "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",
    "UserId":1,
    "category":"Back-log",
    "due_date": "2021-12-07T00:00:00.000Z",
    "createdAt": "2020-07-06T06:38:13.913Z",
    "updatedAt": "2020-07-06T09:30:44.848Z"
    }
    ```

* **Error Response**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
     {
        "status": 500,
        "error":"internal server error"
    }
    ```


**User Edit Category by ID**
---
* **URL**

  /tasks/:id

* **Method**

  `PATCH`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**
  ```json
  {
    "id": 3
  }
  ```

* **Data Params**

  none  

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
    "id":3,
    "title" : "Generate Register and Login Route",
    "description": "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",
    "UserId":1,
    "category":"Back-log",
    "due_date": "2021-12-07T00:00:00.000Z",
    "createdAt": "2020-07-06T06:38:13.913Z",
    "updatedAt": "2020-07-06T09:30:44.848Z"
    }
    ```

* **Error Response**

  * **Code:** 404 NOT FOUND <br />
    **Content**
    ```json
    {
      "status": 404,
      "error": "not found"
    }
    ```

**User Delete Todo By Id**
---
* **URL**

  /tasks/:id

* **Method**

  `DELETE`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true | 

* **URL Params**
 ```json
  {
    "id": 3
  }
  ```

* **Data Params**

  none

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
    "id":3,
    "title" : "Generate Register and Login Route",
    "description": "Harus diselesaikan hari ini juga sebelum besok nambah tugas lagi yah",
    "UserId": 2,
    "category": "category",
    "due_date": "2021-12-07T00:00:00.000Z",
    "createdAt": "2020-07-06T06:38:13.913Z",
    "updatedAt": "2020-07-06T09:30:44.848Z"
    }
    ```

* **Error Response**

  * **Code:** 404 NOT FOUND <br />
    **Content**
    ```json
    {
      "status": 404,
      "error": "not found"
    }
    ```

    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
      "status":500,
      "error": "internal server error"
    }
    ```

**User Google Login**
---
  
  * **URL**
   
    /login/google

  * **Method**

    `POST`

  * **Request Headers**

    | key | value | required |
    | :--- | :---: | :---:|
    | Content-Type | application/x-www-form-urlencoded | true |
    | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true | 

  * **URL Params**

    none

  * **Data Params**
    
    | key | value | required |
    | :--: | :--: | :--: |
    | email | "nurfiahidris098gmail.com"| true |
    | password | "nurfiah12345" |true |

  * **Success Response**


    * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4"
      }
      ```
  * **Errors Response**

    * **Code:** 400 BAD REQUEST <br />
      **Content**
      ```json
      {
        "status": 400,
        "error": "invalid username/password"
      }
      
      ```
    OR
    * **Code:** 500 INTERNAL SERVER ORDER <br />
      **Content**

       ```json
      {
        "status": 500,
        "error":"internal server error"
      }
      ```
