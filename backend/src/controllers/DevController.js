const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
    
        if( !dev )
        {
            const github_response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = github_response.data;
            console.log(name, avatar_url, bio);

            const techArray = parseStringAsArray(techs);

            const location = {
            type: 'Point',
            coordinates:[longitude, latitude]
            }

            dev = await Dev.create({
            github_username,
            name,
            bio,
            avatar_url,
            techs: techArray,
            location
            });
        }

        return response.json(dev);
    },
    
    async update(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });
        
        if (dev)
        {

            const techArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates:[longitude, latitude]
            }

            dev = await Dev.update({
                github_username,
                techs: techArray,
                location
            });
        }

        return response.json(dev);
    },

    async delete(request, response) {
        const { github_username } = request.body;
        let dev = await Dev.findOne({ github_username });
        
        if (dev)
        {
            dev = await Dev.remove({
                github_username
            });
        }

        return response.json(dev);
    },
};