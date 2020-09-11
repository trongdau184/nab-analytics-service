import * as Hapi from "hapi";
import * as Boom from "@hapi/boom";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import TYPES from "../common/Types";
import IAnalyticsController from "./IAnalyticsController";
import IAnalyticsService from "./IAnalyticsService";
import { RecordSearchProductDto, RecordViewProductDto } from "./AnalyticsDto";

@injectable()
export default class AnalyticsController implements IAnalyticsController {

    private service: IAnalyticsService;

    constructor(@inject(TYPES.IAnalyticsService) service: IAnalyticsService) {
        this.service = service;
    }

    public async recordSearchProduct(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let searchProductDto: RecordSearchProductDto = <RecordSearchProductDto>request.payload;
        try {
            let result = await this.service.recordSearchProduct(searchProductDto);
            return h.response(result).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async recordViewProduct(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let viewProductDto: RecordViewProductDto = <RecordViewProductDto>request.payload;
        try {
            let result = await this.service.recordViewProduct(viewProductDto);
            return h.response(result).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getTopSearchProducts(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            let from = new Date(request.query["from"].toString());
            let to = new Date(request.query["to"].toString());
            let top = parseInt(request.query["top"].toString());
            let result = await this.service.getTopSearchProducts(from, to, top);
            return result;
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getTopSearchBrands(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            let from = new Date(request.query["from"].toString());
            let to = new Date(request.query["to"].toString());
            let top = parseInt(request.query["top"].toString());
            let result = await this.service.getTopSearchBrands(from, to, top);
            return result;
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getTopViewProducts(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            let from = new Date(request.query["from"].toString());
            let to = new Date(request.query["to"].toString());
            let top = parseInt(request.query["top"].toString());
            let result = await this.service.getTopViewProducts(from, to, top);
            return result;
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
}