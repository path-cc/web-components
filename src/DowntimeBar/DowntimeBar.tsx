import React, { useEffect, useRef, useState } from 'react';


interface DowntimeBarProps extends React.SVGProps<SVGSVGElement> {
	data: boolean[];
	red?: string;
	green?: string;
}

/**
 * DowntimeBar consumes a boolean array of uptimes
 * @param data
 * @param red
 * @param green
 * @param svgProps
 * @constructor
 */
const DowntimeBar = ({ data, red="red", green="green", ...svgProps }: DowntimeBarProps) => {

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
								fill={v ? red : green}
						/>
				))}
			</svg>
	);
};

export default DowntimeBar;
