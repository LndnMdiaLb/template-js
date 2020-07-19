import './index.css';

window.onload = init;

function init(){
    // console.log(window.libs.CryptoJS.SHA256('a').toString())
    SocketConnection()
}

function SocketConnection(){
  const ws = new WebSocket(`ws://${window.location.host}/`);
  ws.addEventListener('error', console.log );
  ws.addEventListener('open', () => ws.send('ClientA'));
  ws.addEventListener('message', (message) => {
      try {
          console.log(message)
      } catch (e){
          console.log(e);
      }
  });
}
