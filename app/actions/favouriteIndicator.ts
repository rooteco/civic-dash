import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // console.log("FORM ERROR:", error)
  const indicatorSlug = formData.get("indicatorSlug")
  const isFavourited = formData.get("isFavourited")
  const userId = formData.get('userId')
  // console.log("IS FAVOURITED?:", isFavourited === "true")
  // console.log("INDICATOR SLUG:", indicatorSlug)

  if(isFavourited === 'true'){
    console.log('REMOVING INDICATOR FROM FAVOURITES')
    const {error, mutation} = await removeFavouritedIndicator(userId, indicatorSlug)
    return json({mutation: mutation, error: error})
  }
  else{
    console.log('ADDING INDICATOR TO FAVOURITES')
    const {error, mutation} = await addFavouritedIndicator(userId, indicatorSlug)
    return json({mutation: mutation , error: error})
  }
}

export default action
