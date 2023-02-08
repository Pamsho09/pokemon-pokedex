import { TextField } from "@mui/material";
export type InputState = {
  id: string;
  value: string;
};
const Input = (props: {
  type: HTMLInputElement["type"];
  label: string;
  name: string;
  value: string;
  onChange: (data: InputState) => void;
  isError?: boolean;
  errorMessage?: string;
  sizes?: "small" | "medium";

}) => {
  const { label, name, value, onChange, type, isError, errorMessage } = props;
  return (
    <>
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={(e) =>
          onChange({
            id: e.target.name,
            value: e.target.value,
          })
        }
        type={type}
        error={isError}
        helperText={isError ? errorMessage : ""}
        size={props.sizes}
      />
    </>
  );
};

export default Input;
