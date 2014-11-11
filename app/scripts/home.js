$(document).ready(function () {

    var
        colorSelectors  = $('.selector'),
        colorImages     = $('.colorImages')
    ;



    // Change the color of the horse icon when mousing over the color selectors

    var changeHorseColor = function (e) {
        var
            selector = $(this),
            color = selector.attr('data-color'),
            imgData = '[data-color="' + color + '"]',
            imgTarget = colorImages.find(imgData)
        ;

        colorImages.find('img').removeClass('active');
        imgTarget.addClass('active');
    }



    // Set sessionStorage variable according to the chosen color selector and redirect to /tack

    var viewTackByColor = function (e) {
        var
            selector = $(this),
            color = selector.attr('data-color')
        ;

        sessionStorage.setItem('color', color);
        window.location.href = 'tack';
    }


    $('.fancybox').fancybox({
        prevEffect:         'fade',
        nextEffect:         'fade',
        margin:             [15, 15, 40, 15],
        padding:            0,
        helpers:            {
            overlay:        {
                locked:     false
            },
            title: {
                type:       'inside',
                position:   'bottom'
            }
        }
    });



    colorSelectors.on('mouseenter', changeHorseColor);
    colorSelectors.on('click', viewTackByColor);
});
