function roundRatingToInteger(rating: number) {
  return Math.min(5, Math.max(1, Math.round(rating)))
}

export function countRatings(values: number[]) {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  for (const value of values) {
    if (value > 0) {
      counts[roundRatingToInteger(value)] += 1
    }
  }

  return counts
}