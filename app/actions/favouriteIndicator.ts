import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { addFavouritedIndicator, removeFavouritedIndicator } from "~/models/user.server"

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const indicatorSlug = formData.get("indicatorSlug")
  const isFavourited = formData.get("isFavourited")
  const userId = formData.get('userId')

  if(isFavourited === 'true'){
    const {error, mutation} = await removeFavouritedIndicator(userId, indicatorSlug)
    return json({mutation: mutation, error: error})
  }
  else{
    const {error, mutation} = await addFavouritedIndicator(userId, indicatorSlug)
    return json({mutation: mutation , error: error})
  }
}

export default action
