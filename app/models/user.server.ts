import { db } from "~/utils/db.server";

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

export async function addFavouritedIndicator(user_id: String, indicator_slug: String): void{
  const addFavourite = await db.UserToFavouritedIndicator.create({ data: {
    userID: user_id,
    indicatorSlug: indicator_slug
  }})
}

export async function removeFavouritedIndicator(user_id: String, indicator_slug: String): void{
  const deleteFavourite = await db.UserToFavouritedIndicator.delete({
    where: {
      userId: user_id,
      indicatorSlug: indicator_slug
    }
  })
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
  console.log("FAVOURITED INDICATORS:", favouritedIndicators)
  return {indicators: favouritedIndicators, sparkData: []}
}

export async function getIndicatorsByAdminFavourite(): Promise<IndicatorAndSpark>{
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
