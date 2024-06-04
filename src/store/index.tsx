import React, { useReducer } from "react";
import type { Group } from "../types/rules.types";

type State = {
	groups?: Array<Group>;
	filterGroups?: Array<Group>;
	isModalOpen: boolean;
	activeRule?: Array<Group>;
	activeGroupName?: string;
	activeGroupSlug?: string;
	parentGroupName?: string;
};

const initialState: State = {
	groups: [],
	activeRule: [],
	isModalOpen: false,
};

export const StoreContext = React.createContext<{
	state: State;
	dispatch?: any;
}>({ state: initialState });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export const storeReducer = (
	state: State,
	action: { type: string; payload?: any },
) => {
	switch (action.type) {
		case "TOGGLE_MODAL":
			return { ...state, isModalOpen: !state?.isModalOpen };

		case "FULL_GROUPS":
			return {
				...state,
				groups: action.payload.groups,
				filterGroups: action.payload.filterGroups,
			};

		case "FILTER_GROUPS":
			return { ...state, filterGroups: action.payload.filterGroups };

		case "SHOW_GROUP_RULES": {
			return {
				...state,
				isModalOpen: !state?.isModalOpen,
				activeGroupName: action.payload.serviceName,
				activeGroupSlug: action.payload.serviceSlug,
				parentGroupName: action.payload.parentGroupName,
			};
		}

		default:
			return { ...state };
	}
};
