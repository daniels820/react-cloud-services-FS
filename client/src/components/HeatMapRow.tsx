import { Tooltip } from "@mui/material";
import { getStrangthColor } from "../utils/ScanVolumeColor.utils";
import { MonthlyScans } from "./Heatmap";

interface HeatMapRowProps {
  monthScan: MonthlyScans;
  totalYearScans: number;
  index: number;
}

export const HeatMapRow = ({
  monthScan,
  totalYearScans,
  index,
}: HeatMapRowProps) => {
  return (
    <div className="row" key={index}>
      <p className="month">{monthScan.month}</p>
      {Object.entries(monthScan.occurences).map(([key, value]) => (
        <div key={key}> 
          <Tooltip title={`${value.date}- ${value.count} scans`}>
            <div
              className={`square ${getStrangthColor(value, totalYearScans)}`}
            ></div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
