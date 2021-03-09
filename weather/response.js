//These functions create the return html pages to display data

function create_response_html_single(data) {
    const res = `<!DOCTYPE html>
    <html>
    <head>
    <title> ${data.name} </title>
    <style>
    table, th, td {
      border: 1px solid black;
    }
    </style>
    </head>
    <body>
    <table>
    <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>Main</th>
        <td>City's Main Weather</th>
        <td>${data.weather[0].main}</th>
    </tr>
    <tr>
        <td>Description</th>
        <td>A short description of the city's weather</th>
        <td>${data.weather[0].description}</th>
    </tr>
    <tr>
        <td>Temp</th>
        <td>The city's current temperature</th>
        <td>${data.main.temp}</th>
    </tr>
    <tr>
        <td>Pressure</th>
        <td>The current air pressure</th>
        <td>${data.main.pressure}</th>
    </tr>
    <tr>
        <td>Humidity</th>
        <td>The city's humidity index</th>
        <td>${data.main.humidity}</th>
    </tr>
    <tr>
        <td>Speed</th>
        <td>The city's wind speed</th>
        <td>${data.wind.speed}</th>
    </tr>
    </table>
    </body>
    </html>
    `;
    return res;
}

function create_response_html_multiple(data) {
    let res = `<!DOCTYPE html>
    <html>
    <head>
    <title> Multiple Search Result </title>
    </head>
    <ol type="1">`;
    for (let result of data) {
        res += `<li> ${result.name}, ${result.weather[0].main}, ${result.weather[0].description}, ${result.main.temp} Degrees</li>`;
    }
    res += '</ol> </html>';
    return res;
}
module.exports = {
    create_response_html_single,
    create_response_html_multiple
};