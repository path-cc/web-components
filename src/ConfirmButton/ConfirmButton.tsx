import React, {useState, useRef, useEffect} from "react";
import {Box, Button, IconButton, IconButtonProps, Collapse} from "@mui/material";

type ConfirmButtonProps  = IconButtonProps & {
	onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ConfirmButton = ({onConfirm, ...props}: ConfirmButtonProps) => {
	const [askingForConfirmation, setAskingForConfirmation] = useState(false);
	const [growDirection, setGrowDirection] = useState<'right' | 'left'>('right');
	const iconButtonRef = useRef<HTMLButtonElement>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (askingForConfirmation && iconButtonRef.current && confirmButtonRef.current) {
			const iconRect = iconButtonRef.current.getBoundingClientRect();
			const confirmRect = confirmButtonRef.current.getBoundingClientRect();
			const spaceRight = window.innerWidth - iconRect.right;
			const spaceLeft = iconRect.left;
			const confirmWidth = confirmRect.width;
			if (spaceRight >= confirmWidth) {
				setGrowDirection('right');
			} else if (spaceLeft >= confirmWidth) {
				setGrowDirection('left');
			} else {
				// Default to right if neither fits
				setGrowDirection('right');
			}
		}
	}, [askingForConfirmation]);

	return (
		<Box
			sx={{
				position: 'relative',
				display: 'inline-block',
				borderRadius: 1,
				...(
					askingForConfirmation ?
					{ borderColor: props?.color, borderWidth: 1 } : {}
				)
		}}
		>
			<IconButton {...props} ref={iconButtonRef} onClick={(e) => {
				setAskingForConfirmation(!askingForConfirmation);
				if (props.onClick) props.onClick(e);
			}} />
			<Box
				sx={growDirection === 'right'
					? { position: 'absolute', top: 0, left: '100%' }
					: { position: 'absolute', top: 0, right: '100%' }
				}
			>
				<Collapse in={askingForConfirmation} orientation={'horizontal'}>
					<Button
						variant={'contained'}
						color={props?.color == 'default' ? 'primary' : props?.color}
						size={props?.size}
						onClick={onConfirm}
						ref={confirmButtonRef}
					>
						Confirm
					</Button>
				</Collapse>
			</Box>
		</Box>
	)
}

export default ConfirmButton;
