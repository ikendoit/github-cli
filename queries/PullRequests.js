const fetch = require('node-fetch')

const repoPullRequest = async ({repo, user, cred, state, owner}) => {

  //TODO: auto get owner name of repo

	const result = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
		headers: {
			Authorization: `token ${cred}`
		},
		method: 'GET', 
	})

  const response = await result.json()

  if (response.length === 0 || !response[0] || !response[0].url) {
    console.log('no pull request')
    return
  }

  response
    .filter(pr => (pr.state === state || state.toUpperCase() === 'ALL'))
    .forEach(pr => {

      const { url, user, title, state, body, updated_at, closed_at, requested_reviewers} = pr
			requested_reviewers.forEach(view => console.log(view.login))
      console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log('from: ',url)
      console.log('title: ',title)
      console.log(`body: "${body}"`)
      console.log('issuer: ',user.login)
			console.log('requested reviewers: ')
			requested_reviewers.forEach(view => console.log(view.login))

      console.log('state: ',state)
      console.log('updated at: ',updated_at)      
      console.log('closed at: ',closed_at)
    });

  return

}

module.exports = {
	repoPullRequest
}
