function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const h1Title = document.createElement('h1');
    h1Title.textContent = cardData.Cím;
    cardTitle.appendChild(h1Title);

    const cardDesc = document.createElement('div');
    cardDesc.classList.add('card-description');
    const pDesc = document.createElement('p');
    pDesc.textContent = cardData.Leírás;
    cardDesc.appendChild(pDesc);

    const cardPrice = document.createElement('div');
    cardPrice.classList.add('card-price');
    const pPrice = document.createElement('p');
    pPrice.textContent = cardData.Ár + " Ft";
    cardPrice.appendChild(pPrice);

    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardPrice);

    return card;
}

function parseCSV(text) {
    const sorok = text.trim().split('\n');
    const fejléc = sorok[0].split(';').map(h => h.trim());

    return sorok.slice(1).map(sor => {
        const mezok = sor.split(';').map(c => c.trim());
        const obj = {};
        fejléc.forEach((kulcs, i) => {
            obj[kulcs] = mezok[i] || '';
        });
        return obj;
    });
}

function loadCSVIntoExistingSectionsFromURL(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Nem sikerült betölteni a fájlt: ${url}`);
            }
            return response.text();
        })
        .then(szoveg => {
            const adat = parseCSV(szoveg);

            const csoportositott = adat.reduce((acc, item) => {
                if (!acc[item.Szekció]) acc[item.Szekció] = [];
                acc[item.Szekció].push(item);
                return acc;
            }, {});

            Object.entries(csoportositott).forEach(([szekcioNev, kartyak]) => {
                const section = document.querySelector(`section.card-holder[data-section="${szekcioNev}"]`);

                if (section) {
                    section.innerHTML = '';

                    kartyak.forEach(cardData => {
                        const card = createCard(cardData);
                        section.appendChild(card);
                    });
                } else {
                    console.warn(`Nincs ilyen szekció az oldalon: ${szekcioNev}`);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCSVIntoExistingSectionsFromURL('../data/cardLoader.csv');
});
