# Analytics Service with NodeJS-Hapi

Analytics Service records the filters performed on the products, views on the products then issues reports for the marketing purposes.

**High Level Architecture**

![High Level Architecture diagram](https://github.com/trongdau184/nab-analytics-service/blob/master/High-level-architect-diagram.png?raw=true)

The micro-services architecture will be applied for E-Commerce system, in this architecture, each features/module are divided into small and independent services which will handle a piece of business module or perform specific tasks. Since each service is independent, they communicate together via the HTTP Request (REST API) or Message Queue (Send/Receive or Public/Subscribe). 
The most benefit of micro-services architecture is ease of scaling, since the services are divided into micro, we easily scale up a particular service based on the number of incoming requests to it.
* Internal Services:
    * Product Service: provide the CRUD APIs for product
    * Identity Service: login/authenticate user and issue a token (to keep it simple for demonstrating purpose, the current implementation of login/authenticate is currently put in Product Service)
    * Analytics Service: record filters on the products, view on the products then aggregate the data to provide marketing reports such as Top Searching Products, Top Searching Brands, Top Viewed Products in the specific date ranges.
    * Analytics Worker: execute marketing reports which might take a long time due to the given long date ranges. For ex: the user would to see top searching products in 1 month Report which might take long time to calculate due to the numbers of searching records in 1 month.
* Third parties:
    * Amazon SQS:  Message Queue service
    * Amazon S3: Storage service to store the product images
    * MongoDB cluster: Database cluster.
* Deployment tool:
    * Docker: packaging the container to image
    * Kubernetes: Container Management. The services is deployed to Worker Nodes in the Kubernetes cluster
    * Amazon Elastic Kubernetes Service (Amazon EKS): Deploy Kubernetes cluster to Amazon Web Service.

**Sequence diagrams**
* Search sequence diagram

![Search product sequence diagram](https://github.com/trongdau184/nab-analytics-service/blob/master/Search-product-diagram.png?raw=true)

* View product sequence diagram

![View product sequence diagram](https://github.com/trongdau184/nab-analytics-service/blob/master/View-product-diagram.png?raw=true)

* Generate Normal Reports sequence diagram (top searching products, top searching brands, top viewed products report)

![Generate Normal Reports](https://github.com/trongdau184/nab-analytics-service/blob/master/Normal-reports-diagram.png?raw=true)
    * If the query date range is not over 30 days (it might not take long to time to generate), the Analytic Service will aggregate and issue report data by itself.

* Generate Long Time Reports (which query date range is over 30 days) sequence diagram

![Generate Normal Reports](https://github.com/trongdau184/nab-analytics-service/blob/master/Long-time-report-diagram.png?raw=true)
    * If the query date range is over 30 days (it might take long to time to generate), the Analytic Service doesn't issue report data immediately, instead of that, it sends a generating report message to the Amazon SQS. The message contains the type of report (top searching products, top searching brands, top viewed product) and query date range.
    * The Analytics Worker receives the message, then based on the report type, it aggregates the data from MongoDB and returns the report data to Client (can be done via WebSocket which is not described in the diagram)

**Features**
* Analytics APIs: 
    * Record filters on the products
    * Record view on a product
    * Get top searching products in a given date range
    * Get top searching brands in a given date range
    * Get top viewed products in a given date range

* API documentation url: http://localhost:4000/documentation

**Code folder structure**
```
├── api
│   ├── common
│   ├── config
│   ├── analytics
├── configurations
│   ├── config.dev.json
│   ├── config.test.json
│   └── index.ts
├── core
│   ├── common
│   │   ├── Constants.ts
│   │   └── Validators.ts
│   ├── controller
│   │   └── IBaseController.ts
│   ├── repositories
│   │   ├── BaseRepository.ts
│   │   ├── DataAccess.ts
│   │   ├── IBaseDocument.ts
│   │   ├── IBaseRepository.ts
│   │   └── SearchQueryConverter.ts
│   ├── services
│   │   ├── BaseService.ts
│   │   └── IBaseService.ts
│   └── utils
├── index.ts
├── plugins
├── server.ts
└── test
```
* Project structure followed "Folder by feature" structure which organizing projects into several folders with each folder representing a single feature.
* Core folder can be separated as a npm module which is used by the services.

**Software development principles, pattern & practices**
* 3 Layers Pattern: Controller - Service - Repository
* Inversion of control: make components loose coupling
* Highly reusable: Quickly to add new Rest API for resource with basic CRUD. Developer just needs to create route file, define the new Controller, create new Service class which extends BaseService class without adding any code, create new Repository class which extends BaseRepository class without adding any code, and add needed validators, DTOs. That's all.
* Generic Method
* SOLID, KISS

**Frameworks & Libraries**
* Hapi: NodeJS API framework
* Boom: Generate Http friendly error objects
* Good: Hapi process monitoring
* hapi-auth-jwt2: hapi authentication plugin uses JWT token
* Joi: request payload or model validation
* inversify: Inversion of control (IOC) container.
* nconf: define configuration file for each environment
* axios: send http request
* mongoose: ODM for MongoDB
* aws-sdk: Amazon SDK
* lodash: JavaScript utility library
* moment: JavaScript Date Time library
* hapi-swagger: API Documentation.
* jest: unit test framework

**DB Schema**
* Search Product

| Field     | Data Type | Description | 
| ----------| ----------| ------------|
| field     | string    | searching field name |
| operator  | string    | searching operator (eq, lte, gte...) |
| value     | any       | searching value
| searchAt  | date      | date time when the search performed

* View Product 

| Field     | Data Type | Description | 
| ----------| ----------| ------------|
| productId | Object Id | product id |
| viewAt    | date      | date time when product viewed |

**Installation**
```bash
npm install
```
**Run**

* Start the service:
```bash
npm start
```
The service runs on URL: http://localhost:4000

* Test:
```bash
npm test
```

**Curl commands to verify APIs**
* Login to get the token (need to start the product service)
```bash
curl -X POST "http://localhost:5000/users/login" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"email\": \"test@gmail.com\",  \"password\": \"123456\"}"
```
* Record searching on products
Call login API first to get the token, then set it to the "authorization" in the header.
```bash
curl -X POST "http://localhost:4000/analytics/recordSearchProduct" -H  "accept: application/json" -H  "authorization: token" -H  "Content-Type: application/json" -d "{  \"filters\": [    {      \"field\": \"price\",      \"operator\": \"gte\",      \"value\": 100    }  ],  \"searchAt\": \"2020-09-07T09:26:33.270Z\"}"
```
* Record a view on the product
Call login API first to get the token, then set it to the "authorization" in the header.
```bash
curl -X POST "http://localhost:4000/analytics/recordViewProduct" -H  "accept: application/json" -H  "authorization: token" -H  "Content-Type: application/json" -d "{  \"productId\": \"5f55fcc6447af69e1790dc79\",  \"viewAt\": \"2020-09-07T09:26:33.270Z\"}"
```

* Get top searching products
Call login API first to get the token, then set it to the "authorization" in the header.
```bash
curl -X GET "http://localhost:4000/analytics/getTopSearchProducts?from=2020-09-01T00%3A00%3A00.000Z&to=2020-09-15T23%3A59%3A59.999Z&top=10" -H  "accept: application/json" -H  "authorization: token"
```

* Get top searching brands
Call login API first to get the token, then set it to the "authorization" in the header.
```bash
curl -X GET "http://localhost:4000/analytics/getTopSearchBrands?from=2020-09-01T00%3A00%3A00.000Z&to=2020-09-15T23%3A59%3A59.999Z&top=10" -H  "accept: application/json" -H  "authorization: token"
```

* Get top viewed products
Call login API first to get the token, then set it to the "authorization" in the header.
```bash
curl -X GET "http://localhost:4000/analytics/getTopViewProducts?from=2020-09-01T00%3A00%3A00.000Z&to=2020-09-15T23%3A59%3A59.999Z&top=10" -H  "accept: application/json" -H  "authorization: token"
```
