const { spawnSync }       = require('child_process');

const owner   = spawnSync('git remote -v show | grep -Eo "github.*push" | cut -d"/" -f2', [], { shell: true });
const repo    = spawnSync('git remote -v show | grep -Eo "github.*push" | cut -d"/" -f3', [], { shell: true });
const ownerName = owner.output.toString().match(/\,(.+)/)[1]
const repoName = repo.output.toString().match(/\,(.+) /)[1]

module.exports = {
	ownerName,
	repoName
}

