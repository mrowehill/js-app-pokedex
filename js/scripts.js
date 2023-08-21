let pokemonList = [
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

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height > 0.7){
        document.write(
            pokemonList[i].name + ' (Height:' + pokemonList[i].height +')' + '-That\'s a big pokemon!'
        ); //Writes name and height of a pokemon that exceeds 0.7 in height and declares it a big pokemon
    } else {
        document.write(
            pokemonList[i].name + ' (Height:' + pokemonList[i].height +')' 
        ) //Writes just the name and height of a pokemon that does not exceed a height of 0.7
    }
    document.write('<br> <br>')
}
