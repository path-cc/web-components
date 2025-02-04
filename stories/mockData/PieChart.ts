import { PieChartData } from "../../src/PieChart";

const defaultPieChartData: PieChartData = {
  axisLabel: "Compute Hours",
  showLegend: true,
  data: [
    {
      label: "University of California San Diego",
      value: 5495539,
    },
    {
      label: "University of Wisconsin",
      value: 3688288,
    },
    {
      label: "University of Chicago",
      value: 2493745,
    },
    {
      label: "Indiana University",
      value: 2128952,
    },
    {
      label: "Fermi National Accelerator Laboratory",
      value: 2086087,
    },
    {
      label: "Great Plains Network",
      value: 1959272,
    },
    {
      label: "Clemson University",
      value: 1733387,
    },
  ],
};

export default defaultPieChartData;
