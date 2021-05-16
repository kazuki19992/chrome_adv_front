// バックグラウンドで動作させるコード
// リマインド通知を行う処理とか、リマインド登録を行う処理はここに書くべきだと思う……
// (Chromeがバックグラウンドで動き続けていれば、ウインドウを閉じてもこのコードは動き続けるはずです！！)
/*global chrome*/

import dayjs from "dayjs"
const toString = Object.prototype.toString

const getData = () => new Promise((resolve, reject) => {
    chrome.tabs.getSelected(null, (tab) => {
        resolve({url: tab.url, title: tab.title})
    })
})

const redirect = (param) => {
    chrome.tabs.getSelected(null, (tab) => {
        //Your code below...
        var myNewUrl = "https://chrome-adv-okorare.netlify.app/" + encodeURIComponent(param);
        // var myNewUrl = "http://localhost:3000/" + encodeURIComponent(param);
        // console.log(tab)

        //Update the url here.
        chrome.tabs.update(tab.id, {url: myNewUrl});
    });
}

// localStorage.removeItem('footprint')
// localStorage.removeItem('rank')

const blackWebSites = [
    'twitter.com',
    'www.youtube.com',
    'techacademy.jp',
    'www.sejuku.net',
    'chiebukuro.yahoo.co.jp',
    'www.nicovideo.jp'
]
const limit = 50

setInterval(async () => {
    const now = dayjs().format('HH:mm');

    const data = await getData()
    const url = data.url
    const title = data.title
    const domain = GetHostNameFromURL(url)

    addLocalStorage(url, title, now)

    for(const blackDomain of blackWebSites){
        // ブラックドメインAND制限回数を超えたらリダイレクトする
        if(blackDomain === domain && getAccessCount(domain) >= limit){
            if(url !== "https://twitter.com/Tech_Kazu"){
                // console.log(domain + "は制限回数を超えました");
                redirect(domain)
            }else{
                // console.log("あなたは許されました。")
            }
        }
    }

}, 3000);



// ローカルストレージに閲覧履歴を格納する
function addLocalStorage(url, title, now){
    // jsonを組み立てる
    const json = {
        url: url,
        title: title,
        day: dayjs().format('MM/DD'),
        time: now
    }
    let existDataList = []


    existDataList = JSON.parse(localStorage.getItem('footprint'))

    if(existDataList == null){
        existDataList = []
    }
    if(!/^devtools:\/\/devtools\/bundled\/devtools_app\.html/.test(json.url)){
        // console.log(GetHostNameFromURL(json.url))
        if(existDataList.length){
            // 配列が存在する場合

            // 配列の最初の値を取得する
            const compData = existDataList[0]
            // console.log('配列が存在しました')

            if(compData.day !== dayjs().format('MM/DD')){
                // 日付が変わった場合は削除する
                localStorage.removeItem('footprint')
                localStorage.removeItem('rank')

                AddRanking(GetHostNameFromURL(json.url))

                existDataList = []
                existDataList.unshift(json)
                localStorage.setItem('footprint', JSON.stringify(existDataList))
            }

            if(compData.url !== json.url){
                // 配列にオブジェクトを先頭にプッシュする
                existDataList.unshift(json)

                AddRanking(GetHostNameFromURL(json.url))

                localStorage.setItem('footprint', JSON.stringify(existDataList))
                // console.log('書き込みました')
            }else{
                // console.log("同じだったよ！");
            }
        }else{
            // 配列が存在しない場合
            existDataList = []
            existDataList.unshift(json)

            AddRanking(GetHostNameFromURL(json.url))

            localStorage.setItem('footprint', JSON.stringify(existDataList))
            // console.log('初期化')
        }
    }

}

// URLのドメインを取得する
const GetHostNameFromURL = (url) => {
    try {
        const u = new URL(url);
        return u.hostname;
    } catch(err) {
        // console.log(err);
        return null;
    }
}

// URLのドメインをランキングに登録する
const AddRanking = (domain) => {

    // 既存のランキングデータを取得する
    let rankingData = JSON.parse(localStorage.getItem('rank'))

    // ランキングデータの配列が存在しない場合(undefinedやnull)の場合は空の配列を作る
    if(rankingData == null){
        rankingData = []
    }
    if(rankingData.length){
        // 配列が空じゃない
        let findFlg = false

        // ランキングの配列を検索する
        for(const data of rankingData){
            if(!findFlg && data.domain === domain){
                // 項目が見つかった場合
                findFlg = true
                data.count++
            }
        }

        // 項目が見つからなかった場合は追加する
        if(!findFlg){
            const json = {
                domain: domain,
                count: 1
            }
            rankingData.unshift(json)
        }

        // 破壊的変更を防ぐために値渡しをする
        // 配列をコピーする
        // スプレッド構文で展開する
        rankingData = qsortArray( [ ...rankingData ], 0, rankingData.length - 1 )

        // console.log(rankingData)

        localStorage.setItem('rank', JSON.stringify(rankingData))

    }else{
        // 配列が空
        const json = {
            domain: domain,
            count: 1
        }
        // 現在のページで配列を初期化する
        rankingData.unshift(json)

        // 格納する
        localStorage.setItem('rank', JSON.stringify(rankingData))
    }
}

// クイックソート
const qsortArray = (array, start, end) => {
    // ピボットの設定
    let pivot = array[Math.floor((start + end) / 2)].count
    // 引数を左端と右端に設定
    let left = start
    let right = end

    // ピボットより大きい値を左、小さい値を右へ
    while(true) {
        // leftの値がpivotより大きければleftを右へ移動
        while(array[left].count > pivot){
            left++
        }
        // rightは逆
        while(array[right].count < pivot){
            right--;
        }

        // leftとrightの衝突が発生したら止める
        if(right <= left){
            break;
        }

        // rightとleftの値が衝突していない場合はleftとrightを交換する
        // 交換後にleftを後ろ、rightを前へ
        let tmp = { ...array[left] }
        array[left] = { ...array[right] }
        array[right] = { ...tmp }
        left++
        right--
    }

    // 左右に分割可能なデータが存在する場合は再起を行う
    if(start < left - 1){
        qsortArray(array, start, left - 1)
    }
    if(end > right + 1){
        qsortArray(array, right + 1, end)
    }

    return [ ...array ]
}

// 現在のページが何回アクセスされたかを確認
const getAccessCount = (domain) => {
    // ランキングデータを取得する
    let rankingData = JSON.parse(localStorage.getItem('rank'))

    for(const datacell of rankingData){
        if(datacell.domain === domain){
            return datacell.count
        }
    }
}