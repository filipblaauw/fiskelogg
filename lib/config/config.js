AccountsTemplates.configure({
  //overrideLoginErrors: true,
  showForgotPasswordLink: true,
  enablePasswordChange: true,
  sendVerificationEmail: false,
  confirmPassword: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: false
});

AccountsTemplates.addField({
  _id: 'name',
  type: 'text',
  displayName: "Brukernavn",
  required: true,
  placeholder: {
    signUp: "Vennligst oppgi brukernavn/kallenavn"
  }
});

Meteor.startup(function () {
  var emailCol = AdminTables.Users.options.columns[1];
  emailCol.render = function(value){
    return value && value[0] ? value[0].address : 'no email';
  }
});


T9n.setLanguage("no_NB");

AdminConfig = {
  name: 'Fiskelogg',
  adminEmails: ['filipbl@gmail.com'],
  collections: {
    Catches: {
      tableColumns: [
        {label: 'Art', name: 'species'},
        {label: 'Sted', name: 'river'},
        {label: 'Vald', name: 'zone'},
        {label: 'Lagt til', name: 'createdAt'},
        {label: 'Av', name: 'userName'}
      ]
    }
  },
  autoForm: {
    omitFields: ['createdAt', 'updatedAt']
  }
};
