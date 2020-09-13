import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
  }
});

export interface IServerConfigurations {
  port: number;
  plugins: Array<string>;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export interface IDataConfiguration {
  connectionString: string;
}

export interface IAWSConfiguration {
  region: string,
  accessKeyId: string,
  secretAccessKey: string
}

export interface IAppConfiguration {
  analyticsDayRangeThreshold: number
}

export function getDatabaseConfig(): IDataConfiguration {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get("server");
}

export function getQueueConfigs() {
  return configs.get("queues");
}

export function getAWSConfigs(): IAWSConfiguration {
  return configs.get("aws");
}

export function getAppConfigs(): IAppConfiguration {
  return configs.get("app");
}