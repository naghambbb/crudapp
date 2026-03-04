const fs = require("fs");
const prompt = require("prompt-sync")();

let storage = fs.readFileSync("db.json", "utf-8");
let users = JSON.parse(storage);

while (true) {
    console.log("\n1. Read user\n2. Delete user\n3. Update user\n4. Create user\n5. Exit");
    const input = prompt("Enter choice: ");

    switch (input) {
        case "1":
            const readId = prompt("Enter the ID: ");
            console.log(readUser(readId));
            break;
        case "2":
            const deleteId = prompt("Enter the ID: ");
            deleteUser(deleteId);
            break;
        case "3":
            const updateId = prompt("Enter the ID: ");
            const updateName = prompt("Enter the name: ");
            const updateAge = prompt("Enter the age: ");
            const updateCity = prompt("Enter the city: ");
            updateUser(updateId, updateName, updateAge, updateCity);
            break;
        case "4":
            const newId = prompt("Enter the ID: ");
            const newName = prompt("Enter the name: ");
            const newAge = prompt("Enter the age: ");
            const newCity = prompt("Enter the city: ");
            createUser(newId, newName, newAge, newCity);
            break;
        case "5":
            console.log("Exiting program.");
            process.exit();
        default:
            console.log("Invalid choice. Please select a valid option.");
    }
}

function readUser(id) {
    if (users[id]) {
        return users[id];
    } else {
        return "User not found!";
    }
}

function deleteUser(id) {
    if (users[id]) {
        delete users[id];
        saveToDatabase();
        console.log("User deleted successfully.");
    } else {
        console.log("User not found!");
    }
}

function updateUser(id, name, age, city) {
    if (users[id]) {
        users[id] = { name, age, city };
        saveToDatabase();
        console.log("User updated successfully.");
    } else {
        console.log("User not found!");
    }
}

function createUser(id, name, age, city) {
    if (users[id]) {
        console.log("User ID already exists. Choose a different ID.");
    } else {
        users[id] = { name, age, city };
        saveToDatabase();
        console.log("User created successfully.");
    }
}

function saveToDatabase() {
    fs.writeFileSync("db.json", JSON.stringify(users, null, 2));
}
