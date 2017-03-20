CatchesController = RouteController.extend({
  subscriptions: function() {
    this.subscribe('catches', Meteor.userId());
  },
  data: function() {
    return Catches.findOne({
      _id: this.params._id
    });
  },
  insert: function() {
    this.render('InsertCatch', {});
  },
  list: function() {
    this.render('CatchesList', {});
  },
  single: function() {
    this.render('Catch', {});
  },
  edit: function() {
    this.render('EditCatch', {});
  }
});
