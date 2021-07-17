import { useState, useEffect } from "react";

export const useSearch = () => {
	const [search, setSearch] = useState({});

	useEffect(() => {
		let search = window.location.search;
		if (search === "") {
			setSearch({});
		} else {
			// remove the "?"
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
	}, [window.location.search]);

	return search;
}