/*****************************************************************************/
/* EditCatch: Event Handlers */
/*****************************************************************************/
Template.Catch.events({});

/*****************************************************************************/
/* Id: Helpers */
/*****************************************************************************/
Template.Catch.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      var location = this.location;
      var LatLng = location.split(',');
      // Map initialization options
      return {
        center: new google.maps.LatLng(LatLng[0], LatLng[1]),
        zoom: 12,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false,
      };
    }
  },
  id: function() {
    return this._id;
  },
  dateCaught: function() {
    return moment(this.dateCaught).format("DD. MMM YYYY");
  },
  date: function() {
    return moment(this.dateCaught).format("x");
  },
  createdAt: function() {
    return moment(this.createdAt).format("DD.MM.YYYY");
  },
  weight: function() {
    return (this.weight / 1000).toFixed(2).replace(".", ",");
  },
  released: function() {
    if (this.released === 'Gjenutsatt')
      return true;
    else
      return false;
  },
  sexMale: function() {
    if (this.sex === 'Hankjønn')
      return true;
    else
      return false;
  },
  sexFemale: function() {
    if (this.sex === 'Hunkjønn')
      return true;
    else
      return false;
  },
  sexUnknown: function() {
    if (this.sex === 'Ukjent')
      return true;
    else
      return false;
  }
});

/*****************************************************************************/
/* Id: Lifecycle Hooks */
/*****************************************************************************/
Template.Catch.onCreated(function() {
  GoogleMaps.ready('exampleMap', function(map) {
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.Catch.onRendered(function() {

  GoogleMaps.load({ v: '3', key: 'AIzaSyBq-jJMePjaYySrlbfKbOu-DYd1ccp1ub8', libraries: 'geometry,places' });

});

Template.EditCatch.onDestroyed(function() {});
