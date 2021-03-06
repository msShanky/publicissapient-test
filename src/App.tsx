import React from 'react';
import './App.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import LandingPage from './components/container';
import { Provider } from 'react-redux';
import { HackerNewsTheme } from './HackerNewsTheme';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.colors.background}
	}
	button{
		border: none;
		::focus ::active {
			border: ${({ theme }) => `${theme.colors.main} solid 0.5px`};
		}
		background: none;
		:hover {
			cursor: pointer;
		}
	}
`;

function App() {
	return (
		<ThemeProvider theme={HackerNewsTheme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<GlobalStyle />
					<LandingPage />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
}

export default App;
