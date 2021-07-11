module.exports = {
  IsValidiateUsername: (username) => {
    if (username.search(/\s/) !== -1) {
      return false;
    }
    return /^[a-zA-Z0-9_]{4,16}$/.test(username);
  },

  IsValidiatePassword: (password) => {
    if (password.search(/\s/) !== -1) {
      return false;
    }
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  },

  IsValidateEmail: (email) => {
    if (email.search(/\s/) !== -1) {
      return false;
    }
    return /^[\w][(\w\-)]*@[\w][(\w\-)]*\.[A-Za-z]{2,3}/.test(email);
  },
};
