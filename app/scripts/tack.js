$(document).ready(function () {

    // Then instantiate fancybox
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

    // Instantiate MixItUp once the tack has been populated...
    $('.tackContainer').mixItUp({
        animation: {
            duration:   200,
            effects:    'fade stagger(50ms)',
            easing:     'ease'
        }
    });
});
