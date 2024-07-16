import { Occurence } from "../components/Heatmap";

export const getStrangthColor = (
  occurences: Occurence,
  totalYearScans: number
): string => {
  const dailyStrangth: number = occurences.count / (totalYearScans / 100); // temp just to see its working

  switch (true) {
    case 0 === dailyStrangth:
      return "color1";

    case 0 <= dailyStrangth && dailyStrangth < 0.25:
      return "color2";

    case 0.25 < totalYearScans && dailyStrangth < 0.5:
      return "color3";

    case 0.5 <= dailyStrangth && dailyStrangth < 0.75:
      return "color4";

    case totalYearScans <= dailyStrangth && dailyStrangth < 1:
      return "color5";

    default:
      return "color1";
  }
};
