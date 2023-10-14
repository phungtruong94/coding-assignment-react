import { Ticket } from "@acme/shared-models";
import { delData, getData, postData, putData } from "./utils";
import { CreateDataType } from "../types";

const ticketServices = {
  async getList() { 
    return getData<Ticket[]>('/api/tickets');
  },
  async getOne(id: number) { 
    return getData<Ticket>(`/api/tickets/${id}`);
  },
  async create(data: CreateDataType) { 
    return postData<Ticket, CreateDataType>('/api/tickets', data);
  },
  async assignUser(data: {titketId: number, userId: number}) { 
    return putData(`/api/tickets/${data.titketId}/assign/${data.userId}`)
  },
  async unassign(id: number) { 
    return putData(`/api/tickets/${id}/unassign`)
  },
  async markAsComplete(id: number) { 
    return putData(`/api/tickets/${id}/complete`)
  },
  async markAsIncomplete(id: number) { 
    return delData(`/api/tickets/${id}/complete`)
  },
};

export default ticketServices;