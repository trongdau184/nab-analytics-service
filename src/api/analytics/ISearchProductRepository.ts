import { IBaseRepository } from "../../core/repositories/IBaseRepository";

export default interface ISearchProductRepository extends IBaseRepository {
    getTopSearchProducts(from: Date, to: Date, top: number);
    getTopSearchBrands(from: Date, to: Date, top: number);
}