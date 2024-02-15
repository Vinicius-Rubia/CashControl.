import React from "react";

type HelperTextProps = {
  message: string | undefined;
};

export const HelperText: React.FC<HelperTextProps> = ({ message }) => {
  return message && <p className="text-sm text-red-500">{message}</p>;
};
