import { RefObject, useCallback } from 'react';

interface Options {
	duration: number;
	fill?: 'forwards';
}

const useAnimation = (element: RefObject<HTMLDivElement>) => {
	const slideRight = useCallback(
		(options: Options) => {
			element?.current?.animate(
				[
					{
						transform: 'translateX(-100%)',
						opacity: 0,
					},
					{
						transform: 'translateX(15%)',
					},
					{
						transform: 'translateX(0)',
						opacity: 1,
					},
				],
				options
			);
		},
		[element]
	);

	const backgroundSlideLeft = useCallback(
		(options: Options) => {
			element?.current?.animate(
				[
					{
						backgroundPositionX: '0%',
					},
					{
						backgroundPositionX: '100%',
					},
				],
				options
			);
		},
		[element]
	);

	return { slideRight, backgroundSlideLeft };
};

export default useAnimation;
