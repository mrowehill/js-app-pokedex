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
    button.addEventListener('click', function(event){
        showDetails(pokemon)
    })
}

function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
        console.log(pokemon);
    });
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
    }).catch(function(e){
        console.error(e);
    })
}

return{
        add: add,
        getAll: getAll,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails
    };
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
