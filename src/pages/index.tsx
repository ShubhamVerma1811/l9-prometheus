import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { memo, useContext, useEffect } from "react";
import { parse } from "yaml";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { RuleModal } from "../components/RuleModal";
import { Groups } from "../components/Services";
import { StoreContext } from "../store";
import type { Rules } from "../types/rules.types";

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { dispatch } = useContext(StoreContext);

	useEffect(() => {
		dispatch({
			type: "INIT",
			payload: {
				groups: props?.data?.groups,
				filterGroups: props?.data?.groups,
			},
		});
	}, []);

	return (
		<div className="mx-5">
			<Header stars={props?.stars} />
			<main className="md:mx-auto lg:max-w-5xl xl:max-w-7xl">
				<Hero />
				<Groups />
				<RuleModal />
			</main>
		</div>
	);
};

export default memo(Home);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const data: Rules = await fetch(
		"https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/_data/rules.yml",
	)
		.then((r) => r.text())
		.then((d) => parse(d));

	const stars = await fetch(
		"https://api.github.com/repos/samber/awesome-prometheus-alerts",
	)
		.then((r) => r.json())
		.then((d) => d?.stargazers_count);

	return {
		props: {
			data,
			stars,
		},
	};
}
