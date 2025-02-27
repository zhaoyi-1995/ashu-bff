import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});
import Koa from "koa";
import config from "@config/index";
import render from "koa-swig"; // 渲染模板
import serve from "koa-static"; // 静态资源
import co from "co"; // 处理向下执行得 yeild
import { loadControllers, scopePerRequest } from "awilix-koa";
import ErrorHandler from "@middlewares/ErrorHandler";
import { configure, getLogger } from "log4js";

/**
 * 处理日志:
 * 注意： 如果使用得是 SWC、serverless部署得话，服务不允许我们在logs文件夹下生成对应得日志，
 * 它专门提供了一些文件，让我们去写入日志，配置得时候需要格外注意。
 */
configure({
  appenders: {
    cheese: {
      type: "file",
      filename: `${__dirname}/logs/ashu.log`,
    },
  },
  categories: {
    default: {
      appenders: ["cheese"],
      level: "error",
    },
  },
});

const logger = getLogger("cheese"); // 获取日志

/**
 * 启动 Koa服务
 * 1. 创建服务实例
 * 2. 配置实例所需要得参数
 * 3. 配置模板渲染解析方法
 * 4. 生效静态资源
 */
const app = new Koa();
const { port, viewDir, memoryFlag, staticDir } = config;
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <"memory" | false>memoryFlag,
    writeBody: false,
    ext: "html",
  })
);
app.use(serve(staticDir));

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

// 用户访问 通过容器获取
app.use(scopePerRequest(container));

// 判断路由是否正确，进行容错处理, 将 koa-app实例、错误日志传入进去。
ErrorHandler.error(app, logger);

// 让所有得路由生效
app.use(loadControllers(`${__dirname}/routers/*.ts`));
if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log("ashu Server BFF启动成功");
  });
}
export default app;
