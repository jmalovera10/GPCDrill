import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
    constructor(props) {
        super(props)

        this.colorScale = scaleLinear()
            .domain([0, this.props.maxValue])
            .range(['#fff200', '#7B1FA2'])
            .interpolate(interpolateLab)
    }

    render() {
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = (
            data.map(datum =>
                <rect
                    key={datum.puesto}
                    x={xScale(datum.puesto)}
                    y={yScale(datum.cuenta)}
                    height={height - margins.bottom - scales.yScale(datum.cuenta)}
                    width={xScale.bandwidth()}
                    fill={this.colorScale(datum.cuenta)}
                />,
            )
        )

        return (
            <g>{bars}</g>
        )
    }
}