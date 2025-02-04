import type { Meta, StoryObj } from '@storybook/react';

import DowntimeBar from '../src/DowntimeBar';

const defaultDowntimeData = [true, false, true, false, true, false, true, false, true, false];

const meta: Meta<typeof DowntimeBar> = {
	title: 'Components/Status/DowntimeBar',
	component: DowntimeBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: defaultDowntimeData
	},
};

export const CustomColors: Story = {
	args: {
		data: defaultDowntimeData,
		red: "#FFFFFF",
		green: "#000000"
	},
}

export const ManySegments: Story = {
	args: {
		data: Array.from({ length:100 }, () => Math.random() >= 0.5)
	},
}

export const DefinedSVGProps: Story = {
	args: {
		data: defaultDowntimeData,
		width: 100,
		height: 100
	},
}

export const UndefinedValues: Story = {
	args: {
		data: [true, false, undefined, true, false, undefined, true, false, undefined, true]
	},
}
