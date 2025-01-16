export type AddSaleType = {
    // SaleID : string,
    productID : string,
    quantitySold : number,
    // TotalPrice : number,
    // TotalProfit : number,
    // createdDate: string,
    // updatedDate: string,
    createdBy : string,
    // updatedBy : string,
    // activeFlag : boolean
}

export type GetAllSaleType = {
    saleID : string,
    productID : string,
    quantitySold : string,
    totalPrice : number,
    totalProfit : number,
    createdDate: string,
    updatedDate: string,
    createdBy : string,
    updatedBy : string,
    activeFlag : boolean
}

export type GetSaleSummary = {
    totalSaleRevenue : number,
    totalSaleProfit : number,
}

