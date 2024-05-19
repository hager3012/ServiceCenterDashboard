export interface IOrder {
    from: string,
    orderStatus: string,
    orderDate: Date,
    orderArrivalDate: Date
}
export interface IOrderList extends IOrder {
    id: number
}
export interface IInsertOrder extends IOrder{
    itemOrders: [
        {
            itemId: number,
            quantity: number
        }
    ]
}