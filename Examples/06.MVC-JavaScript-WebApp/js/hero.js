'use strict'
//When the document is loaded in the browser then fill the heroes dropdown.
$(document).ready(function () {
    getHeroes();

    let user = JSON.parse(localStorage.user);
    console.log("$(document).ready.user", user);
    if (user != 'undefined') {
        $('#username').html(user.username);
    }
    $('#heroes-list').on('click', 'a.displayButton', displayHero);
    $('#heroes-list').on('click', 'a.deleteButton', deleteHero);
});

function displayHero(event) {
    //Prevent the default browser behavior when a link is clicked
    event.preventDefault();
    //Get the data-heroId custom attribute associated with the clicked Link
    //Note this refers to the link that was clicked (i.e., the source of the click event)
    let heroId = $(this).attr('data-heroId');
    console.log("displayHero.heroId: ", heroId);

    fetchHero(heroId).then(hero => {
        console.log(hero);

        let htmlTemplate = $('#hero-template').html(),
            heroTemplate = Handlebars.compile(htmlTemplate);

        $('#hero-details').html(heroTemplate(hero));
    }).catch(err => console.log(err));
}

function updateHero(heroId) {
    console.log("heroId", heroId);
    fetchHero(heroId).then(hero => {
        console.log(hero);

        let htmlTemplate = $('#hero-form-template').html(),
            heroTemplate = Handlebars.compile(htmlTemplate);

        $('#hero-form').html(heroTemplate(hero));
        
        //Select the heroType in the Dropdown
        $('#heroType').val(hero.heroType);
        showFormAsModel();

    }).catch(err => console.log(err));
}

function addHero() {
    let htmlTemplate = $('#hero-form-template').html(),
        heroTemplate = Handlebars.compile(htmlTemplate);

    $('#hero-form').html(heroTemplate({}));
    showFormAsModel();
}

function showFormAsModel() {
    let heroForm = $( "#hero-form" ).dialog({
        height: 450,
        width: 750,
        title: 'Hero Form',
        modal: true,
        buttons: {
            "Submit": function() {
                saveHero();
                heroForm.dialog( "close" );
            },
            Cancel: function() {
                heroForm.dialog( "close" );
            }
        }
    });
}

function deleteHero(event) {
    //Prevent the default browser behavior when a link is clicked
    event.preventDefault();

    // Ask the user to confirm. If they cancel the request then exit this function
    if (!confirm('Confirm delete?')) {
        return;
    }

    //Get the data-heroId custom attribute associated with the clicked Link
    //Note this refers to the link that was clicked (i.e., the source of the click event)
    let heroId = $(this).attr('data-heroId');
    console.log("deleteHero.heroId: ", heroId);

    let url = `http://localhost:9080/api/heroes/${heroId}`;
    console.log("deleteHero.heroId", heroId);
    fetch(url, {method: 'delete'}).then(() => {
        //After successful delete remove the row from the HTML table
        $(this).closest('tr').remove();
    }).then(() => {
        //After delete then refresh the list
        getHeroes();
    });
}

function saveHero() {
    let hero = {
        name: $('#name').val(),
        heroType: $('#heroType').val(),
        quote: $('#quote').val()
    };

    let url = "http://localhost:9080/api/heroes/";
    let requestMethod = "post";
    
    let heroId = $('#heroId').val();

    //In case of update make the method put and append the id to the Url
    if (heroId != '') {
        hero.id = parseInt(heroId);
        url += heroId;
        requestMethod = "put";
    }

    console.log("saveHero.heroId", heroId);

    fetch(url, {
        method: requestMethod,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hero)
    }).then(() => {
        //After add/update then refresh the list
        getHeroes();
    });
}

function fetchHeroes() {
    let url = "http://localhost:9080/api/heroes";
    return fetch(url).then(response => response.json());
}

function getHeroes() {
    //Empty the hero-details div
    $('#hero-details').empty();
    fetchHeroes().then(heroes => displayHeroes(heroes))
        .catch(err => console.log(err));
}

function fetchHero(heroId) {
    let url = `http://localhost:9080/api/heroes/${heroId}`;
    return fetch(url).then(response => response.json());
}

function displayHeroes(heroes) {
    let htmlTemplate = $('#heroes-template').html(),
        heroesTemplate = Handlebars.compile(htmlTemplate)

    $('#heroes-list').html(heroesTemplate({heroes}));
}