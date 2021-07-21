#!/usr/bin/env sh
###
 # @Author: wangke
 # @Date: 2021-05-26 19:06:09
 # @Description: file content
###

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# deploy to github pages
echo 'aaa.webrabbit.top' > CNAME


if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:websmallrabbit/hmb-front.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://websmallrabbit:${GITHUB_TOKEN}@github.com/websmallrabbit/hmb-front.git
  git config --global user.name "websmallrabbit"
  git config --global user.email "wk_web@163.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github


# test
cd -
rm -rf docs/.vuepress/dist
