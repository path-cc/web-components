/**
 * Large number display component
 * Includes a title, and large number display
 * Optionally superimposed over a line graph filled in with a color
 */

import { useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  ChartData,
} from "chart.js";
import Color from "colorjs.io";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler
);

/**
 * Big Number Types
 */

export interface BigNumberProps {
  title: string;
  value: string;
  data: { x: number; y: number }[];
  color?: string;
  opacity?: number;
}

const BigNumber = ({
  title,
  value,
  data,
  color = "#f3f3f3",
  opacity = 0.8,
}: BigNumberProps) => {
  // Have the x-axis start at 0
  const zeroedData = useMemo(() => {
    return data.map((d) => {
      return { x: d.x - data[0].x, y: d.y };
    });
  }, [data]);

  const colorObj = new Color(color);
  colorObj.alpha = opacity;

  const chartData: ChartData = {
    datasets: [
      {
        label: "filled",
        data: zeroedData,
        backgroundColor: colorObj,
        borderColor: color,
        fill: true,
      },
    ],
  } as any; // React ChartJS types are not up to date

  return (
    <Box position="relative" width="100%" height="100%">
      <Box position="absolute" bottom={0} left={0} width="100%" zIndex={1}>
        <Box p={3}>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Typography
                flexGrow={1}
                variant={"subtitle1"}
                fontWeight={"bold"}
              >
                {title}
              </Typography>
            </Grid>
            <Grid>
              <Typography flexGrow={1} variant={"h4"} fontWeight={"bold"}>
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box height={"100%"}>
        <Line
          data={{
            datasets: [
              {
                label: "filled",
                data: zeroedData,
                backgroundColor: colorObj.toString(),
                borderColor: color,
                fill: true,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "time",
                time: {
                  round: "second",
                },
                ticks: {
                  display: false,
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Lighter color for x-axis grid lines
                  lineWidth: 0.5, // Thinner grid lines
                },
              },
              y: {
                min: 0,
                ticks: {
                  display: false,
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // Lighter color for y-axis grid lines
                  lineWidth: 0.5, // Thinner grid lines
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false, // Disable tooltips
              },
            },
            animation: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default BigNumber;
