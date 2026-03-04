// HTML element references
const userList = document.getElementById("userList");
const createUserForm = document.getElementById("createUserForm");

// Fetch all users and display them
function fetchUsers() {
  fetch("/api/users")
    .then((response) => response.json())
    .then((users) => {
      userList.innerHTML = ""; // Clear existing list
      for (const id in users) {
        const user = users[id];
        const userItem = document.createElement("div");
        userItem.innerHTML = `
          <strong>ID:</strong> ${id} 
          <strong>Name:</strong> ${user.name} 
          <strong>Age:</strong> ${user.age} 
          <strong>City:</strong> ${user.city} 
          <button class="delete-btn" onclick="deleteUser('${id}')">Delete</button>
          <button class="edit-btn" onclick="editUser('${id}', '${user.name}', ${user.age}, '${user.city}')">Edit</button>
        `;
        userList.appendChild(userItem);
      }
    });
}

// Create a new user
createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = event.target.userId.value;
  const name = event.target.userName.value;
  const age = event.target.userAge.value;
  const city = event.target.userCity.value;

  fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, age, city })
  })
  .then(() => {
    fetchUsers(); // Refresh the list
    createUserForm.reset(); // Clear form
  });
});

// Delete a user
function deleteUser(id) {
  fetch(`/api/users/${id}`, { method: "DELETE" })
    .then(() => fetchUsers()); // Refresh the list after deletion
}

// Edit a user (prefill the form for editing)
function editUser(id, name, age, city) {
  document.getElementById("userId").value = id;
  document.getElementById("userName").value = name;
  document.getElementById("userAge").value = age;
  document.getElementById("userCity").value = city;
}

// Update an existing user (submit edited form)
createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = event.target.userId.value;
  const name = event.target.userName.value;
  const age = event.target.userAge.value;
  const city = event.target.userCity.value;

  fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, city })
  })
  .then(() => {
    fetchUsers(); // Refresh the list
    createUserForm.reset(); // Clear form
  });
});

// Load initial list of users on page load
fetchUsers();
