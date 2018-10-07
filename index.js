#!/usr/bin/env node

const drawBoxes = require('./libs/Drawer/Boxes')

//console.log(process.stdout)
// draw 4 square boxes each row, 27x20
const config =  {
  BOX_WIDTH      : 20,
  PADDING_LEFT   : 3,
}

const data   =  [
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
    name: 'name what is this'
  },
  {
    name: 'name can I trust this?'
  },
]


drawBoxes.drawBoxes({
  dataArray: data.map(ele => ele.name),
  ...config,
})
