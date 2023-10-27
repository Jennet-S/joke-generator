import React, { useEffect, useState } from "react";

function GetJoke() {
    const [data, setData] = useState([]);
    const [randomJoke, setRandomJoke] = useState(null);
    const [showPunchline, setShowPunchline] =useState(false);

    useEffect(()=> {
        //fetch data from API
        fetch('https://api.sampleapis.com/jokes/goodJokes')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
    })
    .then((responseData) => {
        setData(responseData);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}, []); 
// no dependency, will only run once

const newJoke = () => {
    //Generate random joke
    if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomJoke(data[randomIndex]);
        setShowPunchline(false); //Reset puchline display
        console.log("punchline displayed in 3 seconds");
        setTimeout(() => {
            setShowPunchline(true);
        }, 3000) //3 second delay
    }
};

if(!randomJoke) {
    return ( 
    <div>
        <button onClick={newJoke}>Click for a laugh</button>
    </div>
    );
}

return (
    <div>
        <h1>{randomJoke.setup}</h1>
        {/* conditional rendering, shows punchline if true */}
        {showPunchline && <p>{randomJoke.punchline}</p>} 
        <button onClick={newJoke}>Next joke</button>
    </div>
);
}

export default GetJoke;