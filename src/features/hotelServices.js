export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/regions?query=${inputSearch}&locale=en_ID`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        const cityId = json.data[1]?.gaiaId;
        // console.log(json)
        return cityId;
    } catch (error) {
        console.log(error)
    }
}

export const getSearchList = async ({ city, checkIn, checkOut, guest }) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?checkout_date=${checkOut}&locale=en_ID&checkin_date=${checkIn}&sort_order=RECOMMENDED&region_id=${city}&adults_number=${guest}&currency=IDR`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        // console.log(json.properties)
        return json.properties;
    } catch (error) {
        console.log(error)
    }
}

export const getHotelDetail = async (id) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/hotels/details?currency=USD&locale=en_US&hotel_id=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        // console.log(json)
        return json;
    } catch (error) {
        console.log(error)
    }
}
