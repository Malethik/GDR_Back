export interface User {
  id: string;
  name: string;
  password: string;
  avatar?: string;
  char: "ADMIN" | "USER";
}

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
