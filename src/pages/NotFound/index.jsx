import './index.css'
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link to="/" className="link-btn">Return to Pokedex</Link>
        </div>
    )
}

export default NotFound;