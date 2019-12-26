/*
so: need to have input whos repos you want to see
when submitted, the input gets inserted to url for api request
this returns (if ok) list of repos for each of which the link and name get displayed to screen.


base url: https://api.github.com
endpoint url: /users/:username/repos

*/
function makeURL(username) {
    let usernameURL = `https://api.github.com/users/${username}/repos`;
    return usernameURL;
};

function printToScreen(json) {
    $('.results-list').empty();
    console.log(json);
    let nameJson = json;
    for ( i=0; i < nameJson.length; i++ ) {
        console.log(nameJson[i].name);
        $('.results-list').append(
            `<li class='repo'>
                 <p class='repo-name'>${nameJson[i].name}</p>
                 <a href=${nameJson[i].html_url} class='repo-link'>${nameJson[i].html_url}</a>
             </li>`
        );
    };
    $('.repo-results').removeClass('hidden');
};

function submitRequest(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(json => printToScreen(json))
        .catch(error => alert(error))
};

function catchInput() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let userName = $('#userName').val();
        submitRequest(userName);
    })
};

$(console.log('program ready to run'), catchInput())