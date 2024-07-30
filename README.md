# Prestige POS

Prestige POS is a comprehensive point-of-sale application designed to manage sales transactions, inventory, and customer data efficiently. It features a robust backend built with Express.js and a dynamic frontend powered by Angular.

## Table of Contents
* Overview
* Technologies Used
* Installation
* Backend Setup
* Frontend Setup
* Usage
* Features
* Contributing
* License
* Contact
* Overview

Prestige POS is an all-in-one solution for managing retail transactions and inventory, providing a seamless experience for both business owners and customers. The system is designed to be scalable, secure, and easy to use, making it suitable for businesses of all sizes.

## Technologies Used
### Backend
* Express.js: A fast and minimalist web framework for Node.js.
* PostgreSQL: A powerful, open-source relational database system.
* bcrypt: For hashing and securing passwords.
* CORS: For handling Cross-Origin Resource Sharing.
* dotenv: For managing environment variables.
* Joi: For validating request data.
* jsonwebtoken: For creating and verifying JWT tokens.
### Frontend
* Angular: A platform for building web applications.
* ng-bootstrap: For Bootstrap components in Angular.
* Font Awesome: For scalable vector icons.
* HTTPClient: For making HTTP requests to the backend.
  
## Installation
Follow these steps to set up and run the Prestige POS application on your local machine.

### Backend Setup
Navigate to the Backend Directory:

bash
cd backend
Install Dependencies:

Ensure you have Node.js installed, then run:

``` npm install ```

Set Up Environment Variables:

Create a .env file in the backend directory and add your environment variables:

``
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/prestige-pos
JWT_SECRET=your_jwt_secret_key
Replace username, password, and other values with your actual database credentials.
``

Run the Backend Server:

Start the server using:

```
npm run dev
The server will run on http://localhost:5000.
```

### Frontend Setup
Navigate to the Frontend Directory:

```
cd frontend
Install Dependencies:
```

Ensure you have Node.js and Angular CLI installed, then run:

```
npm install
```
Set Up Environment Variables:

Create an environment.ts file in src/environments with the following content:

typescript
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```
Run the Frontend Application:

Start the Angular development server:

```
ng serve

```
The application will run on http://localhost:4200.

### Usage
Once both the backend and frontend are running, you can access the application by navigating to http://localhost:4200 in your web browser.

* Admin Login: Use the admin credentials to log in and access the dashboard.
* POS System: Process transactions, manage inventory, and view sales reports.
  
### Features
+ User Authentication: Secure login and registration using JWT.
+ Inventory Management: Add, update, and delete products.
+ Sales Tracking: View detailed sales reports and analytics.
+ Responsive Design: Optimized for both desktop and mobile devices.
Contributing
Contributions are welcome! Please follow these steps to contribute:

## Fork the Repository:

Click the "Fork" button on the top right of the repository page.

Clone the Forked Repository:

```

git clone https://github.com/your-username/prestige-pos.git
```
Create a New Branch:

```

git checkout -b feature/your-feature-name
```
Make Changes and Commit:

```

git add .
git commit -m "Add your feature description"
```
Push to Your Forked Repository:

```

git push origin feature/your-feature-name

```
#### Create a Pull Request:

Go to the original repository and create a pull request from your forked branch.

##License
This project is licensed under the GPO V2 License. See the LICENSE file for more information.

## Contact
For questions or support, please contact:

