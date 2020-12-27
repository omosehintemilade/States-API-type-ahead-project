const searchBar = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

const cities = []


async function hello() {
    let response = await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    let data = await response.json()
        // console.log(data);
        // return data
    cities.push(...data)
}
hello()
console.log(cities);

function findMatches(wordToMatch, cities) {
    return cities.filter(param => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi')
        return param.city.match(regex) || param.state.match(regex)
    })
}

function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

function displayMatches() {
    // console.log(this.value);


    const matchArray = findMatches(this.value, cities)
    console.log(matchArray);
    suggestions.innerHTML = matchArray.map(param => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = param.city.replace(regex, `<span class="hello">${this.value}</span>`)
        const stateName = param.state.replace(regex, `<span class="hello">${this.value}</span>`)
        const populationInCommas = thousands_separators(param.population)
        return ` 
    <li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${populationInCommas}</span>
    </li>
    `
    }).join('')
}



searchBar.addEventListener('change', displayMatches)
searchBar.addEventListener('keyup', displayMatches)