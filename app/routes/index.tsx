import type {
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from '@remix-run/node';
import { redis } from "~/models/redis.server"


export const loader: LoaderFunction = async () => {

  // PARADIGM FOR TESTING REDIS SPEED
  // const start = Date.now()
  // const testData = await redis.get("big test data")
  // const end = Date.now() - start
  // console.log("END TIME:", end)
  // console.log(testData)

  return redirect("/dashboard");

};
