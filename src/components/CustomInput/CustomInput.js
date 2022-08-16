import React, { useState } from "react";
import { OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const CustomInput = ({ inputType, name, placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {inputType === "password" && (
        <OutlinedInput
          color="secondary"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small"/>}
              </IconButton>
            </InputAdornment>
          }
        />
      )}
    </>
  );
};

export default CustomInput;
