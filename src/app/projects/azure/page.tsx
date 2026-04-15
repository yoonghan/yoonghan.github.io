import { memo } from "react"
import { site } from "@/config/site"

export const metadata = {
    title: "Azure Integration",
    description: "Integration with Azure as test bed.",
    alternates: {
        ...site.generateCanonical("/projects/azure"),
    },
}

const AzureIntegration = () => <div>Azure Integration</div>

export default memo(AzureIntegration)