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

});