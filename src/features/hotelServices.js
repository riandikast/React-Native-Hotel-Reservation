export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=${inputSearch}&currency=IDR&locale=en_ID`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        const destinationId = json.suggestions[0].entities[1].destinationId;
        return destinationId;
    } catch (error) {
        console.log(error)
    }
}

export const getSearchList = async ({ destination, checkIn, checkOut, guest }) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?checkin_date=${checkIn}&checkout_date=${checkOut}&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=${destination}&adults_number=${guest}&locale=en_US&currency=USD`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        const searchResult = json.searchResults.results;
        return searchResult;
    } catch (error) {
        console.log(error)
    }
}

export const getHotelDetail = async ({id, checkIn, checkOut, guest}) => {
    try {
        const response = await fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?adults_number=${guest}&checkin_date=${checkIn}&locale=en_US&currency=USD&hotel_id=${id}&checkout_date=${checkOut}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4f39f63d49msh1bb3ebc9eaf76dfp13a97cjsn4398851ef1d1',
                'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error)
    }
}
