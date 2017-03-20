Meteor.publish('catches', function (userId) {
  return Catches.find({createdBy: userId}, {sort: {dateCaught: -1}});
});
