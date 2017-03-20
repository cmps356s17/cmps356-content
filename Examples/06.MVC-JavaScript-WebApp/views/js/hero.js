const heroTemplate = `
    <h2>Hero details:</h2>
    <table class="table table-striped" id="hero-show">
        <tbody>
        <tr>
            <td>Name</td>
            <td>{{name}}</td>
        </tr>
        <tr>
            <td>Type</td>
            <td>{{heroType}}</td>
        </tr>
        <tr>
            <td>Quote</td>
            <td>{{quote}}</td>
        </tr>
    </tbody>
</table>`

const heroFormTemplate = `
    {{#if id}}
        <h2>Update Hero Details</h2>
    {{else}}
        <h2>Add Hero</h2>
    {{/if}}
    <br>
    <form method="post" action="/heroes">
        <input type="hidden" id="heroId" name="id" value="{{id}}">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="{{name}}" required>
        </div>
        <div class="form-group">
            <label for="quote">Quote</label>
            <input type="text" class="form-control" id="quote" name="quote"
        value="{{quote}}" required>
        </div>
        <div class="form-group">
            <label for="heroType">Hero Type</label>
            <select class="form-control" id="heroType" name="heroType" required>
                <option value=""></option>
                <option value="Prophet">Prophet</option>
                <option value="Companion">Companion</option>
                <option value="Scholar">Scholar</option>
            </select>
        </div>
        <input type="submit" class="btn btn-primary">
              
        <a ref="#" rel="modal:close" stye="text-align: right"> Close </a>
    </form>`


//When the document is loaded register event handlers
$(document).ready(function () {
    $('#heroes-list').on('click', 'a.displayButton', displayHero)
    $('#heroes-list').on('click', 'a.deleteButton', deleteHero)
})

async function displayHero(event) {
    //Prevent the default browser behavior when a link is clicked
    event.preventDefault()
    //Get the data-heroId custom attribute associated with the clicked Link
    //Note this refers to the link that was clicked (i.e., the source of the click event)
    let heroId = $(this).data('heroId')
    console.log("displayHero.heroId: ", heroId)

    try {
        const hero = await fetchHero(heroId)
        console.log(hero)

        //let studentTemplate = $('#hero-template').html(),
        let htmlTemplate = Handlebars.compile(heroTemplate)

        $('#hero-details').html(htmlTemplate(hero))
    }
    catch (err) {
        console.log(err)
    }
}

async function updateHero(heroId) {
    console.log("heroId", heroId)
    try {
        const hero = await fetchHero(heroId)
        console.log(hero)

        const formTemplate = Handlebars.compile(heroFormTemplate)

        $('#hero-form').html( formTemplate(hero) )

        //Select the heroType in the Dropdown
        $('#heroType').val(hero.heroType)
        $("#hero-form").modal()

    }
    catch (err) {
        console.log(err)
    }
}

function addHero() {
    let formTemplate = Handlebars.compile(heroFormTemplate)

    $('#hero-form').html(formTemplate({}))
    $("#hero-form").modal()
}

async function deleteHero(event) {
    //Prevent the default browser behavior when a link is clicked
    event.preventDefault()

    // Ask the user to confirm. If they cancel the request then exit this function
    if (!confirm('Confirm delete?')) {
        return
    }

    //Get the data-heroId custom attribute associated with the clicked Link
    //Note this refers to the link that was clicked (i.e., the source of the click event)
    try {

        let heroId = $(this).data('heroId')
        console.log("deleteHero.heroId: ", heroId)

        let url = `/api/heroes/${heroId}`
        console.log("deleteHero.heroId", heroId)

        //After successful delete remove the row from the HTML table
        //This line should be after fetch but it does not work if I do so
        $(this).closest('tr').remove()

        await fetch(url, { method: 'delete' })
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchHero(heroId) {
    let url = `/api/heroes/${heroId}`
    const response = await fetch(url)
    return await response.json()
}