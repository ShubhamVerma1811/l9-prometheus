import { useContext, useEffect, useRef, type ChangeEvent } from "react";
import { StoreContext } from "../store";

export const Input = () => {
	const { state, dispatch } = useContext(StoreContext);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// @ts-ignore
		function handleKeyPress(e) {
			if (e.key === "/") {
				inputRef.current?.focus();
			}
		}

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredGroups = state?.groups?.map((group) => {
			const filteredServices = group.services.filter((s) =>
				s.name.toLowerCase().includes(e.target.value.toLowerCase()),
			);
			return { ...group, services: filteredServices };
		});

		dispatch({
			type: "FILTER_GROUPS",
			payload: {
				filterGroups: filteredGroups,
			},
		});
	};

	return (
		<div className="flex flex-row items-center border-2 border-slate-100 p-3 w-full rounded">
			<img
				src="/assets/icons/search.svg"
				className="w-4 h-4 mr-1"
				alt="search"
			/>
			<input
				type="text"
				placeholder="Search for a component"
				className="outline-none w-full"
				ref={inputRef}
				onChange={handleOnChange}
			/>
			<p className="rounded px-2.5 bg-slate-100 ml-auto">/</p>
		</div>
	);
};
