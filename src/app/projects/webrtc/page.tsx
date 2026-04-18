import { withNonEmptyEnvCheck } from "@/components/utils/hoc/withEnvCheck/withEnvCheck";
import { site } from "@/config/site";
import WebrtcVideo from "./WebrtcVideo";

export const metadata = {
	title: "Video Conferencing",
	description: "Peer to peer Web Real Time Communication video conferencing.",
	alternates: {
		...site.generateCanonical("/projects/webrtc"),
	},
};

interface Props {
	appKey?: string;
	cluster?: string;
}

const WebRtc = ({ appKey, cluster }: Props) => {
	return (
		<div className="mx-auto max-w-screen-lg px-4 pb-10">
			<h1 className="py-8">Video call with Web Real Time Communication</h1>
			<WebrtcVideo appKey={appKey!} cluster={cluster!} />
		</div>
	);
};

const getProcess = () => ({
	appKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default withNonEmptyEnvCheck(
	WebRtc,
	getProcess,
	"Pusher initialization failed due to missing environment variable.",
);
