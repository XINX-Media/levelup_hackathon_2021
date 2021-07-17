import { useState, useEffect } from "react";

export const useSearch = () => {
	const [search, setSearch] = useState({});

	const refreshSearch = () => {
		let search = window.location.hash;
		if (search === "") {
			setSearch({});
		} else {
			search = search.substr(1);
			const searchList = search.split("&");
			const searchMap = searchList.reduce((obj, entry) => {
				const [key, value] = entry.split("=");
				return {
					...obj,
					[key]: decodeURIComponent(value),
				};
			}, {});
			setSearch(searchMap);
		}
	}

	useEffect(() => {
		refreshSearch();
	}, [window.location.hash]);

	useEffect(() => {
		window.addEventListener('hashchange', refreshSearch);

		return () => {
			window.removeEventListener('hashchange', refreshSearch);
		}
	}, []);

	const updateSearch = (data) => {
		const newSearchObj = {
			...search,
			...data,
		};
		const searchList = Object.keys(newSearchObj).map((key) => {
			const value = encodeURIComponent(newSearchObj[key]);
			return `${key}=${value}`;
		});
		
		const newSearch = searchList.join('&');
		window.location.hash = newSearch;
	}

	return {
		search,
		updateSearch,
	};
}