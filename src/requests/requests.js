import axios from "axios";

const Requests = {
    async getCategories(url){
        const response = await axios.get(url)
        return response
    },
}

export default Requests