// Code goes here

$(function() {
  function waitForvidLoad(vids, callback) {
    var vidsLoaded = 0;
    vids.on('loadeddata', function() {
      vidsLoaded++;
      if (vids.length === vidsLoaded) {
        callback();
      }
    });
  }

  var $container = $('#container');
  var vids = $('#container').find('video');
  waitForvidLoad(vids, function() {
    $container.imagesLoaded(function() {
      $container.masonry({
        itemSelector: '.grid-item',
        columnWidth: 100
      });
    });
  });

  $container.infinitescroll({
      navSelector: '#page-nav', // selector for the paged navigation
      nextSelector: '#page-nav a', // selector for the NEXT link (to page 2)
      itemSelector: '.grid-item', // selector for all items you'll retrieve
      loading: {
        finishedMsg: 'No more pages to load.',
        img: 'http://i.imgur.com/6RMhx.gif'
      },
      bufferPx: 160,
    },
    // trigger Masonry as a callback
    function(newElements) {
      // hide new items while they are loading
      var $newElems = $(newElements).css({
        opacity: 0
      });
      // ensure that images load before adding to masonry layout
      waitForvidLoad($newElems.find('video'), function() {
        $newElems.imagesLoaded(function() {
          // show elems now they're ready
          $newElems.animate({
            opacity: 1
          });
          $container.masonry('appended', $newElems, true);
        });
      });
    }
  );
});