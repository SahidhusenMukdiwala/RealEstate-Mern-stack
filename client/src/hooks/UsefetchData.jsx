import { useEffect, useState } from 'react'
import { token } from '../config'

function UsefetchData(url) {

    const [data, SetData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                // const resP = await fetch(url, {
                //     // below line has some error which i dont understand .
                //     headers: { Authorization: `Bearer ${token}` }
                const res = await fetch(url,{
                    headers:{ Authorization: `Bearer ${token}` }
                    })
                const result = await res.json()
                console.log(url)
                console.log( "This is result",result)
                if(!res.ok){
                    throw new Error(result.message +"faild")
                }

                SetData(result.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        fetchData()

    }, [url])

    return {
        data,loading,error
    }
}

export default UsefetchData