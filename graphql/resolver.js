const axios = require('axios')

module.exports = {
    async launches({year}){
        try{
            const res = await axios.get('https://api.spacexdata.com/v3/launches')
            const data = res.data
            const launch = []
            for(let i = 0; i < data.length ;i++){
                if(data[i].launch_year === year){
                    launch.push({
                        mission_name:data[i].mission_name ,
                        launch_site:{
                            site_name_long : data[i].launch_site.site_name_long
                        },
                        rocket:{
                            rocket_name: data[i].rocket.rocket_name 
                        },
                        links:{
                            flickr_images : data[i].links.flickr_images
                        },
                        launch_date_utc:data[i].launch_date_utc 
                    })
                }
            }
            return launch
        }
        catch(e){
            console.log(e)
        }
    }
}