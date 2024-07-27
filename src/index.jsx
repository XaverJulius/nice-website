import { HashRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";

import "../node_modules/normalize.css/normalize.css"
// import "./assets/style/reset.scss"
import "./assets/style/index-desktop.scss"
import "./assets/style/index-tablet.scss"
import "./assets/style/index-mobile.scss"
import STORE from "./store";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";

var rootEle = document.getElementById('root')
const root = createRoot(rootEle);

const App = () => {
	rootEle.classList.add("light")
	const [hidden, setHidden] = useState(true)


	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			// console.dir(entry.target)
			if (entry.isIntersecting) {
				entry.target.classList.add('viewport-animate');
			} else {
				entry.target.classList.remove('viewport-animate');
			}
		})
	});

	useEffect(() => {
		STORE.HomepageAnimationTags.forEach(a => {
			let x = document.querySelector("." + a)
			if (x) {
				observer.observe(x);
			}
		})

		const floater1 = document.getElementById('floater');
		const floater2 = document.getElementById('floater2');
		const innerHeight = window.innerHeight;
		let prevIndex = 0
		let rotateIndex = 0

		let f1t = -200
		let f1r = -200

		let f2t = -200
		let f2l = -200

		window.addEventListener('scroll', () => {

			const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			const trigger = Math.floor((scrollTop / innerHeight) / 0.7)
			if (trigger > prevIndex) {
				prevIndex = trigger
			} else if (trigger < prevIndex) {
				prevIndex = trigger
			} else {
				return
			}

			rotateIndex = trigger % 2
			if (rotateIndex === 1) {
				f1t = 60
				f1r = -40

				f2t = -200
				f2l = -200
			} else if (rotateIndex === 0) {
				f1t = -200
				f1r = -200

				f2t = 60
				f2l = -40
			}
			console.log(prevIndex, trigger, rotateIndex)
			floater1.style.top = String(f1t) + "%";
			floater1.style.right = String(f1r) + "%";

			floater2.style.top = String(f2t) + "%";
			floater2.style.left = String(f2l) + "%";
		});

	})

	return (
		<React.StrictMode>
			<HashRouter >
				<div id="floater" className="floater"></div>
				<div id="floater2" className="floater2"></div>

				<SideBar hidden={hidden} setHidden={setHidden} />
				<div
					className={`menu-overlay ${hidden ? "" : "show-overlay"}`}
					onClick={() => setHidden(true)}
				></div>

				<div className={`content-wrapper ${hidden ? "" : "blur"}`}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</div>

			</HashRouter>
		</React.StrictMode >
	)
}


try {
	root.render(<App />)
} catch (error) {
	console.dir(error)
	STORE.Cache.Clear()
	root.render(<div>
		The website had an unexpected error, please try reloading. If reloading does not work please try re-opening the website
	</div>
	)
}
