# kanban-server


Kanban 

fitur :


Relasi 1 to many

GET /kanban/
POST /kanban/
PUT /kanban/:id
DELETE /kanban/:id

POST /user/register
POST /user/login


Response Login:

Sukses:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImljaGxhc3VsMDg5OUBnbWFpbC5jb20iLCJpYXQiOjE1OTQ4MjU5MTR9.PkVOFnE5RYMZIgsaRWBsm88ir7rtXjQpuRuVCXKPz6g"
}

Error :
"error": "invalid username and password"


Response Register:
Sukses:
{
    "email": "ichlasul0899@gmail.com",
    "password": "$2a$05$UBShGH3ZwzG5hoOL4LJcY.68yZp1Z9pt1Karbm0D5Oq/6/3lnwt1y"
}

error:
{
    "error": [
        "Format field nya harus email",
        "Field Password wajib diisi",
        "Field Password wajib diisi"
        "Password length more than 8 and less than 16"
    ]
}

Post Tasks

headers: token(required)

data :
name 
category

sukses :
{
    "id": 1,
    "name": "Landing Page",
    "category": "backlog",
    "UserId": 1,
    "updatedAt": "2020-07-15T15:29:13.065Z",
    "createdAt": "2020-07-15T15:29:13.065Z"
}

error : {
    "Field Title Cannot Be Empty!",
    "Field Description Cannot Be Empty"
    "Must be in Backlog, Development, Production, Done. "
    "Field Title Null!",
    "Field Category Null!"
}

get tasks 

Sukses: 
[
    {
        "id": 1,
        "name": "Landing Page",
        "category": "backlog",
        "UserId": 1,
        "createdAt": "2020-07-15T15:29:13.065Z",
        "updatedAt": "2020-07-15T15:29:13.065Z"
    }
]

Error: 



get task by id
 sukses:
 {
    "id": 1,
    "name": "Landing Page",
    "category": "backlog",
    "UserId": 1,
    "createdAt": "2020-07-15T15:29:13.065Z",
    "updatedAt": "2020-07-15T15:29:13.065Z"
}

error:{

}


put task

data: 
name
category

sukses : 
{
    "id": 2,
    "name": "Login Page",
    "category": "production",
    "UserId": 1,
    "createdAt": "2020-07-15T15:48:27.930Z",
    "updatedAt": "2020-07-15T15:49:12.002Z"
}

error:


delete :

header yes
params : id

sukses : 200

{
    "id": 2,
    "name": "Register Page",
    "category": "production",
    "UserId": 1,
    "createdAt": "2020-07-15T15:48:27.930Z",
    "updatedAt": "2020-07-15T16:59:24.992Z"
}



