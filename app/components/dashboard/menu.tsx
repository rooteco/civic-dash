import { Link } from '@remix-run/react';
import { useState } from 'react';


export default function Menu() {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  if (open) {
    return (
      <div className="menu flex-row ">
        <div className="icon-s" onClick={handleClick}/>
        <div className="flex-row">
          <Link to={"/dashboard"}>dash</Link>
          <a href="https://rooteco.notion.site/CivicDash-v2-1-8631ce9d3fd442a1a031eec9fa48cf3b" target="_blank" rel="noreferrer">docs</a>
          <a href="https://discord.gg/bQHFfWUC" target="_blank" rel="noreferrer">discord</a>
        </div>
      </div>
    );
  }

  return (
    <div className="menu flex-row icon-s" onClick={handleClick}/>
  )
}
