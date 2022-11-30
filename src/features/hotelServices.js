export const searchQuery = async ({inputSearch}) => {
    try {
        const response = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${inputSearch}`, {
            method: 'GET',
            headers: {
          
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            
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
        const response = await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&pageSize=25&checkIn=2022-11-11&checkOut=2022-11-12&adults1=1`, {
            method: 'GET',
            headers: {
              
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            
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
              
                'X-RapidAPI-Key': 'e721593c35msha1107f39ce3305bp1f5ce2jsn0b3de96587f1',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            
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
