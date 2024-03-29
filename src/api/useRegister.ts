import { UserWithCreatedAt } from "@/types";
import { useFetch } from "./useFetch";
import { useMutation } from "./useMutation";

export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const fetch = useFetch();

  return useMutation((params: RegisterParams) => {
    return fetch<UserWithCreatedAt>("/api/v1/auth/register", {
      method: "POST",
      body: params,
    });
  });
}
