import React, {useState, useEffect} from 'react';

function DevForm( {onSubmit} ) {

    const [github_username, set_github_username] = useState('');
    const [techs, set_techs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 3000, 
          }
        )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
          }
        );

        set_github_username('');
        set_techs('');
    }

    return (
        <>
            <strong>Cadastrar</strong> 
            <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuario github</label>
                <input 
                name="github_username" 
                id="github_username"
                value={github_username}
                required 
                onChange={e => set_github_username(e.target.value)}
                />
            </div>
            <div className="input-block">
                <label htmlFor="techs">tecnologias</label>
                <input 
                name="techs" 
                id="techs" 
                value={techs}
                required
                onChange={e => set_techs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                <label htmlFor="latitude">latitude</label>
                <input 
                    name="latitude" 
                    id="latitude" 
                    required 
                    value={latitude}
                    type="number"
                    onChange={e => setLatitude(e.target.value)}
                />
                </div>
                <div className="input-block">
                <label htmlFor="longitude">longitude</label>
                <input 
                    name="longitude" 
                    id="longitude" 
                    required 
                    value={longitude} 
                    type="number"
                    onChange={e => setLongitude(e.target.value)} 
                />
                </div>
            </div>
            
            <button type="submit">Salvar</button>

            </form>
        </>
    );
}

export default DevForm; 