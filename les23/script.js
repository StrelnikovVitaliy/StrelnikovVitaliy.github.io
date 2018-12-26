console.clear();
const formEl = document.querySelector('.beer-filter'),
    content = document.querySelector('#content');

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const {elements} = formEl,
        data = Array.prototype.filter.call(
            elements,
            function (el) {
                return el.tagName === "INPUT";
            }
        ).reduce(function (result, el) {
            const {name, value} = el;

            result[name] = value;

            return result;
        }, {});

    data.food = data.food.replace(/\s+/g, '_');

    const params = Object.keys(data)
            .filter(key => !!data[key])
            .map(key => `${key}=${data[key]}`)
            .join('&'),
        url = `https://api.punkapi.com/v2/beers?${params}`;

    renderCardsByUrl(url);
});

function renderCardsByUrl(url) {
    window.fetch(url)
        .then(response => {
            if (response.status >= 200 & response.status < 300) {
                return response.json();
            }

            response.text()
                .then(ex => {
                    throw new Error(ex);
                });
        })
        .then(data => data.map(createBeerCard))
        .then(cardElArr => {
            content.innerText = '';

            content.append.apply(
                content,
                cardElArr
            );
        })
        .catch(ex => console.log('request failed', ex));

    function createBeerCard(data) {
        const cardEl = document.createElement('div'),
            titleEl = document.createElement('h2'),
            coverEl = document.createElement('div'),
            imgEl = document.createElement('img'),
            tips = document.createElement('div');

        cardEl.classList.add('beer');
        titleEl.classList.add('beer__title');
        coverEl.classList.add('beer_cover');
        tips.classList.add('beer__tips');

        cardEl.append(titleEl, coverEl, tips);
        coverEl.append(imgEl);

        titleEl.innerText = data.name;
        imgEl.setAttribute('src', data.image_url);
        imgEl.setAttribute('alt', data.name);
        tips.innerText = data.brewers_tips;

        return cardEl;
    }
}