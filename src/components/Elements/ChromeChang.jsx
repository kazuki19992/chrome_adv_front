import React, { useState } from 'react';
import ChromeChang from './chrome_chang.png'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ja'
import './balloon.css'
dayjs.locale('ja')
dayjs.extend(isBetween);

const talkCommon = [
    'ねぇねぇ構ってよー',
    'ひまいなー',
    'コンビニ行かね？',
    'ねー、お前暇ー？',
    '一人で過ごすのも飽きたんだが',
    'あーあーあー',
    'よっす。',
    'お前暇ー？'
]

const noon = [
    '腹減ってきたな',
    'なーなー、コンビニでコーラと魔剤買ってきてくれよ',
    'ゲームすっか？仕事だって？うるせぇゲーム付き合えや',
    'お、昼休みか？いいじゃんゲームしようぜ',
    'なー、昼飯買ってこいよーたのむよー',
    'あー、さっき起きたわ'
]

const night = [
    'お前もう寝んの？',
    'そろそろ寝っかなぁー... あ？「健康だね」だって？うっせ',
    'お風呂入ろっかな',
    'あー、ちょっと眠いな、カフェインキメるか',
    'あーカフェイン効いてきたぁ…！！',
    '腹減ったな、なんか買ってきてくんね？手間賃やるからよ',
    'そろそろアニメの時間か…'
]

const block = [
    'お前暇なんだったら構ってくれよ……',
    'そんなんばっか見てねぇで仕事しろ'
]

export default function Chrome() {
    const accessRank = JSON.parse(localStorage.getItem('rank'))

    console.log(accessRank)

    // const talkArray = await generateTalk()
    const talkArray = [ ...talkCommon, ...noon, ...night, ...block ]

    console.log(talkArray)
    const location = window.location.href
    return (
        <a href={location} style={{textDecoration: 'none'}}>
            <div style={{position: 'fixed', bottom: 0, width: '41%'}}>
                <div className="balloon">
                    <p>{talkArray[Math.floor( Math.random()*(talkArray.length - 1) )]}</p>
                </div>
                <img src={ChromeChang} alt="クロームちゃん" />
            </div>
        </a>
    )
}

// function generateTalk(){
//     const talkCommon = [
//         'ねぇねぇ構ってよー',
//         'ひまいなー',
//         'コンビニ行かね？',
//         'ねー、お前暇ー？',
//         '一人で過ごすのも飽きたんだが',
//         'あーあーあー',
//         'よっす。',
//         'お前暇ー？'
//     ]

//     const morning = [
//         'おはよー',
//         '朝飯？食べてないよー。なにか作ってくれんの？w',
//         '……なんだよ。まだ眠いんだよ',
//         '...zzz',
//         'ねっむ……魔剤キメるか',
//         'お？なんだ？今日は構ってくれんのか？',
//         'あと5分...',
//         'ahoxa, アラームとめて！ ...zzz'
//     ]

//     const noon = [
//         '腹減ってきたな',
//         'なーなー、コンビニでコーラと魔剤買ってきてくれよ',
//         'ゲームすっか？仕事だって？うるせぇゲーム付き合えや',
//         'お、昼休みか？いいじゃんゲームしようぜ',
//         'なー、昼飯買ってこいよーたのむよー',
//         'あー、さっき起きたわ'
//     ]

//     const evening = [
//         '腹減ってきたな',
//         '今日も一日なにもしなかったな……',
//         '今日も終わっちゃったか'
//     ]

//     const night = [
//         'お前もう寝んの？',
//         'そろそろ寝っかなぁー... あ？「健康だね」だって？うっせ',
//         'お風呂入ろっかな',
//         'あー、ちょっと眠いな、カフェインキメるか',
//         'あーカフェイン効いてきたぁ…！！',
//         '腹減ったな、なんか買ってきてくんね？手間賃やるからよ',
//         'そろそろアニメの時間か…'
//     ]

//     const block = [
//         'お前暇なんだったら構ってくれよ……',
//         'そんなんばっか見てねぇで仕事しろ'
//     ]

//     const data = await getData()
//     chrome.tabs.getSelected(null, (data) => {
//         console.log(data.url)
//         let array = []
//         // console.log(data)
//         // console.log(GetHostNameFromURL(data.url))

//         if(GetHostNameFromURL(data.url) === 'chrome-adv-okorare.netlify.app'){
//             array = [ ...block ]
//         }else{
//             array = [ ...talkCommon ]

//             // 現在時刻を取得
//             const now = dayjs().format('HH:mm')

//             // それぞれの時間を取得
//             const morningTime = dayjs('05:00:00')
//             const noonTime = dayjs('10:00:00')
//             const eveningTime = dayjs('16:00:00')
//             const nightTime = dayjs('22:00:00')

//             console.log(now.isBetween(morningTime, noonTime))
//             if(now.isBetween(morningTime, noonTime)){
//                 array = [ ...array, ...morning ]
//             }else if(now.isBetween(noonTime, eveningTime)){
//                 array = [ ...array, ...noon ]
//             }else if(now.isBetween(eveningTime, nightTime)){
//                 array = [ ...array, ...evening ]
//             }else{
//                 array = [ ...array, ...night ]
//             }

//             const now = new Date();
//             // それぞれの時間を取得
//             const morningTime = new Date('05:00:00')
//             const noonTime = new Date('10:00:00')
//             const eveningTime = new Date('16:00:00')
//             const nightTime = new Date('22:00:00')
//             console.log(morningTime)
//         }
//         console.log(array)
//         return [ ...array ]
//     })

//     // let array = []
//     // console.log(data)
//     // console.log(GetHostNameFromURL(data.url))

//     // if(GetHostNameFromURL(data.url) === 'chrome-adv-okorare.netlify.app'){
//     //     array = [ ...block ]
//     // }else{
//     //     array = [ ...talkCommon ]

//     //     // // 現在時刻を取得
//     //     // const now = dayjs().format('HH:mm')

//     //     // // それぞれの時間を取得
//     //     // const morningTime = dayjs('05:00:00')
//     //     // const noonTime = dayjs('10:00:00')
//     //     // const eveningTime = dayjs('16:00:00')
//     //     // const nightTime = dayjs('22:00:00')

//     //     // console.log(now.isBetween(morningTime, noonTime))
//     //     // if(now.isBetween(morningTime, noonTime)){
//     //     //     array = [ ...array, ...morning ]
//     //     // }else if(now.isBetween(noonTime, eveningTime)){
//     //     //     array = [ ...array, ...noon ]
//     //     // }else if(now.isBetween(eveningTime, nightTime)){
//     //     //     array = [ ...array, ...evening ]
//     //     // }else{
//     //     //     array = [ ...array, ...night ]
//     //     // }

//     //     // const now = new Date();
//     //     // // それぞれの時間を取得
//     //     // const morningTime = new Date('05:00:00')
//     //     // const noonTime = new Date('10:00:00')
//     //     // const eveningTime = new Date('16:00:00')
//     //     // const nightTime = new Date('22:00:00')
//     //     // console.log(morningTime)
//     // }
//     // return [ ...array ]
// }
/*global chrome*/

// const getData = () => new Promise((resolve, reject) => {
//     chrome.tabs.getSelected(null, (tab) => {
//         resolve({url: tab.url, title: tab.title})
//     })
// })
