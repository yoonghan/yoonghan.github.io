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
    const response: string = await fetch("https://azure.walcron.com/healthz").then((res) => res.text())
    return response
}


const successResponse = wrapPromise(callAzureWalcron())

const Result = () => {
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

    const readSuccessResponse = catchAble(successResponse)

    return (
        <div>
            {readSuccessResponse === "ready" ? (
                <iframe src="https://azure.walcron.com" allow="fullscreen" allowFullScreen className="w-full h-screen" data-testid="azure-integration" />
            ) : (
                <div>Unable to load screen</div>
            )}
        </div>
    )
}

const SuspenseLoader = () => {
    return (
        <Suspense
            fallback={<div style={{ color: "green" }}>Warming Up Container</div>}
        >
            <Result />
        </Suspense>
    )
}

const AzureIntegration = () => <>
    <h1>Azure Integration for TODO List</h1>
    <SuspenseLoader />
</>

export default memo(AzureIntegration)