import React from 'react';
import Entry from '../Elements/HistoryEntry'

export default function Main() {
    const accessRank = JSON.parse(localStorage.getItem('rank'))
    let top3 = [];

    console.log(accessRank)

    // 文字列が長くなる場合は省略
    // omit(文字列)(長さ)(省略記号(...とか(以下略)とか))
    const omit = text => len => ellipsis =>
        text.length >= len
            ? text.slice(0, len - ellipsis.length) + ellipsis
            : text

    if(accessRank.length < 3){
        top3.unshift(<p style={{textAlign: 'center'}}>3つ以上のサイトにアクセスしてね</p>)
    }else{
        top3.unshift(<p style={{textAlign: 'center'}}><span style={{fontWeight: 'bold', fontSize: '75%'}}>Chromeちゃんを差し置いて</span>よく見てるサイト</p>)
        for(let i = 0; i < 3; i++){
            top3.push(<Entry rank={(i + 1) + " "} text={omit(accessRank[i].domain)(20)('(以下略)') + ' (' + accessRank[i].count + '回)'} href={"https://" + accessRank[i].domain} bg='#ffc72b' />)
        }
        top3.push(<p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '75%'}}>もっとかまって！！！</p>)
    }

    return (
        <div style={{width: '50%'}}>
            {top3}
        </div>
    )
}