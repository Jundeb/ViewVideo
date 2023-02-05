import Video from "./Video";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserProvider.js";
import LicenseContext from "../context/LicenseProvides";

function Home() {
    const { user, setUser } = useContext(UserContext);
    const { license, setLicense } = useContext(LicenseContext);
    let licenseActive = false;

    const calculateTimeLeft = () => {
        let expirationDate = new Date(license.expirationDate);
        const difference = +expirationDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };

            licenseActive = true;
            console.log(timeLeft);
        }
        else {
            licenseActive = false;
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (licenseActive && user.username !== null) {
        return (
            <div className='col d-flex flex-column justify-content-center align-items-center width'>
                <h1 className="pb-3">Welcome to ViewVideo {user.username}!</h1>
                <h3 className="pb-3">Your license is active!</h3>
                <h3 className="pb-3">Your license expires in {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes and {timeLeft.seconds} seconds.</h3>
                <Video />
            </div>
        );
    }
    else if (licenseActive == false && user.username !== null) {
        return (
            <div className='col d-flex flex-column justify-content-center align-items-center width'>
                <h1 className="pb-3">Welcome to ViewVideo {user.username}!</h1>
                <h3 className="pb-3">Your license has expired.</h3>
                <h3 className="pb-3">You can renew your license from the top.</h3>
            </div>
        );
    }
    else {
        return (
            <div className='col d-flex flex-column justify-content-center align-items-center width'>
                <h1 className="pb-3">Welcome to ViewVideo!</h1>
                <h3 className="pb-3">You can watch the video if you have a user that has a active license.</h3>
                <h3>You can login/create a new user from the top.</h3>
            </div>
        );
    }
}

export default Home;