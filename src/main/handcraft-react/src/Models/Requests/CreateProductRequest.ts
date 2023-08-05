class CreateProductRequest{
    productName:string;
    productDescription:string;
    price:number;
    discount:number;
    categoryId:number;
    colorIds:number[];
    imageUrls:string[];
    constructor(   productName:string,
        productDescription:string,
        price:number,
        discount:number,
        categoryId:number,
        colorIds:number[],
        imageUrls:string[]){
            this.productName=productName;
            this.productDescription=productDescription;
            this.price=price;
            this.discount = discount;
            this.categoryId = categoryId;
            this.colorIds = colorIds;
            this.imageUrls=imageUrls
        }
}
export default CreateProductRequest