import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { memo, useContext, useEffect } from "react";
import { parse } from "yaml";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { RuleModal } from "../components/RuleModal";
import { Groups } from "../components/Services";
import { StoreContext } from "../store";
import type { Group } from "../types/rules.types";

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { dispatch } = useContext(StoreContext);

	useEffect(() => {
		dispatch({
			type: "FULL_GROUPS",
			payload: { groups: props?.groups, filterGroups: props?.groups },
		});
	}, []);

	return (
		<div className="mx-5">
			<Header stars={props?.stars} />
			<main className="md:mx-auto lg:max-w-5xl xl:max-w-7xl h-dvh">
				<p className="text-2xl font-medium text-slate-600 mb-4">
					Browse Library
				</p>
				<Input />
				<Groups />
				<RuleModal />
			</main>
			<Footer />
		</div>
	);
};

export default memo(Home);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const groups: Group[] = await fetch(
		"https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/_data/rules.yml",
	)
		.then((r) => r.text())
		.then((d) => parse(d)?.groups);

	const stars = await fetch(
		"https://api.github.com/repos/samber/awesome-prometheus-alerts",
	)
		.then((r) => r.json())
		.then((d) => d?.stargazers_count);

	return {
		props: {
			groups,
			stars,
		},
	};
}
