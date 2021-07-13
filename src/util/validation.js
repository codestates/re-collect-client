module.exports = {
  IsValidiateUsername: (username) => {
    const blank_pattern = /^\s+|\s+$/g;
    if (username.replace(blank_pattern, '' ) === "") {
      return false; //한글적용안됨
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

  IsValidateCompany: (company) => {
    const tab_space = /\s/g;
    if(company.match(tab_space)){
      return false;
    }
  },

  IsValidateGitRepo: (gitRepo) => {
    if (gitRepo.search(/[^\w\s]/g) !== -1) {
      return false;
    }
  },
};
