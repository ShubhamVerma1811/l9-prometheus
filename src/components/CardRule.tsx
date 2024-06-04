import copy from "copy-text-to-clipboard";
import { useState } from "react";
import yaml from "yaml";
import type { Rules, Service } from "../types/rules.types";
import { CodeBlock } from "./Code";

export const CardRule: React.FC<{
	idx: number;
	rule: Rules;
	activeService?: Service;
}> = ({ rule, idx, activeService }) => {
	const yml = yaml.stringify(rule);
	const [showCopied, setShowCopied] = useState(false);

	const handleCopyCode = (code: string) => {
		copy(code);
		setShowCopied(true);
		setTimeout(() => setShowCopied(false), 1500);
	};

	return (
		<div className="flex flex-row items-start overflow-auto w-full my-4">
			<p className="mr-4 bg-slate-100 rounded-full p-4 font-bold text-md text-slate-500">
				{new Intl.NumberFormat("en-US", {
					minimumIntegerDigits: 2,
				}).format(idx + 1)}
			</p>
			<div className="w-full">
				<p className="font-medium text-lg text-slate-600 mb-1">
					{activeService?.exporters?.[0]?.rules?.[idx]?.name}
				</p>
				<p className="font-medium text-md text-slate-500">
					{activeService?.exporters?.[0]?.rules?.[idx]?.description}
				</p>

				<div className="relative mt-4 w-full rounded p-4 overflow-scroll">
					<CodeBlock>{yml}</CodeBlock>
					<button
						type="button"
						data-umami-event="copy-code"
						onClick={() => handleCopyCode(yml)}
						className="absolute right-5 top-6 rounded-md bg-gray-900 px-3 py-2 text-white"
					>
						{showCopied ? "Copied" : "Copy"}
					</button>
				</div>
			</div>
		</div>
	);
};
