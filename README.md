## Catalog Table Project

## Introduction
Display and manage the user's catalogs in a functional table. 
### Built using:
- Server: TypeScript, node.js, express, and MongoDB
- Client: TypeScript, React.js, and react-bootstrap

---

## Features
- Display catalogs in a table.
- Adding a new catalog.
- Update an existing catalog.
- Delete catalogs from the table.
- Set an indexing process for a catalog. 

---

## Run the project
1. Clone the repository
2. Install dependencies:
- Client:
    ```bash 
        cd client
        npm install
    ```
- Server:
    ```bash 
        cd server
        npm install
    ```
3. Configure environment variables: 
- create a .env file in the server directory and add the following:
   ```bash
      PORT:5000
      MONGO_URI=mongodb://localhost:27017/your-database-name
    ```
4. Start the development servers:
- client:
    ```bash 
        cd client
        npm start
    ```
- server:
    ```bash 
        cd server
        npm run dev
    ```
---

## API endpoints
### 1. Get all catalogs
- Endpoint: GET /api/catalog
- Description: Return all the catalog records.
- Response:
  ```json
  [
    {
        "_id": "674359998f46118e44245c84",
        "name": "TestCatalog",
        "vertical": "home",
        "primary": true,
        "locales": [
            "en_CA",
            "en_IL",
            "en_GB"
        ],
        "indexedAt": null,
        "createdAt": "2024-11-24T16:51:37.801Z",
        "updatedAt": "2024-11-24T16:51:37.801Z",
    }
  ]
  
### 2. Add new catalog
- Endpoint: POST /api/catalog
- Description: Return all the catalog records. If 'primary' -> set the rest of the catalogs on the same vertical as not primary.
- Request:
  ```  json
  {"name":"TestCatalog","primary":true,"vertical":"home","locales":["en_CA","en_IL","en_GB"]}
  
- Response:
 *updated  indicates if other resources were updated based on 'primary' 
  ```json
    {
      "catalog": {
          "name": "TestCatalog",
          "vertical": "home",
          "primary": true,
          "locales": [
              "en_CA",
              "en_IL",
              "en_GB"
          ],
          "indexedAt": null,
          "_id": "674359998f46118e44245c84",
          "createdAt": "2024-11-24T16:51:37.801Z",
          "updatedAt": "2024-11-24T16:51:37.801Z",
      },
      "updated": true
  }
  ```

### 3. Update catalog
- Endpoint: PUT /api/catalog/:id
- Description: Update the catalog with the given properties.
    If 'primary' -> set the rest of the catalogs on the same vertical as not primary.
   ```json
    {
        "_id":"674359998f46118e44245c84",
        "name":"TestCatalog",
        "primary":true,
        "vertical":"home",
        "indexedAt":"",
        "locales":["af_NA","af_ZA"],
        "createdAt":"2024-11-24T16:51:37.801Z"
  }
   ``` 
- Response:
 *updated  indicates if other resources were updated based on 'primary' 
  ```json
    {
      "catalog": {
          "name": "TestCatalog",
          "vertical": "home",
          "primary": true,
          "locales": [
              "en_CA",
              "en_IL",
              "en_GB"
          ],
          "indexedAt": null,
          "_id": "674359998f46118e44245c84",
          "createdAt": "2024-11-24T16:51:37.801Z",
      },
      "updated": true
  }
  ```

### 4. Delete catalogs 
- Endpoint: DELETE /api/catalog
- Description: Delete the given record ids.
- Request:
  ```json
  {"ids":["674326993e6e698b4ac1b4ad"]}
- Response:
  ```json
  {"updated":true}
  
### 5. Set index process 
- Endpoint: PUT /api/catalog/index/:id
- Description: Sets the time of the last index process.
- Response:
  ```json
  {
    "_id": "674359998f46118e44245c84",
    "name": "TestCatalog",
    "vertical": "home",
    "primary": true,
    "locales": [
        "af_NA",
        "af_ZA"
    ],
    "indexedAt": "2024-11-24T17:19:13.446Z",
    "createdAt": "2024-11-24T16:51:37.801Z",
  }

  