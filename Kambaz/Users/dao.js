import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const users = db.users;  // direct reference to DB

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users.push(newUser);
    return newUser;
  };

  const findAllUsers = () => users;

  const findUserById = (userId) =>
    users.find((user) => user._id === userId);

  const findUserByUsername = (username) =>
    users.find((user) => user.username === username);

  const findUserByCredentials = (username, password) =>
    users.find(
      (user) => user.username === username && user.password === password
    );

  // ⭐ FIXED: Proper update function
  const updateUser = (userId, updates) => {
    const index = users.findIndex((u) => u._id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
    }
    return users[index];
  };

  const deleteUser = (userId) => {
    const index = users.findIndex((u) => u._id === userId);
    if (index !== -1) users.splice(index, 1);
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser
  };
}
