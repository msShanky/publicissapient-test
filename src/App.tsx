import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import LandingPage from './components/container';
import { Provider } from 'react-redux';
import { HackerNewsTheme } from './HackerNewsTheme';
import { store } from './store';

function App() {
	// TODO: Use Redux to setup the base fetching of data
	return (
		<ThemeProvider theme={HackerNewsTheme}>
			<Provider store={store}>
				<LandingPage />
			</Provider>
		</ThemeProvider>
	);
}

export default App;
