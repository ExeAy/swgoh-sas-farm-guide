import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button/Button";
import React, { useEffect, useState } from "react";

interface AllyCodeFormProps {
  getPlayer: (allyCode: string) => Promise<void>;
}

const AllyCodeForm: React.FC<AllyCodeFormProps> = (props) => {
  const { getPlayer } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [allyCode, setAllyCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedAllyCode = localStorage.getItem("allyCode");
    if (savedAllyCode) {
      setAllyCode(savedAllyCode);
      setRememberMe(true);
    }
  }, []);

  const validateAllyCode = (allyCode: string): boolean => {
    const allyCodeRegex = new RegExp("^[0-9]{3}-?[0-9]{3}-?[0-9]{3}$");
    return allyCodeRegex.test(allyCode);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateAllyCode(allyCode)) {
      setErrorMessage("Ogiltig ally code");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("allyCode", allyCode);
    } else {
      localStorage.removeItem("allyCode");
    }

    try {
      getPlayer(allyCode);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleAllyCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setErrorMessage("");
    setAllyCode(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-1">
      <div className="flex gap-3 items-center">
        <TextField
          error={!!errorMessage}
          helperText={errorMessage}
          value={allyCode}
          onChange={handleAllyCodeChange}
          name="allyCode"
          id="outlined-basic"
          size="medium"
          label="Ally code"
          placeholder="123-456-789"
          variant="outlined"
        />
        <FormGroup>
          <FormControlLabel
            name="rememberMe"
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(event) => {
                  setRememberMe(event.target.checked);
                }}
              />
            }
            label="Kom ihåg mig (sparas som en cookie)"
          />
        </FormGroup>
      </div>
      <div>
        <Button type="submit" variant="contained">
          Ge mig förslag
        </Button>
      </div>
    </form>
  );
};

export default AllyCodeForm;
