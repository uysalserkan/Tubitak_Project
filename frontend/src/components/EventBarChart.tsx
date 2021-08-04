import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

function EventBarChart(props) {
    // console.log("EVENTBARCHART A GELEN PROPS EVENTDATA")
    // console.log(props.eventData)

    return (
        <BarChart width={1800} height={500}
                  data={props.eventData.slice(0, props.eventData.length)
                  }>
            <XAxis dataKey={props.XKey} stroke="#497382"/>
            <YAxis/>
            <Tooltip label={props.XKey}/>
            <Bar dataKey={props.barKey} fill="#497382" barSize={30}/>
        </BarChart>
    );
}

export default EventBarChart;