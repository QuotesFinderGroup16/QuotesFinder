# Quotes Finder

Quotes Finder is an application to find the new quotes that inspired you along the day. This app has : 
* RESTful endpoint 
* JSON formatted response

##  Endpoint list Quotes Finder
### POST /register

> Create New Account

_Request Header_
```
{
    <no data>
}
```

_Request Body_
```
{
  "email": "<your email?>",
  "password": "<your password>"
}
```

_Response (201)_
```
example :


{
    "email": "<todo title>"
}

```

_Response (400 - Validataion Error)_
```
example :

{
  "message": "email is required"
}
```


_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### POST /login

> Login Account

_Request Header_
```
{
  <No Data>
} 
```

_Request Body_
```
{
  email: "<your email>",
  password: "<your password>"
}
```

_Response (200)_
```
example :



{
    "email": "<your email>"
}

```
_Response (400)_
```
example :



{
    "message": "email is required"
}

```


_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### POST /googleLogin

> Login with OAuth Google 

_Request Header_
```
{
  <No Data>
}
```

_Request Body_
```
{
  "email" : "<your email>",
  ...
}
```

_Response (200)_
```
example :


{
    email: "<your email>"
}

```
_Response (400 - Validation Error)_
```
example :

{
  "message": "Email is required"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---
### GET /quotesList

> Show quotes list from FavQs, Quotable, and Quote Garden API 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
    "author": "<author name>",
    "quotes": "<quotes>"
},
...

```
_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
---

### POST /addQuote

> Add new selection quotes 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
    "author": "<author name>",
    "quotes": "<quotes>"
}

```

_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
### GET /userQuoteLists

> Show all selection quotes 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
    "author": "<author name>",
    "quotes": "<quotes>"
},
...

```

_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
### DELETE /deleteQuote/:id

> Delete selection quote 

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  <No Data>
}
```

_Response (200)_
```
example :


{
      message : "quote success to delete"
}

```

_Response (404 - Server Error)_
```
example :

{
  "message": "Invalid Data"
}
```

_Response (500 - Server Error)_
```
example :

{
  "message": "Invalid request"
}
```
-------


