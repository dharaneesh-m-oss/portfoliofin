import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const photoMap: Record<string, string> = {
  gateway:
    "C:\\Users\\Dharaneesh M\\.cursor\\projects\\c-Users-Dharaneesh-M-OneDrive-Documents-finalweb\\assets\\c__Users_Dharaneesh_M_AppData_Roaming_Cursor_User_workspaceStorage_6c5e38cce9fb59510db5b9ab7b2addca_images_WhatsApp_Image_2026-05-01_at_11.28.42_AM-146c2d7c-b4c3-4c94-9ba4-947b7a58a0d2.png",
  shoreline:
    "C:\\Users\\Dharaneesh M\\.cursor\\projects\\c-Users-Dharaneesh-M-OneDrive-Documents-finalweb\\assets\\c__Users_Dharaneesh_M_AppData_Roaming_Cursor_User_workspaceStorage_6c5e38cce9fb59510db5b9ab7b2addca_images_WhatsApp_Image_2026-04-22_at_2.54.45_PM-7cdb68e9-72c0-4a8b-8db5-119697fe37e9.png",
  portrait:
    "C:\\Users\\Dharaneesh M\\.cursor\\projects\\c-Users-Dharaneesh-M-OneDrive-Documents-finalweb\\assets\\c__Users_Dharaneesh_M_AppData_Roaming_Cursor_User_workspaceStorage_6c5e38cce9fb59510db5b9ab7b2addca_images_WhatsApp_Image_2026-05-01_at_11.28.43_AM-5b78dd6c-2cf1-4ccf-89ed-2e435ff6d0d4.png",
};

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const path = photoMap[name];

  if (!path) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  try {
    const file = await fs.readFile(path);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to read photo" }, { status: 500 });
  }
}
