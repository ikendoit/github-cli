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
.action( async () => {

	let state, repo, owner;

	try { 
		switch (program.args[0].toUpperCase()) {

			case 'PRS':
				state = program.state || 'open'
				repo 	= program.repo || null
				owner = program.owner || null
				await prQueries.repoPullRequest({ 
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
				await issueQueries.repoIssue({
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


//const drawBoxes = require('./libs/Drawer/Boxes')
//
////console.log(process.stdout)
//// draw 4 square boxes each row, 27x20
//const config =  {
//  BOX_WIDTH      : 20,
//  PADDING_LEFT   : 3,
//}
//
//const data   =  [
//  {
//    name: 'name 1aha1123456789123asfsadfdf'
//  },
//  {
//    name: 'name 2'
//  },
//  {
//    name: 'name 3'
//  },
//  {
//    name: 'name 4'
//  },
//  {
//    name: 'name 3 again'
//  },
//  {
//    name: 'name fourth'
//  },
//  {
//    name: 'name fith'
//  },
//  {
//    name: 'name filthyyyy'
//  },
//  {
//    name: 'name checking '
//  },
//  {
//    name: 'name maybe last one ?'
//  },
//  {
//    name: 'name what is this'
//  },
//  {
//    name: 'name can I trust this?'
//  },
//]
//
//
//drawBoxes.drawBoxes({
//  dataArray: data.map(ele => ele.name),
//  ...config,
//})
