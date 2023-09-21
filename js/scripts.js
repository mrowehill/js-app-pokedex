let pokemonRepository =(function(){
    let pokemonList= [];
   
    //pokeapi database access
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon){
    if(
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl"in pokemon
    ){
        pokemonList.push(pokemon);
    }else{
        console.log("This is not the correct Pokemon.")
    }
};

function getAll(){
    return pokemonList;
};

function addListItem(pokemon){
    let pokemonIndex= document.querySelector('.pokemon-index');

    //add li and button elements
    let listItem=document.createElement('li');
    let button=document.createElement('button');
    listItem.classList.add("list-group-item");

    //add pokemon innertext to button
    button.innerText = pokemon.name;
    button.classList.add('button');
    button.classList.add("btn", "btn-primary", "btn-lg");
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

    //appending the button and listitem
    listItem.appendChild(button);
    pokemonIndex.appendChild(listItem);

    //adding event listener and handler
    button.addEventListener('click', ()=> {
        showDetails(pokemon)
    })
}

function showDetails(pokemon){
    loadDetails(pokemon)
}

function loadList(){
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function(e) {
        console.error(e);
    })
}

function loadDetails(item){
    let url=item.detailsUrl;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        showModal(item);
    }).catch(function(e){
        console.error(e);
    })
}

function showModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name +'</h1>');
    let imageElement = $('<img class="modal-img">');
        imageElement.attr('src', pokemon.imgUrl);
    let heightElement = $('<p>' + 'height : ' + pokemon.height + '<p>');
    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
}

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove ('is-visible');
}

let closeButtonElement = document.createElement ('button');
closeButtonElement.classList.add('.modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

window.addEventListener ('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

return{
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
        showModal:showModal
    };
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
