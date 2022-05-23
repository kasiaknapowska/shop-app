import "./_Loading.scss"
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';


export default function Loading({text}) {
    return (
        <div className="loading_container">
          <RefreshRoundedIcon fontSize="large" className="loading_animation"/>
          <p>{text}</p>
        </div>
    )
}