import type {
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from '@remix-run/node';
import { Link, useParams } from "@remix-run/react";


export default function RouteErrorCapture(){
  const params = useParams();
  return(
    <div>
      <h1>This route does not exist</h1>
        <button>
            <Link to={'/dashboard'}>
            Click here to go back to the dashboard
            </Link>
        </button>
    </div>
  )
}
