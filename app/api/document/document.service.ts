import { User } from "@prisma/client";
import { prisma } from "@/lib/database";

export async function getDocument(user: User) {
  if (user.role == "VIEWER") {
    return prisma.document.findMany({
      where: {
        status: "PUBLISHED"
      }
    })
  }

  if (user.role == "AUTHOR") {
    return prisma.document.findMany({
      authorId: user.id
    })
  }

  if (user.role == "REVIEWER") {
    return prisma.document.findMany({
      status: {
        in: ["SUBMITTED", "APPROVED", "PUBLISHED"]
      }
    })
  }

  return prisma.document.findMany();
}
