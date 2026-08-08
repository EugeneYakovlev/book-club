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

export function getRatingLevel(value: number) {
  if (value < 2) return 1;
  if (value < 2.5) return 2;
  if (value < 3) return 3;
  if (value < 3.5) return 4;
  if (value < 4) return 5;
  if (value < 4.5) return 6;
  if (value < 5) return 7;

  return 8;
}