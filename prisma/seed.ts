import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  const contentDir = path.join(process.cwd(), "content", "modules");

  if (!fs.existsSync(contentDir)) {
    console.log("No content modules directory found.");
    return;
  }

  const moduleFolders = fs.readdirSync(contentDir);

  for (const folder of moduleFolders) {
    const metaPath = path.join(contentDir, folder, "module.json");
    if (fs.existsSync(metaPath)) {
      const moduleData = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

      const dbModule = await prisma.module.upsert({
        where: { slug: moduleData.slug },
        update: {
          title: moduleData.title,
          description: moduleData.description,
          level: moduleData.level,
          order: moduleData.order,
        },
        create: {
          id: moduleData.id,
          slug: moduleData.slug,
          title: moduleData.title,
          description: moduleData.description,
          level: moduleData.level,
          order: moduleData.order,
        },
      });

      for (const lesson of moduleData.lessons) {
        const dbLesson = await prisma.lesson.upsert({
          where: {
            moduleId_slug: {
              moduleId: dbModule.id,
              slug: lesson.slug,
            },
          },
          update: {
            title: lesson.title,
            order: lesson.order,
            contentPath: lesson.contentPath,
          },
          create: {
            id: lesson.id,
            slug: lesson.slug,
            moduleId: dbModule.id,
            title: lesson.title,
            order: lesson.order,
            contentPath: lesson.contentPath,
          },
        });

        // Load exercises for this lesson
        for (const exId of lesson.exercises || []) {
          const exPath = path.join(process.cwd(), "content", "exercises", `${exId}.json`);
          if (fs.existsSync(exPath)) {
            const exData = JSON.parse(fs.readFileSync(exPath, "utf-8"));

            await prisma.exercise.upsert({
              where: { id: exData.id },
              update: {
                instruction: exData.instruction,
                datasetPath: `exercises/${exId}.json`,
                expectedAnswer: JSON.stringify(exData.expectedAnswer),
                hint: exData.hint,
              },
              create: {
                id: exData.id,
                lessonId: dbLesson.id,
                type: exData.type || "formula",
                datasetPath: `exercises/${exId}.json`,
                instruction: exData.instruction,
                expectedAnswer: JSON.stringify(exData.expectedAnswer),
                hint: exData.hint,
              },
            });
          }
        }
      }
    }
  }

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
