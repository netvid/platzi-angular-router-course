export interface Product {
  title: string;
  id: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
  taxes?: number
}

export interface Category{
  id: string;
  name: string;
}

// Omit the id and category atributes and extends of product to has the same properties
export interface CreateProductDTO extends Omit<Product,'id' | 'category'>{
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}
