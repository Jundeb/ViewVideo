import "../App.css"
import { useEffect } from "react";

function NotFound() {

  //redirects to Login when on a wrong page
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "https://proud-rock-03e39a603.2.azurestaticapps.net/home";
    }, 2500
    );
  }, []);

  return (
    <div className="notFound">
      <h1>Page not found</h1>
      <p>Redirecting to Home page.</p>
    </div>
  );
}

export default NotFound;