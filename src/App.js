import React from 'react';

import { UserProvider } from './contexts/UserContext';
import { HeartsProvider } from './contexts/HeartsContext';
import MainApp from './MainApp';

import styles from './styles.css';

export default function App() {
	return (<div className={styles.appRoot}>
		<UserProvider>
			<HeartsProvider>
				<MainApp />
			</HeartsProvider>
		</UserProvider>
		
	</div>);
}