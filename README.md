Recipe App - Authentication and Authorization
This is a Recipe App that allows users to manage their recipe items. This application incorporates Authentication and Authorization to secure the routes, ensuring that only authenticated users can access the application, and only users with the appropriate roles can perform specific actions.

Features
1. Authentication:
The application supports two types of authentication:

Token-based Authentication (JWT):

Users are issued a JSON Web Token (JWT) upon successful login.
The token is stored in a secure location, such as the localStorage in the browser.
Each subsequent request from the client includes the JWT in the Authorization header as a Bearer token to verify the user’s identity.
Session-based Authentication:

A session is created for the user after login.
The session ID is stored in a cookie or localStorage.
The session ID is used for identifying the user in subsequent requests.
2. Authorization:
The app uses Role-based Access Control (RBAC) to manage permissions based on the user's role. Users can have roles such as admin or user.

Roles:

Admin: Can create, update, and delete recipes.
User: Can only view the list of recipes.
Permissions:

Different roles are assigned different permissions. For example, only admin users can create, update, or delete recipe items. Regular users can only view recipes.
Authentication Flow
Login Process:
User logs in by providing their email and password.

Example login data:

json
Copy code
{
  "email": "testuser@example.com",
  "password": "Test@1234"
}
Upon successful login, the server responds with a JSON object containing the user's details and a JWT token:

json
Copy code
{
  "_id": "6739b08a9b66a1dc73bb220e",
  "email": "testuser@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzliMDhhOWI2NmExZGM3M2JiMjIwZSIsImlhdCI6MTczMjY5NzUyNCwiZXhwIjoxNzMyNzAxMTI0fQ.xA3BDPoMdE6NMe7_0O2GC7cj_WnRjBsGvKSzMRcQHx8"
}
The user stores this JWT token securely (in localStorage).

To access secured routes, the user sends the token in the Authorization header:

makefile
Copy code
Authorization: Bearer <token>
Secured Routes:
GET /items - View all recipe items (Accessible by both admin and users).
POST /items - Create a new recipe (Accessible only to admin).
PUT /items/:id - Update a recipe (Accessible only to admin).
DELETE /items/:id - Delete a recipe (Accessible only to admin).
Authorization Flow
Role-based Access Control (RBAC):
The application ensures that only users with the appropriate roles can access certain features.

Admin users have full access to all routes: creating, updating, and deleting recipe items.
User users can only view the list of recipe items.
In the code, the authorize middleware is used to verify the user's role before granting access to specific routes.

Example of middleware usage for access control:

js
Copy code
router.post("/items", protect, authorize("admin"), validateItem, itemController.createItem); // Admin only
router.put("/items/:id", protect, authorize("admin"), validateItem, itemController.updateItem); // Admin only
router.delete("/items/:id", protect, authorize("admin"), itemController.deleteItem); // Admin only
The authorize("admin") middleware ensures that only users with the admin role can create, update, or delete recipes.

API Routes Overview
User Routes:
POST /user - Register a new user.
POST /user/login - Login an existing user and receive a JWT token.
Item Routes:
POST /items - Create a new recipe (Admin only).
GET /items - Get all recipe items.
GET /items/:id - Get a specific recipe item.
PUT /items/:id - Update a recipe (Admin only).
DELETE /items/:id - Delete a recipe (Admin only).
Example Request & Response
GET /items:
json
Copy code
{
  "items": [
    {
      "_id": "6738754e3385c047ca6d805f",
      "name": "MONAE",
      "quantity": 6,
      "notes": "I have to eat",
      "category": "fruit",
      "tags": ["sweet", "vibes", "easy-eat"],
      "createdAt": "2024-11-27T09:31:10.820Z"
    },
    {
      "_id": "67386a012e33edb3cdb04c86",
      "name": "elmon",
      "quantity": 9,
      "notes": "I have to dance",
      "category": "cake",
      "tags": ["sweet", "vibes", "easy-eat"],
      "createdAt": "2024-11-27T09:31:10.820Z"
    }
  ],
  "totalItems": 6,
  "page": 1,
  "limit": 5
}
