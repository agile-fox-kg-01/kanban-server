# Kanban-Server

  Deploy Here:

[Kanban_Server](http://localhost:3000)

## API Documentation

----
  **Register**
----
  Register as a new user in Kanban app

* **URL**

  /register

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |

* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_NAME> | true |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD> | true |

* **Success Response:**


  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Tsubasa Ozora",
        "email": "tsubasaozora@mail.com",
        "createdAt": "2020-07-16T10:16:33.622Z",
        "updatedAt": "2020-07-16T10:16:33.622Z"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
          "message": "Email has been registered"
        }
        ```

        OR

        ```json
        {
          "message": [
              "Name is required",
              "Email must be fill with valid format",
              "Email is required",
              "Password is required"
          ]
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Login**
----
  Login as an user in Kanban app

* **URL**

  /login

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |

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
        "name": "Tsubasa Ozora",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRzdWJhc2Fvem9yYUBtYWlsLmNvbSIsImlhdCI6MTU5NDg5NTgwMn0.LAs2KuBk4xeMscLU6aURVa7jLuC5yzlhCc1c6qexzHw"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
          "message": "Invalid username or password"
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

