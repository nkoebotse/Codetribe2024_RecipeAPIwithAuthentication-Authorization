
Recipe App RESTful API
This is a Recipe App RESTful API built using Node.js, Express, and MongoDB. The API allows users to manage recipes with features such as creating, updating, retrieving, and deleting recipes, as well as paginating through a list of items.

Features
CRUD operations: Create, Read, Update, and Delete recipes.
Pagination: Support for paginated responses to efficiently handle large datasets.
Validation: Input validation for required fields, data types, and custom rules (e.g., positive quantity for items).
Error Handling: Graceful error handling with detailed error messages.
Table of Contents
Prerequisites
Installation
Environment Variables
API Endpoints
Testing with Postman

Before you can run this application, you will need to have the following installed on your system:

Node.js (version 14.x or higher)
MongoDB (or use a cloud-based service like MongoDB Atlas)
Postman (for testing API endpoints)
You can download Node.js from the official website.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/nkoebotse/recipe-api.git
cd recipe-api
Install dependencies:

Install the required Node.js packages using npm:


npm install
Set up MongoDB:

Ensure you have MongoDB running locally or set up an account on MongoDB Atlas for a cloud-based database.

Create a .env file:

Create a .env file at the root of the project to configure your environment variables.

Example .env file:


MONGO_URI=MONGO_URI=mongodb+srv://elliotsekgobela:LeVmntGWuzbKBEdo@cluster0.y30ux.mongodb.net/
PORT=8001
Run the server:

Start the server using nodemon for hot-reloading:


nodemon server.js
Your server will start and be accessible at http://localhost:8001.

Environment Variables
This application requires the following environment variables to run:

The following endpoints are available in the Recipe App API:

1. POST /api/v1/items
Create a new recipe item.

Request Body (JSON):

json
Copy code
{
  "name": "Spaghetti",
  "quantity": 2,
  "notes": "Dinner",
  "category": "Pasta",
  "tags": ["pap", "easy"]
}
Response:

Status: 201 Created
Body: Newly created recipe item.
2. GET /api/v1/items
Retrieve a list of all items (with pagination).

Query Parameters:

page: The page number (default: 1).
limit: The number of items per page (default: 5).
sortBy: Field to sort by (default: createdAt).
order: Sort order (asc or desc, default: asc).
Response:

Status: 200 OK
Body: List of items with pagination details.
3. GET /api/v1/items/
Retrieve a single recipe item by its ID.

Response:

Status: 200 OK
Body: The recipe item with the specified ID.
4. PUT /api/v1/items/
Update a recipe item by its ID.

Request Body (JSON):


{
  "name": "Spaghetti Bolognese",
  "quantity": 3,
  "notes": "Dinner with sauce",
  "category": "Pasta",
  "tags": ["italian", "dinner"]
}
Response:

Status: 200 OK
Body: The updated recipe item.
5. DELETE /api/v1/items/
Delete a recipe item by its ID.

Response:

Status: 200 OK
Body: Success message indicating the item was deleted.
Testing with Postman
You can test the API using Postman by sending requests to the endpoints mentioned above. Below are some examples of how to use Postman to test the API.

Example 1: Create a new item (POST /items)
Method: POST
URL: http://localhost:8001/api/v1/items
Body (JSON):
json
Copy code
{
  "name": "Spaghetti",
  "quantity": 2,
  "notes": "Dinner",
  "category": "Pasta",
  "tags": ["italian", "easy"]
}
Example 2: Get all items (GET /items)
Method: GET
URL: http://localhost:8001/api/v1/items?page=1&limit=5
Example 3: Get an item by ID (GET /items/
)
Method: GET
URL: http://localhost:8001/api/v1/items/60b8d1d461a4bc1f78d8d1d1
Example 4: Update an item (PUT /items/
)
Method: PUT
URL: http://localhost:8001/api/v1/items/60b8d1d461a4bc1f78d8d1d1
Body (JSON):
json
Copy code
{
  "name": "Spaghetti Bolognese",
  "quantity": 3,
  "notes": "Dinner with sauce",
  "category": "Pasta",
  "tags": ["italian", "dinner"]
}
Example 5: Delete an item (DELETE /items/
)
Method: DELETE
URL: http://localhost:8001/api/v1/items/60b8d1d461a4bc1f78d8d1d1
# Codetribe2024_recipe-api
