import type { User, Campaign } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Campaign } from "@prisma/client";

export function getCampaign({
  id,
  userId,
}: Pick<Campaign, "id"> & {
  userId: User["id"];
}) {
  return prisma.campaign.findFirst({
    select: { id: true, title: true, description: true, campaignPlayers: true },
    where: { id, userId },
  });
}

export function getCampaignListItems({ userId }: { userId: User["id"] }) {
  return prisma.campaign.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createCampaign({
  description,
  title,
  userId,
}: Pick<Campaign, "title" | "description"> & {
  userId: User["id"];
}) {
  return prisma.campaign.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteCampaign({
  id,
  userId,
}: Pick<Campaign, "id"> & { userId: User["id"] }) {
  return prisma.campaign.deleteMany({
    where: { id, userId },
  });
}
