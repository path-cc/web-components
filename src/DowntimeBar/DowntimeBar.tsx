import React, { useEffect, useRef, useState } from 'react';
import {grey as gry, red as r, green as grn} from '@mui/material/colors';


interface DowntimeBarProps extends React.SVGProps<SVGSVGElement> {
	data: (boolean | undefined)[];
	grey?: string;
	red?: string;
	green?: string;
}

/**
 * DowntimeBar consumes a boolean array of uptimes
 * @param data
 * @param grey
 * @param red
 * @param green
 * @param svgProps
 * @constructor
 */
const DowntimeBar = ({ data, red=r[500], green=grn[500], grey=gry[300], ...svgProps }: DowntimeBarProps) => {

	const containerRef = useRef<SVGSVGElement>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(
		() => {
			if (containerRef.current) {
				setWidth(containerRef.current.clientWidth / data.length);
				setHeight(containerRef.current.clientHeight);
			}
		},
		[containerRef.current]
	)

	return (
			<svg ref={containerRef} {...svgProps}>
				{data.map((v, i) => (
						<rect
								key={i}
								x={i * width}
								y={0}
								width={width}
								height={height}
								fill={v == undefined ? grey : v ? green : red}
						/>
				))}
			</svg>
	);
};

export default DowntimeBar;
