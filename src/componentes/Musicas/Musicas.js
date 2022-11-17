import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [musica, setMusica] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")
    
    function getPlaylistTracks() {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
            headers: {
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta.data.result.tracks)
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }
    
    useEffect(()=> {
        getPlaylistTracks()
    }, [])  
    
    function addTrackToPlaylist() {
        const body = {
            name: musica,
            artist: artista,
            url: url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body,{
            headers:{
                Authorization: "renan-miranda-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            getPlaylistTracks()
            setArtista("")    
            setMusica("")
            setUrl("")        
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    function removeTrackFromPlaylist(id) {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, {
            headers: {
                Authorization: "renan-miranda-ammal"
            }
        }).then((resposta) => {
            console.log(resposta)
            getPlaylistTracks()
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>s
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(e) => setArtista(e.target.value)}/>
                <InputMusica placeholder="musica" value={musica} onChange={(e) => setMusica(e.target.value)}/>
                <InputMusica placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

