const OMDB_URL = 'https://www.omdbapi.com/'
let API_KEY = '';

chrome.storage.local.get(['apiKey'], (res) => API_KEY = res.apiKey)

let requestInProgress = false;

let ratings = []; 

const getRatingsFromCache = () => {
    const fromStorage = chrome.storage.local.get(['ratings'], (res => ratings = JSON.parse(res.ratings)));
    if (!fromStorage ) return;
    
    return JSON.parse(fromStorage);
}

const saveRatingsToCache = (ratings) => {
    chrome.storage.local.set({ratings: JSON.stringify(ratings)})
    return;
}

getRatingsFromCache();

const mutationObserver = new MutationObserver((mutations, _obs) => {
    if (requestInProgress) return;
    if (!API_KEY) return;
    const sliderItems = getSliderItems();
    const titles = getTitleItems(sliderItems);
    addToRatings(titles);

    const hover = checkIfHover();
    if (hover) addScoreHtml(getHoverElementData());
    saveRatingsToCache(ratings);
})

const addToRatings = (titles) => {
    titles.forEach(t => {
        if (!ratings.find(r => r.netflixId == t.netflixId && r.title == t.title)) {
            ratings.push(t)
        }
    })
}

const getHoverElementData = () => {
    const preview = document.querySelector('.previewModal--player-titleTreatmentWrapper');

    return preview;
}

const checkIfHover = () => {
    const preview = document.querySelector('.previewModal--player-titleTreatmentWrapper');
    if (!preview) return false;
    return true;
}

const addScoreHtml = async (item) => {
    if (document.querySelector('.omdbrating')) {
        return;
    }
    let title = item.querySelector('.previewModal--player-titleTreatment-logo')?.alt;
    if (!title) {
        const altTextImg = document.querySelector('.previewModal--boxart');
        if (!altTextImg) {
            requestInProgress = false;
            return;
        }
        title = String(altTextImg.alt)
    };
    let place = document.querySelector('.previewModal--metadatAndControls-info .videoMetadata--container');
    if (!place){
        requestInProgress = false;
        return;
    };
    const rating = getExistingRating(title);

    const shouldGetNewRating = checkShouldGetNewRating(rating);

    if (shouldGetNewRating) {
        requestInProgress = true;
        const response = await getRatingForTitle(title);
        
        const indexOfRating = ratings.findIndex(r => r.title === title);
        ratings[indexOfRating] = {
            ...ratings[indexOfRating],
            imdbRating: response.imdbRating || null,
            imdbId: response.imdbID,
            fetchedOn: Date.now()
        }
        rating.imdbRating = response.imdbRating;
        rating.fetchedOn = Date.now();
        rating.imdbId= response.imdbID;
        requestInProgress = false;

    } 

    const htmlForInsert = `<div class="omdbrating">${rating.imdbId ? `<a href="https://www.imdb.com/titles/${rating.imdbId}" target="_blank">` : ''}${rating.imdbRating || 'ne znam'}${rating.imdbId ? '</a>' : ''}</div>`

    place.innerHTML = `${place.innerHTML}${htmlForInsert}`;
}

const checkShouldGetNewRating = (rating) => {
    if (requestInProgress) return false;
    if (!rating || !rating.imdbRating) return true;
    if (!rating.fetchedOn) return true;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (Number(now - rating.fetchedOn) > Number(oneDay)) return true;

    return false;
}

const getRatingForTitle = async (title) => {
    const response = await fetch(`${OMDB_URL}?apikey=${API_KEY}&plot=short&t=${title}`);
    const json = await response.json();

    return json || null;
}

const getExistingRating = (title) => ratings.find(r => r.title === title);

const getSliderItems = () => {
    return document.querySelectorAll('a.slider-refocus');
}

const getAllSliderInfo = (sliderItems) => {
    return [...sliderItems]
        .map(i => getSliderInfo(i))
        .filter(i => !!i);
}

const getSliderInfo = (item) => {
    const singleTitle = {};

    const matchedHref = item.href?.match(/\d+/);
    if (matchedHref) singleTitle.netflixId = String(matchedHref[0]);

    const fallbackText = item.querySelector('.fallback-text');
    if (fallbackText) singleTitle.title = String(fallbackText.innerText);

    return singleTitle;
}

const getTitleItems = (sliderItems) => {
    let titles = getAllSliderInfo(sliderItems);
    return titles;
}

window.onload = () => {
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

}
