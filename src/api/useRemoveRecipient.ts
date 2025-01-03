import { RecipientRemovedEvent } from "@/types";
import { useAuthorizedFetch } from "./useAuthorizedFetch";
import { useMutation } from "./useMutation";

export interface RemoveRecipientParams {
  conversationId: string;
  recipientId: string;
}

export function useRemoveRecipient() {
  const fetch = useAuthorizedFetch();

  return useMutation((params: RemoveRecipientParams) => {
    const { conversationId, recipientId } = params;
    const url = `/api/v1/conversations/${conversationId}/recipients/${recipientId}`;

    return fetch<RecipientRemovedEvent>(url, { method: "DELETE" });
  });
}
