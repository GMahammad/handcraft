type BillMap = Record<string, number>;

class CheckoutBill {
    bill:BillMap;
    totalPrice:number;
    constructor(bill:BillMap,totalPrice:number){
        this.bill = bill;
        this.totalPrice = totalPrice;
    }
}
export default CheckoutBill