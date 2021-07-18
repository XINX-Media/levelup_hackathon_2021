import React from 'react';

import { UserProvider } from './contexts/UserContext';
import { HeartsProvider } from './contexts/HeartsContext';
import { CardProvider } from './contexts/CardContext';
import MainApp from './MainApp';

import styles from './styles.css';

export default function App() {
	return (<div className={styles.appRoot}>
		<UserProvider>
			<HeartsProvider>
				<CardProvider>
					<MainApp />
				</CardProvider>
			</HeartsProvider>
		</UserProvider>
		
	</div>);
}