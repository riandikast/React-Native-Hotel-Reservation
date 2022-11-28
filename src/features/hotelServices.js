export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${inputSearch}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '60919b42bamshb74e511f0ffffbcp1d33abjsn8a40417f3a96',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        });
        const json = await response.json();
        const destinationId = json.suggestions[0].entities[0].destinationId;
        return destinationId;
    } catch (error) {
        console.log(error)
    }
}

export const getSearchList = async ({ destination, checkIn, checkOut, guest }) => {
    try {
        const response = await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${destination}&pageNumber=1&pageSize=10&checkIn=${checkIn}&checkOut=${checkOut}&adults1=${guest}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '60919b42bamshb74e511f0ffffbcp1d33abjsn8a40417f3a96',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        });
        const json = await response.json();
        const searchResult = json.data.body.searchResults.results;
        return searchResult;
    } catch (error) {
        console.log(error)
    }
}

export const getHotelDetail = async ({id}) => {
    try {
        const response = await fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '60919b42bamshb74e511f0ffffbcp1d33abjsn8a40417f3a96',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        });
        const json = await response.json();
        console.log(json.data.body)
        // const detailResult = json.data.body;
        return json.data.body;
    } catch (error) {
        console.log(error)
    }
}
