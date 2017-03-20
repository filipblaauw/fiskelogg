Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  progressSpinner: false
});

Router.route('/', {
  name: 'Home',
  layoutTemplate: "MasterLayout",
  controller: 'CatchesController',
  where: 'client',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
        this.render("CatchesList");
    } else {
        this.render("Home");
    }
  }
});

Router.route('/legg-til', {
  name: 'InsertCatch',
  controller: 'CatchesController',
  action: 'insert',
  where: 'client',
  seo: {
    title: 'Legg til fangst'
  }
});

Router.route('/fangst', {
  name: 'CatchesList',
  controller: 'CatchesController',
  action: 'list',
  where: 'client',
  waitOn: function() {
    return Meteor.subscribe('catches')
  },
  seo: {
    title: 'Din fangst'
  }
});

Router.route('/fangst/:_id', {
  name: 'Catch',
  controller: 'CatchesController',
  action: 'single',
  where: 'client',
  waitOn: function() {
    return Meteor.subscribe('catches')
  },
  seo: {
    title: function(){
      var species = Catches.findOne({_id: this.params._id}).species;
          river = Catches.findOne({_id: this.params._id}).river;
      return species + ', ' + river;
    },
    og: {
      site_name: function(){
        var species = Catches.findOne({_id: this.params._id}).species;
            river = Catches.findOne({_id: this.params._id}).river;
        return species + ', ' + river + ' på Fiskelogg.no';
      },
      image: function(){
        var image = Catches.findOne({_id: this.params._id}).image;
        return image;
      },
      title: function(){
        var species = Catches.findOne({_id: this.params._id}).species;
            river = Catches.findOne({_id: this.params._id}).river;
        return species + ', ' + river + ' på Fiskelogg.no';
      }
    }
  }
});


Router.route('/endre-fangst/:_id', {
  name: 'EditCatch',
  controller: 'CatchesController',
  action: 'edit',
  where: 'client',
  seo: {
    title: 'Endre fangst'
  }
});

Router.route('/sign-out', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    this.redirect('/');
  }
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('AccessDenied');
  } else
  {
    this.next();
  }
}, {only: ['CatchesList', 'InsertCatch', 'EditCatch']});

AccountsTemplates.configureRoute('signIn', {
  name: 'atSignIn',
  path: '/logg-inn',
  layoutTemplate: 'MasterLayout'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'atSignUp',
  path: '/registrer',
  layoutTemplate: 'MasterLayout'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'atForgotPwd',
  path: '/glemt-passord',
  layoutTemplate: 'MasterLayout'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'atChangePwd',
  path: '/endre-passord',
  layoutTemplate: 'MasterLayout'
});
