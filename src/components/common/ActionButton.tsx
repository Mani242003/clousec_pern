import React from "react";
// import AnchorLink from "react-anchor-link-smooth-scroll";
// import { SelectedPage } from "../../types/types";

type Props = {
  children: React.ReactNode;
  path: string;
  className?: string;
};

const ActionButton = ({ children, path, className }: Props) => {
  return (
    <a
      className={`  py-2   ${className}`}
      href={path}
    >
      {children}
    </a>
  );
};

export default ActionButton;