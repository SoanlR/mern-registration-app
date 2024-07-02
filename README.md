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
Backend Setup:

Navigate to the backend directory:
bash
Copy code
cd backend
Install server dependencies:
bash
Copy code
npm install
Create a .env file in the backend directory and add the following environment variables:
makefile
Copy code
NODE_ENV=development
PORT=5000
MONGO_URI=<Your-MongoDB-URI>
JWT_SECRET=<Your-JWT-Secret>
Start the backend server:
bash
Copy code
npm start
Frontend Setup:

Create a new React app (if not already done):
bash
Copy code
npx create-react-app frontend
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Replace the default React app code with your custom frontend code. If you haven't committed the frontend code, copy the files manually to this directory.
Install client dependencies:
bash
Copy code
npm install
Create a .env file in the frontend directory and add the following environment variables:
arduino
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the frontend server:
bash
Copy code
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

License
This project is licensed under the MIT License - see the LICENSE file for details.