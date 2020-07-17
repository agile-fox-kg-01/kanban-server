# Kanban-server

  Deploy Here:

[Kanban-server](http://localhost:3000)

## API Documentation

----
  **Create New Task**
----
  Create New Task in Kanban App

* **URL**

  /task

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <YOUR_TITLE> | true |
  | description | <YOUR_DESCRIPTION> | true |
  | member | <YOUR_MEMBER> | true |
  | category | <YOUR_CATEGORY> | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
    "id": 16,
    "title": "produksi app 20",
    "description": "susah banget",
    "member": "bambang",
    "category": "product",
    "UserId": 2,
    "updatedAt": "2020-07-17T06:22:21.328Z",
    "createdAt": "2020-07-17T06:22:21.328Z"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Title field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Description field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Member field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Category field cannot be empty!"
          ]
        }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

----
  **Read User Task**
----
  Read All User's Task

* **URL**

  /task

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
        {
        "id": 8,
        "title": "backlog project abc",
        "description": "lamaaaa",
        "member": "alpha",
        "category": "backlog",
        "UserId": 4,
        "createdAt": "2020-07-15T12:42:45.975Z",
        "updatedAt": "2020-07-15T12:42:45.975Z"
        }
    ]
    
    ```
 
* **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

----
  **Read Task by ID**
----
  Read Task by ID

* **URL**

  /task/:id

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "id": 5,
    "title": "produksi app 20",
    "description": "susah banget",
    "member": "bambang",
    "category": "product",
    "UserId": 2,
    "createdAt": "2020-07-15T10:33:13.251Z",
    "updatedAt": "2020-07-15T10:33:13.251Z"
    }
    
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

    OR

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        {
          "code": "404",
          "message": "Not Found"
        }
        ``` 

----
  **Update Task**
----
  Update Task Data by ID

* **URL**

  /task/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <YOUR_TITLE> | true |
  | description | <YOUR_DESCRIPTION> | true |
  | member | <YOUR_MEMBER> | true |
  | category | <YOUR_CATEGORY> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
        {
        "id": 8,
        "title": "makan minum tidur masak!!",
        "description": "susah",
        "member": "budi",
        "category": "backlog",
        "UserId": 4,
        "createdAt": "2020-07-15T12:42:45.975Z",
        "updatedAt": "2020-07-17T06:34:23.641Z"
        }
    ]
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Title field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Description field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Member field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Category field cannot be empty!"
          ]
        }
        ```

    OR

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        {
          "code": "404",
          "message": "Not Found"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

----
  **Delete Task**
----
  Delete Task by ID

* **URL**

  /task/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "code": 200,
        "message": "Task deleted"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this feature!"
        }
        ```

    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        {
          "code": "404",
          "message": "Not Found"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----
  **User Register**
----
  Register a new User to use application feature

* **URL**

  /user/register

* **Method:**
  
  `POST`

* **Request Headers**

  none
  
* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <YOUR_EMAIL> | true |
  | username | <YOUR_USERNAME> | true |
  | password | <YOUR_PASSWORD> | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "email": "test1@mail.com"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Email field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Username field cannot be empty!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Password field cannot be empty!"
          ]
        }
        ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----
  **User Login**
----
  Login to use application feature

* **URL**

  /user/login

* **Method:**
  
  `POST`

* **Request Headers**

  none
  
* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0IiwiaWF0IjoxNTk0MTE5NDQyfQ.N9zq3FCzHqRIaNwL7P3-tdm9Drs40jhw_zWZRtgF078"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": "invalid email/password"
        }
        ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----
  **Login With Google Account**
----
  Login to access application feature with google account

* **URL**

  /user/login/google

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

  none

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0IiwiaWF0IjoxNTk0MTE5NDQyfQ.N9zq3FCzHqRIaNwL7P3-tdm9Drs40jhw_zWZRtgF078"
    }
    ```
 
* **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```