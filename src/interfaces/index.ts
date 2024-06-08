export type TStatus = "idle" | "pending" | "fullfilled" | "rejected";

export interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface IResProducts {
  data: IProductTypes[];
  meta: Meta;
}

export interface IProductTypes {
  id: number;
  attributes: data;
}

export interface data {
  title: string;
  description: string;
  price: number;
  stock: number;
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  brand: string;
  category: Category;
  image: Image;
  quantity?: number;
}

export interface Category {
  data: CategoryData;
}

export interface CategoryData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  category: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Image {
  data: ImageData;
}

export interface ImageData {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

