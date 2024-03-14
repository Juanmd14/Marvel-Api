const marvel = {
    renderAllCharacters: (characters) => {
        const container = document.querySelector('#marvel-row');
        let contentHTML = characters.map(hero => {
            let urlHero = hero.urls[0].url;
            let bio = hero.description;
            return `
            <div class="col-md-4">
            <div class="card"> <!-- Agrega la clase "card" aquí -->
                <a href="${urlHero}" target="_blank">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
                <p class="bio">${bio}</p> 
            </div>
        </div>`;
        }).join('');

        container.innerHTML = contentHTML;
    },
    render: () => {
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=1fe86a97b6bf2e1818f1c579ec23b559&hash=3b9f2df0a1de71d43f37c4adc276decd';
        const searchInput = document.querySelector('#search-input');
        const searchButton = document.querySelector('#search-button');

        fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const characters = json.data.results;
            marvel.renderAllCharacters(characters);

            searchButton.addEventListener('click', () => {
                const searchText = searchInput.value.toLowerCase();
                const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchText));
                marvel.renderAllCharacters(filteredCharacters);
            });
        });
    }
};

marvel.render();