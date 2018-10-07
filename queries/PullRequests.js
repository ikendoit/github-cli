const fetch = require('node-fetch')
const names = require('../libs/Repo')
const drawBoxes = require('../libs/Drawer/Boxes')
const { CONFIG_BOX: config } = require('../config') 

const repoPullRequest = async ({repo, user, cred, state, owner}) => {

  //TODO: auto get owner name of repo

	if (!owner || !repo) {
		owner = names.ownerName
		repo  = names.repoName
	}
	let result = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
		headers: {
			Authorization: `token ${cred}`
		},
		method: 'GET', 
	})

  let response = await result.json()

  if (response.length === 0 || !response[0] || !response[0].url) {
    console.log('no pull request')
    return
  }

  response = response
    .filter(pr => (pr.state === state || state.toUpperCase() === 'ALL'))

	if (response.length === 0){
    console.log('no pull request')
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

  return

}

module.exports = {
	repoPullRequest
}
