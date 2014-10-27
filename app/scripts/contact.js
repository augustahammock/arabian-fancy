$(document).ready(function () {

    var
        favoritesContainer  = $('.favoritesGroup'),
        favoritesList       = $('.favoritesList'),
        contactSubmit       = $('.button--contactSubmit'),
        favorites
    ;


    // If there are favorites in sessionStorage...
    if (sessionStorage.getItem('favoritesIDs')) {

        favorites = JSON.parse(sessionStorage['favoritesIDs']);

        // Show the Favorites section of the form...
        favoritesContainer.removeClass('noFavorites');
        console.log(favorites);

        // And populate it
        $.each(favorites, function (i, itemID) {
            favoritesList.append(''
                +   '<li>'
                +       '<img src="img/tack/arabian-fancy-tack_' + itemID + '.jpg">'
                +   '</li>');
        });
    }

    console.log('contact page yay!');
});
