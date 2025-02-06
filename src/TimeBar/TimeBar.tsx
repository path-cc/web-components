import {useMemo} from "react";
import {ColorBar} from "../index";

interface BaseProps {
	fill: string;
	title?: string;
}

export interface Point extends BaseProps {
	value: number;
	onClick?: (p: Point) => void;
}

export interface Range extends BaseProps {
	start: number;
	end: number;
	onClick?: (r: Range) => void;
}


export interface TimeBarProps {
	points: Point[];
	ranges: Range[]
	svgProps?: React.SVGProps<SVGSVGElement>;
}

/**
 * Display a ColorBar based on time driven data
 *
 * Overlays the point data on top of the range data
 *
 * @constructor
 */
const TimeBar = ({points, ranges, svgProps}: TimeBarProps) => {

	const sortedRanges = ranges.sort((a, b) => a.start - b.start);
	const startTime = sortedRanges[0].start;
	const rangeLength = sortedRanges[sortedRanges.length - 1].end - startTime;
	const pointLength = rangeLength / 100 // 1 / 100th of the range is a reasonable look

	const rangeData = useMemo(() => {
		return ranges.map((r) => {
			return {
				x: r.start - startTime,
				width: r.end - r.start,
				fill: r.fill,
				title: r.title,
				onClick: () => r.onClick?.(r)
			}
		})
	}, [])

	const pointData = useMemo(() => {
		return points.map((p) => {
			return {
				x: p.value - startTime,
				width: pointLength,
				fill: p.fill,
				title: p.title,
				onClick: () => p.onClick?.(p)
			}
		})
	}, [])

	return <ColorBar data={[...rangeData, ...pointData]} {...svgProps} />
}

export default TimeBar;