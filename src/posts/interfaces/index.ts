export interface Post {
  title: string | string[];
  content: string | string[];
}

export interface PostWithDates extends Post {
  insertedAt: Date;
  updatedAt: Date[];
}

export interface IValidationError {
  validationError: {
    message: string;
    status: number;
  }
}

export interface IRepository {
  getAll(): Promise<PostWithDates[]>;
  getById(id: string): Promise<PostWithDates>;
  create(post: Post): Promise<PostWithDates>;
  update(id: string, post: Post): Promise<PostWithDates>;
  delete(id: string): Promise<PostWithDates>;
}

export interface IPostService {
  getAll(): Promise<PostWithDates[] | IValidationError >;
  getById(id: string): Promise<PostWithDates | IValidationError >;
  create(post: Post): Promise<PostWithDates | IValidationError >;
  update(id: string, post: Post): Promise<PostWithDates | IValidationError >;
  delete(id: string): Promise<PostWithDates | IValidationError >;
};