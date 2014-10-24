console.log('added tack item');

$(document).ready(function(){

    var
        bodyClass = $('body').attr('class'),
    ;


    // If the bodyClass is 'tack'...
    if ( bodyClass == 'tack' ){

        // Fetch photos.json
        $.ajax({
            dataType:   'json',
            url:        'js/photos.json',
            success:    populateTack,
            error:      function(){
                console.log('something went wrong fetching the tack');
            }
        });
    }

    // Populate the tack display if photos.json was fetched successfully
    function populateTack(data){
        var
            photos          = data['photos'],
            tackContainer   = $('.tack-images'),
            imgPath         = 'http://localhost:8888/clients/arabian-fancy/assets/img/tack'
        ;

        $(photos).each(function(x){
            var
                photo   = photos[x],
                id      = photo['id'],
                colors  = photo['colors']
            ;

            // Parse coat colors array and turn it into a string to be used as classes for each tack item
            if ( colors == 1 ) {
                colors = 'all';

            } else {
                colors = colors.join(' ');
            }

            tackContainer.append(''
                + '<div class="mix ' + colors + '">'
                +   '<span class="add"><i class="fa fa-heart-o"></span>'
                +   '<a class="fancybox" rel="group" href="' + imgPath + '/arabian-fancy-tack_' + id + '.jpg">'
                +     '<img src="' + imgPath + '/arabian-fancy-tack_' + id + '.jpg" alt="Tack by Arabian Fancy Tack">'
                +   '</a>'
                + '</div>'
            );
        });

        // Instantiate MixItUp once the tack has been populated
        $('#tack-images').mixItUp({
            animation: {
                duration:   200,
                effects:    'fade stagger(50ms)',
                easing:     'ease'
            }
        });
    }
});
