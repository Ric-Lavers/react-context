// generates a Mandelbrot circle

export default class Mandelbrot {
  constructor(division, multipler, radius){
    this.division  = division
    this.multipler = multipler
    this.radius    = radius
  }
  //find evenly spaced points around the circle, determinded by the division
  calculatePoints(){
    let d = 2*( Math.PI/ this.division )
    
    let iterater = 0
    let divisionPoints = []
    while (iterater<this.division) {
      divisionPoints.push({
        x: Math.floor(this.radius*Math.cos( d*iterater )*1000 )/ 1000,
        y: Math.floor(this.radius*Math.sin( d*iterater )*1000 )/ 1000
      })
      iterater++
    }
    this.divisionPoints = divisionPoints
    console.log( "multipler",this.multipler )
    // plot points with multipler
    let lines = []
    for(let i=0;i<this.division;i++){
      let iteration = Math.floor( (this.multipler*i) % (this.division) )
      console.log(iteration)
      lines.push([
        divisionPoints[i],
        divisionPoints[iteration]
      ])
    }
    this.lines = lines
    return lines
  }

  outputSVG_string(radius=this.radius){

    const lines = this.calculatePoints().map( l => 
      `<line x1=${l[0].x} y1=${l[0].y} x2=${l[1].x} y2=${l[1].y} style="stroke:black;stroke-width:1" />`
    )
    const output = `
    <svg height=${radius*2} width=${radius*2}
    viewbox="${-radius} ${-radius} ${radius*2} ${radius*2}"
    >
    <circle cx="0" cy="0" r=${radius} stroke="black" stroke-width="1.5" fill="royalblue" />
    ${lines.join()}
    </svg>
    `
    return output
  }





  // return polyline array for checking
  polylineArray(){
    const cords = this.findDivisionPoint()
    return cords.map( c => [c.x, c.y] ).join()
  }

}


// let draw =  new Mandelbrot(10, 2, 100)
// console.log( draw.outputSVG_string() )
