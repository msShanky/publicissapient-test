import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Mounts the application', () => {
	const { container } = render(<App />);
	expect(container).toBeInTheDocument();
});
