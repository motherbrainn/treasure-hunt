import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export const fetchCache = "force-no-store";

export async function POST(req: NextRequest, res: NextResponse) {
  const { selectedQrCodes } = await req.json();

  const response = await prisma.qrCode.deleteMany({
    where: {
      id: {
        in: selectedQrCodes,
      },
    },
  });

  return NextResponse.json(response);
}
