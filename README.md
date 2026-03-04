# User Management CRUD App

A simple command-line application built with Node.js for managing user data. This app allows you to create, read, update, and delete users, with data saved in a JSON file for persistence.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. [Download Node.js here](https://nodejs.org/).
- **Git**

## Setup Instructions

Follow these steps to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/miladkittan/cruds.git
cd cruds
```

### 2. Initialize the Project

Open your terminal in the project directory and run the following command to initialize the project:
```bash
npm init -y
```
This will create a package.json file with default settings.

### 3. Install Required Packages

Install the necessary packages. This app uses prompt-sync for command-line prompts:
```bash
npm install prompt-sync
```

### 4. Prepare the Database File
Ensure there is a db.json file in the root of your project to store user data. If it doesn't exist, create it manually and initialize it with an empty JSON object:
```json
{}
```

### 5. Run the Application
Now you can run the application using:
```bash
node server.js
```
This will start the CRUD app in your terminal, and you can follow the prompts to create, read, update, or delete user data.
