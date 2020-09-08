import React from 'react'
import Card from './components/Cards/Cards'
import Chart from './components/Charts/Chart'
import Country from './components/Country/Country'
import styles from './App.css'
import {fetchData} from './api';
import image from './image/covid.png'

class App extends React.Component{
    state = {
        data : {},
        country : '',
    }
    async componentDidMount(){
        const fetcheddata = await fetchData();
        
        this.setState({data:fetcheddata});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data:fetchedData ,country: country});
    }

    render(){
        const {data, country} = this.state;
        return(
            <div className="container">
                <img className='image' src={image} alt="COVID"/>
                <Card data={data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;