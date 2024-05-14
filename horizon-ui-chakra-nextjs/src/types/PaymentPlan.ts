export interface IPaymentPlanList
{  
	id: number;
    name: string,
    description: string,
    terms: string,
    downPaymentPercentage: number,
    installmentCount: number,
    interestRate: number
	
}
export interface IPaymentPlan
{ 
    name: string,
    description: string,
    terms: string,
    downPaymentPercentage: number,
    installmentCount: number,
    interestRate: number
}