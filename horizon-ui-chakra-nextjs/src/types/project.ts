export interface IProjectList
{  
	id: number;
    name: string,
    description: string,
    image: string,
    startDate: Date,
    endDate: Date
	
}
export interface IProject
{ 
    name: string,
    description: string,
    images: Array<Image>,
    startDate: Date,
    endDate: Date,
    location: Location,
    cityId: number,
    developerId: number,
    projectCategoryId: number
}
interface Location {
    name: string,
    latitude: number,
    longitude: number,
    address: string
}
export interface Image {
    imageUrl: string
}