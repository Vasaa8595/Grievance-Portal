export interface IBaseResponse {
  message : string,
}
export interface IUser extends IBaseResponse {
  id : string,
  name : string,
  email : string,
  department:string,
  queryIds : string,
  role:string,
}
export interface IStudent extends IUser {
  currentYear: string;
  currentSem: string;
  academicYear: string;
  enrollment: string;
  gpa: number;
  attendance:number
}
