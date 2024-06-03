import { useContext } from "react";
import { StoreContext } from "../store";
import { CardRule } from "./CardRule";
import { Modal } from "./Modal";

export const RuleModal = () => {
	const { state, dispatch } = useContext(StoreContext);

	const activeService = state?.data?.groups
		?.find((i) => i.name === state?.activeGroupName?.[0])
		?.services?.find((s) => s.name === state?.activeGroupName?.[1]);

	return (
		<Modal isOpen={state?.isModalOpen}>
			<Modal.Header>
				<div className="py-4 px-6 rounded flex flex-row items-center">
					<p className="font-bold text-2xl text-[#475569]">
						{activeService?.name}
					</p>
					<p className="bg-[#F1F5F9] text-[#94A3B8] font-bold text-sm py-1 px-2 mx-2 rounded-full">
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
				{state?.activeRule?.groups?.[0]?.rules?.map((rule, idx) => {
					return (
						<CardRule
							key={rule.alert}
							activeService={activeService}
							rule={rule}
							idx={idx + 1}
						/>
					);
				})}
			</Modal.Body>
		</Modal>
	);
};
