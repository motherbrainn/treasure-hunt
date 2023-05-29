import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const allQrCodes = await prisma.qrCode.findMany({});
  return NextResponse.json(allQrCodes);
}
