"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const AdminDashboard = () => {
  const [password, setPassword] = useState<string>("");
  const [userAuthenticated, setUserAuthenticated] = useState<null | boolean>(
    null
  );
  const [errorStatus, setErrorStatus] = useState(false);

  async function authenticateUser(password: string): Promise<boolean> {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ submittedPassword: password }),
    }).then((res) => res.json());

    const {
      data: { authenticated },
    } = response;
    authenticated === false && setErrorStatus(true);
    return authenticated;
  }

  const handleClick = async (password: string) => {
    setUserAuthenticated(await authenticateUser(password));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {userAuthenticated ? (
        <div>authenticated</div>
      ) : (
        <div>
          <TextField
            required={true}
            id="outlined-controlled"
            label="Enter Password"
            value={password}
            autoComplete="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
              errorStatus === true && setErrorStatus(false);
            }}
            error={errorStatus}
            helperText={errorStatus && "Invalid Password."}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleClick(password)}
              disabled={errorStatus}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
