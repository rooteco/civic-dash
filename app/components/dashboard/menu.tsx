import { Link } from '@remix-run/react';
import { useState } from 'react';
import pause from "../../../public/assets/pause.svg";
import CachedIcon from '@mui/icons-material/Cached';



export default function Menu() {

  const [open, setOpen] = useState(false);

  const setOff = () => {
    setOpen(false);
  }

  const setOn = () => {
    setOpen(true);
  }

  if (open) {
    return (
      <div className="menu flex-row anim" style={{ paddingRight: '16px' }} onMouseEnter={setOn} onMouseLeave={setOff}>
        <div>
          {true ?
            <img src={pause} alt="pause" className="icon-s" /> :
            <CachedIcon fontSize='small' className='pause' />
          }
        </div>
        <div className="flex-row">
          <strong><a href="https://rooteco.notion.site/CivicDash-v2-1-8631ce9d3fd442a1a031eec9fa48cf3b" target="_blank" rel="noreferrer">docs</a></strong>
          <strong><a href="https://discord.gg/5eXgs8r9HT" target="_blank" rel="noreferrer">discord</a></strong>
        </div>
      </div>
    );
  }

  return (
    <div className="menu flex-row" onMouseEnter={setOn} onMouseLeave={setOff}>
      <div>
        {true ?
          <img src={pause} alt="pause" className="icon-s" style={{ filter: 'drop-shadow(0px 4px 4px white' }} />:
          <CachedIcon fontSize='small' className='pause' sx={{ filter: 'drop' }} />
        }
      </div>
    </div>
  )

}

const Replay = () => {

  const [animating, setAnimating] = useState(false);

  const animate = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  }

  return <CachedIcon fontSize='small' className={animating ? 'pause anim-rotate' : 'pause'} onClick={animate} />;
}

