import React, { useReducer } from "react";
import type { Group } from "../types/rules.types";

type State = {
	groups?: Array<Group>;
	isModalOpen: boolean;
	activeRule?: Array<Group>;
	activeGroupName?: string;
};

const initialState: State = {
	groups: [],
	activeRule: [],
	isModalOpen: false,
};

export const StoreContext = React.createContext<State>(initialState);

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(storeReducer, null);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export const storeReducer = (state: State, action) => {
	switch (action.type) {
		case "INIT":
			return { ...state, ...action.payload };

		case "TOGGLE_MODAL":
			return { ...state, isModalOpen: !state?.isModalOpen };

		case "ACTIVE_RULES":
			return { ...state, activeRule: action.payload.rule };

		case "ACTIVE_GROUP_NAME":
			return { ...state, activeGroupName: action.payload.activeGroupName };

		case "FILTER_GRPOUPS":
			return { ...state, filterGroups: action.payload.filterGroups };

		default:
			return { ...state, isModalOpen: true };
	}
};
