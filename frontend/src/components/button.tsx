import React from "react";

export interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ type, disabled, children, onClick, className }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
};