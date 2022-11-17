import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

function Playlists() {
    const [playlists, setPlaylists] = useState([])    

    function getAllPlaylists() {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta.data.result.list)
            setPlaylists(resposta.data.result.list)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {
        getAllPlaylists()
    }, [])        
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas 
                key={playlist.id} 
                playlist={playlist}               
                />
            })}

        </div>
    );
}

export default Playlists;
