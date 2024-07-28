# Expense Sharing Application Setup

## Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)
- MongoDB (local installation or a cloud-hosted instance)

## Setup Steps

1. Clone the repository (or create a new directory and copy the files into it):
   ```
   git clone https://github.com/Aarav238/backend-assignment.git
   cd backend-assignment
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key-for-jwt>
   PORT=3000
   ```
   Replace `<your-mongodb-connection-string>` with your MongoDB connection string and `<your-secret-key-for-jwt>` with a secure random string.

4. Start the server:
   ```
   npm start
   ```
   For development server:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:5000` or the port you have defined in `.env`

## Testing the API

You can use tools like Postman or curl to test the API endpoints. Here are some example requests:

1. Register a new user:
   ```
   POST http://localhost:3000/api/auth/register
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "mobile": "1234567890"
   }
   ```

2. Login:
   ```
   POST http://localhost:3000/api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   This will return a token. Use this token in the Authorization header for subsequent requests.

3. Add an expense:
   ```
   POST http://localhost:3000/api/expenses
   Content-Type: application/json
   Authorization: Bearer <your-token>

   {
     "amount": 100,
     "description": "Dinner",
     "splitMethod": "equal",
     "splits": [
       {"user": "<user-id-1>"},
       {"user": "<user-id-2>"}
     ]
   }
   ```
   Replace `<user-id-1>` and `<user-id-2>` with actual user IDs.

4. Get user expenses:
   ```
   GET http://localhost:3000/api/expenses
   Authorization: Bearer <your-token>
   ```

5. Get balance sheet:
   ```
   GET http://localhost:3000/api/expenses/balance-sheet
   Authorization: Bearer <your-token>
   ```

Remember to replace `<your-token>` with the actual token you received from the login request.
