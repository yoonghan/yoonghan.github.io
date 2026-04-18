import type { CSSProperties } from "react";
import {
	type Author,
	type ChatBubbleProps,
	type Message,
	SystemChatBubble,
} from "react-bell-chat";
import { decodeMessage } from "../../../config/MessageFormatter";
import { MessageType } from "../../../config/MessageType";

const CustomSystemChatBubble = ({
	message,
	...remainingProps
}: ChatBubbleProps<any, Message<string>, Author>) => {
	const renderMessage = (
		formattedMessage: string,
		textStyle?: CSSProperties,
	) => (
		<SystemChatBubble
			{...remainingProps}
			styles={{
				systemChatBubbleContainer: textStyle,
			}}
			message={{
				...message,
				message: formattedMessage,
			}}
		/>
	);

	const complexMessage = decodeMessage(message.message);

	switch (complexMessage.messageType) {
		case MessageType.CONNECTION:
			return renderMessage(complexMessage.message, { color: "deepskyblue" });
		case MessageType.CONNECTION_ERROR:
			return renderMessage(complexMessage.message, { color: "darkred" });
		default:
			return renderMessage(complexMessage.message);
	}
};

export default CustomSystemChatBubble;
