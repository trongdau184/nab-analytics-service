import IAnalyticsService from "../../api/analytics/IAnalyticsService";
import SearchProductRepository from "../../api/analytics/SearchProductRepository";
import ViewProductRepository from "../../api/analytics/ViewProductRepository";

import iocContainer from "../../api/config/IocConfig";
import TYPES from "../../api/common/Types";
import { RecordSearchProductDto, RecordViewProductDto } from "../../api/analytics/AnalyticsDto";

describe("Analytics Service", () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Record a search product", async () => {
  
    const mockFunc = jest.fn();
    SearchProductRepository.prototype.create = mockFunc;
    mockFunc.mockReturnValue({
        items: [
          {
            field: "name",
            operator: "eq",
            value: "A1",
            searchAt: "2020-09-07T14:46:02.169Z"
          }
        ]
    });

    const payload: RecordSearchProductDto = {
        filters: [
            {
              field: "name",
              operator: "eq",
              value: "A1"
            }
        ],
        searchAt: new Date("2020-09-07T14:46:02.169Z")
    }
    let service: IAnalyticsService = iocContainer.get<IAnalyticsService>(TYPES.IAnalyticsService);
    let result = await service.recordSearchProduct(payload);
    
    expect(result).not.toBeNull();
  });

  test("Record a view product", async () => {
  
    const mockFunc = jest.fn();
    ViewProductRepository.prototype.create = mockFunc;
    mockFunc.mockReturnValue({
        productId: "5f5647aa3d0589a5313773aa",
        viewAt: new Date("2020-09-07T14:46:02.169Z")
    });

    const payload: RecordViewProductDto = {
        productId: "5f5647aa3d0589a5313773aa",
        viewAt: new Date("2020-09-07T14:46:02.169Z")
    }
    let service: IAnalyticsService = iocContainer.get<IAnalyticsService>(TYPES.IAnalyticsService);
    let result = await service.recordViewProduct(payload);
    
    expect(result).not.toBeNull();
  });

  test("Get top search products", async () => {
  
    const mockFunc = jest.fn();
    SearchProductRepository.prototype.getTopSearchProducts = mockFunc;
    mockFunc.mockReturnValue({
        items: [
            {
                searchText: "A10",
                searchTimes: 10
            },
            {
                searchText: "A20",
                searchTimes: 8
            }
        ]
    });

    let service: IAnalyticsService = iocContainer.get<IAnalyticsService>(TYPES.IAnalyticsService);
    let from = new Date("2020-09-01T00:00:00.000Z");
    let to = new Date("2020-09-15T23:59:59.999Z");
    let result = await service.getTopSearchProducts(from, to, 10);
    
    expect(result).not.toBeNull();
  });

  test("Get top search brands", async () => {
  
    const mockFunc = jest.fn();
    SearchProductRepository.prototype.getTopSearchBrands = mockFunc;
    mockFunc.mockReturnValue({
        items: [
            {
                brand: "Samsung",
                searchTimes: 10
            },
            {
                brand: "Apple",
                searchTimes: 8
            }
        ]
    });

    let service: IAnalyticsService = iocContainer.get<IAnalyticsService>(TYPES.IAnalyticsService);
    let from = new Date("2020-09-01T00:00:00.000Z");
    let to = new Date("2020-09-15T23:59:59.999Z");
    let result = await service.getTopSearchBrands(from, to, 10);
    
    expect(result).not.toBeNull();
  });

  test("Get top view products", async () => {
  
    const mockFunc = jest.fn();
    ViewProductRepository.prototype.getTopViewProducts = mockFunc;
    mockFunc.mockReturnValue({
        items: [
            {
                name: "A10",
                viewTimes: 100
            },
            {
                name: "20",
                viewTimes: 80
            }
        ]
    });

    let service: IAnalyticsService = iocContainer.get<IAnalyticsService>(TYPES.IAnalyticsService);
    let from = new Date("2020-09-01T00:00:00.000Z");
    let to = new Date("2020-09-15T23:59:59.999Z");
    let result = await service.getTopViewProducts(from, to, 10);
    
    expect(result).not.toBeNull();
  });
});