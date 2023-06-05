import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest, res: NextResponse) {
  const allQrCodes = (await prisma.qrCode.findMany({})).sort((a, b) => {
    if (a.winner < b.winner) {
      return 1;
    } else if (a.winner > b.winner) {
      return -1;
    } else return 0;
  });
  return NextResponse.json(allQrCodes);
}
