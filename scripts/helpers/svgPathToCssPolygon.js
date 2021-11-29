import { parseSVG } from "svg-path-parser";
import { round } from "./round";

export const svgPathToCssPolygon = (config) => {
    const { width, height, path } = config;
  
    function mapX(x) {
      return x  / width
    }
    function mapY(y) {
      return y / height
    }
  
    let points = []
  
    const commands = parseSVG(path)
  
    commands.forEach(command => {
  
      if (command.command === 'closepath') {
        return
      }
  
      const prevX = points[points.length - 1]?.x || 0
      const prevY = points[points.length - 1]?.y || 0
  
      if (command.command === 'horizontal lineto') {
        command = { ...command, command: 'lineto', code: 'L', y: prevY }
      }
  
      if (command.command === 'vertical lineto') {
        command = { ...command, command: 'lineto', code: 'L', x: prevX }
      }
  
      const nextX = command.x + (command.relative ? prevX : 0)
      const nextY = command.y + (command.relative ? prevY : 0)
  
      points.push({ x: nextX, y: nextY })
    })
  
    const polygonPoints = points
      .map(({ x, y }) => `${round(mapX(x) * 100)}% ${round(mapY(y) * 100)}%`)
      .join(', ')
  
    return `polygon(${polygonPoints})`
  }
  