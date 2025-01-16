const apiKey = "a47e2ddf470395a5b0404198ae1e51e0";
let result = document.querySelector("#result");

export const inputCity = document.querySelector("#inputcity");

export async function tempExterieur(city) {
  const meteoApi = await fetch(
    `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
  );

  const data = await meteoApi.json();
  result.textContent = `A ${data.location.name} il fait ${data.current.temperature}°C,`;
}
