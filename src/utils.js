import { useState, useEffect } from "react";

export const useSearch = () => {
	const [search, setSearch] = useState({});
	const [searchLoaded, setSearchLoaded] = useState(false);

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
		setSearchLoaded(true);
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
		searchLoaded,
	};
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// derived from https://stackoverflow.com/a/10727155/8346513
export function randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}