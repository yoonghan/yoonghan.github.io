import { memo, Suspense } from "react"
import wrapPromise from "@/components/utils/common/wrapPromise"
import { site } from "@/config/site"
import { Metadata } from "next"
import TextLoader from "../../../components/TextLoader/TextLoader"
import { azureUrl } from "@/config/site"

export const metadata: Metadata = {
    title: "Azure Integration",
    description: "Integration with Azure as test bed.",
    alternates: {
        ...site.generateCanonical("/projects/azure"),
    },
}

export const maxDuration = 60

const callAzureWalcron = async () => {
    const response: string = await fetch(`${azureUrl}/healthz`, { cache: "no-store" }).then((res) => {
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
            {readSuccessResponse === "ready" ? (
                <iframe src={azureUrl} allowFullScreen className="w-full h-screen" data-testid="azure-integration" />
            ) : (
                <div>Unable to load screen</div>
            )}
        </div>
    )
}


const SuspenseLoader = ({ promise }: { promise: { read: () => any } }) => {
    return (
        <Suspense
            fallback={<TextLoader text="Warming Up Container" />}
        >
            <Result promise={promise} />
        </Suspense>
    )
}

const AzureIntegration = () => {
    const successResponse = wrapPromise(callAzureWalcron())
    return (
        <div className="walcron-container">
            <h1>Azure Integration for TODO List</h1>
            <SuspenseLoader promise={successResponse} />
        </div>
    )
}

export default memo(AzureIntegration)