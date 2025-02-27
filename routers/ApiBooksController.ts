// routers/example.ts
import { IApi } from "@interface/IApi";
import { route, GET } from "awilix-koa";
import Router from "koa-router";

@route("/api")
class ApiBookeController {
  private apiService: IApi;

  constructor({ apiService }: { apiService: IApi } ) {
    this.apiService = apiService
  }
  @route("/bookList")
  @GET()
  async actionList(ctx:  Router.IRouterContext, next: () => Promise<any>): Promise<any> {
    const data = await this.apiService.getBookList()
    console.log(data, 11111)
    ctx.body = { message: "success", code: 200, data };
  }
}
export default ApiBookeController;