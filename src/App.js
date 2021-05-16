import React from 'react';
// import logo from './logo.svg';
import Header from './components/Elements/Header';
import Contents from './components/contents/Contents'
import History from './components/Views/History'
import Main from './components/Views/Main'
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { animateScroll as scroll } from 'react-scroll'
import './App.css';
// import { Router, Route } from 'react-chrome-extension-router';

function App() {
  /*global chrome*/
  chrome.tabs.getSelected(null, (tab) => {
    console.log(tab.url)
  })

  const date = new Date()
  const day = [
    '日', '月', '火', '水', '木', '金', '土'
  ]

  return (
    <div className="App">
      <Header title='お前観察日記' day={(date.getMonth() + 1) + '月' + date.getDate() + '日 (' + day[date.getDay()] + ')'} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container style={{position: 'fixed', left: 0, top: '10vh'}}>
            <Main />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container className="scroll" style={{height: '90vh'}}>
            <History />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
