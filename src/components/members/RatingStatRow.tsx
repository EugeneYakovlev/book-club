import Link from "next/link";

import type { MemberBookRating } from "@/types/member";

interface RatingStatProps {
  label: string;
  rating: MemberBookRating | null;
}

export function RatingStatRow({ label, rating }: RatingStatProps) {
  if (!rating) {
    return (
      <div className="px-4">
        {label}: —
      </div>
    );
  }

  return (
    <div className="px-4">
      {label}: {rating.rating.label || rating.rating.value}{" "}
      (
      <Link
        href={`/books/${rating.book.slug}`}
        className="underline"
      >
        {rating.book.title}
      </Link>
      )
    </div>
  );
}