
# Quotes Finder

Quotes Finder is an application to find the new quotes that inspired you along the day. This app has : 
* RESTful endpoint 
* JSON formatted response

##  Endpoint list Quotes Finder

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /quoteList`
- `GET /userQuoteList`
- `DELETE /deleteQuote/:id`

### POST /register

> Create New Account

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response : 

- status: 201
-body:

```json
{
  "msg" : "Register success",
  "id" : "<integer>",
  "email": "<string>",
}
```

### POST /login

> Login Account

Request: 

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response: 

- status : 200
- data :

```json
{   
    "id" : "<integer>",
    "email": "<string>"
}
```

### POST /googleLogin

> Login with OAuth Google 

Request:

- data: 

```json
{
  "id token": "<your token>"
}
```

Response: 
- status : 200
- data :

```json
{
  "id" : "integer",
  "email" : "string"
}
```

### GET /quotesList

> Show quotes list from FavQs, Quotable, and Quote Garden API 

Request : 
- data :
```json
{
  "access_token": "<your access token>"
}
```


Response:
- status 200,
- data :

```json

{
    "author": "<author name>",
    "quotes": "<quotes>"
},
...

```

### POST /addQuote

> Add new selection quotes 

Request:
- data :

```json 
{
  "access_token": "<your access token>"
}
```

Response :

- status 200,
- data :
```json
{
    "author": "<author name>",
    "quotes": "<quotes>"
}
```

### GET /userQuoteLists

> Show all selection quotes 


Request :
- data :
```json
{
  "access_token": "<your access token>"
}
```

Response :
- status: 200
- data: 

```json
{
    "author": "<author name>",
    "quotes": "<quotes>"
},
...
```

### DELETE /deleteQuote/:id

> Delete selection quote 

Request :
- data:

```json
{
  "access_token": "<your access token>"
}
```

Response
- status 200
- data :
```json
{
    "message" : "quote success to delete"
}
```
-------

