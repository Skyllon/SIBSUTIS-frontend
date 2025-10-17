export enum Category { 'FOOD', 'DRINK', 'HOME', 'SCHOOL', "OTHER" };

export interface ProductItem {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
  category: Category;
  note?: string;
}
