$(document).ready(function () {

    var
        favoritesList       = $('.favoritesList'),
        tackList            = $('.tackContainer'),
        addFavoriteButtons  = $('.button--addFavorite'),
        orderButton         = $('.button--orderFavorites'),
        favoritesIDs        = [],
        sessionFavorites,
        defaultFilter
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
            itemData    = '[data-id="' + data.id + '"]',
            itemExists  = favoritesList.find(itemData).length
        ;

        if (!itemExists) {
            addRemoveFavorite('add', data);

        } else {
            addRemoveFavorite('remove', data);
        }
    }



    // Append/remove element to the My Favorites list

    var addRemoveFavorite = function (action, data) {

        var
            button      = data.button,
            itemID      = data.id
        ;

        if (action === 'add') {

            favoritesList
                .removeClass('noFavorites')
                .append(''
                    +   '<li class="favoriteItem" data-id="' + itemID + '">'
                    +       '<img src="img/tack/arabian-fancy-tack_' + itemID + '.jpg">'
                    +       '<div class="button--removeFavorite" data-id="' + itemID + '">'
                    +           '<i class="fa fa-times"></i>'
                    +       '</div>'
                    +   '</li>');

            // Push the favorite's id into the favoriteIDs array
            favoritesIDs.push(itemID);

            // Refresh favoritesIDs sessionStorage value
            sessionStorage.setItem('favoritesIDs', JSON.stringify(favoritesIDs));


        } else if (action === 'remove') {

            var
                itemData    = '[data-id="' + itemID + '"]',
                favoritesCount
            ;

            favoritesList
                .find(itemData)
                .remove();

            favoritesCount = favoritesList.find('li').length;

            // Show the My Favorites interaction prompt if there are no favorites remaining
            if (favoritesCount === 1) {
                favoritesList.addClass('noFavorites');
            }

            // Push the favorite's id into the favoriteIDs array
            favoritesIDs = $.grep(favoritesIDs, function(value) {
              return value != itemID;
            });

            // Refresh favoritesIDs sessionStorage value
            sessionStorage.setItem('favoritesIDs', JSON.stringify(favoritesIDs));
        }

        // Un-/Highlight the tack item's heart icon
        button.toggleClass('inFavorites');
    }



    // Remove a tack item from the My Favorites list when a favorited item's close icon
    // is clicked from the My Favorites list

    var removeFavoritesListener = function (e) {
        var
            itemID          = e.currentTarget.attributes['data-id'].value,
            itemData        = '[data-id="' + itemID + '"]',
            button          = tackList.find(itemData).find('.button--addFavorite')
            data            = {
                id:     itemID,
                button: button
            }
        ;

        addRemoveFavorite('remove', data);
    }



    // Populate My Favorites list with favorites that are in sessionStorage

    var populateFavoritesList = function (favoritesIDs) {
        $.each(favoritesIDs, function (i, itemID) {
            var
                itemData    = '[data-id="' + itemID + '"]',
                button      = tackList.find(itemData).find('.button--addFavorite'),
                data        = {
                    id:     itemID,
                    button: button
                }
            ;

            addRemoveFavorite('add', data);

            button.addClass('inFavorites');
        });
    }



    // Call the order form and populate it with the selected favorites

    var orderFavorites = function () {

        // If there is at least one favorite in the My Favorites list...
        if (favoritesIDs.length > 0) {

            // Redirect to /contact
            window.location.href = 'contact';
        }
    }



    // If a color selector was chosen on /index, set that color as the default filter

    if (sessionStorage.getItem('color')) {
        if (sessionStorage['color'] !== 'all') {
            defaultFilter = '.' + sessionStorage['color'] + ', .all';
        }

        // Clear the color selector in sessionStorage
        sessionStorage.removeItem('color');
    }



    // Instantiate MixItUp once the tack grid has been populated

    $('.tackContainer').mixItUp({
        animation: {
            duration:   200,
            effects:    'fade',
            easing:     'ease'
        },
        load: {
            filter: defaultFilter
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



    // If favorites already exist in sessionStorage, populate the My Favorites list with them

    if (sessionStorage.getItem('favoritesIDs')) {
        sessionFavorites = JSON.parse(sessionStorage['favoritesIDs']);
        populateFavoritesList(sessionFavorites);
    }


    favoritesListener(addFavoriteButtons);
    favoritesList.on('click', '.button--removeFavorite', removeFavoritesListener);
    orderButton.on('click', orderFavorites);
});
