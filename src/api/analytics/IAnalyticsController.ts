export default interface IAnalyticsController {
    recordSearchProduct(request, response);
    recordViewProduct(request, response);
    getTopSearchProducts(request, response);
    getTopSearchBrands(request, response);
    getTopViewProducts(request, response);
}