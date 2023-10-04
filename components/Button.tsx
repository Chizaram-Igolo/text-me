// components/Button.js
import { FetchResult } from "@apollo/client";
import React, { ReactElement } from "react";

const Button = ({
  children,
  className,
  ...props
}: {
  children: ReactElement | string;
  className: string;
  props: { onClick: () => Promise<FetchResult<any>> };
}) => {
  return (
    <button
      className={`rounded-md px-4 py-1 text-sm text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
