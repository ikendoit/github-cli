const screenWidth  = process.stdout.columns
const screenHeight = process.stdout.rows

// draw boxes by line
const drawBoxesByLine = ({ dataArray, boxWidth, boxHeight, numBox, padding }) => {

  // header
  for (let i = 0 ; i < numBox ; i++){
		if (!dataArray[i]) continue
    printMulti(padding,' ')
		printMulti(boxWidth+2, '-')
  }

  print('\n')

  // draw '|' when i===padding-1
  for (let row = 0 ; row < boxHeight ; row++){


		for (let i = 0 ; i < numBox; i++) {
			printMulti(padding, ' ')
			print('|')
			// draw content 
			if (!dataArray[i]) {
				printMulti(boxWidth, ' ')
			}	else {
				let lengthSpace = boxWidth
				for (let chrIndex = 0; chrIndex < boxWidth ; chrIndex++){
					if (['\n'].includes(dataArray[i][0])) {
						dataArray[i] = dataArray[i].slice(1)
						break;
					} else {
						lengthSpace--;
						print(dataArray[i][0])
					}
					dataArray[i] = dataArray[i].slice(1)
				}
				printMulti(lengthSpace,' ')
			}
			print('|')
		}
    print('\n')

  }

  print('\n')
	print('\n')

}

// allocate boxes size, width, num box/line based on dataArray [ string, string, ...]
const drawBoxes = ({ dataArray, ...config }) => {

  let ROW = -1;
  let COLUNN = -1;
  let NUM_BOX = 4;
  let maxLength = -1;
	let maxNewLine = -1;

  dataArray.forEach( (str) => {
    maxLength = Math.max(str.length, maxLength)
		maxNewLine = Math.max((str.match(/(\n|\t|\f|\r)/g) || []).length, maxNewLine)
  });

  const boxWidth      = config.BOX_WIDTH
  const boxHeight     = Math.ceil(maxLength/boxWidth) + maxNewLine
  const padding       = config.PADDING_LEFT
  const numBoxPerLine = Math.floor(screenWidth/(boxWidth+padding+4))

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

const printMulti          = (width,chr) => {
	for (let i = 0 ; i < width ; i++){
		print(chr)
	}
}

module.exports = {
  drawBoxesByLine,
  drawBoxes
}
