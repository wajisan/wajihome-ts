import axios from 'axios';
import BeautifulDom from 'beautiful-dom';

/*type Hours = {
    arrival : 
}*/

function parseTransport(jsonObj : any) {
    if (jsonObj.length > 0) {
        const item = jsonObj[0];
        if (item != null && item.name !== undefined && item.itemListElement !== undefined) {
            return (item.itemListElement);
        }
    }
    return null;
}


export async function getTransport(where: string) {

    const api = process.env.API_TRANSPORT + where ?? '';

    const uri = api;
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
        const jsonObj = dom.getElementsByTagName('script')
            .filter(obj => {
                return obj.innerText !== null 
                && obj.outerHTML.includes('application/ld+json')
                && obj.innerHTML.includes('itemListElement')
                && !obj.innerHTML.includes('BreadcrumbList')
            })
            .map(a => JSON.parse(a.innerHTML));

            return parseTransport(jsonObj);
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