module.exports = {
  IsValidiateUsername: (username) => {
    //const blank_pattern = /^\s+|\s+$/g;
    const tab_space = /\s/g;
    if (
      username.replace(tab_space, '') === '' ||
      username.search(/\s/g) !== -1
    ) {
      return false;
    }
    return /^[a-zA-Z0-9_]{4,16}$/.test(username); //한글적용안됨
  },

  IsValidiatePassword: (password) => {
    if (password.search(/\s/g) !== -1) {
      return false;
    }
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  },

  IsValidateEmail: (email) => {
    if (email.search(/\s/g) !== -1) {
      return false;
    }
    return /^[\w][(\w\-)]*@[\w][(\w\-)]*\.[A-Za-z]{2,3}/.test(email);
  },

  IsValidateCompany: (company) => {
    const tab_space = /\s/g;
    if (company.replace(tab_space, '') === '') {
      //공백제거했을 때 빈문자열인 경우
      return false;
    }
    return company;
  },

  IsValidateGitRepo: (gitRepo) => {
    const tab_space = /\s/g;
    if (gitRepo.replace(tab_space, '') === '') {
      return false;
    }
    return gitRepo;
  },
};
