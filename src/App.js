import React, { useState } from 'react';
import SearchIcon from './assets/SearchIcon';
import CheckIcon from './assets/CheckBoxIcon';
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
	const [conformState, setConformState] = useState({ action: '', editVal: '', index: -1 });
	const [displayMenu, setDisplayMenu] = useState(-1);
	const [moveMenu, setMoveMenu] = useState({ value: '', to: '' });
	const [state, setState] = useState({
		searchKeyword: '',
		addItem: '',
	});

	const { addItem, searchKeyword } = state;

	const changeCategory = (item) => (event) => {
		setSelectedCategory(item);
	};

	const handleOnChange = (item) => (event) => {
		if (item === 'newItem') {
			setState({ ...state, addItem: event.target.value });
		}
		if (item === 'searchItem') {
			setState({ ...state, searchKeyword: event.target.value });
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
		setState({ ...state, addItem: '' });
	};

	const changeValue = (item, index, editVal) => (event) => {
		event.preventDefault();
		if (item === 'edit') {
			if (conformState.action === 'edit') {
				setConformState({ action: '', index: -1 });
			} else {
				setConformState({ action: item, index: index, editVal: editVal });
			}
		} else if (item === 'delete') {
			if (conformState.action === 'delete') {
				setConformState({ action: '', index: -1 });
			} else {
				setConformState({ action: item, index: index });
			}
		} else if (item === 'move') {
			setConformState({ action: item, index: index });
			showDropdownMenu(index);
			setMoveMenu({ ...setMoveMenu, value: editVal });
		}
	};

	const conformChange = (event) => {
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

		if (action === 'move') {
			var indexOfDataToBeRemoved = data[selectedCategory].items.indexOf(moveMenu.value);
			if (indexOfDataToBeRemoved !== -1) data[selectedCategory].items.splice(indexOfDataToBeRemoved, 1);

			data[moveMenu.to].items.push(moveMenu.value);
			setData({ ...data });
			setConformState({ action: '', index: -1, editVal: '' });
			showDropdownMenu(-1);
		}
	};

	const showDropdownMenu = (index) => {
		if (displayMenu === index) {
			setDisplayMenu(-1);
			setConformState({ ...conformState, action: '', index: -1 });
		} else {
			setDisplayMenu(index);
		}
	};

	const handleCheckBoxChange = (item, items) => (event) => {
		setMoveMenu({ ...moveMenu, to: item });
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
														<form onSubmit={conformChange} className="item-titles">
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
														<button
															className="edit"
															onClick={changeValue('edit', index, items)}
														>
															Edit
														</button>
														<button
															className="move"
															onClick={changeValue('move', index, items)}
														>
															Move
														</button>
														<button
															className="delete"
															onClick={changeValue('delete', index)}
														>
															Delete
														</button>
														<button
															className="conform"
															onClick={conformChange}
															style={{
																visibility:
																	index === conformState.index ? 'visible' : 'hidden',
															}}
														>
															{conformState.action === 'edit' ? 'Save' : 'Conform'}
														</button>
														{displayMenu === index ? (
															<div className="menu">
																<span>Move To</span>
																{Object.keys(data).map((item, index) => {
																	if (item !== selectedCategory) {
																		return (
																			<div key={index}>
																				<input
																					type="checkbox"
																					id={index}
																					onChange={handleCheckBoxChange(
																						item,
																						index,
																						items
																					)}
																				/>
																				<label htmlFor={index}>
																					{item}
																					<CheckIcon
																						className="check-box-label"
																						color={
																							item === moveMenu.to
																								? '#E8B103'
																								: '#81869F'
																						}
																					/>
																				</label>
																			</div>
																		);
																	}
																})}
															</div>
														) : null}
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
