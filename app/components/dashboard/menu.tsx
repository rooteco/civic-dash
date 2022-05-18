import { Link } from '@remix-run/react';


export default function Menu() {
  return <div className="menu flex">
            <Link to={"/dashboard"}>Dashboard</Link>
            <div><a href="https://rooteco.notion.site/CivicDash-v2-1-8631ce9d3fd442a1a031eec9fa48cf3b" target="_blank" rel="noreferrer">Docs</a></div>
            <div><a href="https://discord.gg/bQHFfWUC" target="_blank" rel="noreferrer">Discord</a></div>
          </div>;
}
  