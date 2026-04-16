import { memo, Suspense } from "react"
import wrapPromise from "@/components/utils/common/wrapPromise"
import { site } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Azure Integration",
    description: "Integration with Azure as test bed.",
    alternates: {
        ...site.generateCanonical("/projects/azure"),
    },
}

const callAzureWalcron = async () => {
    const response: string = await fetch("https://azure.walcron.com/healthz", { cache: "no-store" }).then((res) => {
        if (!res.ok) throw new Error("Unable to fetch");
        return res.text();
    })
    return response
}

const Result = ({ promise }: { promise: { read: () => any } }) => {
    const catchAble = (response: { read: () => string | Error }) => {
        try {
            return response.read()
        } catch (e: any) {
            if (typeof e?.then === "function") {
                throw e
            }
            return e
        }
    }
    const readSuccessResponse = catchAble(promise)

    return (
        <div>
            {typeof readSuccessResponse === "string" ? readSuccessResponse : null}
            {readSuccessResponse === "ready" ? (
                <iframe src="https://azure.walcron.com" allowFullScreen className="w-full h-screen" data-testid="azure-integration" />
            ) : (
                <div>Unable to load screen</div>
            )}
        </div>
    )
}

const SuspenseLoader = ({ promise }: { promise: { read: () => any } }) => {
    return (
        <Suspense
            fallback={<div style={{ color: "green" }}>Warming Up Container</div>}
        >
            <Result promise={promise} />
        </Suspense>
    )
}

const AzureIntegration = () => {
    const successResponse = wrapPromise(callAzureWalcron())
    return (
        <>
            <h1>Azure Integration for TODO List</h1>
            <SuspenseLoader promise={successResponse} />
        </>
    )
}

export default memo(AzureIntegration)