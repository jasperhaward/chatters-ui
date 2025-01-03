import {
  ConversationEventType,
  ConversationEventWithAggregates,
  User,
} from "@/types";
import { useSession } from "@/features/auth";

import { isWithinFiveMinutes } from "../utils";
import GenericEvent from "./GenericEvent";
import MessageCreatedEvent from "./MessageCreatedEvent";
import RecipientsCreatedAggregateEvent from "./RecipientsCreatedAggregateEvent";

interface EventProps {
  previousEvent: ConversationEventWithAggregates;
  event: ConversationEventWithAggregates;
  nextEvent: ConversationEventWithAggregates;
}

export default function Event({ previousEvent, event, nextEvent }: EventProps) {
  const [session] = useSession();

  switch (event.type) {
    case "ConversationCreated":
      return (
        <GenericEvent event={event}>created the conversation</GenericEvent>
      );
    case "TitleUpdated":
      return (
        <GenericEvent event={event}>
          {event.title
            ? `changed the title to ${event.title}`
            : "removed the title"}
        </GenericEvent>
      );
    case "RecipientCreated":
      return (
        <GenericEvent event={event}>
          added {event.recipient.username}
        </GenericEvent>
      );
    case "RecipientsCreatedAggregate":
      return <RecipientsCreatedAggregateEvent event={event} />;
    case "RecipientRemoved":
      if (event.recipient.id === event.createdBy.id) {
        return <GenericEvent event={event}>left the conversation</GenericEvent>;
      }

      return (
        <GenericEvent event={event}>
          removed {event.recipient.username}
        </GenericEvent>
      );
    case "MessageCreated":
      return (
        <MessageCreatedEvent
          event={event}
          isDisplayAuthor={isDisplayMessageAuthor(
            previousEvent,
            event,
            session.user
          )}
          isDisplayTimestamp={isDisplayMessageTimestamp(event, nextEvent)}
        />
      );
    default:
      throw new Error(`Unknown event type '${event.type}'`);
  }
}

/**
 * Determines whether a `MessageCreated` event's (that wasn't created
 * by the urrent user) author & avatar should be displayed.
 * @param prevEvent
 * @param event
 * @returns true if:
 *  - the event was **not** created by the current user, and;
 *  - there is no `prevEvent` or;
 *  - `prevEvent` is not a `MessageCreated` event or;
 *  - `event` & `prevEvent` were created by different users
 */
function isDisplayMessageAuthor(
  prevEvent: ConversationEventWithAggregates | undefined,
  event: ConversationEventWithAggregates,
  user: User
) {
  if (event.createdBy.id === user.id) {
    return false;
  }

  return (
    !prevEvent ||
    prevEvent.type !== ConversationEventType.MessageCreated ||
    event.createdBy.id !== prevEvent.createdBy.id
  );
}

/**
 * Determines whether a `MessageCreated` event's timestamp should be displayed.
 * @param event
 * @param nextEvent
 * @returns true if:
 *  - there is no `nextEvent` or;
 *  - `nextEvent` is not a `MessageCreated` event or;
 *  - `event` and `nextEvent` were created by different users or;
 *  - `event` and `nextEvent` were sent more than 5 minutes apart
 */
function isDisplayMessageTimestamp(
  event: ConversationEventWithAggregates,
  nextEvent: ConversationEventWithAggregates | undefined
) {
  return (
    !nextEvent ||
    nextEvent.type !== ConversationEventType.MessageCreated ||
    event.createdBy.id !== nextEvent.createdBy.id ||
    !isWithinFiveMinutes(event, nextEvent)
  );
}
