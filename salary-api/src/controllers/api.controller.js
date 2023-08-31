import SalaryService from "../services/salary.service";
import LinkService from "../services/salary.service copy";
class ApiController {
    constructor(router) {
        this.router = router;
        this.init();
        this.salaryService = new SalaryService();
        this.LinkService = new LinkService();
    }
    init() {
        this.router.post('/salary', async (req, res) => {
            const { id, year, month } = req.body;
            res.json(await this.salaryService.getSalary(id, year, month));
        })
        this.router.post('/link', async (req, res) => {
            const { link } = req.body;
            res.json(await this.LinkService.getRes(link));
        })
    }
}
export default ApiController