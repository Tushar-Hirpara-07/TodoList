# TodoList Backend

This is the backend service for the TodoList application. It provides a RESTful API for managing todo items.

## Prerequisites

- Node.js
- npm

## Getting Started
1. Clone the repository.


## Installation
2. Go to the project directory:
    
    cd backend
    
3. Install dependencies:
  
    npm install


## Usage

1. Start the server:

    npm run dev

2. The server will be running at `http://localhost:7000`.


## MongoDB Connection Setup
1. Connection String - ```mongodb+srv://tusharnetsavvies:hsQ6PnweU6LKnldf@cluster0.jduj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/```

2. if you want use local MongoDb then
    - go to MongoDB Compass 
    - Add new connection
    - Copy connection string like ```mongodb://localhost:27017```
    - Go ```backend/index.js and change const MONGO_URI = 'mongodb://localhost:27017/todolist' ```
    - Now when you add Task then create db todolist and inside that db create collection called tasks.






## API Endpoints Documentation

### Get all todos

- URL: `http://localhost:7000/tasks`
- Method: `GET`
- Description: Retrieve a list of all tasks items.
- **Response:**
    ```json
     [
    {
      "_id": "67b1a83fdf8e1fecc23c2536",
      "taskName": "test",
      "taskNote": "test note",
      "taskStartDate": "2025-02-03T18:30:00.000Z",
      "taskEndDate": "2025-02-04T18:30:00.000Z",
      "taskStatus": true,
      "createdAt": "2025-02-16T08:56:32.845Z",
      "updatedAt": "2025-02-16T10:04:53.978Z",
      "__v": 0
    }
  ]
    ```


### Create a new todo

- URL: `http://localhost:7000/tasks`
- Method: `POST`
- Description: Create a new todo item.
- Required in Json:
    - ``` taskName can not be null || undefined || "" ```
    - ``` taskStartDate and taskEndDate  is Required ```
    - ``` taskEndDate is greater than taskStartDate ```
    - ``` taskStatus is default false. ```
    - ``` taskNote is Optional. ```

- Request Body:
    ```json
    {
     "taskName": "test",
      "taskNote": "test note",
      "taskStartDate": "2025-02-03T18:30:00.000Z",
      "taskEndDate": "2025-02-04T18:30:00.000Z",
      "taskStatus": true
    }
    ```

- **Response:**
    ```json
    
  "success": true,
  "data": {
    "taskName": "test",
    "taskNote": "test note",
    "taskStartDate": "2025-02-03T18:30:00.000Z",
    "taskEndDate": "2025-02-04T18:30:00.000Z",
    "taskStatus": true,
    "_id": "67b1bdd28df17af542da2c5f",
    "createdAt": "2025-02-16T10:28:34.534Z",
    "updatedAt": "2025-02-16T10:28:34.534Z",
    "__v": 0
  }

    ```

### Update a todo

- URL: `http://localhost:7000/tasks/:id`
- Method: `PUT`
- Description: Update an existing todo item.
- Required Perameter : id
- Request Body:
    ```json
    {
    "_id": "67b1a83fdf8e1fecc23c2536",
    "taskName": "test1",
    "taskNote": "test1 note",
    "taskStartDate": "2025-02-03T18:30:00.000Z",
    "taskEndDate": "2025-02-04T18:30:00.000Z",
    "taskStatus": true,
    "createdAt": "2025-02-16T08:56:32.845Z",
    "updatedAt": "2025-02-16T10:04:53.978Z",
    "__v": 0
    }
    ```

- **Response:**
    ```json
   {
  "success": true,
  "data": {
    "_id": "67b1a83fdf8e1fecc23c2536",
    "taskName": "test1",
    "taskNote": "test1 note",
    "taskStartDate": "2025-02-03T18:30:00.000Z",
    "taskEndDate": "2025-02-04T18:30:00.000Z",
    "taskStatus": true,
    "createdAt": "2025-02-16T08:56:32.845Z",
    "updatedAt": "2025-02-16T10:33:15.253Z",
    "__v": 0
  }
    }
    ```

### Delete a todo

- URL: `http://localhost:7000/tasks/:id`
- Method: `DELETE`
- Description: Delete a todo item by its ID.
- Required Perameter : id
- Response:
    ```json
    {
  "success": true,
  "data": {}
    }
    ```
