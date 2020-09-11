import * as AnalyticsDto from "./AnalyticsDto";

export default interface IAnalyticsService {
    recordSearchProduct(dto: AnalyticsDto.RecordSearchProductDto);
    recordViewProduct(dto: AnalyticsDto.RecordViewProductDto);
    getTopSearchProducts(from: Date, to: Date, top: number);
    getTopSearchBrands(from: Date, to: Date, top: number);
    getTopViewProducts(from: Date, to: Date, top: number);
}