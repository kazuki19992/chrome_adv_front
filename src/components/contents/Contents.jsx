import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Response from './Response';
import Request from './Request';
import Comment from './Comment'
import dayjs from 'dayjs'



    class Contents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            // logs:[{mode : '0',
            // mes : 'なんで、チャット返してくれないの？？',
            // time: dayjs().format('HH:mm')},{mode : '0',
            // mes : 'ねえ、チャット返してくれないの？？',
            // time: dayjs().format('HH:mm')},{mode : '0',
            // mes : 'かまってよーーー',
            // time: dayjs().format('HH:mm')}
            // ],
            logs: JSON.parse(localStorage.getItem("savedContents")) || [],
            // mode : '',
            // mes : 'なんで、チャット返してくれないの？？',
            // time: dayjs().format('HH:mm')
        };

         // localStorage.setItem('savedContents', JSON.stringify([{mode:'0',mes:'なんで、チャット返してくれないの？？',time:'10:10'},{mode : '0', mes : 'ねえ、チャット返してくれないの？？', time:'10:11'}]));
      }

        componentDidMount() {
        this.TimerID= setInterval(
            ()=>this.tick(),1000
        );
        }
        componentWillUnmount() {
            clearInterval(this.timerID);
        }
        tick() {
            this.setState({
                logs: JSON.parse(localStorage.getItem("savedContents"))
            });
            const scrollArea = document.getElementById("scroll-area")
            if (scrollArea) {
                console.log(scrollArea.scrollTop);
                console.log(scrollArea.scrollHeight);
                scrollArea.scrollTop = scrollArea.scrollHeight;
            }

        }



        render(){

        //const classes = useStyles();
        //console.log(this.state.logs)
        // this.state.logs.add({mode : '0',
        //     mes : 'ねえ、チャット返してくれないの？？',
        //     time:'10:11'})
        const messages=this.state.logs.map(e=>(
            <Comment mode={e.mode} text={e.mes} time={e.time}/>
        ))
        return (
        <div id="scroll-area" style={{marginBottom: "110px",width: "95%", margin: "auto",overflowY: "scroll",height:"60%"}}>
        {/* <Comment mode={this.state.mode} text={this.state.mes} time={this.state.time}/> */}
        {messages}
        </div>
    )
    } 
}
export default Contents