const screenWidth  = process.stdout.columns
const screenHeight = process.stdout.rows

// draw boxes by line
const drawBoxesByLine = ({ dataArray, boxWidth, boxHeight, numBox, padding }) => {

  // header
  for (let i = 0 ; i < numBox ; i++){
    drawLine(padding,' ')
    drawLine(boxWidth,'-');	
  }

  print('\n')

  // draw '|' when i===padding-1
  for (let row = 0 ; row < boxHeight ; row++){

    const lineWidth  = boxWidth*(numBox)

    for (let i = 0 ; i < lineWidth + padding*numBox ; i++){

      const boxNum     =   Math.floor( i / ( boxWidth+padding ) )
      const atRowEnd   =   i === padding-1
      const atRowStart = ( ( i - padding + 1) % (boxWidth) === 0 ) || ( i + padding % (boxWidth+padding) === 0 )
      let   dataDraw   =   dataArray[boxNum] || ''
      const columnPadd = ( ( i-padding ) % boxWidth === 0 ) ||
                         ( ( i+padding ) % boxWidth === 0 ) 
      if ( atRowStart ||   {
        print('|')
        print(' ')
        i++
      } else {
        if ( dataDraw[0] && (i >= padding || columnPadd) ) {
          print(dataDraw[0])
          dataArray[boxNum] = dataArray[boxNum].slice(1)
        } else {
          print(' ')
        }
      }
    }

    print('\n')

  }

  // footer
  for (let i = 0 ; i < numBox ; i++){
    drawLine(padding,' ')
    drawLine(boxWidth,'-');	
  }

  print('\n')

}

// allocate boxes size, width, num box/line based on dataArray [ string, string, ...]
const drawBoxes = ({ dataArray, ...config }) => {

  let ROW = -1;
  let COLUNN = -1;
  let NUM_BOX = 4;
  let maxLength = -1;

  dataArray.forEach( (str) => {
    maxLength = Math.max(str.length, maxLength)
  });

  const boxWidth      = config.BOX_WIDTH
  const boxHeight     = Math.ceil(maxLength/boxWidth)
  const padding       = config.PADDING_LEFT
  const numBoxPerLine = Math.floor(screenWidth/(boxWidth+padding))

  for (let i = 0 ; i < dataArray.length; i+=numBoxPerLine ){
    let numBox = numBoxPerLine
    drawBoxesByLine({
      dataArray: dataArray.slice(i, i+numBox),
      boxHeight, 
      boxWidth, 
      padding,
      numBox, 
    })
  }

}

const print             = (chr) =>{
	process.stdout.write(`${chr}`)
}

const drawLine          = (width,chr) => {
	for (let i = 0 ; i < width ; i++){
		print(chr)
	}
}

module.exports = {
  drawBoxesByLine,
  drawBoxes
}
