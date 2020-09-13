import "reflect-metadata";
import { injectable, inject } from "inversify";
import { BaseRepository } from "../../core/repositories/BaseRepository";
import { ViewProductModel } from "./ViewProductModel";
import IViewProductRepository from "./IViewProductRepository";

@injectable()
export default class ViewProductRepository extends BaseRepository implements IViewProductRepository {
    constructor() {
        super(ViewProductModel);
    }

    public getTopViewProducts(from: Date, to:Date, top: number) {
        let pipeline = [
            {
                $match: {
                    "viewAt": {$gte: from, $lte: to}
                }
            },
        ];

        let query = ViewProductModel.aggregate(pipeline).group({
            "_id": "$productId",
            "count": {
                $sum: 1
            }
        })
        .sort({"count": -1})
        .limit(top)
        .lookup({
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product"
        })
        .unwind("$product")
        .project({
            _id: 0,
            name: "$product.name",
            viewTimes: "$count"
        })

        return query.allowDiskUse(true).exec();
    }
}