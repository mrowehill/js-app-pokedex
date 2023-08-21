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
    document.write(pokemonList[i].name + pokemonList[i].height);
}
