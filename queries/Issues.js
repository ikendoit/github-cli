const fetch = require('node-fetch')

const repoIssue = async ({repo, user, cred, state}) => {

	const result = await fetch(`https://api.github.com/user/issues?state=${state}`, {
		headers: {
			Authorization: `token ${cred}`
		},
		method: 'GET', 
	})

  const response = await result.json()

  response.forEach(record => {
    const 
      { url, number, title, user, labels, updated_at, body } 
    = record
    console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log('from: ',url)
    console.log('title: ',title)
    console.log('body: ',body)
    console.log('issuer: ',user.login)
    console.log('labels: ',labels.map(label => label.name))
    console.log('updated at: ',updated_at) 
  })

	return response

}

module.exports = {
	repoIssue
}
