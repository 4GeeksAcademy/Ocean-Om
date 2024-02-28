import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logoOCEANOM.png"
// import { Login } from "../pages/login";

export const Navbar = () => {

	let location = useLocation();
	console.log(location.pathname)

	return (
		//<nav className="navbar p-0">
		<>
			{location.pathname !== "/" &&
				(<nav id="navbar" className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#1D77AB" }}>
					<div className="container mt-1 ms-2 col-lg-12 col-md-6 col-sm-6">
						<Link to="/">
							<img src={logo} className="card-img-top" alt="..." style={{ width: "50%" }} />
						</Link>
						<div className="ml-auto mr-0">

							<ul className="nav col-lg-12 col-md-12 col-sm-12">
								<li className="nav-item">
									<Link to="/">
										<span className="nav-link active text-light" aria-current="page">Contact Us</span>
									</Link>
								</li>
								<li className="nav-item">
									<span className="nav-link text-light">The Teachers</span>
								</li>
								<li className="nav-item">
									<span className="nav-link text-light">Login</span>
								</li>
							</ul>

						</div>
					</div>
				</nav>
				)
			}
		</>
	);
};
