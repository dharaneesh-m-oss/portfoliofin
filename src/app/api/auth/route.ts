import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Dharaneesh2007";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
