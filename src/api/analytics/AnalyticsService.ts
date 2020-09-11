import "reflect-metadata";
import { injectable, inject } from "inversify";
import TYPES from "../common/Types";
import ISearchProductRepository from "./ISearchProductRepository";
import IViewProductRepository from "./IViewProductRepository";
import * as AnalyticsDto from "./AnalyticsDto";
import IAnalyticsService from "./IAnalyticsService";
import { result } from "lodash";

@injectable()
export default class AnalyticsService implements IAnalyticsService {

    private searchProductRepository: ISearchProductRepository;
    private viewProductRepository: IViewProductRepository;

    constructor(@inject(TYPES.ISearchProductRepository) searchProductRepository: ISearchProductRepository,
        @inject(TYPES.IViewProductRepository) viewProductRepository: IViewProductRepository,) {
        this.searchProductRepository = searchProductRepository;
        this.viewProductRepository = viewProductRepository;
    }

    public recordSearchProduct(dto: AnalyticsDto.RecordSearchProductDto) {
        let searchProductItems = new Array();
        dto.filters.forEach(filter => {
            let item = {
                field: filter.field,
                operator: filter.operator,
                value: filter.value,
                searchAt: dto.searchAt
            };
            searchProductItems.push(item);
        });
        return this.searchProductRepository.create(searchProductItems);
    }

    public recordViewProduct(dto: AnalyticsDto.RecordViewProductDto) {
        return this.viewProductRepository.create(dto);
    }
    
    public async getTopSearchProducts(from: Date, to: Date, top: number) {
        let result = await this.searchProductRepository.getTopSearchProducts(from, to, top);
        return {items: result};
    }

    public async getTopSearchBrands(from: Date, to: Date, top: number) {
        let result = await this.searchProductRepository.getTopSearchBrands(from, to, top);
        return {items: result};
    }

    public async getTopViewProducts(from: Date, to: Date, top: number) {
        let result = await this.viewProductRepository.getTopViewProducts(from, to, top);
        return {item: result};
    }
}