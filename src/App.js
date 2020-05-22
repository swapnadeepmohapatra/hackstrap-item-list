import React, { useState, useEffect } from 'react';
import Styles from './App.module.css';
import ListTable from './components/ListTable/ListTable';

function App() {
	const data = ['Industries', 'Sectors', 'Categories'];
	const [selectedCategory, setSelectedCategory] = useState('Industries');

	const changeCategory = (item) => (event) => {
		setSelectedCategory(item);
	};

	return (
		<div className={Styles.App}>
			<div className={Styles.bgCard}>
				<h4 className={Styles.bgCardHeading}>Manage items in Industry, Sectors, Categories</h4>
				<div className="">
					<div className={Styles.line}></div>
					<ul className={Styles.manageItemsList}>
						{data.map((item, index) => {
							return (
								<li key={index}>
									<button onClick={changeCategory(item)} disabled={item === selectedCategory}>
										{item}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
				<ListTable selectedCategory={selectedCategory} />
			</div>
		</div>
	);
}

export default App;
