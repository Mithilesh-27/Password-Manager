# Password Manager

Your one-stop solution for storing and managing passwords securely.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

This Password Manager application allows users to securely store and manage their passwords. The application is built using React for the frontend and Node.js with MongoDB for the backend.

## Features

- Save new passwords with associated websites and usernames.
- Edit existing passwords.
- Delete passwords.
- Copy usernames and passwords to clipboard.
- Responsive design for different screen sizes.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Mithilesh-27/Password-Manager.git
    cd Password-Manager
    ```
2. Set up MongoDB:
    - Ensure MongoDB is installed and running on your machine.
    - Create a `.env` file in the root directory and add your MongoDB URI:
        ```
        MONGO_URI=mongodb://localhost:27017/password-manager
        ```


### Frontend Setup

1. Install frontend dependencies in the root directory:
    ```bash
    npm install
    ```

2. Start the frontend development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node --watch server.js
    ```

## Usage

1. Use the interface to add, edit, delete, and copy passwords.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

This project was created by [Mithilesh Singpure](https://github.com/Mithilesh-27).
