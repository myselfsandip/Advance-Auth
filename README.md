# Overview

This project is a full-featured authentication system designed to
provide secure user management, including account registration, email
verification, login, password reset, and protected routes for authorized
access. Below is a breakdown of the implemented features.

# 🚀 Features

## Backend 

-   🔧 **Backend Setup**: Configured Node.js/Express server with all
    necessary dependencies for authentication.

-   🗄️ **Database Setup**: Integrated MongoDB for secure and scalable
    user data management.

-   🔐 **Signup Endpoint**: Users can create new accounts by providing
    their email and password.

-   📧 **Sending Verify Account Email**: Sends a verification email to
    newly registered users.

-   🔍 **Verify Email Endpoint**: Endpoint to verify user accounts
    through a unique token.

-   📄 **Building a Welcome Email Template**: Professional email
    template to welcome users upon account creation.

-   🚪 **Logout Endpoint**: Enables users to securely log out of the
    system.

-   🔑 **Login Endpoint**: Allows users to log in using their
    credentials.

-   🔄 **Forgot Password Endpoint**: Initiates password reset process
    for users who forgot their passwords.

-   🔁 **Reset Password Endpoint**: Allows users to securely reset their
    passwords.

-   ✔️ **Check Auth Endpoint**: Endpoint to verify user authentication
    status for protected routes.

## Frontend 

-   🌐 **Frontend Setup**: React-based frontend to provide a seamless
    user experience.

-   📋 **Signup Page UI**: User-friendly interface for new users to sign
    up.

-   🔓 **Login Page UI**: Clean login interface for returning users.

-   ✅ **Email Verification Page UI**: Page to guide users through the
    email verification process.

-   📤 **Implementing Signup**: Integrated frontend with backend for
    user registration.

-   📧 **Implementing Email Verification**: Ensured email verification
    flow is smooth and functional.

-   🔒 **Protecting Our Routes**: Protected sensitive routes to ensure
    only authenticated users have access.

-   🔑 **Implementing Login**: Secure login mechanism integrated with
    the backend.

-   🏠 **Dashboard Page**: A dashboard for authenticated users to access
    after logging in.

-   🔄 **Implementing Forgot Password**: Forgot password functionality
    integrated with the backend.

## Deployment

-   🚀 **Super Detailed Deployment**: Fully deployed and
    production-ready, ensuring seamless operation across environments.

# 🛠️ Getting Started 

## Prerequisites 

-   Node.js

-   MongoDB

-   Git

## Installation 

1.  **Clone the repository**:

            git clone https://github.com/myselfsandip/Advance-Auth.git

2.  **Install the dependencies**:

            npm install

3.  **Setup your environment variables by creating a `.env` file**:

            MONGO_URI=<your_mongodb_uri>
            JWT_SECRET=<your_jwt_secret>
            EMAIL_API_KEY=<your_email_api_key>

4.  **Run the application**:

            npm start

