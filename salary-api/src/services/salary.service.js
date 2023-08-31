import axios from "axios";
class SalaryService {
   async getSalary(id, year, month) {
        let url = `https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s16/${id}vkokv${year}-${month}`;
        let response = await axios.get(url);
        return response.data;
    }
}
export default  SalaryService