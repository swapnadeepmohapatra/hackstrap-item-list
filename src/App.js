import React from 'react';
import logo from './logo.svg';
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
							<input type="text" placeholder="Search in Industries" name="" id="" />
							<span>
								<svg
									width="19"
									height="20"
									viewBox="0 0 19 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M7.72008 0.76001C3.78094 0.76001 0.580078 3.96087 0.580078 7.90001C0.580078 11.8392 3.78094 15.04 7.72008 15.04C9.27867 15.04 10.7191 14.538 11.8938 13.6881L17.4195 19.2006L18.6007 18.0194L13.1407 12.5463C14.2137 11.2961 14.8601 9.67353 14.8601 7.90001C14.8601 3.96087 11.6592 0.76001 7.72008 0.76001ZM7.72008 1.60001C11.2048 1.60001 14.0201 4.41532 14.0201 7.90001C14.0201 11.3847 11.2048 14.2 7.72008 14.2C4.23539 14.2 1.42008 11.3847 1.42008 7.90001C1.42008 4.41532 4.23539 1.60001 7.72008 1.60001Z"
										fill="black"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div className="line"></div>
					<div className="categories-table-div">
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
