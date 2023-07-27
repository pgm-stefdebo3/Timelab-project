import { Checkbox, FormLabel } from "@mui/material";
import React, { useState } from "react";

export interface CustomCheckboxProps {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  initialChecked: boolean;
  name: string;
}

const CustomCheckbox = ({ disabled, onClick, initialChecked, name}: CustomCheckboxProps) => {
  const [checked, setChecked] = useState(initialChecked); 

  const handleChange = () => {
    setChecked(!checked); 
  };

  return (
    <div>
      <Checkbox disabled={disabled} onChange={handleChange} checked={checked} onClick={onClick} />
      <FormLabel>{name}</FormLabel>
    </div>
  );
};

export default CustomCheckbox;