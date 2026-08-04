import type { Rating } from "@/types/rating";
import type { Member } from "@/types/member";

export function getRatingsBreakdown(
  ratings: Rating[],
  members: Member[]
) {
  const membersMap = new Map(
    members.map((member) => [member.id, member])
  );

  return ratings
    .map((rating) => {
      const member = membersMap.get(rating.memberId);

      return `${member?.name ?? "Unknown"}: ${
        rating.label || rating.value
      }`;
    })
    .join(", ");
}

export function getAverageBookRating(ratings: Rating[]) {
  if (!ratings || ratings.length === 0) return 0;
  return ratings.reduce((sum, item) => sum + item.value, 0) / ratings.length;
}