Template.MasterLayout.helpers({});

Template.registerHelper('currentRouteIs', function (route) {
  return Router.current().route.getName() === route;
});

Template.MasterLayout.events({
});

Template.MasterLayout.onRendered(function () {

});
