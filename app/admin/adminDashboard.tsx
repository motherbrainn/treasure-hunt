"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import QrCodeView from "./QrCodeView";

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

  const handleNewWinner = async () => {
    const response = await fetch("/api/selectNewWinner");
    setRefetchQrData(true);
  };

  const [refetchQrData, setRefetchQrData] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <QrCodeView refetch={refetchQrData} setRefetch={setRefetchQrData} />
      {userAuthenticated ? (
        <div />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
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
            <Button variant="contained" onClick={handleNewWinner}>
              Select New Winner
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
