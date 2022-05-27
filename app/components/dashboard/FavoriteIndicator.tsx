import FavoriteIcon from '@mui/icons-material/Favorite';


export default function FavoriteIndicator({visible = false}){

  const iconStyle = {
    display: visible ? 'block' : 'none',
    stroke: "#b8b8b8", 
    strokeWidth: 1, 
    color: "rgba(0,0,0,0.2)" 
  }
  return (
      <FavoriteIcon fontSize = '8px' sx = {iconStyle} />
  )
}
