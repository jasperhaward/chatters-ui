import { Session } from "@/types";
import { useFetch } from "./useFetch";
import { useMutation } from "./useMutation";

export interface LoginParams {
  username: string;
  password: string;
}

export function useLogin() {
  const fetch = useFetch();

  return useMutation((params: LoginParams) =>
    fetch<Session>("/api/v1/auth/login", {
      method: "POST",
      body: params,
    })
  );
}
