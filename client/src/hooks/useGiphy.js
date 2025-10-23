import { useCallback, useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const GIF_LIMIT = 12;

const useGiphy = () => {
    const [gifs, setGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGifs = useCallback(async (search = 'chiikawa') => {
        try {
            setIsLoading(true);
            const giphyFetch = new GiphyFetch(GIPHY_API_KEY);
            const response = await giphyFetch.search(search, {
                limit: GIF_LIMIT,
            });
            // if response ok, set gif data
            if (response && response.meta && response.meta.status == '200') {
                const formattedData = response.data.map((gif) => {
                    return {
                        url: gif.images.original.url,
                        altText: gif.alt_text,
                    };
                });
                setGifs(formattedData);
                setError(null);
            } else if (response && response.meta && response.meta.msg) {
                throw Error(response.meta.msg);
            }
        } catch (error) {
            error.message
                ? setError(error.message)
                : setError('Unable to fetch gifs');
            setGifs([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { gifs, isLoading, error, fetchGifs };
};

export { useGiphy };
