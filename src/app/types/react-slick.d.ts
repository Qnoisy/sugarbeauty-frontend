declare module 'react-slick' {
	import * as React from 'react';

	export interface Settings {
		className?: string;
		dots?: boolean;
		infinite?: boolean;
		speed?: number;
		slidesToShow?: number;
		slidesToScroll?: number;
		arrows?: boolean;
		autoplay?: boolean;
		autoplaySpeed?: number;
		centerMode?: boolean;
		centerPadding?: string;
		responsive?: {
			breakpoint: number;
			settings: Partial<Settings>;
		}[];
	}

	export default class Slider extends React.Component<
		Settings & { children?: React.ReactNode }
	> {
		slickNext(): void;
		slickPrev(): void;
		slickGoTo(index: number): void;
	}
}
