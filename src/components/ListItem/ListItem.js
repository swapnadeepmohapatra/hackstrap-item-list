import React, { useState } from 'react';
import CheckIcon from '../../assets/CheckBoxIcon';
import Axios from 'axios';
import Styles from './index.module.css';

function ListItem({ index, selectedCategory, items }) {
	const data = ['Industries', 'Sectors', 'Categories'];
	const [conformState, setConformState] = useState({ action: '', editVal: '', show: false });
	const [displayMenu, setDisplayMenu] = useState(false);
	const [moveMenu, setMoveMenu] = useState({ value: '', to: '' });

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

	return (
		<tr>
			<td>
				{conformState.action === 'edit' && conformState.show ? (
					<form onSubmit={conformChange} className={Styles.itemTitles}>
						{` ${index + 1}. `}
						<input
							onChange={(event) => {
								setConformState({ ...conformState, editVal: event.target.value });
							}}
							type="text"
							name=""
							id=""
							value={conformState.editVal}
						/>
					</form>
				) : (
					<div className={Styles.itemTitles}>{` ${index + 1}.  ${items}`}</div>
				)}
				<div className={Styles.buttons}>
					<button className={Styles.edit} onClick={changeValue('edit', index, items)}>
						Edit
					</button>
					<button className={Styles.move} onClick={changeValue('move', index, items)}>
						Move
					</button>
					<button className={Styles.delete} onClick={changeValue('delete', index, items)}>
						Delete
					</button>
					<button
						disabled={conformState.action === 'move' && !moveMenu.to}
						onClick={conformChange}
						className={Styles[conformState.action]}
						style={{
							visibility: conformState.show ? 'visible' : 'hidden',
						}}
					>
						{conformState.action === 'edit' ? 'Save' : 'Conform'}
					</button>
					{displayMenu && conformState.action === 'move' ? (
						<div className={Styles.menu}>
							<span>Move To</span>
							{data.map((item, index) => {
								if (item !== selectedCategory) {
									return (
										<div key={index}>
											<input
												type="checkbox"
												id={index}
												onChange={(event) => {
													setMoveMenu({ ...moveMenu, to: item });
												}}
											/>
											<label htmlFor={index}>
												{item}
												<CheckIcon color={item === moveMenu.to ? '#E8B103' : '#81869F'} />
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
