import React, { useState, useEffect } from 'react';
import './App.css';
import ListTable from './components/ListTable';

function App() {
	const data = ['Industries', 'Sectors', 'Categories'];
	const [selectedCategory, setSelectedCategory] = useState('Industries');

	const changeCategory = (item) => (event) => {
		setSelectedCategory(item);
	};

	return (
		<div className="App">
			<div className="bg-card">
				<h4 className="bg-card-heading">Manage items in Industry, Sectors, Categories</h4>
				<div className="">
					<div className="line"></div>
					<ul className="manage-items-list">
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
