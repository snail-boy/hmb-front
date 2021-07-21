require('shelljs/global')

const iconv =require("iconv-lite");

var path = require('path');
let  join = require('path').join;

const chalk = require('chalk')

// const word2html = require('word2html');
//Word document's absolute path


var fs = require('fs');
var cheerio = require('cheerio');
//
// var myHtml = fs.readFileSync("a.html");
// var $ = cheerio.load(myHtml);
// var t = $('html').find('hr');
//

// var t2 = t.nextAll();


// var absPath = path.join(__dirname, '/nextVue/');
//
// exec(`rm -r ${absPath}`, function (error, data) {
//   console.log(chalk.green(`> 删除${absPath}文件夹成功`))
// })


function findSync(startPath) {
  let result=[];
  function finder(path) {
    let files=fs.readdirSync(path);
    files.forEach((val,index) => {
      let fPath=join(path,val);
      let stats=fs.statSync(fPath);
      if(stats.isDirectory()) finder(fPath);
      if(stats.isFile()) result.push(fPath);
    });
  }
  finder(startPath);
  return result;
}


let nextVue = path.join(__dirname, '/nextVue')

let htmlFile = path.join(__dirname, 'html/')

let fileNames=findSync(htmlFile);



exec(`mkdir -p ${nextVue}`, function (error, data) {
  console.log(chalk.green(`> 创建nextVue文件夹成功`))
})




fileNames.forEach(value => {
  console.log(value)
  if(value.indexOf('参保须知') > -1) {
    writeFunc(1, value)
  } else if(value.indexOf('产品条款') > -1) {
    writeFunc(2, value)
  }else if(value.indexOf('理赔须知') > -1) {
    writeFunc(3, value)
  }else if(value.indexOf('授权申明') > -1) {
    writeFunc(4, value)
  }else if(value.indexOf('支付授权书') > -1) {
    writeFunc(5, value)
  }else if(value.indexOf('用户协议') > -1) {
    writeFunc(6, value)
  }else if(value.indexOf('投保提示书') > -1) {
    writeFunc(7, value)
  }
})

function writeFunc(type, value) {
  var myHtml = fs.readFileSync(value);
  var $ = cheerio.load(iconv.decode(myHtml, 'utf-8'));

  var t = $('html').find('body');

  let content = t.toString()

  let frontDom = '<template>\n' +
    '  '

  let endDom = '\n' +
    '</template>\n' +
    '\n' +
    '<script>\n' +
    '  export default {\n' +
    '    name: "Clause"\n' +
    '  }\n' +
    '</script>\n' +
    '\n' +
    '<style scoped lang="scss">\n' +
    '@import "./style.scss";' +
  '\n' +
  '</style>'

  content = content.replace('body', 'div class="clauses-item-wrapper"')
  content = content.replace('/body', '/div')




  if(type === 1) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/insuredClauses.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 2) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/productClause.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 3) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/claimsClauses.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 4) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/authorizeClauses.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 5) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/insuranceClauses.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 6) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/userClauses.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }else if(type === 7) {
    exec(`echo '${frontDom} ${content} ${endDom}' > ${nextVue}/selfClause.vue`, function (error, data) {
      console.log(chalk.green(`> 写入${value}成功`))
    })
  }

}

// var absPath = path.join(__dirname, '/html/');
//
// exec(`rm -r ${absPath}`, function (error, data) {
//   console.log(chalk.green(`> 删除${absPath}文件夹成功`))
// })



