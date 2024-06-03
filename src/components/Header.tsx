export const Header = ({ stars }: { stars: string }) => {
	return (
		<header className="mb-12 border-b-2">
			<nav className="flex mx-auto max-w-2xl lg:max-w-7xl flex-row items-end  border-[#F1F5F9]">
				<img
					className="mr-auto"
					src="/assets/images/logo.svg"
					alt="logo"
					aria-label="Awesome Prometheus Toolkit"
				/>

				<a
					href="https://github.com/samber/awesome-prometheus-alerts"
					target="_blank"
					rel="noreferrer"
				>
					<p className="text-[#475569] font-medium m-0 p-0 flex flex-row items-center">
						<img
							className="inline"
							src="/assets/icons/github.svg"
							alt="github-logo"
						/>
						{stars} stars
					</p>
				</a>
			</nav>
		</header>
	);
};
