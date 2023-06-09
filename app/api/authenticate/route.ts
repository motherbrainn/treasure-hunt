import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { submittedPassword } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const data = { authenticated: submittedPassword === adminPassword };

  return NextResponse.json({ data });
}
