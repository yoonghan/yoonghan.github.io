"use client";

import { useEffect } from "react";
import { initOpenTelemetry } from "@/util/otel-web";

export default function OtelProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		initOpenTelemetry(globalThis);
	}, []);

	return <>{children}</>;
}
