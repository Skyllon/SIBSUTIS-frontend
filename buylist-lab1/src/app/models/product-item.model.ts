export enum Category {
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  HOME = 'HOME',
  SCHOOL = 'SCHOOL',
  OTHER = 'OTHER'
};

export interface ProductItem {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
  category: Category;
  note?: string;
}
