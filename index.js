#!/usr/bin/env node
const program         = require('commander');
const issueQueries    = require('./queries/Issues')
const prQueries       = require('./queries/PullRequests')

const user            = process.env.USER_GITHUB
const cred            = process.env.CRED_GITHUB

if (!user || !cred) return "please export environment variables"

program
	.command('<resource>', 'the resource to choose: "prs"|"issues"')
	.description('fetch Issues and PRs')
	.option('-s, --state <state>', 'the state to check: "open"|"closed"|"all"|"ALL"')
	.option('-r, --repo <repo>', 'the repository to check')
	.option('-o, --owner <owner>', 'the owner of the repository to check')
	.parse(process.argv)

let state, repo, owner;

try { 
	switch (program.args[0].toUpperCase()) {

		case 'PRS':
			state = program.state || 'open'
			repo 	= program.repo || null
			owner = program.owner || null
			prQueries.repoPullRequest({ 
				repo, 
				user, 
				cred, 
				owner,
				state,
			});
			break;
		case 'ISSUES': 

			state = program.state || 'open'
			repo 	= program.repo || null
			owner = program.owner || null
			issueQueries.repoIssue({
				repo, 
				user, 
				cred, 
				state,
				owner,
			})
			break;

		default:
			console.log('invalid command');
	}
} catch(err) {
	console.log('woops, error, please contact me or check the log')
	console.log(err.message)
}
