import Video from "./Video";

function Home() {

    let name = "";
    let d1 = new Date();
    let expirationDate = new Date();
    

    if(window.localStorage.getItem('license') !== null && window.localStorage.getItem('license') !== undefined){
        //format localstroage expirationdate to date object
        let date = window.localStorage.getItem('expirationDate');
        expirationDate = new Date(date.substring(1, date.length - 1));
        d1.toUTCString();
        expirationDate.toUTCString();
        console.log(d1 + " " + expirationDate);
    }

    if(window.localStorage.getItem('username') !== null){
        name = window.localStorage.getItem('username');
    }

    if(d1.getTime() < expirationDate.getTime()){
        return (
            <div className='col d-flex flex-column justify-content-center align-items-center width'>
                <h1 className="pb-3">Welcome to ViewVideo {JSON.parse(name)}!</h1>
                <h3 className="pb-3">You can watch the video if you have a user that has a active license.</h3>
                <Video />
            </div>
        );
    }
    else{
        return (
            <div className='col d-flex flex-column justify-content-center align-items-center width'>
                <h1 className="pb-3">Welcome to ViewVideo!</h1>
                <h3 className="pb-3">You can watch the video if you have a user that has a active license.</h3>
                <h3 className="pb-3">You also need to be logged in.</h3>
            </div>
        );
    }
  }

export default Home;