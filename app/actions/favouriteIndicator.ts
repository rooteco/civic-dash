import type { ActionFunction } from "@remix-run/node";
import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const indicatorSlug = formData.get("indicatorSlug")
  const isFavourited = formData.get("isFavourited")
  const userId = formData.get('userId')
  console.log("IS FAVOURITED?:", isFavourited === "true")
  console.log("INDICATOR SLUG:", indicatorSlug)
  if(userId.length === 0){
    console.log("NO USER IS SIGNED IN")
    return
  }

  if(isFavourited === 'true'){
    console.log('REMOVING INDICATOR FROM FAVOURITES')
    removeFavouritedIndicator(userId, indicatorSlug)
  }
  else{
    console.log('ADDING INDICATOR TO FAVOURITES')
    addFavouritedIndicator(userId, indicatorSlug)
  }
  return null
}

export default action
