"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { jsPDF } from "jspdf";
import { QRCode } from "react-qrcode-logo";

async function fetchQrCodes(): Promise<any> {
  const response = await fetch("/api/qrCode").then((res) => res.json());
  return response;
}

interface QrCodeInterface {
  id: string;
  winner: boolean;
  createdAt: string;
  updatedAt: string;
}

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

const createQrCodeUrl = (id: string) => {
  return `${vercelUrl}/QrCode/${id}`;
};

export const QrCodeView = () => {
  const [qrCodeData, setQrCodeData] = useState<QrCodeInterface[] | []>([]);
  const [qrCodes, setQrCodes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    (async () => setQrCodeData(await fetchQrCodes()))();
  }, []);

  interface QrCodeListItemInterface {
    qrCode: QrCodeInterface;
  }

  const [checked, setChecked] = useState<string[]>([]);

  const handleClick = (qrCodeIds: string[]) => {
    const renderedQrCodes = qrCodeIds.map((id) => (
      <div
        key={id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Scan for a Chance to Win!</div>
        <QRCode value={createQrCodeUrl(id)} size={150} />
      </div>
    ));
    setQrCodes(renderedQrCodes);
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const QrCodeListItem = (qrCodeItem: QrCodeListItemInterface) => {
    const { qrCode } = qrCodeItem;
    return (
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={handleToggle(qrCode.id)}
            checked={checked.indexOf(qrCode.id) !== -1}
          />
        }
      >
        <ListItemAvatar>
          <Avatar
            alt={qrCode.winner ? "winner" : "not a winner"}
            src={qrCode.winner ? "green-check.png" : "red-x.png"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={qrCode.id}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`Created At: ${qrCode.createdAt}`}
              </Typography>
            </Fragment>
          }
        />
      </ListItem>
    );
  };

  const handlePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const element = document.getElementById("hello");

    element &&
      doc.html(element, {
        callback: function (doc) {
          doc.save();
        },
        x: 200,
        y: 10,
        windowWidth: 20,
      });
  };

  useEffect(() => {
    if (qrCodes.length > 0) {
      handlePdf();
      setQrCodes([]);
    }
  }, [qrCodes]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <List>
        {qrCodeData &&
          qrCodeData.map((e) => <QrCodeListItem qrCode={e} key={e.id} />)}
      </List>
      <Button variant="contained" onClick={() => handleClick(checked)}>
        Generate QR Codes
      </Button>
      <button onClick={handlePdf}>pdf</button>
      {qrCodes.length > 0 && (
        <div
          id="hello"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {qrCodes}
        </div>
      )}
    </div>
  );
};

export default QrCodeView;
