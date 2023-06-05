import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const { countOfQrCodes } = await req.json();
  const records = [];
  for (let i = 0; i < countOfQrCodes; i++) {
    records.push({});
  }

  const response = await prisma.qrCode.createMany({
    data: records,
  });

  return NextResponse.json(response);
}
