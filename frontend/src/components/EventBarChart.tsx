import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

function EventBarChart(props) {
    console.log("props.eventData")
    console.log(props.eventData)

    return (
        <BarChart width={1800} height={500}
                  data={props.eventData
                      .filter((each) => each.userCounter > 0)
                      // .slice(0, props.eventData.length)
                  }>
            <XAxis dataKey={props.XKey} stroke="#8884d8"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey={props.barKey} fill="#8884d8" barSize={30}/>
        </BarChart>
    );
}

export default EventBarChart;