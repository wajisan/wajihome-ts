import axios from 'axios';
import BeautifulDom from 'beautiful-dom';

export async function getTraffic() {

    const uri : string = process.env.API_TRAFFIC ?? '';
    try {
        return axios.get(uri).then((res : any) => {
                const dom = new BeautifulDom(res.data);
                const arr : string[] = dom.querySelectorAll('#fermeture_nocturne tbody tr')
                    .filter(a => a.innerText.includes("A4" || "A86" || "A6" ))
                    .map(a => a.innerText.replace(/\t/g, ''));
                return arr;
            });
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error message: ', error.message);
            return error.message;
          } else {
            console.error('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
    }
};