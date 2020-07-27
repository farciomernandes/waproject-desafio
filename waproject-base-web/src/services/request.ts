import IRequest from 'interfaces/models/request';
import Axios from 'axios';

export class RequestService {
  public async index(): Promise<any> {
    const email = localStorage.getItem('@emailUser');
    return Axios.get(`http://localhost:3001/admin/request/${email}`);
  }

  public async create(model: Partial<IRequest>): Promise<void> {
    const email = localStorage.getItem('@emailUser');
    await Axios.post(`http://localhost:3001/admin/request/${email}`, model);
  }
}

const requestService = new RequestService();
export default requestService;
