/*****************************************************************************/
/* CatchesList: Event Handlers */
/*****************************************************************************/

Template.CatchesList.events({});

/*****************************************************************************/
/* CatchesList: Helpers */
/*****************************************************************************/
Template.CatchesList.helpers({

  catches: function() {
    return Catches.find({createdBy: Meteor.userId()});
  },
  id: function() {
    return this._id;
  },
  dateCaught: function() {
    return moment(this.dateCaught).format("D. MMM YYYY");
  },
  date: function() {
    return moment(this.dateCaught).format("x");
  },
  weight: function() {
    return weight = (this.weight / 1000);
  },
  grams: function() {
    return weight = this.weight;
  },
  released: function() {
    if (this.released === 'Gjenutsatt')
      return true;
    else
      return false;
  },
  thumb: function() {
    return this.image.replace('/upload/', '/upload/w_400/');
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
/* CatchesList: Lifecycle Hooks */
/*****************************************************************************/
Template.CatchesList.onCreated(function() {});

Template.CatchesList.onRendered(function() {

  Meteor.setTimeout(function(){
    $('.grid').imagesLoaded( function() {
      // quick  search regex
      var qsRegex;

      // init Isotope
      var $container = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        getSortData: {
          river: '.river',
          species: '.species',
          sex: '.sex',
          weight: '[data-weight] parseFloat',
          date: '[data-date]',
        },
        sortBy: ['date'],
        sortAscending: {
          river: true,
          species: true,
          sex: true,
          weight: false,
          date: false
        },
        filter: function() {
          return qsRegex ? $(this).text().match(qsRegex) : true;
        }
      });

      // use value of search field to filter
      var $quicksearch = $('.quicksearch').keyup(debounce(function() {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $container.isotope({
          filter: function() {
            return qsRegex ? $(this).text().match(qsRegex) : true;
          }
        });
      }));
      // filter results on label click
      $('#filter').on('click', 'label', function() {
        var filterValue = $(this).attr('data-filter');
        $('.quicksearch').val('')
        $container.isotope({
          filter: filterValue
        });
      });

      // sort results on label click
      $('#sorts').on('click', 'label', function() {
        var sortByValue = $(this).attr('data-sort-by');
        $('.quicksearch').val('')
        $container.isotope({
          sortBy: sortByValue
        });
      });


      // search - debounce so filtering doesn't happen every millisecond
      function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
          if (timeout) {
            clearTimeout(timeout);
          }
          function delayed() {
            fn();
            timeout = null;
          }
          setTimeout(delayed, threshold || 100);
        }
      }
  /*
      // Lazy load, with fix to load image after sorting/filtering
      var $win = $(window),
          $imgs = $("div.lazy"),
          $con = $('.grid').isotope();

      function loadVisible($els, trigger) {
        $els.filter(function () {
          var rect = this.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight;
        }).trigger(trigger);
      }

      $con.isotope('on', 'layoutComplete', function () {
        loadVisible($imgs, 'lazylazy');
      });

      $win.on('scroll', function () {
        loadVisible($imgs, 'lazylazy');
      });

      $imgs.lazyload({
        failure_limit: Math.max($imgs.length - 1, 0),
        event: 'lazylazy'
      });
  */
    });
  }, 1000)


});

Template.CatchesList.onDestroyed(function() {});
