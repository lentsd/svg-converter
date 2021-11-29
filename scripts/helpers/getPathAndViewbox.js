export const  getPathAndViewbox = (svg) => {
    const path = svg.match(/(?<=d=")[^"]*/)[0]
    const width = svg.match(/(?<=width=")\d+/)[0];
    const height = svg.match(/(?<=height=")\d+/)[0];
  
    return {width, height, path};
  }
  