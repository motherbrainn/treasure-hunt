"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

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

export const QrCodeView = () => {
  const [qrCodes, setQrCodes] = useState<QrCodeInterface[] | []>([]);

  useEffect(() => {
    (async () => setQrCodes(await fetchQrCodes()))();
  }, []);

  interface QrCodeListItemInterface {
    qrCode: QrCodeInterface;
  }

  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
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
            alt="Remy Sharp"
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

  return (
    <List>
      {qrCodes && qrCodes.map((e) => <QrCodeListItem qrCode={e} key={e.id} />)}
    </List>
  );
  return <div />;
};

export default QrCodeView;
