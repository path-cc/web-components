import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import Color from "colorjs.io";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Pie Chart Types
 */

export interface PieChartData {
  showLegend?: boolean;
  bgColor?: string;
  textColor?: string;

  sortData?: boolean;
  axisLabel: string;
  data: {
    label: string;
    value: number;
  }[];
}

const PieChart = (props: PieChartData) => {
  const bgColor = props.bgColor ?? "#fff";
  const textColor = props.textColor ?? "#000";

  const datapoints =
    props.sortData === false ? props.data : [...props.data].sort();

  const data = {
    labels: datapoints.map((d) => d.label),
    datasets: [
      {
        label: props.axisLabel,
        data: datapoints.map((d) => d.value),
        backgroundColor: datapoints.map((d) => getColor(d.label)),
        borderColor: bgColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "pie",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
          onClick: (_e: unknown) => {},
        },
        htmlLegend: {
          display: props.showLegend,
          containerID: "pie-chart-legend",
          textColor,
        },
      },
    } as any,
    plugins: [htmlLegendPlugin],
  };

  return (
    <Box bgcolor={bgColor} width="100%" height="100%">
      <Pie {...options} />
      <div id="pie-chart-legend" />
    </Box>
  );
};

export default PieChart;

/**
 * Returns a hash code from a string
 * @param  The string to hash.
 * @return A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getColor(context: string): string {
  const colors = [
    "#37a2eb",
    "#ff6384",
    "#ff9e40",
    "#9966ff",
    "#ffcd56",
    "#4dbd74",
  ];

  const hash = hashCode(context) ** 2; // Make sure its positive

  let colorStr = colors[hash % (colors.length - 1)];

  let color = new Color(colorStr).to("lch");

  // Manipulate the color based on the hash
  color = new Color(color.lighten((hash % 19) / 100));
  color = new Color(color.darken((hash % 23) / 100));

  return color.to("srgb").toString();
}

/**
 * Gets the HTML list container for the legend, creating it if it doesn't exist
 * @param chart the chart object
 * @param id the ID of the container
 * @returns the list container element
 */
function getOrCreateLegendList(id: string): HTMLUListElement {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer?.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "column";
    listContainer.style.margin = "10px";
    listContainer.style.padding = "0";
    listContainer.style.overflowY = "auto";

    legendContainer?.appendChild(listContainer);
  }

  return listContainer;
}

/**
 * Plugin to render the legend as an HTML list
 * @param containerID the ID of the container to render the legend
 * @see https://github.com/osg-htc/osg-htc.github.io/blob/master/assets/js/components/pie-chart.js
 */
const htmlLegendPlugin: Plugin = {
  id: "htmlLegend",
  afterUpdate(chart: ChartJS, _args: any, options: any) {
    const { containerID, textColor, display } = options;

    const ul = getOrCreateLegendList(containerID);

    // Remove the legend if display is false
    if (!display) {
      ul.remove();
      return;
    }

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items =
      chart.options.plugins?.legend?.labels?.generateLabels?.(chart) ?? [];

    items.forEach((item: any) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";
      li.style.paddingBottom = "2px";

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = "0";
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = textColor;
      textContainer.style.margin = "0";
      textContainer.style.padding = "0";
      textContainer.style.fontSize = ".8rem";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);

      // ul.style.height = `${chart.canvas.style.height}`;
    });
  },
};
