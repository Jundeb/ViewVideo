import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css"

function NotFound() {
  return (
    <div className="notFound">
      <h1>Page not found</h1>
      <Button as={Link} to="/home">Return To Home</Button>
    </div>
  );
}

export default NotFound;