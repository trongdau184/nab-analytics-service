import "reflect-metadata";
import { injectable, inject } from "inversify";
import TYPES from "../common/Types";
import ISearchProductRepository from "./ISearchProductRepository";
import IViewProductRepository from "./IViewProductRepository";
import * as AnalyticsDto from "./AnalyticsDto";
import IAnalyticsService from "./IAnalyticsService";
import DateTimeHelper from "../../core/utils/DateTimeHelper";
import SQSClient from "../../core/utils/SQSClient";
import { MESSAGE_TYPES, QUEUE_URLS } from "../common/Constants";
import * as Configs from "../../configurations";

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
        from = DateTimeHelper.getStartOfDay(from);
        to = DateTimeHelper.getEndOfDay(to);
        let result = await this.searchProductRepository.getTopSearchProducts(from, to, top);
        //TODO Only call worker to generate the statistics once [from...to] is over 30 days.
        let queues = Configs.getQueueConfigs();
        let analyticsQueueUrl = queues[QUEUE_URLS.ANALYTICS_QUEUE];
        let message = {
            type: MESSAGE_TYPES.TOP_SEARCH_PRODUCTS,
            from: from, 
            to: to, 
            top: top
        };
        SQSClient.sendMessage(analyticsQueueUrl, message);
        return {items: result};
    }

    public async getTopSearchBrands(from: Date, to: Date, top: number) {
        from = DateTimeHelper.getStartOfDay(from);
        to = DateTimeHelper.getEndOfDay(to);
        let result = await this.searchProductRepository.getTopSearchBrands(from, to, top);
        //TODO Only call worker to generate the statistics once [from...to] is over 30 days.
        let queues = Configs.getQueueConfigs();
        let analyticsQueueUrl = queues[QUEUE_URLS.ANALYTICS_QUEUE];
        let message = {
            type: MESSAGE_TYPES.TOP_SEARCH_BRANDS,
            from: from, 
            to: to, 
            top: top
        };
        SQSClient.sendMessage(analyticsQueueUrl, message);
        return {items: result};
    }

    public async getTopViewProducts(from: Date, to: Date, top: number) {
        from = DateTimeHelper.getStartOfDay(from);
        to = DateTimeHelper.getEndOfDay(to);
        let result = await this.viewProductRepository.getTopViewProducts(from, to, top);
        //TODO Only call worker to generate the statistics once [from...to] is over 30 days.
        let queues = Configs.getQueueConfigs();
        let analyticsQueueUrl = queues[QUEUE_URLS.ANALYTICS_QUEUE];
        let message = {
            type: MESSAGE_TYPES.TOP_VIEW_PRODUCTS,
            from: from, 
            to: to, 
            top: top
        };
        SQSClient.sendMessage(analyticsQueueUrl, message);
        return {item: result};
    }
}