import { GET, route } from "awilix-koa";
import { Context } from "@interface/IKoa";

@route("/")
class IndexController {
  @GET()
  async actionList(ctx: Context): Promise<void> {
    const data = await ctx.render("index", {
      data: "服务端数据",
    });
    console.log("橘子", data);
    ctx.body = data;
  }
}

export default IndexController;
