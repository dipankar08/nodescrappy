var rp = require('request-promise');
import * as fs from 'fs';
var cheerio = require('cheerio'); 

async function downloadImg(url:string, filename:string){
    try{
        console.log(`[INFO] Downlading ${url} ...`)
        let res = await rp.get({url:url,encoding: null})
        const buffer = Buffer.from(res, 'utf8');
        fs.writeFileSync(filename, buffer);
    } catch(e){
        console.log(e)
    }
}

async function findAllImage(url, selector):Promise<Array<any>>{
    try{
        console.log(`[INFO] Downlading ${url} ...`)
        let $  = await rp.get({url:url,transform: function (body) {
            return cheerio.load(body);
        }})
        let data = $(selector).toArray().map(x=>{
            if(x.attribs){
                return {url:x.attribs.src, filename:x.attribs.title.toLowerCase().replace(' ','_')+'.png' }
            } else{
                return null;
            }
        })
        return data;
    } catch(e){
        console.log(e)
    }
}
//download('https://www.google.com/images/srpr/logo3w.png', 'google.png')
async function download(){
    var dir = './tmp';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    let list = await findAllImage("https://m.dailyhunt.in/news/india/bangla-newspapers",".thumb2 li img")
    list.forEach(element => {
        downloadImg(element.url, "./tmp/"+element.filename)
    });
}

download()
