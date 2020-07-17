# Kanban-Server

  Deploy Here:

[Kanban_Server](https://kanban-server-jj.herokuapp.com/)

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

----
  **Create Task**
----
  Create a new task in Kanban app

* **URL**

  /tasks

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <TASK_TITLE> | true |

* **Success Response:**


  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
      "id": 5,
      "title": "Kanban server deployment",
      "UserId": 1,
      "updatedAt": "2020-07-17T14:38:29.032Z",
      "createdAt": "2020-07-17T14:38:29.032Z",
      "category": "Backlog"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
          "message": [
              "Title is required"
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
  **Read All Task**
----
  View all task

* **URL**

  /tasks

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <USER_TOKEN> | true |

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
          "id": 5,
          "title": "Kanban server deployment",
          "category": "Backlog",
          "UserId": 1,
          "createdAt": "2020-07-17T14:38:29.032Z",
          "updatedAt": "2020-07-17T14:38:29.032Z"
      },
      {
          "id": 6,
          "title": "Kanban app client deployment",
          "category": "Backlog",
          "UserId": 1,
          "createdAt": "2020-07-17T14:43:00.622Z",
          "updatedAt": "2020-07-17T14:43:00.622Z"
      }
    ]
    ```

* **Error Response:**

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Update Task**
----
  Update an existing task in Kanban app

* **URL**

  /tasks/:id

* **Method:**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   | key | value | required |
   | :---: | :---: | :---: |
   | id | <TASK_ID> | true |
   
* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | title | <TASK_TITLE> | true |
  | category | <TASK_CATEGORY> | true |

* **Success Response:**


  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 5,
      "title": "Kanban server deployment",
      "category": "In Progress",
      "UserId": 1,
      "createdAt": "2020-07-17T14:38:29.032Z",
      "updatedAt": "2020-07-17T14:46:54.835Z"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
          "message": [
              "Title is required!",
              "Category is required!"
          ]
        }
        ```
    
    OR

    * **Code:** 404 Not Found <br />
        **Content:** 
        ```json
        { "message" : "Not Found" }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "message" : "Internal Server Error" }
        ```

----
  **Delete Task**
----
  Delete an existing task in Kanban app

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   | key | value | required |
   | :---: | :---: | :---: |
   | id | <TASK_ID> | true |

* **Data Params**

  none

* **Success Response:**


  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 5,
      "title": "Kanban server deployment",
      "category": "In Progress",
      "UserId": 1,
      "createdAt": "2020-07-17T14:38:29.032Z",
      "updatedAt": "2020-07-17T14:46:54.835Z"
    }
    ```

* **Error Response:**

    * **Code:** 404 Not Found <br />
        **Content:** 
        ```json
        { "message" : "Not Found" }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```