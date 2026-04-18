import { useEffect, useState } from "react";
import { search } from "@/util/location";

export const disableAnimationRegex = /.*[?|&]animate=none.*/;

export function useDisableAnimation() {
	const [isAnimatable, setIsAnimatable] = useState(false);

	useEffect(() => {
		const query = search();
		const disabled = disableAnimationRegex.test(query);
		setIsAnimatable(!disabled);
	}, []);

	return {
		isAnimatable,
	};
}
