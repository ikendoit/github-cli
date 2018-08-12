# GITHUB-CLI-ISSUES

What's going on in my github repo ? 

I am using cli, but too lazy to check github issues and prs, what should I do ? 

## Quick Start

```
git clone https://github.com/ikendoit/github-cli
npm install 
npm install -g 
< set environment variables >
git-issues issues -s open 
git-issues prs -r <repo> -o <owner name>
```

## environment variables to set: 

```
export USER_GITHUB=<my github user>
export USER_CRED=<my github oauth2 token>
```
