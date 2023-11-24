const fs = require('fs')
const axios = require('axios')
const { exit } = require('process')

conf = fs.readFileSync('config.json')
conf = JSON.parse(conf.toString())
let cookie = conf.cookie
let file_id = conf.book_url
let login = conf.login
let password = conf.password
let sid = ""

let PFURL = {
    pdf: {

    }
}

async function main() {
    const urlParams = new URLSearchParams(file_id);
    file_id = urlParams.get('file')

    try {
        fs.mkdirSync(`${file_id}`)
    } catch {}

    sid = await getSID()
    setPageExtensions().then(async () => {
        for (let i = 0; i < PFURL.pdf[file_id].pages[0].p.length; i++) {
            let p =  PFURL.pdf[file_id].pages[0].p[i]
            let res = await axios.get(`https://www.litres.ru/pages/get_pdf_page/?file=${file_id}&page=${i}&rt=w1900&ft=${p.ext}`,  {
                headers: {
                    Cookie: `SID=${sid};`
                },
                responseType: 'stream',
            })
            res.data.pipe(fs.createWriteStream(`${file_id}/${i}.${p.ext}`));
            console.log(`got ${i}.${p.ext}`)
        }
    })
}



async function setPageExtensions() {
    let res = await axios.get(`https://www.litres.ru/pages/get_pdf_js/?file=${file_id}`, {
        headers: {
            Cookie: `SID=${sid};`
        }
    }).catch((e) => {
        console.log("unable to get page data ", e)
        exit()
    })

    eval(res.data)
    console.log("got page data")
}

async function getSID() {
    let res = await axios.post('https://api.litres.ru/foundation/api/auth/login', {
            login,
            password
    }).catch(() => {
        throw "could not log in"
    })

    return res.data.payload.data.sid
}

main()