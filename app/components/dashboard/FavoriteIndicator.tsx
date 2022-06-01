import FavoriteIcon from '@mui/icons-material/Favorite';


export default function FavoriteIndicator({visible, selected}){

  const iconStyle = {
    display: visible ? 'block' : 'none',
    stroke: "#b8b8b8",
    strokeWidth: 1,
    color: "rgba(0,0,0,0.2)"
  }

  const selectedIconStyle = {
    display: visible ? 'block' : 'none',
    stroke: "#b8b8b8",
    strokeWidth: 1,
    color: "rgba(195,0,0,0.7)"
  }


  return (
      <FavoriteIcon
            fontSize = '8px'
            sx = {selected ? selectedIconStyle : iconStyle} />
  )
}
