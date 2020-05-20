import React from 'react';
import logo from './logo.svg';
import SearchIcon from './searchIcon';
import './App.css';

function App() {
	return (
		<div className="App">
			<div className="bg-card">
				<h4 className="bg-card-heading">Manage items in Industry, Sectors, Categories</h4>
				<div className="">
					<div className="line"></div>
					<ul className="manage-items-list">
						<li>
							<button disabled>Industries</button>
						</li>
						<li>
							<button>Sectors</button>
						</li>
						<li>
							<button>Categories</button>
						</li>
					</ul>
				</div>
				<div className="main-card">
					<div className="main-card-head">
						<h4 className="main-card-heading">Industries</h4>
						<div className="input-div">
							<input type="text" placeholder="Search in Industries" />
							<span>
								<button className="search-button">
									<SearchIcon />
								</button>
							</span>
						</div>
					</div>
					<div className="line"></div>
					<div className="categories-table-div">
						<div className="add-item-div">
							<span>Add new item </span>
							<input type="text" placeholder="Enter the name" />
							<button>Save</button>
						</div>
						<table className="categories-table">
							<tbody>
								<tr>
									<td>
										<div>1. {'Pets & Animals'}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>2. {'Professional & Commercial Services'}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>3. {'Textiles & Apparel'}</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
