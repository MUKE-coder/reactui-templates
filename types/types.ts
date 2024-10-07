export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
  username: string;
};
export type LoginProps = {
  email: string;
  password: string;
};

export type CreateTemplateProps = {
  name: string;
  slug: string;
  userId: string;
  userName: string;
  author: string;
  categoryId: string;
  categoryName: string;
  price: number;
  screenShots?: string[];
  description?: string;
  thumbnail: string;
  pages: number;
  previewLink: string;
  whatsIncluded?: string;
  zippedFileUrl?: string;
  zippedFileSize?: number;
  zippedFileName?: string;
  techStack?: string;
  isPaid: boolean;
  documentation?: string;
  changeLog?: string;
};
