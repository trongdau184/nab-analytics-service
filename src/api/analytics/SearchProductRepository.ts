import "reflect-metadata";
import { injectable, inject } from "inversify";
import { BaseRepository } from "../../core/repositories/BaseRepository";
import { SearchProductModel } from "./SearchProductModel";
import ISearchProductRepository from "./ISearchProductRepository";
import { values } from "lodash";

@injectable()
export default class SearchProductRepository extends BaseRepository implements ISearchProductRepository {
    constructor() {
        super(SearchProductModel);
    }

    public getTopSearchProducts(from: Date, to: Date, top: number) {
        let pipeline = [
            {
                $match: {
                    "field": "name",
                    "searchAt": {$gte: from, $lte: to}
                }
            }
        ];

        let query = SearchProductModel.aggregate(pipeline).group({
            "_id": "$value",
            "count": {
                $sum: 1
            }
        })
        .sort({"count": -1})
        .limit(top)
        .project({
            _id: 0,
            searchText: "$_id",
            searchTimes: "$count"
        })

        return query.allowDiskUse(true).exec();
    }

    public getTopSearchBrands(from: Date, to: Date, top: number) {
        let pipeline = [
            {
                $match: {
                    "field": "brand",
                    "searchAt": {$gte: from, $lte: to}
                }
            }
        ];

        let query = SearchProductModel.aggregate(pipeline).group({
            "_id": "$value",
            "count": {
                $sum: 1
            }
        })
        .sort({"count": -1})
        .limit(top)
        .project({
            _id: 0,
            brand: "$_id",
            searchTimes: "$count"
        })

        return query.allowDiskUse(true).exec();
    }
}