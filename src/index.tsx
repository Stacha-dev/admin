import React from 'react';
import ReactDOM from 'react-dom';
import GA from 'react-ga';
import { Metric } from 'web-vitals';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './locales';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

GA.initialize('G-2FY8R8YP44', { debug: process.env.NODE_ENV === 'development' });
GA.pageview(window.location.pathname + window.location.search);

const sendToAnalytics = (metric: Metric) => {
	const { id, name, value } = metric;

	GA.event({
		category: 'Web Vitals',
		action: name,
		label: id.toString(),
		value: Math.round(name === 'CLS' ? value * 1000 : value),
		nonInteraction: true,
	});
};

reportWebVitals(sendToAnalytics);
