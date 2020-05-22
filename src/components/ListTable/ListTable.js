import React, { useState, useEffect } from 'react';
import SearchIcon from '../../assets/SearchIcon';
import ListItem from '../ListItem/ListItem';
import Styles from './index.module.css';
import Axios from 'axios';

function ListTable({ selectedCategory }) {
	const [data, setData] = useState({
		Industries: {
			name: 'Industries',
			index: 0,
			items: [],
		},
		Sectors: {
			name: 'Sectors',
			index: 1,
			items: [],
		},
		Categories: {
			name: 'Categories',
			index: 2,
			items: [],
		},
	});

	const [state, setState] = useState({
		searchKeyword: '',
		addItem: '',
	});

	useEffect(() => {
		fetch('https://api.hackstrap.com/beta/api/database/autocomplete?type=industries')
			.then((res) => res.json())
			.then((response) => {
				response.map((element) => {
					data.Industries.items.push(element.name);
				});
				setData({ ...data });
			});

		fetch('https://api.hackstrap.com/beta/api/database/autocomplete?type=sectors')
			.then((res) => res.json())
			.then((response) => {
				response.map((element) => {
					data.Sectors.items.push(element.name);
				});
				setData({ ...data });
			});

		fetch('https://api.hackstrap.com/beta/api/database/autocomplete?type=categories')
			.then((res) => res.json())
			.then((response) => {
				response.map((element) => {
					data.Categories.items.push(element.name);
				});
				setData({ ...data });
			});
	}, []);

	const { addItem, searchKeyword } = state;

	const handleOnChange = (item) => (event) => {
		if (item === 'newItem') {
			setState({ ...state, addItem: event.target.value });
		}
		if (item === 'searchItem') {
			setState({ ...state, searchKeyword: event.target.value });
		}
	};

	const addNewItem = (event) => {
		event.preventDefault();

		if (addItem === '') {
			return alert('The Field cannot be empty');
		}
		console.log(addItem);

		Axios.post('http://localhost:1234/database/modify/add', {
			name: addItem,
			collection: selectedCategory.toLowerCase(),
		});
	};

	return (
		<div className={Styles.mainCard}>
			<div className={Styles.mainCardHead}>
				<h4 className={Styles.mainCardHeading}>{selectedCategory}</h4>
				<div className={Styles.inputDiv}>
					<input
						type="text"
						placeholder={`Search in ${selectedCategory}`}
						value={searchKeyword}
						onChange={handleOnChange('searchItem')}
					/>
					<span>
						<button className={Styles.searchButton}>
							<SearchIcon />
						</button>
					</span>
				</div>
			</div>
			<div className={Styles.line}></div>
			<div className={Styles.categoriesTableDiv}>
				<form className={Styles.addItemDiv} onSubmit={addNewItem}>
					<span>Add new item </span>
					<input
						type="text"
						value={addItem}
						placeholder="Enter the name"
						onChange={handleOnChange('newItem')}
					/>
					<button>Save</button>
				</form>
				<table className={Styles.categoriesTable}>
					<tbody>
						{data[selectedCategory].items
							.filter((item) => item.toLowerCase().includes(searchKeyword))
							.map((items, index) => {
								return <ListItem index={index} items={items} selectedCategory={selectedCategory} />;
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ListTable;
