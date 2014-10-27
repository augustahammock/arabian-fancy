$(document).ready(function () {

    var
        favoritesList       = $('.favoritesList'),
        tackList            = $('.tackContainer'),
        addFavoriteButtons  = $('.button--addFavorite')
    ;

    // Add a 'click' event listener to each tack item's 'Add Favorite' button

    var favoritesListener = function (buttons) {
        var button, itemID, data;

        $.each(buttons, function(button, i) {
            button      = $(this);
            itemID      = button.closest('.tackItem').attr('data-id');
            data        = {
                id:     itemID,
                button: button
            }

            button.on('click', data, toggleFavorites);
        });
    }


    // Determine whether or not a tack item is in the My Favorites list and call the
    // appropriate function to add or remove it.

    var toggleFavorites = function (e) {

        var
            data        = e.data,
            button      = data.button,
            itemID      = data.id,
            itemData    = '[data-id="' + itemID + '"]',
            itemExists  = favoritesList.find(itemData).length
        ;

        if (!itemExists) {
           addFavorite(data);

        } else {
            removeFavorite(data);
        }
    }


    // Add a tack item to the My Favorites list when its heart icon is clicked

    var addFavorite = function (data) {
        var
            button      = data.button,
            itemID      = data.id
        ;

        favoritesList
            .removeClass('noFavorites')
            .append(''
                +   '<li class="favoriteItem" data-id="' + itemID + '">'
                +       '<img src="img/tack/arabian-fancy-tack_' + itemID + '.jpg">'
                +       '<div class="button--removeFavorite" data-id="' + itemID + '">'
                +           '<i class="fa fa-times"></i>'
                +       '</div>'
                +   '</li>');


        // Highlight the tack item's heart icon
        button.toggleClass('inFavorites');
    }


    // Remove a tack item from the My Favorites list when its heart icon is clicked

    var removeFavorite = function (data) {
        var
            button      = data.button,
            itemID      = data.id,
            itemData    = '[data-id="' + itemID + '"]',
            favoritesCount
        ;

        favoritesList
            .find(itemData)
            .remove();

        favoritesCount = favoritesList.find('li').length;


        // Un-highlight the tack item's heart icon
        button.toggleClass('inFavorites');


        // Show the My Favorites interaction prompt if there are no favorites remaining
        if (favoritesCount === 1) {
            favoritesList.addClass('noFavorites');
        }
    }

    var removeFavoritesListener = function (e) {
        var
            itemID          = e.currentTarget.attributes['data-id'].value,
            itemData        = '[data-id="' + itemID + '"]',
            favoriteItem    = favoritesList.find(itemData),
            tackItem        = tackList.find(itemData).find('.button--addFavorite'),
            favoritesCount
        ;

        favoriteItem.remove();
        tackItem.toggleClass('inFavorites');

        favoritesCount = favoritesList.find('li').length;

        // Show the My Favorites interaction prompt if there are no favorites remaining
        if (favoritesCount === 1) {
            favoritesList.addClass('noFavorites');
        }
    }


    // Instantiate MixItUp once the tack grid has been populated

    $('.tackContainer').mixItUp({
        animation: {
            duration:   200,
            effects:    'fade',
            easing:     'ease'
        }
    });


    // Finally, instantiate fancybox

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

    favoritesListener(addFavoriteButtons);
    favoritesList.on('click', '.button--removeFavorite', removeFavoritesListener);
});
