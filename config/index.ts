import _ from "lodash";
import { join } from "path";

// 基础配置
let config = {
  // 模板版路径
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"), // 静态资源路径
  port: 8081, // 默认端口号
  memoryFlag: false, // 是否缓存
};
// 开发环境下得 端口
if (process.env.NODE_ENV === "development") {
  let localConfig = {
    port: 8081,
  };
  config = _.assignIn(config, localConfig);
}
// 生产环境下配置
if (process.env.NODE_ENV === "production") {
  let prodConfig = {
    port: 8082,
    memoryFlag: "memory",
  };
  config = _.assignIn(config, prodConfig);
}

export default config;
