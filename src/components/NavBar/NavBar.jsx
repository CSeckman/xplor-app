import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
	return (
		<>
			{user ? (
				<nav className="navbar navbar-expand">
					<div className="container-fluid access">
						<Link className="navbar-brand" to='/'>X'plor</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="navbar-brand" to='' onClick={handleLogout}>Log Out</Link>
								</li>
								<li className="nav-item">
									<Link className="navbar-brand" to='/profile' onClick="">{user.name}'s Profile</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			) : (
				<nav className="navbar navbar-expand ">
					<div className="container-fluid access">
						<Link className="navbar-brand" to='/'>X'plor</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="navbar-brand access" to="/login">Log In</Link>
								</li>
								<li className="nav-item">
									<Link className="navbar-brand access" to="/signup">Sign Up</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

			)}
		</>
	)
}

export default NavBar
