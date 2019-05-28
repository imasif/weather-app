import React from 'react';
import './App.css';
import { Row, Col, Dropdown, Menu, Icon } from 'antd';

const appid = '1a4eeae3d9aa377a28001791de39571c';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cities: ["Dhaka","Chittagong","Khulna","Sylhet","Rajshahi","Mymensingh","Barisal","Rangpur","Comilla","Narayanganj","Gazipur"],
      selectedCity: 'Select',
      weather: {},
      currentLatLng: []
    }
  }

  componentDidMount(){
    let initCity = 'Dhaka', $this = this;
    $this.getWeather(initCity);
    $this.setState({selectedCity:initCity});

    navigator.geolocation.getCurrentPosition((geo)=>{
      console.log(geo);
    });

    setTimeout(function(){
      $this.getWeather($this.state.selectedCity)
    },50000);
  }

  getWeather(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},bd&appid=${appid}&units=metric`;

    fetch(url,
      {
      method: 'GET',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(response => this.setState({weather:response}))
    .catch(error => console.error('Error:', error));
  }

  changeCity(city){
    console.log(city);
    this.setState({selectedCity:city});
    this.getWeather(city);
  }
  render(){
    let {weather,selectedCity} = this.state;
    let cities = (
      <Menu>
        {this.state.cities.map((item,index)=>{
          return(
            <Menu.Item key={index} onClick={this.changeCity.bind(this,item)}>
              {item}
            </Menu.Item>
          )
        })}
      </Menu>
    )

    let mainWeather = weather.main;

    console.log(weather);

    return (
      <Row>
        <Col xs={{span:22,offset:1}} sm={{span:28,offset:3}} md={{span:14,offset:5}} lg={{span:6,offset:9}} style={{padding:'40px 0'}}>
          <Row>
            <h1 style={{textAlign:'center'}}>Bangladesh weather</h1>
            <Col span={24} style={{textAlign:'center'}}>
              <span style={{fontSize:24}}>City : </span>
              <Dropdown overlay={cities} trigger={['click']}>
                <a className="ant-dropdown-link" href="#" style={{fontSize:24}}>
                  {selectedCity} <Icon style={{fontSize:18}} type="down" />
                </a>
              </Dropdown>
              <br/><br/>
            </Col>
          </Row>
          <Row style={{textAlign:"center"}}>
            <Col span={24}>
              <h3>
                Temp : {mainWeather ? `${mainWeather["temp"]} °C ` : "N/A"}
                <span style={{fontWeight:300}}>{mainWeather && `(${mainWeather.temp_min}  °C ˜ ${mainWeather.temp_max} °C)`}</span>
              </h3>
            </Col>
          </Row>

          <Row style={{textAlign:"center"}}>
            <Col span={24}>
              <h3 style={{textTransform: 'capitalize'}}>
                Weather Condition : {weather.weather ? `${weather.weather[0]["description"]}` : "N/A"}
              </h3>
            </Col>
          </Row>

          <Row style={{textAlign:"center"}}>
            <Col span={24}>
              <h3 style={{textTransform: 'capitalize'}}>
                Humadity : {mainWeather ? `${mainWeather["humidity"]}` : "N/A"}
              </h3>
            </Col>
          </Row>
          
        </Col>
      </Row>
    );
  }
}

export default App;
