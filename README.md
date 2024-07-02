MERN Registration Application
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that allows users to register with their personal information and profile picture. The application provides APIs for user registration, viewing user data, updating user data, and deleting users.

Features
User Registration:

API endpoint for registering users with name, email, username, contact info, and profile picture upload.
Input data validation on the server side.
Store user information including profile pictures in MongoDB.
View Registration Data:

API endpoint to fetch and return a list of registered users from MongoDB.
Passwords and other sensitive information are excluded from the response.
Update User Data:

API endpoint to update user information based on user ID.
Validate and update user data in MongoDB.
Delete User:

API endpoint to delete a user from the database based on user ID.
User Interface:

React.js frontend to interact with backend APIs.
Screens for user registration, viewing registered users, updating user data, and deleting users.
Form validation on registration and update screens to ensure data integrity.
Display list of registered users with options to view details, update, or delete users.
Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <repository-url>
cd mern-registration-app
Install dependencies:

bash
Copy code
# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory.
Define environment variables like MongoDB connection URI, JWT secret, etc.
Run the application:

bash
Copy code
# Run the server (from the backend directory)
npm start

# Run the client (from the frontend directory)
npm start
Access the application:
Open your browser and go to http://localhost:3000 to access the application.

Technologies Used
Frontend:

React.js
Axios (for API requests)
Bootstrap (for UI components)
Backend:

Node.js
Express.js
MongoDB (with Mongoose)
Multer (for handling file uploads)
JSON Web Tokens (JWT) for authentication
APIs
POST /api/users: Register a new user.
GET /api/users: Fetch all registered users.
PUT /api/users/:id: Update user information.
DELETE /api/users/:id: Delete a user.
Contributing
Contributions are welcome! If you have any suggestions, improvements, or issues, feel free to create a pull request or raise an issue in the repository.

