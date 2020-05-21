import React, { useState, useEffect } from 'react';
import SearchIcon from '../assets/SearchIcon';
import ListItem from './ListItem';
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
		<div className="main-card">
			<div className="main-card-head">
				<h4 className="main-card-heading">{selectedCategory}</h4>
				<div className="input-div">
					<input
						type="text"
						placeholder={`Search in ${selectedCategory}`}
						value={searchKeyword}
						onChange={handleOnChange('searchItem')}
					/>
					<span>
						<button className="search-button">
							<SearchIcon />
						</button>
					</span>
				</div>
			</div>
			<div className="line"></div>
			<div className="categories-table-div">
				<form className="add-item-div" onSubmit={addNewItem}>
					<span>Add new item </span>
					<input
						type="text"
						value={addItem}
						placeholder="Enter the name"
						onChange={handleOnChange('newItem')}
					/>
					<button>Save</button>
				</form>
				<table className="categories-table">
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
