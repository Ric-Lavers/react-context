import React, {Component} from 'react'
import { GithubPicker } from 'react-color'
import Madelbrot from '../helpers/mandelbrot'



class MadelbrotSVG extends Component {

  state = {
    svg: null,
    division:200,
    multipler:21,
    radius:200,
    backgroundColor:'white',
    strokeColor: "black"
  }
  componentDidMount(){
    this.makeJsxSvg()
  }

  handleControls = (event) => {
    let {name, value} = event.target
    if(value < 0) return;
    this.setState(prev => {
      prev[name]= value
      return prev
    })
  }
  handleColorChange = (color, name) => {
    this.setState(prev =>{ 
      prev[name] = color.hex
      return prev
     })
  }

  makeJsxSvg = () => {
    let {division, multipler, radius, backgroundColor, strokeColor} = this.state
    let lines = new Madelbrot(division, multipler, radius)
      .calculatePoints()
      .map( l => 
        <line x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} 
        stroke={strokeColor}
        />
      )
    let svg = (
      <svg height={radius*2} width={radius*2}
      viewBox={`-${radius} -${radius} ${radius*2} ${radius*2}`}
      >
      <circle cx="0" cy="0" r={radius} stroke={strokeColor} stroke-width="1.5" fill={backgroundColor} />
      {lines}
      </svg>
    )
    // this.setState({svg: svg})
    return svg
  }

  render(){
    let {division, multipler, radius} = this.state
    let svg = this.makeJsxSvg(division, multipler, radius)
    return (
      <div>
        <div className="controls">
          <form onChange={this.handleControls}
          style={{display:'block'}}
          >
            <label >division
              <input name="division" value={division} type="number"/>
            </label><br/>
            <label>multipler
              <input name="multipler" value={multipler} type="number"  step=".1"/>
            </label><br/>
            <label>radius
              <input name="radius" value={radius} type="number" step="10"/>
            </label>
          </form>
        </div>
        {svg}
        <div 
        style={{display:'flex', justifyContent: 'center', textAlign: 'left'}}
        >
          <label  >background color
            <GithubPicker
            color={this.state.backgroundColor}
            onChangeComplete={(e)=>this.handleColorChange(e,"backgroundColor")}
            />
          </label>
          <label  >stroke color
            <GithubPicker
            color={this.state.strokeColor}
            onChange={(e)=>this.handleColorChange(e,"strokeColor")}
            />
          </label>
        </div>
      </div>
    )
  }
}

export default MadelbrotSVG