import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "../common/Types";
import IAnalyticsService from "../analytics/IAnalyticsService";
import AnalyticsService from "../analytics/AnalyticsService";
import IAnalyticsController from "../analytics/IAnalyticsController";
import AnalyticsController from "../analytics/AnalyticsController"
import ISearchProductRepository from "../analytics/ISearchProductRepository";
import SearchProductRepository from "../analytics/SearchProductRepository";
import IViewProductRepository from "../analytics/IViewProductRepository";
import ViewProductRepository from "../analytics/ViewProductRepository"

let container = new Container();
container.bind<ISearchProductRepository>(TYPES.ISearchProductRepository).to(SearchProductRepository);
container.bind<IViewProductRepository>(TYPES.IViewProductRepository).to(ViewProductRepository);
container.bind<IAnalyticsService>(TYPES.IAnalyticsService).to(AnalyticsService);
container.bind<IAnalyticsController>(TYPES.IAnalyticsController).to(AnalyticsController);

export default container;