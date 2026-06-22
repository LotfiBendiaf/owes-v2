export const pricing = {
  meeting: { halfDay: 5_000, fullDay: 8_000 },
  trainingDay: 9_000,
  domiciliation: { standard: 15_000, premium: 27_000, exclusive: 21_000 },
  coworking: {
    day: { small: 1_000, group: 667 },
    week: { small: 4_000, group: 2_667 },
    month: { small: 15_000, group: 10_000 },
  },
} as const;

export function coworkingTotal(period: "day" | "week" | "month", people: number) {
  const price = pricing.coworking[period][people <= 2 ? "small" : "group"];
  return price * people;
}
