module.exports = {
  IsValidiateUsername: (username) => {
    const tabSpace = /\s/g;
    if (
      username.replace(tabSpace, '') === '' ||
      username.search(/\s/g) !== -1
    ) {
      return false;
    }
    return /^[a-zA-Z0-9_]{4,16}$/.test(username); //현재 한글 적용 X
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
    const tabSpace = /\s/g;
    //공백제거했을 때 빈문자열인 경우
    if (company.replace(tabSpace, '') === '') {
      return false;
    }
    return company;
  },

  IsValidateGitRepo: (gitRepo) => {
    const tabSpace = /\s/g;
    if (gitRepo.replace(tabSpace, '') === '') {
      return false;
    }
    return gitRepo;
  },
};
