import { db } from "~/utils/db.server";


type Theme = {
  id: number;
  name: string;
  description: string;
  slug: string;
}

type Problem = {
  id: number;
  name: string;
  description: string;
  slug: string;
  themeId: number;
}

export async function getThemes(): Promise<Array<Theme>>{
  const themes = await db.theme.findMany()
  return themes
  }

export async function getProblems(): Promise<Array<Problem>>{
  const problems = await db.problem.findMany()
  return problems
}
