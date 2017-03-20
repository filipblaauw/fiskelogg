/*****************************************************************************/
/* InsertCatch: Event Handlers */
/*****************************************************************************/
Template.InsertCatch.events({
  'click a.js-remove': function(){
    $('.progress').hide();
    Bert.alert('Bildet ble fjernet', 'info', 'growl-bottom-right');
  }
});

/*****************************************************************************/
/* InsertCatch: Helpers */
/*****************************************************************************/
Template.InsertCatch.helpers({
});

AutoForm.addHooks(['insertCatchForm'], {
  onSuccess: function(operation, result, template) {
    Bert.alert( 'Fangsten ble lagt til!', 'success', 'growl-bottom-right' );
    Router.go('Home');
  }
});

/*****************************************************************************/
/* InsertCatch: Lifecycle Hooks */
/*****************************************************************************/
Template.InsertCatch.onCreated(function () {
});

Template.InsertCatch.onRendered(function () {

  $('.progress').hide();

  $('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {
    $('.progress').fadeIn( "slow" );
    $('.progress-bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
    $('.progress-percent').html(Math.round((data.loaded * 100.0) / data.total) + '%');
  });

  $('.cloudinary-fileupload').bind('fileuploaddone', function(e, data) {
    $(".afCloudinary").find("a.js-remove").html("<i class='fa fa-times'></i> Fjern bilde");
    Bert.alert('Bildet ble lastet opp, husk å lagre fangsten!', 'success', 'growl-bottom-right');
  });

  $(".afCloudinary").find(":button").html("Last opp bilde").addClass('btn, btn-success');

});
