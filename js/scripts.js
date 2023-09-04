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
    
return{
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function (pokemon){
    if(pokemon.height > 0.7){
        document.write(pokemon.name + ' Height: '+ pokemon.height + ' That\'s a big pokemon!');
    }else{
        document.write(pokemon.name + ' Height: '+ pokemon.height );
    }
    document.write('<br> <br>')
});


