import type { Rating } from "@/types/rating";
import type { Member } from "@/types/member";
import type { BookWithStats } from "@/types/book";

export interface RatingAxisScale {
  min: number;
  max: number;
  ticks: number[];
}

const TICK_STEPS = [0.1, 0.25, 0.5, 1];
const MAX_TICKS = 8;

export function getRatingAxis(books: BookWithStats[]): RatingAxisScale {
  const values = books.flatMap((book) => (book.ratings ?? []).map((rating) => rating.value));

  if (values.length === 0) return { min: 1, max: 5, ticks: [1, 2, 3, 4, 5] };

  const lowest = Math.min(...values);
  const highest = Math.max(...values);
  const padding = Math.max((highest - lowest) * 0.04, 0.05);

  const min = lowest - padding;
  const max = highest + padding;

  const step =
    TICK_STEPS.find((candidate) => (max - min) / candidate <= MAX_TICKS) ??
    TICK_STEPS[TICK_STEPS.length - 1];

  const ticks: number[] = [];

  for (let tick = Math.ceil(min / step) * step; tick <= max; tick += step) {
    ticks.push(Math.round(tick * 100) / 100);
  }

  return { min, max, ticks };
}

export function toAxisPercent(value: number, axis: RatingAxisScale) {
  return ((value - axis.min) / (axis.max - axis.min)) * 100;
}
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

export function getControversyBookRating(ratings: Rating[]) {
  const values = ratings.map((rating) => rating.value)

  if (values.length === 0) {
    return null
  }

  const average =
    values.reduce((sum, value) => sum + value, 0) / values.length

  const variance =
    values.reduce(
      (sum, value) => sum + Math.pow(value - average, 2),
      0
    ) / values.length

  return Math.sqrt(variance)
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

export function getControversyLevel(value: number) {
  if(value < 0.14) return 1;
  if(value < 0.3) return 2;
  if(value < 0.45) return 3;
  if(value < 0.6) return 4;
  if(value < 0.9) return 5;

  return 6;
}