import * as Hapi from "hapi";
import * as Joi from '@hapi/joi';
import iocContainer from "../config/IocConfig";
import TYPES from "../common/Types";
import * as AnalyticsValidator from "./AnalyticsValidator";
import * as AnalyticsResponse from "./AnalyticsResponse";
import * as Validators from "../../core/common/Validators"
import IAnalyticsController from "./IAnalyticsController";

export default function (
  server: Hapi.Server,
) {
  const controller = iocContainer.get<IAnalyticsController>(TYPES.IAnalyticsController);
  server.bind(controller);

  server.route({
    method: "GET",
    path: "/analytics/getTopSearchProducts",
    options: {
      handler: controller.getTopSearchProducts,
      auth: "jwt",
      tags: ["api", "analytics"],
      description: "Get top search products",
      validate: {
        query: Joi.object({
          from: Joi.string().required(),
          to: Joi.string().required(),
          top: Joi.number().default(10)
        }),
        headers: Validators.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Get top search Products.",
              schema: AnalyticsResponse.TopSearchProductsResponse,
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/analytics/getTopSearchBrands",
    options: {
      handler: controller.getTopSearchBrands,
      auth: "jwt",
      tags: ["api", "analytics"],
      description: "Get top search brands",
      validate: {
        query: Joi.object({
          from: Joi.string().required(),
          to: Joi.string().required(),
          top: Joi.number().default(10)
        }),
        headers: Validators.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Get top search Brands.",
              schema: AnalyticsResponse.TopSearchBrandsResponse,
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/analytics/getTopViewProducts",
    options: {
      handler: controller.getTopViewProducts,
      auth: "jwt",
      tags: ["api", "analytics"],
      description: "Get top view products",
      validate: {
        query: Joi.object({
          from: Joi.string().required(),
          to: Joi.string().required(),
          top: Joi.number().default(10)
        }),
        headers: Validators.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Get top view products.",
              schema: AnalyticsResponse.TopViewProductsResponse,
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/analytics/recordSearchProduct",
    options: {
      handler: controller.recordSearchProduct,
      auth: "jwt",
      tags: ["api", "analytics"],
      description: "Record a search on product",
      validate: {
        payload: AnalyticsValidator.recordSearchProductValidator,
        headers: Validators.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Search Product recorded",
              schema: AnalyticsResponse.RecordSearchProductResponse,
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/analytics/recordViewProduct",
    options: {
      handler: controller.recordViewProduct,
      //auth: "jwt",
      auth: false,
      tags: ["api", "analytics"],
      description: "Record a view on product",
      validate: {
        payload: AnalyticsValidator.recordViewProductValidator,
        //headers: Validators.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "View Product recorded",
              schema: AnalyticsResponse.RecordViewProductResponse,
            }
          }
        }
      }
    }
  });
}
