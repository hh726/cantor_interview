const axios = require('axios');

//axios request to retrieve JSON data
async function single_search(city) {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=797fcd4524f2ed3df36171a7f30620cb&units=imperial`);
    return res;
}

module.exports = {
    single_search
};