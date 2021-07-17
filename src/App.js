import React from 'react';

import { UserProvider } from './contexts/UserContext';
import MainApp from './MainApp';

import styles from './styles.css';

export default function App() {
	return (<div className={styles.appRoot}>
		<UserProvider>
			<MainApp />
		</UserProvider>
		
	</div>);
}