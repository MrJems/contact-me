const roles = {
  all: ["admin", "user", "anonymous"], // Accessible to everyone
  registered: ["admin", "user"], // Accessible only to registered users
  admin: ["admin"], // Accessible only to admins
};

module.exports = roles;
