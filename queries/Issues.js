const fetch = require('node-fetch')
const names = require('../libs/Repo')
const drawBoxes = require('../libs/Drawer/Boxes')
const { CONFIG_BOX }= require('../config') 
const config = CONFIG_BOX

const repoIssue = async ({repo, user, cred, state, owner}) => {

	let result, response;

	if (!owner || !repo) {
		owner = names.ownerName
		repo  = names.repoName
	}

	//if (repo && owner) {

	result = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}`, {
		headers: {
			Authorization: `token ${cred}`
		},
		method: 'GET', 
	})

	response = await result.json()

	// to check for all issues in all repos assigned to me
	//} else {

	//	result = await fetch(`https://api.github.com/user/issues?state=${state}`, {
	//		headers: {
	//			Authorization: `token ${cred}`
	//		},
	//		method: 'GET', 
	//	})

	//	response = await result.json()
	//}

  if (response.length === 0 || !response[0] || !response[0].url) {
    console.log('no issues')
    return
  }
	
	drawBoxes.drawBoxes({
		dataArray: response.map(resRecord => `

			State: ${JSON.stringify(resRecord.state)}\n \

			Title: ${JSON.stringify(resRecord.title)}\n \

			Creator: ${JSON.stringify(resRecord.user.login)}\n \

			Label: ${JSON.stringify(resRecord.labels.map(label => label.name))}\n \

			ID: ${JSON.stringify(resRecord.number)}\n \

			Body: ${JSON.stringify(resRecord.body)}\n \

			Updated at: ${JSON.stringify(resRecord.updated_at)}\n \

			URL: ${JSON.stringify(resRecord.url)}\n \

			Closed at: ${JSON.stringify(resRecord.closed_at)}\n \

		`.replace(/(\t|\f|\r)/g,'')),
		...config
	})

  //response.forEach(record => {
  //  const 
  //    { url, number, title, user, labels, updated_at, body, closed_at} 
  //  = record
  //  console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //  console.log('from: ',url)
  //  console.log('title: ',title)
  //  console.log('body: ',body)
  //  console.log('issuer: ',user.login)
	//	console.log('state: ',record.state)
  //  console.log('labels: ',labels.map(label => label.name))
  //  console.log('updated at: ',updated_at) 
	//	console.log('closed at: ',closed_at)
  //})

	//return response

}

module.exports = {
	repoIssue
}
