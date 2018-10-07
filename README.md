## :rocket: GITHUB-CLI

First, let us procrastinate: 

version 1.0: https://www.youtube.com/watch?v=KXOu09r43nw

version 2.0: https://www.youtube.com/watch?v=_AzvIEuOKok&feature=youtu.be

What's going on in my github repo ? 

I am using cli, but too lazy to check github issues and prs in the browser, what should I do ? 

### Quick Start

```
git clone https://github.com/ikendoit/github-cli
npm install 
npm install -g 
< set environment variables >
github-cli issues
github-cli prs
```

### environment variables to set: 

```
export USER_GITHUB=<my github user>
export CRED_GITHUB=<my github oauth2 token>
```

### tips: 

pipe your result to `less` to conviniently see the issues and prs

```
github-cli issues -s <state> | less
github-cli issues -s <state> -r <repo> -o <owner name> | less
github-cli prs -r <repo> -o <owner name> -s <state> | less
```
