import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import './Chart.css'
const Charts = ({data:{confirmed, deaths, recovered}, country}) =>{
    const [dailyData, setdailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setdailyData(await fetchDailyData());
        }

        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length
        ?(
        <Line 
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: 'rgb(12, 178, 243)',
                    fill:true,
                },{
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'rgb(230, 61, 31)',
                    fill:true,
                }],
            }}
        />):null
    );
    const barChart = (
        confirmed
        ?(
            <Bar
        
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:[
                            'rgb(12, 178, 243,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgb(255, 38, 0,0.5)',
                        ],
                        data:[confirmed.value,recovered.value,deaths.value]
                    }]
                }}
                options={{
                    legend:{display:false},
                    title:{display:true, text:`Current situation in ${country}`},
                }}
            />
        ):null
    );
    const BarOrLine = () =>{
        if (country === 'global' || country === '')
        {
            return lineChart
        }
        else{
            return barChart
        }
    }
    return(
        <div className='container'>
            {BarOrLine()}
        </div>
  );
};


export default Charts;