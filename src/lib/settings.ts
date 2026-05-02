import { prisma } from "./prisma";

export async function getSettings() {
  try {
    // Using raw query as a workaround for Prisma Client generation locks during dev
    const settings = await prisma.$queryRawUnsafe('SELECT "key", "value" FROM Setting') as { key: string, value: string }[];
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
}

export async function updateSetting(key: string, value: string) {
  // Using raw execute to bypass generated model requirement
  return prisma.$executeRawUnsafe(
    'INSERT OR REPLACE INTO Setting ("key", "value") VALUES (?, ?)',
    key,
    value
  );
}
