Schemas = {};

Catches = new Meteor.Collection('catches');

Schemas.Catches = new SimpleSchema({
  image: {
    label: "Bilde",
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    },
    optional: true
  },
  species: {
    type: String,
    label: "Art",
    autoform: {
      type: "typeahead",
      options: function () {
        return [
          {label: "Laks", value: "Laks"},
          {label: "Ørret", value: "Ørret"},
          {label: "Sjøørret", value: "Sjøørret"},
          {label: "Røye", value: "Røye"},
          {label: "Sjørøye", value: "Sjørøye"},
          {label: "Harr", value: "Harr"},
          {label: "Gjedde", value: "Gjedde"},
          {label: "Sik", value: "Sik"},
          {label: "Abbor", value: "Abbor"},
          {label: "Regnbueørret", value: "Regnbueørret"},
          {label: "Havabbor", value: "Havabbor"},
          {label: "Makrell", value: "Makrell"},
          {label: "Sei", value: "Sei"},
          {label: "Lyr", value: "Lyr"},
          {label: "Torsk", value: "Torsk"},
          {label: "Gjørs", value: "Gjørs"},
          {label: "Asp", value: "Asp"},
          {label: "Bekkerøye", value: "Bekkerøye"}
        ];
      }
    }
  },
  river: {
    type: String,
    label: "Sted (elv, vann, fjord)",
    max: 200
  },
  zone: {
    type: String,
    label: "Sone, vald eller del av vassdraget",
    max: 200,
    optional: true
  },
  weight: {
    type: Number,
    label: "Vekt i gram",
    max: 50000,
    min: 100
  },
  length: {
    type: Number,
    label: "Lengde i centimeter",
    max: 200,
    min: 1,
    optional: true
  },
  bait: {
    type: String,
    label: "Flue/agn",
    max: 200,
    optional: true
  },
  line: {
    type: String,
    label: "Flueline",
    max: 200,
    optional: true
  },
  location: {
    type: String,
    label: "Posisjon på kart",
    autoform: {
      afFieldInput: {
        type: 'map',
        mapType: 'terrain',
        zoom: 10,
        height: '500px',
        //geolocation: true,
        searchBox: true,
        autolocate: true
      }
    }
  },
  dateCaught: {
    type: Date,
    label: "Dato",
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: {
        format: "dd.mm.yyyy",
        weekStart: 1,
        autoclose: true,
        language: 'no'
      }
    }
  },
  timeCaught: {
    type: String,
    label: "Klokkeslett",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Morgen (kl 05:00 - 09:00)", value: 'morgen'},
          {label: "Formiddag (kl 09:00 - 12:00)", value: 'formiddag'},
          {label: "Ettermiddag (kl 12:00 - 17:00)", value: 'ettermiddag'},
          {label: "Kveld (kl 17:00 - 23:00)", value: 'kveld'},
          {label: "Natt (kl 23:00 - 05:00)", value: 'natt'}
        ];
      }
    },
    optional: true
  },
  water: {
    type: String,
    label: "Vannstand",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Lav", value: 'Lav'},
          {label: "Normal", value: 'Normal'},
          {label: "Høy", value: 'Høy'},
          {label: "Synkende", value: 'Synkende'},
          {label: "Stigende", value: 'Stigende'}
        ];
      }
    },
    optional: true
  },
  temperature: {
    type: String,
    label: "Vanntemperatur",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "0-5 grader", value: '0-5'},
          {label: "5-10 grader", value: '5-10'},
          {label: "10-15 grader", value: '10-15'},
          {label: "15-20 grader", value: '15-20'},
          {label: "20-25 grader", value: '20-25'}
        ];
      }
    },
    optional: true
  },
  sex: {
    type: String,
    label: "Kjønn",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "Hankjønn", value: 'Hankjønn'},
          {label: "Hunkjønn", value: 'Hunkjønn'},
          {label: "Ukjent", value: 'Ukjent'}
        ];
      }
    }
  },
  wild: {
    type: String,
    label: "Villfisk/oppdrett",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "Villfisk", value: 'Villfisk'},
          {label: "Oppdrett", value: 'Oppdrett'}
        ];
      }
    },
  },
  lice: {
    type: String,
    label: "Lus",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "Ingen/Lite", value: 'Ingen/Lite'},
          {label: "Normal", value: 'Normal'},
          {label: "Mye", value: 'Mye'}
        ];
      }
    },
    optional: true
  },
  released: {
    type: String,
    label: "Gjenutsatt",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "Gjenutsatt", value: 'Gjenutsatt'},
          {label: "Ikke gjenutsatt", value: 'Ikke gjenutsatt'}
        ];
      }
    }
    //optional: true
  },
  comments: {
    type: String,
    label: "Kommentarer/notater",
    max: 300,
    autoform: {
      afFieldInput: {
        type: "textarea",
        placeholder: "Vær, temperatur, hvilket utstyr, etc."
      }
    },
    optional: true
  },
  createdBy: {
    type: String,
    label: 'Lagt til av',
    autoValue: function() {
      return this.userId;
    }
  },
  createdAt: {
    type: Date,
    label: 'Lagt til',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    label: 'Oppdatert',
    autoValue: function () {
      return new Date();
    }
  },
  userName:{
    type: String,
    autoValue:function() {
      return Meteor.users.findOne({_id: this.userId}).profile.name;
    }
  }
});

Catches.attachSchema(Schemas.Catches)

if (Meteor.isServer) {
  Catches.allow({
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });
}

SimpleSchema.messages({
  required: "[label] må fylles ut",
  minString: "[label] må inneholde minst [min] tegn",
  maxString: "[label] kan ikke overskride [max] tegn",
  minNumber: "[label] må være minst [min]",
  maxNumber: "[label] kan ikke være høyere enn [max]",
  badDate: "[label] er ikke en gyldig dato",
  noDecimal: "[label] kan ikke inneholde desimaler",
  notAllowed: "[value] er ikke et tillatt tegn",
  expectedString: "[label] må være en tekst",
  expectedNumber: "[label] må være et nummer"
});
