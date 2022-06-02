import type {
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from '@remix-run/node';
// import { redis } from "~/models/redis.server"


export const loader: LoaderFunction = async () => {
  return redirect("/dashboard");
};
