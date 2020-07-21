import 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			main: string;
			secondary: string;
			darkSecondary: string;
			background: string;
		};
	}
}
