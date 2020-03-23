import React from 'react';


import './style.css';



function DevItem( {dev, onDeleteDev} ) {

    const name = dev.name;
    const github_username = dev.github_username;

    async function deleteDev(e) {
        e.preventDefault();

        if (window.confirm(`Deseja deletar o usuario '${name}' (${github_username})?`) )
        {
            onDeleteDev({github_username});
        }

    }    

    return (
        <li className="dev-item">
            <header>  
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`http://github.com/${dev.github_username}`}>ver perfil github</a>
            <button onClick={deleteDev}> Excluir </button>
        </li>
    );
}

export default DevItem; 