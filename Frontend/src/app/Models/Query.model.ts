import { IBaseResponse } from "./User.model";

export interface IQuery {
  category : string,
  summary : string,
  description:string,
}
export interface IPersonalQuery extends IQuery {
  id:string,
  department:string,
}

export interface IFinalQuery {
  raiserId: string;
  complaintId: string;
  category: string;
  summary: string;
  description: string;
  status: string;
  remarks: string;
  submittedDate: string;
  resolvedDate: string;
  forwarToStaff: string;
}


