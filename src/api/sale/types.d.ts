export type AddSaleType = {
    // SaleID : string,
    ProductID : string,
    QuantitySold : number,
    // TotalPrice : number,
    // TotalProfit : number,
    // createdDate: string,
    // updatedDate: string,
    createdBy : string,
    // updatedBy : string,
    // activeFlag : boolean
}

export type GetAllSaleType = {
    SaleID : string,
    ProductID : string,
    QuantitySold : string,
    TotalPrice : number,
    TotalProfit : number,
    createdDate: string,
    updatedDate: string,
    createdBy : string,
    updatedBy : string,
    activeFlag : boolean
}