/*****************************************************************************/
/* EditCatch: Event Handlers */
/*****************************************************************************/
Template.EditCatch.events({
  'click .deleteCatch': function(){
    $('.modal-backdrop').hide();
    Bert.alert('Fangsten ble slettet!', 'info', 'growl-bottom-right');
    Router.go('Home');
  },
  'click a.js-remove': function(){
    $('.progress').hide();
    Bert.alert('Bildet ble fjernet', 'info', 'growl-bottom-right');
  }
});

/*****************************************************************************/
/* Id: Helpers */
/*****************************************************************************/
Template.EditCatch.helpers({
  beforeRemove: function() {
    return function(collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Vil du slette "' + doc.species + '"?')) {
        this.remove();
        Bert.alert('Fangsten ble slettet', 'warning', 'growl-bottom-right');
        Router.go('Home');
      }
    };
  }
});

AutoForm.addHooks(['editCatchForm'], {
  onSuccess: function(operation, result, template) {
    Bert.alert('Fangsten ble oppdatert!', 'success', 'growl-bottom-right');
    Router.go('Home');
  }
});

/*****************************************************************************/
/* Id: Lifecycle Hooks */
/*****************************************************************************/
Template.EditCatch.onCreated(function() {});

Template.EditCatch.onRendered(function() {
  $('.progress').hide();

  $('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {
    $('.progress').fadeIn( "slow" );
    $('.progress-bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
  });

  $('.cloudinary-fileupload').bind('fileuploaddone', function(e, data) {
    $(".afCloudinary").find("a.js-remove").html("<i class='fa fa-times'></i> Fjern bilde");
    Bert.alert('Bildet ble lastet opp, husk å lagre fangsten!', 'success', 'growl-bottom-right');
  });

  $(".afCloudinary").find(":button").html("Last opp bilde").addClass('btn, btn-success');
  $(".afCloudinary").find("a.js-remove").html("<i class='fa fa-times'></i> Fjern bilde");
});

Template.EditCatch.onDestroyed(function() {});
