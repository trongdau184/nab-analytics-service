import { IBaseRepository } from "../../core/repositories/IBaseRepository";

export default interface IViewProductRepository extends IBaseRepository {
    getTopViewProducts(from: Date, to:Date, top: number);
}