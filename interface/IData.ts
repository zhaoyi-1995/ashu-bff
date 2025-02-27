export type IData = {
  item: string;
  result: (string | number)[];
};

export type BooksListItem = {
  id: string | number,
  name: string,
  desc?: string,
  auth: string,
  price: number
}
