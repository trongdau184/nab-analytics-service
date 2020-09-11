import * as Joi from '@hapi/joi';

export const TopSearchProductsResponse = Joi.object({
    items: Joi.array().items(Joi.object({
        searchText: Joi.string().description("Search text for Product Name"),
        searchTimes: Joi.string().description("Number of search times")
    })).description("Top search text")
}).label("Top Search Products");

export const TopSearchBrandsResponse = Joi.object({
    items: Joi.array().items(Joi.object({
        brand: Joi.string().description("Product Brand"),
        searchTimes: Joi.string().description("Number of search times")
    })).description("Top search brands")
}).label("Top Search Brands");

export const TopViewProductsResponse = Joi.object({
    items: Joi.array().items(Joi.object({
        name: Joi.string().description("Product Name"),
        viewTimes: Joi.string().description("Number of view times")
    })).description("Top view")
}).label("Top View Products");

const SearchProductItem = Joi.object({
    field: Joi.string().description("Search field"),
    operator: Joi.string().description("Search operator"),
    value: Joi.string().description("Search value or text"),
    searchAt: Joi.date().description("Search at"),
}).label("Search Product Item");

export const RecordSearchProductResponse = Joi.object({
    items: Joi.array().items(SearchProductItem).description("Search Product Criteria"),
}).label("Search Product Criteria");

export const RecordViewProductResponse = Joi.object({
    productId: Joi.string().description("Product Id"),
    viewAt: Joi.date().description("View at"),
}).label("Record View Product");