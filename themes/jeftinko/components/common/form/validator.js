/* eslint-disable no-useless-escape */
const validator = {};
const rules = {
  email: {
    handler(value) {
      if (value === null || value === undefined || value === '') return true;
      // eslint-disable no-useless-escape
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    },
    errorMessage: 'Email nije u ispravnom formatu'
  },
  number: {
    handler(value) {
      if (value === null || value === undefined || value === '') {
        return true;
      }

      // Allowing integer and float
      return !Number.isNaN(value);
    },
    errorMessage: 'Broj nije u ispravnom formatu'
  },
  notEmpty: {
    handler(value) {
      return value !== null && value !== undefined && value.length !== 0;
    },
    errorMessage: 'Polje je obavezno'
  },
  noWhiteSpace: {
    handler(value) {
      return !/\s/g.test(value);
    },
    errorMessage: 'Razmak nije dozvoljen'
  },
  noSpecialChar: {
    handler(value) {
      // eslint-disable-next-line no-useless-escape
      return !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    },
    errorMessage: 'Specijalni karakteri nisu dozvoljeni'
  }
};

validator.addRule = (key, handler, message) => {
  rules[key] = {
    handler,
    errorMessage: message
  };
};

validator.removeRule = (key) => {
  delete rules[key];
};

validator.getRule = (key) => rules[key];

export { validator };
