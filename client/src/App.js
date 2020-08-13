import React,{useState} from 'react'; 
import axios from "axios";
import './App.css';


function App() {
  const [data,setData] = useState([])
  const [year,setYear] = useState('')

  const fetchData = async () => {
    const query = `
    query{
      launches(year:"${year}"){
        links {
          flickr_images
        }
        mission_name
        launch_site{
          site_name_long
        }
        rocket{
          rocket_name
        }
        launch_date_utc 
    }
  }
    `
    const res = await axios.post('http://localhost:5000/graphql',{query},{
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
    setData(res.data.data.launches)
  }
  const renderData = () => {
    if(data.length >= 1){
      return data.map((item,i) => {
        return(
          <div key={i}>
            <ul>
              <li>имя миссии :{item.mission_name}</li>
              <li>время запуска:{item.launch_date_utc}</li>
              <li>платформа запуска :{item.launch_site.site_name_long}</li>
              <li>название ракеты :{item.rocket.rocket_name}</li>
              {
                item.links.flickr_images[0] 
               ? <li><img width="300px" src={item.links.flickr_images} alt="img" /></li>
               : <li>нет фото</li>
              }
            </ul>
          </div>
        )
      })
    }
    else{
      return(
        <div>пусто</div>
      )
    }
  }

  return (
    <div className="App">
      <div className="container">
        <input onChange={(e) => setYear(e.target.value)} type="text"/>
        <button  className="btn waves-effect waves-light" onClick={fetchData}>send</button>
        {renderData()}
      </div>
    </div>
  );
}

export default App;
