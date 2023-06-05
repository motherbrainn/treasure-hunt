import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  //reset winners
  await prisma.qrCode.updateMany({
    where: {
      winner: true,
    },
    data: {
      winner: false,
    },
  });

  //select new random winner

  //get all ids
  const records = await prisma.qrCode.findMany({});

  //get random id
  const { id: randomId } = records[Math.floor(Math.random() * records.length)];

  //update random id
  const response = await prisma.qrCode.update({
    where: {
      id: randomId,
    },
    data: {
      winner: true,
    },
  });

  return NextResponse.json(response);
}
