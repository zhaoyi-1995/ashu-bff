import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});
/**
 * 1. 能力的装填到容器中
 */
// 1.1 引入容器
import { createContainer, Lifetime } from "awilix";
// 1.2 容器初始化
const container = createContainer();
// 1.3 容器装填能力
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase", // 将文件名转换为驼峰命名法作为服务名称
  resolverOptions: {
    lifetime: Lifetime.SCOPED, //设置服务的作用域为 SCOPED，表示每个请求或上下文会创建一个新实例
  },
});
