export interface IClient{
  fristName: string,
  lastName: string,
  dateOfBirth:Date,
  gender: string,
  phone: string,
  email: string,
  userName: string,
  password: string,
  budget: number,
  preferences: string
}
export interface IClientList  {
  id: string,
  name: string,
  email: string,
  budget: number,
  preferences: string
}