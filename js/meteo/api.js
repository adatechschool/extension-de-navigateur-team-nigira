const apiKey = 'cd093ab592052b071cdee63c68dd7189'

let city = ""
const getMeteo = async () => {
  const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=Paris`
  const response = await fetch(url);
  const result = await response.json()

  return result
};

console.log(getMeteo());
