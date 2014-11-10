$(document).ready(function () {

    var
        favoritesContainer  = $('.favoritesGroup'),
        favoritesList       = $('.favoritesList'),
        inputGroups         = $('.inputGroup'),
        optionsLists        = $('.options'),
        contactSubmit       = $('.button--contactSubmit'),
        favorites
    ;



    // Validate the entire form when contactSubmit is clicked

    var validateForm = function () {
        // Loop through each .inputGroup and validate its child field according to the .inputGroup's 'data-validate' attribute
        $.each( inputGroups, function (i, item) {
            var
                inputGroup  = $($(item)[0]),
                field       = inputGroup.find('input, textarea, ul.options'),
                validateAs  = inputGroup.attr('data-validateAs'),
                required    = inputGroup.hasClass('required'),
                errorList   = inputGroup.find('.errors'),
                data = {
                    inputGroup: inputGroup,
                    validateAs: validateAs,
                    required:   required,
                    errorList:  errorList
                }
            ;


            // If the field type is a <ul>, asign its available options to data.options
            // and assign its selected option to data.value
            if (field[0].tagName === 'UL') {
                var
                    options         = $(field).find('li'),
                    optionsList     = [],
                    optionValue
                ;

                $.each(options, function (i, option) {
                    optionValue = $(option)[0].innerHTML;
                    optionsList.push(optionValue)
                });

                data.value      = $(field).find('.active')[0].innerHTML;
                data.options    = optionsList;

            // If the field type is an <input> or <textarea>, assign its value to data.value
            } else {
                data.value = field[0].value;
            }

            validate(data);
        });

        var errors = $('.invalid').length;

        if (errors === 0) {
            var emailData = {
                name:           $('.inputGroup.name input').val(),
                email:          $('.inputGroup.email input').val(),
                interest:       $('.inputGroup.interest li.active')[0].innerHTML,
                message:        $('.inputGroup.message textarea').val(),
                favoritesHTML:  ''
            }

            if (favorites && favorites.length > 0) {
                emailData.favoritesHTML = '<h2>Favorite Pieces</h2>';

                $.each(favorites, function (i, favorite) {
                    emailData.favoritesHTML += '<a href="http://dev.arabianfancy.com/img/tack/arabian-fancy-tack_' + favorite + '.jpg"><img src="http://dev.arabianfancy.com/img/tack/arabian-fancy-tack_' + favorite + '.jpg"></a>'
                });
            }

            // console.log(emailData.favoritesHTML);
            // console.log('- FORM IS VALID', favorites);
            sendEmail(emailData);
        }
    }



    // Validate a single .inputGroup and its child field item

    var validateItem = function (e) {
        var
            field           = $(e.currentTarget),
            value           = field.val(),
            inputGroup      = field.parent(),
            validateAs      = inputGroup.attr('data-validateAs'),
            required        = inputGroup.hasClass('required'),
            errorList       = inputGroup.find('.errors')
            data = {
                inputGroup: inputGroup,
                field:      field,
                value:      value,
                validateAs: validateAs,
                required:   required,
                errorList:  errorList
            }
        ;

        // Validate an .inputGroup's child field according to the .inputGroup's 'data-validate' attribute
        validate(data);
    }



    // Validate
    // TODO: Abstract this as a stand-alone object

    var validate = function (data) {

        var
            errorList       = data.errorList,
            value           = data.value,
            validateAs      = data.validateAs,
            expressions     = {
                required: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,  // requires at least one character
                string: /^[A-z0-9\s\.\,\:\;\!\?\(\)\/\-\'\"]*$/,  // basic string including letters, numbers, and punctuation
                email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,  // basic email
                options: []
            },
            exp             = expressions[validateAs],
            required        = data.required,
            invalidError    = requiredError = errorList.find('.error--invalid'),
            requiredError
        ;


        // If the field is required, define the requiredError variable
        if (required) {
            requiredError = errorList.find('.error--required');

            // Hide the requiredError if a value is present
            if (value !== '') {
                requiredError.hide();

            // Show the requiredError is no value is present
            } else {
                data.inputGroup.removeClass('valid');
                data.inputGroup.addClass('invalid');
                requiredError.show();
                invalidError.hide();
                return false;
            }

        // If the field is NOT required and no value is given
        } else if (!required && value === '') {
            return false;
        }


        // If the above conditions are met, evaluate the value against the appropriate expression

        // If evaluating a non-list
        if(!data.options){

            // Pass
            if (exp.test(value)) {
                data.inputGroup.removeClass('invalid');
                data.inputGroup.addClass('valid');
                invalidError.hide();

            // Fail
            } else {
                data.inputGroup.removeClass('valid');
                data.inputGroup.addClass('invalid');
                invalidError.show();
            }


        // If evaluating a list
        } else {

            optionValid = $.inArray( data.value, data.options );

            // Pass
            if (optionValid !== -1) {
                data.inputGroup.removeClass('invalid');
                data.inputGroup.addClass('valid');
                invalidError.hide();

            // Fail
            } else {
                data.inputGroup.removeClass('valid');
                data.inputGroup.addClass('invalid');
                invalidError.show();
            }
        }
    }



    // Toggle options
    var toggleOptions = function (e) {
        var
            clicked = $(e.currentTarget),
            list    = clicked.parent(),
            options = list.find('li')
        ;

        $.each( options, function (i, option) {
            $(this).removeClass('active');
        });

        clicked.addClass('active');
    }



    // Send the email!
    var sendEmail = function (data) {

        $.ajax({
            type:   'POST',
            url:    'https://mandrillapp.com/api/1.0/messages/send-template.json',
            data: {
                key: 'RlbIXfpr5DzI8fsRNzXILw',
                template_name: 'arabian-fancy-contact-form',
                template_content: [
                    {
                        name: 'heading',
                        content: 'You\'ve got a message from ArabianFancy.com!'
                    },
                    {
                        name: 'name',
                        content: data.name
                    },
                    {
                        name: 'interest',
                        content: data.interest
                    },
                    {
                        name: 'message',
                        content: data.message
                    },
                    {
                        name: 'favorites',
                        content: data.favoritesHTML
                    }
                ],
                message: {
                    from_email: data.email,
                    to: [{
                        email:  'augusta@augustahammock.com',
                        name:   'Gina Dupree',
                        type:   'to'
                    }],
                    'headers': {
                        'Reply-To': data.email
                    },
                    autotext:   'true',
                    subject:    'Message from ArabianFancy.com'
                }
            }
        });
    }



    // If there are favorites in sessionStorage...
    if (sessionStorage.getItem('favoritesIDs')) {

        favorites = JSON.parse(sessionStorage['favoritesIDs']);

        if (favorites.length > 0) {

            // Show the Favorites section of the form...
            favoritesContainer.removeClass('noFavorites');

            // And populate it
            $.each(favorites, function (i, itemID) {
                favoritesList.append(''
                    +   '<li>'
                    +       '<img src="img/tack/arabian-fancy-tack_' + itemID + '.jpg">'
                    +   '</li>');
            });
        }
    }


    optionsLists.on('click', 'li', toggleOptions);
    inputGroups.on('blur', 'input, textarea, ul.options', validateItem);
    contactSubmit.on('click', validateForm);
});
