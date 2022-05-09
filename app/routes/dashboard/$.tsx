import type {
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from '@remix-run/node';
import { Link, useParams } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return redirect("/dashboard");

};

export default function RouteErrorCapture(){
  const params = useParams();
  console.log("PARAMS:", params)
  return(
    <div>
      <h1>This route does not exist</h1>
      <Link to={'/dashboard'}>
        <button>
          Click here to go back to the dashboard
        </button>
        </Link>
    </div>
  )
}
