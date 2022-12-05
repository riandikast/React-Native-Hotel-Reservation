export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_GB&query=${inputSearch}&domain=ID`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '01cf5b2551msh77a173dbcec05a0p173d53jsn62af5ef2a03d',
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
                'X-RapidAPI-Key': '01cf5b2551msh77a173dbcec05a0p173d53jsn62af5ef2a03d',
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
                'X-RapidAPI-Key': '01cf5b2551msh77a173dbcec05a0p173d53jsn62af5ef2a03d',
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