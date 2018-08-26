import * as $ from 'jquery'
import 'jquery-knob'

export function initializeKnob(inputSelector) {
  $(inputSelector).knob({
    min: 10,
    max: 30,
    thickness: 0.01,
    angleArc: 290,
    angleOffset: -145,
    cursor: true,
    fgColor: '#333333',
    width: 221,
    height: 221,

    // Add plus or minus sign to the value of circular regulator
    format: function(v) {
      if (v > 0) {
        return '+' + v
      } else if (v === 0) {
        return v
      } else if (v < 0) {
        return '-' + v
      }
    },
    // Override draw
    draw: function () {
      var a = this.arc(this.cv)  // Arc
      var r = 1

      // Outer radial dashes
      this.g.beginPath()
      this.g.strokeStyle = this.o.fgColor

      this.g.lineWidth = 1 * this.scale
      this.g.strokeStyle = '#F5A623'
      var numberOfDashes = 138 // Approximately
      var step = this.PI2 / numberOfDashes
      var proportion = 0.81;  // ratio of inner circle radius to outer circle
      for (var angle = this.startAngle; angle < this.endAngle; angle += step) {
        this.g.beginPath();
        this.g.moveTo(this.xy + this.radius * proportion * Math.cos(angle),
          this.xy + this.radius * proportion * Math.sin(angle));
        this.g.lineTo(this.xy + this.radius * Math.cos(angle),
          this.xy + this.radius * Math.sin(angle))

        if (angle < (a.s + a.e) / 2) {
          this.g.strokeStyle = '#F5A623'
        } else {
          this.g.strokeStyle = '#333333'
        }
        this.g.stroke()
      }

      // Central circle with shadow
      this.g.strokeStyle = '#FEFEFE'
      this.g.fillStyle = '#FEFEFE'
      this.g.shadowColor = 'rgba(134,121,71,0.45)'
      this.g.shadowBlur = 4 * this.scale
      this.g.shadowOffsetY = 2 * this.scale

      this.g.beginPath()
      this.g.arc(this.xy, this.xy, this.radius * proportion + 1, 0, 2 * Math.PI, false)
      this.g.stroke()
      this.g.fill()

      // Cursor
      this.g.fillStyle = '#333333'
      this.g.strokeStyle = '#333333'
      this.g.shadowColor = 'transparent'
      this.g.lineWidth = 2 * this.scale

      var headLen = 6 * this.scale
      var headAngle = (a.s + a.e) / 2
      var toX = this.xy + this.radius * proportion * Math.cos(headAngle)
      var toY = this.xy + this.radius * proportion * Math.sin(headAngle)

      this.g.beginPath()
      this.g.strokeStyle = r ? this.o.fgColor : this.fgColor

      this.g.moveTo(toX, toY)
      this.g.lineTo(toX - headLen * Math.cos(headAngle - Math.PI / 4), toY - headLen * Math.sin(headAngle - Math.PI / 4))

      // Path from the side point of the arrow, to the other side point
      this.g.lineTo(toX - headLen * Math.cos(headAngle + Math.PI / 4), toY - headLen * Math.sin(headAngle + Math.PI / 4))

      // Path from the side point back to the tip of the arrow, and then again to the opposite side point
      this.g.lineTo(toX, toY)
      this.g.lineTo(toX - headLen * Math.cos(headAngle - Math.PI / 4), toY - headLen * Math.sin(headAngle - Math.PI / 4))
      this.g.stroke()
      this.g.fill()

      return false
    }
  })
}