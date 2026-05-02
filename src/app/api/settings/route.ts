import { NextResponse } from "next/server";
import { getSettings, updateSetting } from "@/lib/settings";
import { cookies } from "next/headers";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin-auth");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const promises = Object.entries(data).map(([key, value]) => 
    updateSetting(key, value as string)
  );
  
  await Promise.all(promises);
  return NextResponse.json({ success: true });
}
