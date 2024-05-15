
export interface IComplaint{
    complaintDate: Date,
    complaintDescription: string,
    complaintCategory: string,
    complaintStatus: string,
    customerId: string
}
export interface IComplaintList{
    id: number
    complaintDate: Date,
    complaintDescription: string,
    complaintCategory: string,
    complaintStatus: string
}