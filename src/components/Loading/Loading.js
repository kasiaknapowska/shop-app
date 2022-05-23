import "./_Loading.scss"
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';


export default function Loading() {
    return (
        <div className="loading_container">
          <RefreshRoundedIcon fontSize="large" className="loading_animation"/>
          <p>LOADING</p>
        </div>
    )
}