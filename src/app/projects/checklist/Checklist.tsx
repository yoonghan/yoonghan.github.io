"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import Button from "@/components/Button";
import ScrollableList from "@/components/ScrollableList";
import Table from "@/components/Table";
import { site } from "@/config/site";
import type { CronJob } from "@/types/cron";

const apiUrl = `${site.apiUrl}/cron`;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CronJobCheckList = ({
	latestDeployedCronMessage,
	queryTodayCron,
}: {
	latestDeployedCronMessage?: string;
	queryTodayCron?: boolean;
}) => {
	const [cronHistoryUrl, setCronHistoryUrl] = useState<string | undefined>();
	const { error: cronHistoryError, data: cronHistoryData } = useSWR<CronJob[]>(
		cronHistoryUrl,
		fetcher,
	);
	const { data: latestCron } = useSWR(
		queryTodayCron ? site.cronApiUrl : undefined,
		fetcher,
	);

	const convertToLocalDate = useCallback((createdAt?: string) => {
		if (!createdAt) {
			return "N/A";
		}
		return new Date(createdAt).toLocaleString();
	}, []);

	const onClickViewMore = useCallback(async () => {
		setCronHistoryUrl(apiUrl);
	}, []);

	const cronHistories = useMemo(() => {
		if (cronHistoryData && Array.isArray(cronHistoryData)) {
			return (
				<ScrollableList
					maxItemsToRender={50}
					listItems={cronHistoryData.map((history) => ({
						id: `${history.id}`,
						content: (
							<span>
								<span>{history.source}</span>{" "}
								{convertToLocalDate(`${history.createdAt}`)}
							</span>
						),
					}))}
				/>
			);
		}

		if (cronHistoryError) {
			return (
				<span style={{ color: "red" }}>
					Fetch to {cronHistoryUrl} failed, try again later
				</span>
			);
		}

		if (cronHistoryUrl) {
			return <span>Loading data...</span>;
		}
		return null;
	}, [convertToLocalDate, cronHistoryData, cronHistoryError, cronHistoryUrl]);

	const isDateValid = useCallback(
		(date: string) => date === "N/A" || date === "Invalid Date",
		[],
	);

	const generateCronTable = useCallback(
		(
			checksTitle: string,
			message: string | undefined,
		): {
			Checks: string;
			Active: ReactNode;
			Message: ReactNode;
		} => {
			const date = convertToLocalDate(message);
			const str = date.split(",");
			return {
				Checks: checksTitle,
				Active: (
					<span data-testid={`result ${checksTitle}`}>
						{isDateValid(date) ? "False" : "True"}
					</span>
				),
				Message: (
					<>
						<span data-testid={`message ${checksTitle}`}>
							{isDateValid(date) ? "Cron execution pending" : str[0]}
						</span>
						<span>{str[1]}</span>
					</>
				),
			};
		},
		[convertToLocalDate, isDateValid],
	);

	return (
		<section>
			<h3>CronJob</h3>
			<p>Check Cron job has executed.</p>
			<Table
				headers={["Checks", "Active", "Message"]}
				list={[
					generateCronTable("Since Deployment", latestDeployedCronMessage),
					...(queryTodayCron
						? [generateCronTable("Today's Run", latestCron?.message)]
						: []),
				]}
				className="text-black"
			/>
			{!cronHistoryUrl && (
				<Button onClick={onClickViewMore} color="orange">
					View More
				</Button>
			)}
			{cronHistories}
		</section>
	);
};

export { CronJobCheckList };
