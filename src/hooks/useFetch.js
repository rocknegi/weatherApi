import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url) => {
        setLoading(true);
        try {
            console.log(url)
            const response = await fetch(url);
            const res = await response.json();
            setData(res);
            console.log(res)
        } catch (error) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url)
            fetchData(url);
    }, [url]);

    return [{ data, error, loading }, fetchData];
};
