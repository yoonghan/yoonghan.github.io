import Image from "next/image";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type React from "react";
import style from "./Link.module.css";

interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement | NextLinkProps> {
	prefetch?: boolean;
	logoUrl?: string;
	logoAltText?: string;
}

const Link: React.FC<LinkProps> = ({
	href,
	logoUrl,
	logoAltText,
	children,
	prefetch,
	...props
}) => {
	const logo = (() => {
		if (logoUrl && logoAltText) {
			return <Image src={logoUrl} alt={logoAltText} width={15} height={15} />;
		}
		return null;
	})();

	return (
		<LinkWrapper className={style.link} href={href} {...props}>
			{logo && <>{logo} </>}
			{children}
		</LinkWrapper>
	);
};

const LinkWrapper: React.FC<LinkProps> = ({ href, children, ...props }) => {
	if (href) {
		return (
			<NextLink href={href} {...props}>
				{children}
			</NextLink>
		);
	} else {
		return <span>{children}</span>;
	}
};

export default Link;
