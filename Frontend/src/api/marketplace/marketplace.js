import axios from 'axios'

export const getItems = async (token,page=1) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        };
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/marketplace?page=${page}`,config)
        return res.data;
    }
    catch(err) {
        console.log("There is error is API calling marketplace",err)
        return null;
    }
}