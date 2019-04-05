import React, { Component, Fragment } from 'react'

import './svg.css'

class FullScreenSVG extends Component {
  static getDerivedStateFromProps(nextProps, prevState){
    if( nextProps.context ){
      console.log('nextProps.context', nextProps.context )

      return {
        ...nextProps.context.state, 
        strokeColor: nextProps.context.state.theme.primaryColor,
        backgroundColor: nextProps.context.state.theme.secondaryColor,
      }
    }else{
      return null
    }
  }

  constructor(props){
    super(props)
    this.k = 0
    this.path = React.createRef()
    this.svgDraw = React.createRef()
    this.boundingBox = React.createRef()
  }
  state = {
    clientX: null,
    clientY: null,
    grid: 100,
    showBox: false,
    innerHeight:0, 
    innerWidth: 0,
    polylinePoints: [],
    polylinePointsString:[],
    intervals:8,
    polyline: true,
    strokeColor: "white",
    backgroundColor: "#222",
    fill:false,
    animationName: null,
    lazerMode: 0,
    showControls:false,
    showStateTable: false,
  }
  toggleControls = (stateKey) => {
    this.setState( prev => {
      prev[stateKey] = !prev[stateKey]
      return prev
    })
  }

  downloadSVG = () => {
    const XMLS = new XMLSerializer(); 
    const svgDraw = XMLS.serializeToString(this.svgDraw.current)
    console.log('svgDraw', svgDraw)
    const el = document.createElement('a')
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svgDraw) );
    el.setAttribute('download', 'stringart.svg');
    el.click()// this only works once! then you need to give permission to download multiple files
  }

  componentDidMount(){
    this.setHW()
    document.addEventListener('keypress', (event) => {
      this.handleKeyPress(event)
    })
    document.addEventListener('keydown', (event) => {
      this.handleArrowPress(event)
    })
    window.addEventListener("resize", (event) => {
      this.setHW()
    })
  }
  componentWillUnmount(){
    document.removeEventListener('keypress', (event) => {
      this.handleKeyPress(event)
    })
    document.removeEventListener('keydown', (event) => {
      this.handleArrowPress(event)
    })
    window.removeEventListener("resize", (event) => {
      this.setHW()
    })
  }
  setHW = () => {
    let { innerHeight, innerWidth } = window 
    var rect = this.boundingBox//.getBoundingClientRect();
    console.log("rect",rect)
    // console.log(rect.top, rect.right, rect.bottom, rect.left);
    this.setState({ innerHeight, innerWidth })
  }
  handleArrowPress = (event) => {
    if( event.key === 32) event.preventDefault();
    if(this.state.polylinePoints.length > 0 
      && event.keyCode >=37 
      && event.keyCode <=40 
      ){
      event.preventDefault()
      let { clientX, clientY, grid } = this.state
      let newEvent = {}
      switch(event.keyCode) {
        case 37://left
          newEvent = {clientX:clientX-grid, clientY}
          break;
        case 38://up
          newEvent = {clientX, clientY:clientY-grid}
          break;
        case 39://right
          newEvent = {clientX:clientX+grid, clientY}
          break;
        case 40://down
          newEvent = {clientX, clientY:clientY+grid}
          break;
        default:
          return
      }
      console.log(newEvent)
      this.handleClick(newEvent)
      /*  {left: 37,
        up: 38,
        right: 39,
        down: 40,} */
    }
  }

  handleClick = (event) => {
    let { clientX, clientY } = event
    let points = this.state.polylinePoints
    let current = [clientX, clientY]
    if(points.length >5){
      let last = [points[points.length-2], points[points.length-1]] 
      let beforeLast = [points[points.length-4], points[points.length-3]] 

      const findIntervals = (start, end) => {
        let interval = (start -end)/ this.state.intervals
        const array = new Array(this.state.intervals+1).fill(0).map( (val, i) => val = start-(i*interval) )
          return ({array, interval})
        }

      const {array:intervalX} = findIntervals(beforeLast[0], last[0])
      const {array:intervalY} = findIntervals(beforeLast[1], last[1])
      const {interval:intervalLenX,array:intervalCurrentX} = findIntervals(last[0], current[0])
      const {interval:intervalLenY,array:intervalCurrentY} = findIntervals(last[1], current[1])
      let pattern ;
      let len = intervalCurrentY.length 
      switch (this.state.lazerMode){
        case 0:
          pattern = intervalX.map( (v,i) => [intervalX[i], intervalY[i], clientX, clientY])
          break;
        case 1:
          pattern = []
          for(let i =0; i<intervalX.length-1; i++){
            pattern.push(
              intervalX[i], intervalY[i], 
              intervalCurrentX[i], intervalCurrentY[i], 
              intervalCurrentX[i]-intervalLenX, intervalCurrentY[i]-intervalLenY )
          }
          break;
        case 2:
          pattern = []
          for(let i = 0; i<intervalX.length-1; i++){
            pattern.push(
              intervalX[len-1-i], intervalY[len-1-i], 
              intervalCurrentX[i], intervalCurrentY[i],
              intervalCurrentX[i+1], intervalCurrentY[i+1]
            )
          }
          break
        case 3:
          pattern = intervalX.map( (v,i) => [
            intervalX[i], intervalY[i], 
            intervalCurrentX[len-1-i], intervalCurrentY[len-1-i] ])
          break;
        case 4:
          pattern = intervalX.map( (v,i) => [ clientX, clientY])
          break;
        default:
          pattern = intervalX.map( (v,i) => [ clientX, clientY])
          this.setState({lazerMode: 0})
          break;
      }
     /*  if(this.state.lazerMode){
        pattern = intervalX.map( (v,i) => [intervalX[i], intervalY[i] ,clientX, clientY ]  )
      }else{
        pattern = []
        for(let i =0; i<intervalX.length-1; i++){
          pattern.push(
            intervalX[i], intervalY[i], 
            intervalCurrentX[i], intervalCurrentY[i], 
            intervalCurrentX[i]-intervalLenX, intervalCurrentY[i]-intervalLenY )
        }
      } */
      let flat = [].concat.apply([], pattern)
      let { polylinePointsString } = this.state
      polylinePointsString.push(flat)
      this.setState({ polylinePointsString })
    }

    points.push(clientX, clientY)
    this.setState({ clientX, clientY, polylinePoints:points })
  }

  stringArt = (x, m, c)=>{
    let y = m * x + c
  }

  getPathLength = () => {
    const path = document.getElementById('drawPolyline')
    const length = path.getTotalLength()
    
    let styleSheet = document.styleSheets[0];
    let animationName = `draw`;
    let keyframes =
    `@-webkit-keyframes ${animationName} {
       to{
        stroke-dashoffset: ${length};
       }
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    this.setState({ animationName, pathLength: length })
    let styleSheet2 = document.styleSheets[0];
    console.log("getPathLength", styleSheet, styleSheet2)
  }

  handleKeyPress = (event) => {
    event.key === "p" && this.setState({ polyline: !this.state.polyline })
    event.key === "f" && this.setState({ fill: !this.state.fill })
    // event.key === "b" && this.setState((prev)=> ({
    //   strokeColor: prev.strokeColor === "black"
    //     ?"white"
    //     :"black"
    //   }))
    event.key === "a" && this.getPathLength()
    event.key === "m" && this.setState((prev) => (
      prev.lazerMode === 4
        ? {lazerMode: 0}
        : {lazerMode: prev.lazerMode+1}
    ))
    event.key === "-" && this.setState({ grid: this.state.grid-50 })
    event.key === "=" && this.setState({ grid: this.state.grid+50 }) 
    event.key === "g" && this.setState({ showBox: !this.state.showBox })

    let allow = [1,2,3,4,5,6,7,8,9]
    let intervals  = parseInt(event.key)
    allow.includes(intervals) && this.setState({ intervals })
  }

  render (){
    let { pathLength, animationName, fill, strokeColor, backgroundColor, polyline, innerHeight, innerWidth, polylinePoints ,polylinePointsString,
    grid, showBox, clientX, clientY } = this.state
    let fillColor = fill ? '#111':'none'
    let drawPath = animationName
      ?{
        strokeDasharray: 1000,
        animation: `${animationName} 2s linear`,
        fill:fillColor, stroke:strokeColor, strokeWidth:2
      }:{
        fill:fillColor, stroke:strokeColor, strokeWidth:2
      }
      console.log('backgroundColor', backgroundColor )
    return( 
      <div ref={this.boundingBox} style={{marginTop:-60}} > 
        <div onClick={this.handleClick} >
          <svg
          
          key={this.k++} ref={this.svgDraw}
          style={{backgroundColor:backgroundColor, width:'100vw', height:'100vh'}} 
          viewBox={`0 0 ${innerWidth} ${innerHeight}`} >
            <polyline
            id="main-extentions"
            points={polylinePoints}
            style={{fill:"none",stroke:strokeColor,strokeWidth:3}} />
            {polyline
              ?<polyline 
              id="main-path"
              style={drawPath} points={polylinePointsString} ref={this.path} />
              :<polygon points={polylinePointsString}
              style={{fill:fillColor, stroke:strokeColor, strokeWidth:2, fillRule:'evenodd'}} />
          }
          {clientX && showBox && <rect x={clientX-grid} y={clientY-grid} width={grid*2} height={grid*2} style={{fill:'none',stroke:'#ccc'}}/>}
          </svg>
          

        </div>
        <StateTable toggleControls={this.toggleControls} state={this.state}/>
        <ControlTable toggleControls={this.toggleControls} showControls={this.state.showControls}/>
        <button style={{position: 'fixed', bottom:10, left:0, textAlign:'left', fontSize:'.6em'}} onClick={this.downloadSVG}>Download <br/> SVG</button>
      </div>
    )
  }
}

const StateTable = ({state, toggleControls}) => {
  return(
    <div style={{position: 'fixed', width:50, bottom:10, right:75, color: state.theme.bodyColor, textAlign:"left", fontSize:'0.6em'}} >
      <table>
        <thead onClick={()=> toggleControls("showStateTable")}>
          <tr><th colspan="2"> state</th></tr>
        </thead>
        <tbody>
        {state.showStateTable && Object.keys(state).map(key => 
          key !== "polylinePointsString" && 
          (
          <tr key={key} >
            <td>{key}</td>
            <td>{JSON.stringify(state[key])}</td>
          </tr>
          )
      )}
        </tbody>  
      </table>
    </div>
  )
}
const controls = {
  mode:"m",
  direction:"arrows",
  click:"left click",
  intervals:"1-9",
  smaller_grid:"-",
  larger_grid:"=",
  show_grid:"g",
  black_white:"b",
  fill:"f",
  polygon_polyline:"p",
  spaz_out:"a",
}
const ControlTable = ({toggleControls, showControls}) => {
  return(
    <div style={{position: 'fixed', width:50, bottom:10, left:75, textAlign:"left", fontSize:'0.6em'}}>
      <table  >
        <thead onClick={()=>toggleControls("showControls")} >
          <tr><th>Control</th><th>Key</th></tr>
        </thead>
        <tbody>
          {
            showControls && Object.keys(controls).map( control =>
              <tr key={control} ><td>{control}</td><td>{controls[control]}</td></tr>
            )
          }
        </tbody>
      </table>
     {/*  
      <div style={{
        position:"absolute",left:-24,top:'50%',bottom:'50%', 
        width:0, height:0,
        borderTop: '10px solid transparent', 
        borderBottom: '10px solid transparent',
        borderRight: '20px solid blue',
      }}>
      </div> 
    */}
    </div>
  )
}

export default FullScreenSVG