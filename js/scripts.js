let pokemonRepository =(function(){
    let pokemonList= [
        {
        name: 'Chikorita',
        height: .889,
        type: ['Grass'],
        weakness: ['Fire', 'Flying', 'Ice', 'Poison', 'Bug']
    },
    {
        name: 'Cyndaquil',
        height: .508,
        type: ['Fire'],
        weakness: ['Water', 'Ground', 'Rock']
    },
    {
        name: 'Totodile',
        height: .609,
        type: ['Water'],
        weakness: ['Grass', 'Electric']
    }
];


function add(pokemon){
    pokemonList.push(pokemon);
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
    console.log(pokemon);
}

return{
        add: add,
        getAll: getAll,
        addListItem:addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
});


