import React, { useState } from 'react';
import logo from './logo.svg';
import SearchIcon from './searchIcon';
import './App.css';

function App() {
	const [data, setData] = useState({
		Industries: {
			name: 'Industries',
			index: 0,
			items: ['Pets & Animals', 'Professional & Commercial Services', 'Textiles & Apparel'],
		},
		Sectors: {
			name: 'Sectors',
			index: 1,
			items: ['Agriculture', 'Chemical', 'Education'],
		},
		Categories: {
			name: 'Categories',
			index: 2,
			items: ['Rural', 'Urban', 'Sub-urban'],
		},
	});
	const [selectedCategory, setSelectedCategory] = useState('Industries');
	const [addItem, setAddItem] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');

	const changeCategory = (item) => (event) => {
		setSelectedCategory(item);
	};

	const handleOnChange = (item) => (event) => {
		if (item === 'newItem') {
			setAddItem(event.target.value);
		}
		if (item === 'searchItem') {
			setSearchKeyword(event.target.value);
		}
	};

	const addNewItem = (event) => {
		event.preventDefault();

		if (addItem === '') {
			return alert('The Field cannot be empty');
		}

		let itemArray = data[selectedCategory].items;
		itemArray.push(addItem);
		setData({ ...data });
		setAddItem('');
	};

	return (
		<div className="App">
			<div className="bg-card">
				<h4 className="bg-card-heading">Manage items in Industry, Sectors, Categories</h4>
				<div className="">
					<div className="line"></div>
					<ul className="manage-items-list">
						{Object.keys(data).map((item) => {
							return (
								<li>
									<button onClick={changeCategory(item)} disabled={item === selectedCategory}>
										{item}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
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
										return (
											<tr>
												<td>
													<div className="item-titles">{` ${index + 1}.  ${items}`}</div>
													<div className="buttons">
														<button>Edit</button>
														<button>Move</button>
														<button>Delete</button>
														<button
															style={{ visibility: index === 1 ? 'visible' : 'hidden' }}
														>
															Conform
														</button>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
