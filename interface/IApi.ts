import { IData, BooksListItem } from "./IData";

export interface IApi {
  getInfo(): Promise<IData>;
  getBookList(): Promise<BooksListItem[]>
}
