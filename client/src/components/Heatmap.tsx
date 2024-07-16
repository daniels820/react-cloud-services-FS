import "../styles.css";
import moment from "moment";
import "./styles/Heatmap.css";
import { HeatMapRow } from "./HeatMapRow";
import { DEFAULT_YEAR } from "../constants";
import { useState, useEffect } from "react";
import { getScans } from "../services/HeatmapService";

export interface Scan {
  id: string;
  date: Date;
  cloudProviderId: string;
  scanSize: number;
  scanPrivateKey: string;
}

export interface MonthlyScans {
  month: string;
  occurences: Occurence[];
}

export interface Occurence {
  day: number;
  count: number;
  date: string;
}

interface HeatmapProps {
  year?: string;
  providers?: string[];
}

export const Heatmap = ({ year, providers }: HeatmapProps) => {
  const [scansData, setScansData] = useState<MonthlyScans[]>([]);
  const [totalYearScans, setTotalYearScans] = useState<number>(0);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        let monthsThisYear: number = 12;
        let scansData = await getScans(year || DEFAULT_YEAR, providers || []);

        // If current year is choosen
        if (Number(year) === moment().year()) {
          monthsThisYear = moment().month() + 1;
          scansData = scansData.filter((scan: Scan) => {
            return moment(scan.date) < moment();
          });
        }

        setTotalYearScans(scansData.length);

        // Arrange scans per month days
        const monthlyScansArray = [];
        for (let month = 0; month < monthsThisYear; month++) {
          const tempMonthlyScansArray = scansData.filter((scan: any) => {
            const scanDate = new Date(scan.date);
            return scanDate.getMonth() === month && scanDate < new Date();
          });
          monthlyScansArray.push(tempMonthlyScansArray);
        }

        // Arrange detailedScansArray
        const detailedScansArray: MonthlyScans[] = [];
        monthlyScansArray.forEach((monthScans: Scan[]) => {
          const daysInMonth = moment(monthScans[0].date).daysInMonth();
          const monthName = moment(monthScans[0].date).format("MMMM");
          const yearVal = moment(monthScans[0].date).year();
          const monthVal = moment(monthScans[0].date).month();

          // Init occurences array to days of this month with 0 counts
          const occurencesArray: Occurence[] = [
            ...Array(daysInMonth).keys(),
          ].reduce((obj: any, day) => {
            return Object.assign(obj, {
              [day + 1]: {
                day: day + 1,
                count: 0,
                date: moment({
                  year: yearVal,
                  month: monthVal,
                  day: day + 1,
                }).format("ddd MMM Do YYYY"),
              },
            });
          }, {});
          monthScans.forEach((scan: Scan) => {
            const day: number = new Date(scan.date).getDate();
            occurencesArray[day].count++;
          });

          detailedScansArray.push({ month: monthName, occurences: occurencesArray });
        });

        setScansData(detailedScansArray);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchScans();
  }, [year, providers]);

  return (
    <div>
      {scansData.length > 0 ? (
        <div className="container">
          {scansData.map((monthScan: MonthlyScans, index: number) => (
            <HeatMapRow
              key={index}
              monthScan={monthScan}
              totalYearScans={totalYearScans}
              index={index}
            ></HeatMapRow>
          ))}
        </div>
      ) : (
        <p> locading ...</p>
      )}
    </div>
  );
};
