import React, { useState } from 'react';
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
	const [conformState, setConformState] = useState({ action: '', editVal: '', index: -1 });
	const [displayMenu, setDisplayMenu] = useState(-1);

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
		if (item === 'editItem') {
			setConformState({ ...conformState, editVal: event.target.value });
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

	const changeValue = (item, index, editVal) => (event) => {
		event.preventDefault();
		console.log(item, index);
		if (item === 'edit') {
			setConformState({ action: item, index: index, editVal: editVal });
		} else {
			setConformState({ action: item, index: index });
		}
	};

	const doChange = (event) => {
		event.preventDefault();
		const { action, editVal, index } = conformState;

		if (action === 'delete') {
			data[selectedCategory].items.splice(index, 1);
			setData({ ...data });
			setConformState({ action: '', index: -1 });
		}

		if (action === 'edit') {
			data[selectedCategory].items[index] = editVal;
			setData({ ...data });
			setConformState({ action: '', index: -1, editVal: '' });
		}
	};

	const showDropdownMenu = (index) => (event) => {
		event.preventDefault();
		setDisplayMenu(index);
	};

	return (
		<div className="App">
			<div className="bg-card">
				<h4 className="bg-card-heading">Manage items in Industry, Sectors, Categories</h4>
				<div className="">
					<div className="line"></div>
					<ul className="manage-items-list">
						{Object.keys(data).map((item, index) => {
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
											<tr key={index}>
												<td>
													{conformState.action === 'edit' && conformState.index === index ? (
														<form onSubmit={doChange} className="item-titles">
															{` ${index + 1}. `}
															<input
																onChange={handleOnChange('editItem')}
																type="text"
																name=""
																id=""
																value={conformState.editVal}
															/>
														</form>
													) : (
														<div className="item-titles">{` ${index + 1}.  ${items}`}</div>
													)}
													<div className="buttons">
														<button onClick={changeValue('edit', index, items)}>
															Edit
														</button>
														{/* <button onClick={changeValue('move', index, items)}> */}
														<button onClick={showDropdownMenu(index)}>Move</button>
														<button onClick={changeValue('delete', index)}>Delete</button>
														<button
															onClick={doChange}
															style={{
																visibility:
																	index === conformState.index ? 'visible' : 'hidden',
															}}
														>
															Conform
														</button>
														{/* {displayMenu === index ? (
															<div>
																<ul>
																	<li>
																		<a href="#Manage Pages">Manage Pages</a>
																	</li>
																	<li>
																		<a href="#Create Ads">Create Ads</a>
																	</li>
																</ul>
															</div>
														) : null} */}
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
