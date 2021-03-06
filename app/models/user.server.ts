import { db } from "~/utils/db.server";
import Prisma from "@prisma/client";

export type UserType = {
  displayName: String;
  emails: Array<any>;
  id: String;
  name: {
    familyName: String;
    givenName: String;
  };
  photos: Array<any>;
  provider: String;
}

export async function addFavouritedIndicator(user_id: String, indicator_slug: String): Promise<void>{
  try {
    const addFavourite = await db.UserToFavouritedIndicator.create({ data: {
      userId: user_id,
      indicatorSlug: indicator_slug
    }})
    return {error: undefined, mutation: addFavourite}
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError){
      console.log("The specified user or indicator does not exist")
    }
    return({error: e, mutation: {}})
  }
}

export async function removeFavouritedIndicator(user_id: String, indicator_slug: String): Promise<void>{
  try {
    const removeFavourite = await db.UserToFavouritedIndicator.delete({
      where: {
        userId_indicatorSlug: {
          userId: user_id,
          indicatorSlug: indicator_slug
        }
      }
    })
    return {error: undefined, mutation: removeFavourite}
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError){
      console.log("The specified user or indicator does not exist")
    }
    return{error: e, mutation: {}}
  }
}

export async function getFavouritedIndicators(user_id: String): Promise<Array<Indicator>>{
  const favouritedIndicators = await db.indicator.findMany({
    where: {
      users: {
        some: {
          user: {
            id: user_id
          }
        }
      }
    }
  })
  return{indicators: favouritedIndicators, sparkData: []}
}

export async function getFavouritedIndicatorSlugs(user_id: String): Promise<Array<String>>{
  const favouritedIndicatorSlugs = await db.indicator.findMany({
    where: {
      users: {
        some: {
          user: {
            id: user_id
          }
        }
      }
    },
    select: {
      slug: true
    }
  })
  return favouritedIndicatorSlugs
}

export async function getIndicatorsByAdminFavourite(): Promise<Array<IndicatorAndSpark>>{
  const indicators = await db.indicator.findMany({
    where: {
      favourite: true
    },
  })

  // var sparkDataArray: Array<any> = [];
  // for(let indicator of indicators){
  //   const sparkData = await redis.get(`${indicator.slug}-spark`)
  //
  //   sparkDataArray.push({indicatorName: indicator.name, data: sparkData})
  // }
  return({indicators: indicators, sparkData: []})
}
