import ReactPlayer from "react-player";

function Video() {

    return (
        <div>
            <ReactPlayer
                controls
                url={"https://www.youtube.com/watch?v=QAI-jMa9Fig"}
            />
        </div>
    );
}

export default Video;