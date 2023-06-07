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
    await fetch("/api/selectNewWinner", {
      method: "POST",
    });
    setRefetchQrData(true);
  };

  const handleAddAdditionalQrCode = async (count: number) => {
    await fetch("/api/createNewQrCode", {
      method: "POST",
      body: JSON.stringify({ countOfQrCodes: count }),
    });
    setRefetchQrData(true);
  };

  const handleDeleteSelected = async (selected: string[]) => {
    await fetch("/api/deleteQrCode", {
      method: "POST",
      body: JSON.stringify({ selectedQrCodes: selected }),
    });
    setRefetchQrData(true);
  };

  const [refetchQrData, setRefetchQrData] = useState(true);
  const [numberOfQrCodes, setNumberOfQrCodes] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>QR Code Admin Dashboard</h1>
      {userAuthenticated ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <QrCodeView
            refetch={refetchQrData}
            setRefetch={setRefetchQrData}
            checked={checked}
            setChecked={setChecked}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button variant="contained" onClick={handleNewWinner}>
              Select New Winning QR Code
            </Button>
            <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
              <TextField
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
                onChange={(e) =>
                  setNumberOfQrCodes(
                    parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0
                  )
                }
              >
                {numberOfQrCodes}
              </TextField>
              <Button
                variant="contained"
                onClick={() => handleAddAdditionalQrCode(numberOfQrCodes)}
                disabled={numberOfQrCodes === 0}
              >
                Add Additional QR Codes
              </Button>
            </div>
            <Button
              variant="contained"
              onClick={() => handleDeleteSelected(checked)}
              disabled={checked.length === 0}
            >
              Delete Selected QR Codes
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <TextField
              required={true}
              type="password"
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
            <Button
              variant="contained"
              onClick={() => handleClick(password)}
              disabled={errorStatus}
              style={{ height: "56px" }}
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
