import React from 'react';
import Entry from '../Elements/HistoryEntry'
import { Container } from '@material-ui/core'


export default function History() {
    const History = JSON.parse(localStorage.getItem('footprint'))
    let EntryData = [];

    // 文字列が長くなる場合は省略
    // omit(文字列)(長さ)(省略記号(...とか(以下略)とか))
    const omit = text => len => ellipsis =>
        text.length >= len
            ? text.slice(0, len - ellipsis.length) + ellipsis
            : text

    if(History.length){
        for(const HistoryData of History){
            EntryData.push(<Entry rank="" text={omit(HistoryData.title)(40)('(以下略)')} href={HistoryData.url} bg='#c5f6fc' />)
        }
    }

    if(!EntryData.length){
        EntryData = null;
    }

    return (
        <div>
            <Container>
                <p style={{textAlign: 'center'}}>閲覧データ</p>
                {EntryData}
            </Container>
        </div>
    )
}