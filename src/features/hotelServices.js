export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_GB&query=${inputSearch}&domain=ID`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
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
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?checkin_date=${checkIn}&locale=en_US&domain=US&checkout_date=${checkOut}&region_id=${city}&sort_order=RECOMMENDED&adults_number=${guest}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        // console.log(json)
        return json.properties;
    } catch (error) {
        console.log(error)
    }
}

export const getHotelDetail = async (id) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/hotels/details?locale=en_US&domain=US&hotel_id=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
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