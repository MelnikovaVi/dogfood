import { useEffect, useState } from "react";

// хук для отправки запроса на сервер
export const useApi = (externalInput) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect (() => {
        setLoading(true)
        externalInput()
        .then((res)=> {setData(res)})
        .catch((err)=> {setErr(err)})
        .finally(()=> {setLoading(false)})
    }, [externalInput])
    return {data, setData, loading, err}
}