import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest, res: NextResponse) {
  const tag = req.nextUrl.searchParams.get("tag");
  tag && revalidateTag(tag);
  const allQrCodes = (await prisma.qrCode.findMany({})).sort((a, b) => {
    if (a.winner < b.winner) {
      return 1;
    } else if (a.winner > b.winner) {
      return -1;
    } else return 0;
  });
  return NextResponse.json(allQrCodes);
}
