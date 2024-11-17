Recipe API with Authentication and Authorization
A RESTful API for managing recipes with authentication and authorization. This app supports user registration and login with JWT-based authentication and includes role-based access control (RBAC) to manage permissions for different user roles (e.g., Admin and User).

Table of Contents
Features
Tech Stack
Installation
API Endpoints
Authentication
Authorization
Items
Middleware
Environment Variables
Testing

Features
User Authentication:

JWT-based Authentication: Issue a JSON Web Token (JWT) to authenticated users, stored securely (e.g., in local storage for the browser).
Session-based Authentication: (Optional): You can choose between using JWT or session-based authentication by storing a session ID in cookies/local storage.
Authorization:

Role-based Access Control (RBAC):
Admins can create, update, and delete recipes.
Regular users (non-admins) can only view recipes (GET endpoints).
Permissions are checked before allowing users to perform actions.
CRUD Operations:

Create, Read, Update, and Delete recipes (items).
Pagination and Sorting for item listings.
Tech Stack
Node.js: JavaScript runtime for the server.
Express.js: Web framework to build RESTful APIs.
MongoDB: NoSQL database to store users and recipes.
Mongoose: MongoDB object modeling for Node.js.
JWT (JSON Web Token): Used for token-based authentication.
bcrypt: Used to hash user passwords securely.
dotenv: For managing environment variables.
express-validator: For validating incoming request data.
Installation
Prerequisites
Node.js and npm installed.
MongoDB (local or cloud instance) to store data.
Steps to Install
Clone the repository:


git clone https://github.com/yourusername/recipe-api.git
cd recipe-api
Install dependencies:


npm install
Set up environment variables: Create a .env file in the root directory and add the following environment variables:

env

MONGO_URI=mongodb://your-mongo-db-uri-here
JWT_SECRET=your-secret-key-here
PORT=8001
Run the server:



npm run dev
The server will start on port 8001.

API Endpoints
Authentication
Register User
URL: /api/v1/user
Method: POST
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "Password123!"
}
Response:
json
Copy code
{
  "_id": "user_id",
  "email": "user@example.com"
}
Description: Registers a new user with a hashed password.
Login User
URL: /api/v1/user/login
Method: POST
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "Password123!"
}
Response:
json
Copy code
{
  "_id": "user_id",
  "email": "user@example.com",
  "token": "jwt_token_here"
}
Description: Authenticates a user and returns a JWT token for subsequent requests.
Authorization (Role-Based Access Control)
Role-based Permissions
Admin users can:
Create, update, and delete items (recipes).
Regular users (non-admin) can:
Only read (GET) items.
Cannot create, update, or delete items.
The JWT token carries the user information, including their role. Based on the role, the user will be permitted to perform certain actions.

Items (Recipes)
Create Item (Admin Only)
URL: /api/v1/items
Method: POST
Headers:
Authorization: Bearer <jwt_token>
Body:
json
Copy code
{
  "name": "Spaghetti Bolognese",
  "quantity": 1,
  "category": "Main Course",
  "tags": ["pasta", "beef"],
  "notes": "A delicious Italian dish."
}
Response:
json
Copy code
{
  "_id": "item_id",
  "name": "Spaghetti Bolognese",
  "quantity": 1,
  "category": "Main Course",
  "tags": ["pasta", "beef"],
  "notes": "A delicious Italian dish.",
  "createdAt": "2024-11-17T12:34:56.789Z"
}
Get All Items
URL: /api/v1/items

Method: GET

Headers:

Authorization: Bearer <jwt_token>
Query Params (Optional):

page: Page number for pagination (default is 1).
limit: Number of items per page (default is 5).
sortBy: Field to sort by (default is createdAt).
order: Sort order, asc or desc (default is asc).
Response:

json

{
  "items": [
    {
      "_id": "item_id",
      "name": "Spaghetti Bolognese",
      "quantity": 1,
      "category": "Main Course",
      "tags": ["pasta", "beef"],
      "notes": "A delicious Italian dish.",
      "createdAt": "2024-11-17T12:34:56.789Z"
    }
  ],
  "totalItems": 1,
  "page": 1,
  "limit": 5
}
Get Item by ID
URL: /api/v1/items/:id
Method: GET
Headers:
Authorization: Bearer <jwt_token>
Response:
json

{
  "_id": "item_id",
  "name": "Spaghetti Bolognese",
  "quantity": 1,
  "category": "Main Course",
  "tags": ["pasta", "beef"],
  "notes": "A delicious Italian dish.",
  "createdAt": "2024-11-17T12:34:56.789Z"
}
Update Item (Admin Only)
URL: /api/v1/items/:id
Method: PUT
Headers:
Authorization: Bearer <jwt_token>
Body:
json

{
  "name": "Updated Recipe Name",
  "quantity": 2,
  "category": "Updated Category",
  "tags": ["updated", "tags"],
  "notes": "Updated notes."
}
Response:
json

{
  "_id": "item_id",
  "name": "Updated Recipe Name",
  "quantity": 2,
  "category": "Updated Category",
  "tags": ["updated", "tags"],
  "notes": "Updated notes.",
  "createdAt": "2024-11-17T12:34:56.789Z"
}
Delete Item (Admin Only)
URL: /api/v1/items/:id
Method: DELETE
Headers:
Authorization: Bearer <jwt_token>
Response:
json

{
  "message": "Item deleted successfully"
}
Middleware
Protect Middleware: Ensures the user is authenticated by verifying the JWT token.
If the token is valid, it will attach the user object to the request (req.user).
If the token is missing or invalid, it returns a 401 Unauthorized error.
Role-based Access Control (RBAC):
Admin-only routes: Certain actions (like creating, updating, or deleting items) are restricted to Admin users only.
Regular users: Can only access read-only routes (e.g., GET items).
Environment Variables
Make sure you set up the following environment variables in the .env file:

env

MONGO_URI=mongodb://your-mongo-db-uri-here
JWT_SECRET=your-secret-key-here
PORT=8001
Testing
You can test the API using Postman or cURL. The following actions can be tested:

Register a User
Login and Get JWT Token
Create an Item (Admin Only)
Get All Items
Get Item by ID
Update and Delete Item (Admin Only)
Ensure that you include the JWT token in the Authorization header for protected routes# Codetribe2024_RecipeAPIwithAuthentication-Authorization
