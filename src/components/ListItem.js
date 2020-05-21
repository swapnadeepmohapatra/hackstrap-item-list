import React, { useState, useEffect } from 'react';
import CheckIcon from '../assets/CheckBoxIcon';
import Axios from 'axios';

function ListItem({ index, selectedCategory, items }) {
	const data = ['Industries', 'Sectors', 'Categories'];
	const [conformState, setConformState] = useState({ action: '', editVal: '', show: false });
	const [displayMenu, setDisplayMenu] = useState(false);
	const [moveMenu, setMoveMenu] = useState({ value: '', to: '' });
	const [state, setState] = useState({
		searchKeyword: '',
		addItem: '',
	});

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

	const changeValue = (item, index, editVal) => (event) => {
		event.preventDefault();
		if (item === 'edit') {
			if (conformState.action === 'edit') {
				setConformState({ action: '', show: false });
			} else {
				setConformState({ action: item, show: true, editVal: editVal });
			}
		} else if (item === 'delete') {
			if (conformState.action === 'delete') {
				setConformState({ action: '', show: false });
			} else {
				setConformState({ action: item, show: true });
			}
		} else if (item === 'move') {
			setConformState({ action: item, show: true });
			showDropdownMenu(true);
			setMoveMenu({ ...setMoveMenu, value: editVal });
		}
	};

	const conformChange = (event) => {
		event.preventDefault();
		const { action, editVal, index } = conformState;

		if (action === 'delete') {
			// TODO: DELETE

			Axios.post('http://localhost:1234/database/modify/delete', {
				name: editVal,
				collection: selectedCategory.toLowerCase(),
			});

			// data[selectedCategory].items.splice(index, 1);
			// setData({ ...data });
			setConformState({ action: '', show: false });
		}

		if (action === 'edit') {
			Axios.post('http://localhost:1234/database/modify/update', {
				name: items,
				updateName: editVal,
				collection: selectedCategory.toLowerCase(),
			});

			// TODO: EDIT
			// data[selectedCategory].items[index] = editVal;
			// setData({ ...data });
			setConformState({ action: '', show: false, editVal: '' });
		}

		if (action === 'move') {
			Axios.post('http://localhost:1234/database/modify/moveData', {
				name: moveMenu.value,
				newCollection: moveMenu.to,
				collection: selectedCategory.toLowerCase(),
			});

			// TODO: MOVE
			// var indexOfDataToBeRemoved = data[selectedCategory].items.indexOf(moveMenu.value);
			// if (indexOfDataToBeRemoved !== -1) data[selectedCategory].items.splice(indexOfDataToBeRemoved, 1);
			// data[moveMenu.to].items.push(moveMenu.value);
			// setData({ ...data });
			setConformState({ action: '', show: false, editVal: '' });
			showDropdownMenu(-1);
		}
	};

	const showDropdownMenu = (index) => {
		console.log(index);
		setDisplayMenu(!displayMenu);
		if (displayMenu) {
			setConformState({ ...conformState, action: '', show: false });
		}
	};

	const handleCheckBoxChange = (item, items) => (event) => {
		setMoveMenu({ ...moveMenu, to: item });
	};

	return (
		<tr>
			<td>
				{conformState.action === 'edit' && conformState.show ? (
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
					<button className="edit" onClick={changeValue('edit', index, items)}>
						Edit
					</button>
					<button className="move" onClick={changeValue('move', index, items)}>
						Move
					</button>
					<button className="delete" onClick={changeValue('delete', index, items)}>
						Delete
					</button>
					<button
						disabled={conformState.action === 'move' && !moveMenu.to}
						className={conformState.action}
						onClick={conformChange}
						style={{
							visibility: conformState.show ? 'visible' : 'hidden',
						}}
					>
						{conformState.action === 'edit' ? 'Save' : 'Conform'}
					</button>
					{displayMenu && conformState.action === 'move' ? (
						<div className="menu">
							<span>Move To</span>
							{data.map((item, index) => {
								if (item !== selectedCategory) {
									return (
										<div key={index}>
											<input
												type="checkbox"
												id={index}
												onChange={handleCheckBoxChange(item, index, items)}
											/>
											<label htmlFor={index}>
												{item}
												<CheckIcon
													className="check-box-label"
													color={item === moveMenu.to ? '#E8B103' : '#81869F'}
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
}

export default ListItem;
