#!/usr/bin/env node

const print             = (chr) =>{
	process.stdout.write(`${chr}`)
}
const drawLine          = (width,chr) => {
	for (let i = 0 ; i < width ; i++){
		print(chr)
	}
}

// draw boxes by line
const drawBoxesByLine = ({ dataArray, ROW, COLUMN, NUM_BOX, PADDING_LEFT }) => {

  // draw padding -> draw line ceil
  for (let i = 0 ; i < NUM_BOX ; i++){
    drawLine(PADDING_LEFT,' ')
    drawLine(ROW,'-');	
  }

  print('\n')

  // draw '|' when i===padding-1
  for (let row = 0 ; row < ROW ; row++){

    const lineWidth  = COLUMN*(NUM_BOX-1)

    for (let i = 0 ; i < lineWidth + PADDING_LEFT*NUM_BOX ; i++){

      const boxNum     =   Math.floor( i / ( ROW+PADDING_LEFT ) )
      const atFirst    =   i === PADDING_LEFT-1
      const atRowStart = ( i % (ROW+PADDING_LEFT) === 0 )
      let   dataDraw   =   dataArray[boxNum] || ''
      const columnPadd = ( ( i-PADDING_LEFT ) % COLUMN === 0 ) ||
                         ( ( i+PADDING_LEFT ) % COLUMN === 0 ) 

      if ( atRowStart ||  atFirst ) {
        print('|')
        print(' ')
        i++
      } else {
        if ( dataDraw[0] && (i >= PADDING_LEFT || columnPadd) ) {
          print(dataDraw[0])
          dataArray[boxNum] = dataArray[boxNum].slice(1)
        } else {
          print(' ')
        }
      }
    }

    print('\n')

  }

  for (let i = 0 ; i < NUM_BOX ; i++){
    drawLine(PADDING_LEFT,' ')
    drawLine(ROW,'-');	
  }

  print('\n')

}

// allocate boxes size, width, num box/line based on dataArray [ "...", "..." ]
const drawBoxes = ({ dataArray, PADDING_LEFT }) => {
  let windowWidth = process.env.COLUMN
  let ROW = -1;
  let COLUNN = -1;
  let NUM_BOX = 4;
  dataArray.forEach( str => {
    str.length()
  });
}

// draw 4 square boxes each row, 27x20
const config =  {
  ROW            : 20
  COLUMN         : 27
  NUM_BOX        : 4
  PADDING_LEFT   : 1
}

const data              = [
  {
    name: 'name 1aha1123456789123asfsadfdf'
  },
  {
    name: 'name 2'
  },
  {
    name: 'name 3'
  },
  {
    name: 'name 4'
  },
  {
    name: 'name 3 again'
  },
  {
    name: 'name fourth'
  },
  {
    name: 'name fith'
  },
  {
    name: 'name filthyyyy'
  },
  {
    name: 'name checking '
  },
  {
    name: 'name maybe last one ?'
  },
  {
    name: 'name what \n is this'
  },
  {
    name: 'name can I trust this?'
  },
]


drawBoxesByLine({
  dataArray: data.map(ele => ele.name),
  ...config,
})
