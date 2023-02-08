import Button  from "@mui/material/Button";

const ButtonCustom = (props:{
    label: string;
    onClick: () => void;
    variant?: "text" | "outlined" | "contained";
    color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    size?: "small" | "medium" | "large";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}) => {
  return <Button {...props} >
    {props.label}
  </Button>
};

export default ButtonCustom;
