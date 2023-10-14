import { User } from "@acme/shared-models";
import { getData } from "./utils";

const userServices = {
  async getList() { 
    return getData<User[]>('/api/users');
  },
  async getOne(id: number) { 
    return getData<User>(`/api/users/${id}`);
  },
};

export default userServices;