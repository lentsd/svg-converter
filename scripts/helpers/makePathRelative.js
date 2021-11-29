import { parseSVG } from "svg-path-parser";
import {round} from './round'

export const makePathRelative = (config) => {
    const {width, height, path} = config;
  
    const points = parseSVG(path)
    let newPath = '';
    points.forEach(point => {
      if(point.code === "C"){
        const pathPart = `${point.code} ${round(point.x1 / width)} ${round(point.y1 / height)} ${round(point.x2 / width)} ${round(point.y2 / height)} ${round(point.x / width)} ${round(point.y / height)}`
        newPath += pathPart;
        
      }else {
        const pathPart = `${point.code} ${point.hasOwnProperty("x") ? (round(point.x / width)) : ""} ${point.hasOwnProperty("y") ? (round(point.y / height)) : ""}`;
        newPath += pathPart;
      }
   
    })
  
    return newPath;
  }