import "../App.css"
import { useEffect } from "react";

function NotFound() {

  //redirects to Login when on a wrong page
  useEffect(() => {
    setTimeout(() => {
      //window.location.href = "https://viewvideoserver-aspnetserver.azurewebsites.net/home"
      window.location.href = "http://localhost:3000/home"
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