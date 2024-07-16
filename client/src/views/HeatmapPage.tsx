import { DEFAULT_YEAR } from "../constants";
import React, { useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
import { YearPicker } from "../components/YearPicker";
import { getProviders } from "../services/HeatmapService";
import { CloudPrivderSelect } from "../components/CloudPrivderSelect";

export default function HeatmapPage() {
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [providers, setProviders] = useState<string[]>([]);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getProviders();

        const options = data.map((provider: any) => {
          return {
            displayName: provider.name,
            value: provider.id,
          };
        });

        setOptions(options);
        
      } catch (err) {
        // setError(err);
      }
    };
    fetchProviders();
  }, [providers]);

  return (
    <div className="page-wrapper">
      <div className="filters">
        <YearPicker
          disableFuture
          value={Number(year)}
          onChange={(value) => {
            setYear(value.toString());
          }}
        />
        <CloudPrivderSelect
          options={options}
          onChange={(providers) => {
            setProviders(providers);
          }}
          selectedOptions={providers}
        />
      </div>
      <div className="content">
        <Heatmap year={year} providers={providers} />
      </div>
    </div>
  );
}


