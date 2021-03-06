#!/usr/bin/env node
import * as rp from "request-promise";
import * as fs from 'fs';
//const fs = require('fs')
var cheerio1 = require('cheerio'); 
var program = require('commander');

program
  .option('-l, --list <list>', 'URL for list data')
  .option('-d, --download URL <data>', 'give url for download')
  .option('-s, --selector <selector>', 'It will execute that number only.')
  .option('-h, --help ', "get helps and sample command.")
  .parse(process.argv);

  console.log(program)
// downloadg
if(program.help){
    console.log(` 
    
    !!!! With this program we support some basic ops like: !!!!

    a) Download image with just a line:
    nodescrapy -d https://m.dailyhunt.in/news/india/bangla-newspapers -s ".thumb2 li img"

    a) Enlist data from a website:
    nodescrapy -l https://m.dailyhunt.in/news/india/bangla-newspapers -s ".thumb2 li img@src"

    `)
} 

if(program.download){
    if(!program.selector){
        console.log("Please pass the selector to download data")
    }
    console.log('download started')
    download(program.download, program.selector);
}
else if(program.list){
    if(!program.selector){
        console.log("Please pass the selector to list data")
    }
    console.log('download started')
    findAllDataEntry(program.list, program.selector);
}


async function downloadImg(url, filename){
    try{
        console.log(`[INFO] Downlading ${url} ...`)
        let res = await rp.get({url:url,encoding: null})
        const buffer = Buffer.from(res, 'utf8');
        fs.writeFileSync(filename, buffer);
    } catch(e){
        console.log(e)
    }
}
async function findAllDataEntry(url, selector){
    try{
        console.log(`[INFO] Fetching ${url} ...`)
        let $  = await rp.get({url:url,transform: function (body) {
            return cheerio1.load(body);
        }})
        let sa = selector.split("@")
        let data = $(sa[0]).toArray().forEach(x=>{
            if(x.attribs){
                console.log(x.attribs[sa[1]])
            } else{
                console.log('.')
            }
        })
    } catch(e){
        console.log(e)
    }
}

async function findAllImage(url:string, selector:string):Promise<Array<any>>{
    try{
        console.log(`[INFO] Downlading ${url} ...`)
        let data1 = await rp.get({"uri":'http://prasarbharati.gov.in/'});
        console.log(data1);

        let $  = await rp.get({url:url, headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
          },transform: function (body) {
            return cheerio1.load(body);
        }})
        let data = $(selector).toArray().map(x=>{
            if(x.attribs){
                return {url:x.attribs.src, filename:x.attribs.title.toLowerCase().replace(/ /g,'_')+'.png' }
            } else{
                return null;
            }
        })
        return data;
    } catch(e){
        console.log(e)
    }
    return []
}
//download('https://www.google.com/images/srpr/logo3w.png', 'google.png')
async function download(url, selector){
    var dir = './tmp';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    let list = await findAllImage( url, selector) //"",)
    list.forEach(async(element) => {
        downloadImg(element.url, "./tmp/"+element.filename)
    });
}
download('http://prasarbharati.gov.in/liveradio.php', '.gallery-item .attachment-thumbnail@src')
//download()
