import { IApi } from "@interface/IApi";
import { BooksListItem, IData } from "@interface/IData";

class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: "我是后台数据",
        result: [1, "哈哈哈"],
      });
    });
  }
  getBookList() {
    return new Promise<BooksListItem[]>((resolve) => {
      const list: BooksListItem[] = [
        {id: 1, name: '红楼', auth: '阿树', price: 100, desc: '世界这么大' },
        {id: 2, name: '世界话', auth: 'james', price: 59, desc: '我想去看看' },
      ]
      resolve(list)
    })
  }
}

export default ApiService;
