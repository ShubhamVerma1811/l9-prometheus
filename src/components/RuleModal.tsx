import { useContext, useEffect, useState } from "react";
import { parse } from "yaml";
import { StoreContext } from "../store";
import { CardRule } from "./CardRule";
import { Modal } from "./Modal";

export const RuleModal = () => {
	const [activeRule, setActiveRule] = useState(null);
	const { state, dispatch } = useContext(StoreContext);

	const activeService = state?.groups
		?.find((i) => i.name === state?.parentGroupName)
		?.services?.find((s) => s.name === state?.activeGroupName);

	async function getGroupRules(name?: string, slug?: string) {
		const url = `https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/${name
			?.replaceAll(" ", "-")
			.toLowerCase()}/${slug}.yml`;

		const data = await fetch(url)
			.then((r) => r.text())
			.then((d) => parse(d));

		return data;
	}

	useEffect(() => {
		if (state?.isModalOpen) {
			getGroupRules(state.activeGroupName, state?.activeGroupSlug).then((d) =>
				setActiveRule(d),
			);
		} else {
			setActiveRule(null);
		}
	}, [state?.isModalOpen]);

	return (
		<Modal isOpen={state?.isModalOpen}>
			<Modal.Header>
				<div className="py-4 px-6 rounded flex flex-row items-center">
					<p className="font-bold text-2xl text-slate-600">
						{activeService?.name}
					</p>
					<p className="bg-slate-100 text-slate-400 font-bold text-sm py-1 px-2 mx-2 rounded-full">
						{activeService?.exporters?.[0]?.rules?.length} Rules
					</p>
					<button
						type="button"
						onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
						className="text-gray-600 hover:text-gray-900 ml-auto"
					>
						<img src="/assets/icons/close.svg" alt="close-icon" />
					</button>
				</div>
			</Modal.Header>
			<Modal.Body>
				{activeRule ? (
					//@ts-ignore
					activeRule?.groups?.[0]?.rules?.map((rule, idx) => {
						return (
							<CardRule
								key={rule.alert}
								activeService={activeService}
								rule={rule}
								idx={idx}
							/>
						);
					})
				) : (
					<p className="font-bold text-xl text-center text-gray-600">
						Loading...
					</p>
				)}
			</Modal.Body>
		</Modal>
	);
};
