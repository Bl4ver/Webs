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
    pPrice.textContent = cardData.Ár;
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

function loadCSVIntoExistingSections(file) {
    const olvaso = new FileReader();
    olvaso.onload = function (e) {
        const szoveg = e.target.result;
        const adat = parseCSV(szoveg);

        // csoportosítjuk a kártyákat szekció szerint (Szekció)
        const csoportositott = adat.reduce((acc, item) => {
            if (!acc[item.Szekció]) acc[item.Szekció] = [];
            acc[item.Szekció].push(item);
            return acc;
        }, {});

        // feltöltjük a meglévő szekciókat
        Object.entries(csoportositott).forEach(([szekcioNev, kartyak]) => {
            const section = document.querySelector(`section.card-holder[data-section="${szekcioNev}"]`);

            if (section) {
                section.innerHTML = ''; // töröljük a régit

                kartyak.forEach(cardData => {
                    const card = createCard(cardData);
                    section.appendChild(card);
                });
            } else {
                console.warn(`Nincs ilyen szekció az oldalon: ${szekcioNev}`);
            }
        });
    };
    olvaso.readAsText(file);
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('csvInput');
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            loadCSVIntoExistingSections(file);
        }
    });
});
