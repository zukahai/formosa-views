import axios from "axios";
class LinkService {
   async getRes(link) {
        let response = await axios.get(link);
        return response.data;
    }
}
export default  LinkService