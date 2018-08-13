const fetch = require('node-fetch')

const repoIssue = async ({repo, user, cred, state, owner}) => {

	let result, response;

	if (repo && owner) {

		result = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}`, {
			headers: {
				Authorization: `token ${cred}`
			},
			method: 'GET', 
		})

		response = await result.json()

	} else {

		result = await fetch(`https://api.github.com/user/issues?state=${state}`, {
			headers: {
				Authorization: `token ${cred}`
			},
			method: 'GET', 
		})

		response = await result.json()
	}

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
