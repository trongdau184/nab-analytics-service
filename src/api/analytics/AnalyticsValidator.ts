import * as Joi from '@hapi/joi';

const SearchProductCriteria = Joi.object({
    field: Joi.string().required().description("Search field"),
    operator: Joi.string().required().description("Search operator"),
    value: Joi.any().required().description("Search value or text")
}).label("Search Product Criteria");

export const recordSearchProductValidator = Joi.object({
    filters: Joi.array().items(SearchProductCriteria).required().min(1).description("Search Product Criteria"),
    searchAt: Joi.date().required().description("Search at"),
}).label("Record Search Product");

export const recordViewProductValidator = Joi.object({
    productId: Joi.string().required().description("Product Id"),
    viewAt: Joi.date().required().description("View at"),
}).label("Record View Product");
