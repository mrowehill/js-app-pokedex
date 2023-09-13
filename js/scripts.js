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

    //add pokemon innertext to button
    button.innerText = pokemon.name;
    button.classList.add('button');

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
    let modalContainer=document.querySelector('#modal-container');
    
    //clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //adding new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('.modal-close');
    closeButtonElement.innerText = 'Close';

    //adding pokemon info
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let pokemonImg= document.createElement('img');
    pokemonImg.classList.add('modal-img');
    pokemonImg.src = pokemon.imgUrl;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height:' + pokemon.height;

    let weightElement = document.createElement ('p');
    weightElement.innerText = 'Weight:' + pokemon.weight;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonImg);
    modal.appendChild(contentElement);
    modal.appendChild(weightElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    document.querySelector('#modal-container').addEventListener('click', () => {
        showModal();
    });

    //This will be triggered if the user clicks on the overlay directly
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });
    
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
