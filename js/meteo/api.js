const key = '3ab5893bf586112123155984d53a30dd'

const meteo = async () => {
    const url =  `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={$key}`;
    const fetchJson = await fetch(url);
    const result = await fetchJson.json()

    console.log(result)
}

meteo();