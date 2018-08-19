const fetch = require('node-fetch')
const { execSync } = require('child_process');

const repoIssue = async ({repo, user, cred, state, owner}) => {
	
	if (!repo || !owner) {

		// auto fetch current repo info
		const spawnRes = execSync(`echo -e "${user}" -e "${cred}" | git remote show origin`, [], {stdio:[0,1,2]});
		const repoUrl = /https(.*)/.exec(spawnRes.toString())
		const githubParams = /github.com\/(\w+)\/(\w+)/.exec(repoUrl)
		owner = githubParams[1]
		repo = githubParams[2]

	}

	if (!repo || !owner) throw new Error('No Permission to checki repo information')

	const result = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}`, {
		headers: {
			Authorization: `token ${cred}`
		},
		method: 'GET', 
	})

	response = await result.json()

  if (response.length === 0 || !response[0] || !response[0].url) {
    console.log('no issues')
    return
  }

  response.forEach(record => {
    const 
      { url, number, title, user, labels, updated_at, body, closed_at} 
    = record
    console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log('from: ',url)
    console.log('title: ',title)
    console.log('body: ',body)
    console.log('issuer: ',user.login)
		console.log('state: ',record.state)
    console.log('labels: ',labels.map(label => label.name))
    console.log('updated at: ',updated_at) 
		console.log('closed at: ',closed_at)
  })

	return response

}

module.exports = {
	repoIssue
}
