"use client";
import styles from "./TextLoader.module.css";

const TextLoader = ({ text }: { text: string }) => {
	return (
		<div>
			<div
				className={`text-center my-16 italic text-green-700 q${styles.dots}`}
			>
				{text}
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</div>
		</div>
	);
};

export default TextLoader;
