import axios from 'axios';


type City = {
    insee: string;
    name: string;
    latitude: number;
    longitude: number;
};

type Forecast = {
    datetime: string;
    temp2m: number;
    rh2m: number;
    wind10m: number;
    gust10m: number;
    weather: number;
    probarain: number;
}

type GetWeatherResponse = {
    city : City;
    forecast: Forecast[];
};

export async function getWeather() {

    const api = process.env.API_WEATHER ?? '';
    const token = process.env.TOKEN_WEATHER ?? '';
    const insee = process.env.INSEE_CODE ?? '';

    const uri = api + 'forecast/nextHours?token=' + token + '&insee=' + insee;
    try {
        const { data, status } = await axios.get<GetWeatherResponse>(
            uri,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        return data;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.error('error message: ', error.message);
            return error.message;
          } else {
            console.error('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
    }
};