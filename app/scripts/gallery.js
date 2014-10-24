$(document).ready(function(){

    var
        galleryItems = $('.fancybox')
    ;


    // Instantiate fancybox

    galleryItems.fancybox({
        prevEffect: 'fade',
        nextEffect: 'fade',
        margin:     [15, 15, 40, 15],
        padding:    0
    });

});
