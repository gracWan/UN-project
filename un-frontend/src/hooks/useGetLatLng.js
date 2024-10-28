async function useGetLatLong(address) {
    const apiKey = process.env.REACT_APP_HERE_API_KEY
    const encodedAddress = encodeURIComponent(address);
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddress}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const location = data.items[0].position;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        return null;
    }

}

export default useGetLatLong;