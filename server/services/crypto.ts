import axios from 'axios';
import BeautifulDom from 'beautiful-dom';



export async function getCrypto() {

    const api = process.env.API_CRYPTO ?? '';
    const stakeAddress = process.env.TOKEN_CRYPTO ?? '';

    const uri = api + stakeAddress;
    try {
        const { data, status } = await axios.get<string>(
            uri,
            {
                headers: {
                    //Accept: 'application/json',
                },
            },
        );
        const dom = new BeautifulDom(data);
        const crypto_info = dom.querySelectorAll('td')
            .filter(obj => {
                return obj.innerText !== null 
                && /\d/.test(obj.innerText) 
                && !obj.innerText.includes('...')
                && !obj.innerText.includes('stake')
            })
            .map(a => a.innerText);
        return crypto_info;
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