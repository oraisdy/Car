(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(7),i=a.n(o),s=(a(15),a(1)),c=a(2),l=a(4),f=a(3),m=a(5),p=(a(16),90),d=Math.min(window.innerHeight,640),h=d-p,u=3,v=3,S=1e3,g=500,k=3,y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).state={upKeyDown:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown.bind(this),!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown.bind(this))}},{key:"handleKeyDown",value:function(e){var t=this,a=this.props,r=a.heroPos,n=a.heroState;switch(e.preventDefault(),e.keyCode){case 37:1===n&&this.props.onPosChange(Math.max(0,r-1));break;case 39:1===n&&this.props.onPosChange(Math.min(r+1,1));break;case 38:this.props.onStateChange(1),this.state.upKeyDown?this.props.onSpeedUp():(this.setState({upKeyDown:!0}),setTimeout(function(){t.setState({upKeyDown:!1})},g));break;case 40:this.props.onStateChange(0)}}},{key:"render",value:function(){var e=this.props,t=e.heroPos,a=e.isHit,r=e.gameState,o=e.lifeInformer;return n.a.createElement("div",{className:["hero",0===t?"left":"right",a?"twinkling":"",1===r?"":"hidden"].join(" ")},n.a.createElement("div",{className:"life life".concat(o)}))}}]),t}(n.a.Component),b=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).mainLoop=function(e){if(requestAnimationFrame(a.mainLoop),1===a.props.heroState&&a.roadRef.current){var t=a.roadRef.current.getBoundingClientRect().top,r=a.props.heroSpeed+a.props.extraSpeed;a.roadRef.current.style.top=t+r+"px",t>=0&&(a.updateCols(),a.props.increaseKilometer(),a.roadRef.current.style.top="-128px")}},a.updateCols=function(){var e=a.state,t=e.roadCol1,r=e.roadCol5;t.unshift(n.a.createElement("div",{key:t.pop().key,className:I()})),r.unshift(n.a.createElement("div",{key:r.pop().key,className:I()})),a.setState({roadCol1:t,roadCol5:r})};var r=new Array(10).fill(0).map(function(e,t){return n.a.createElement("div",{key:t,className:"road-block road-block-road1"})}),o=new Array(10).fill(0).map(function(e,t){return n.a.createElement("div",{key:t,className:"road-block road-block-road3"})}),i=new Array(10).fill(0).map(function(e,t){return n.a.createElement("div",{key:t,className:I()})}),c=new Array(10).fill(0).map(function(e,t){return n.a.createElement("div",{key:t,className:I()})});return a.state={roadCol1:i,roadCol2:r,roadCol4:o,roadCol5:c},a.roadRef=n.a.createRef(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){requestAnimationFrame(this.mainLoop)}},{key:"render",value:function(){var e=this.state,t=e.roadCol5,a=e.roadCol1,r=e.roadCol2,o=e.roadCol4;return n.a.createElement("div",{className:"road",ref:this.roadRef},n.a.createElement("div",{className:"road-col road-col-1"},a),n.a.createElement("div",{className:"road-col road-col-2"},r),n.a.createElement("div",{className:"road-col road-col-3"}),n.a.createElement("div",{className:"road-col road-col-4"},o),n.a.createElement("div",{className:"road-col road-col-5"},t))}}]),t}(n.a.Component),I=function(){var e=Math.random();return e<.3?"road-block road-block-tree1":e<.6?"road-block road-block-tree2":e<.7?"road-block road-block-tent":"road-block"},C=a(8),L=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).trafficLoop=function(){var e=Math.round(6e3*Math.random())+1e3;a.timeout=setTimeout(function(){a.createTraffic(),a.trafficLoop()},e)},a.createTraffic=function(){var e=a.props.gameState,t=a.state,r=t.currentCarId,n=t.participants;1===e&&n.length<u&&a.setState({participants:[].concat(Object(C.a)(n),[r+1]),currentCarId:r+1})},a.onFinish=function(e){a.setState({participants:a.state.participants.filter(function(t){return t!==e})})},a.onLose=function(e){a.onFinish(e),a.props.onLose("crash")},a.state={participants:[],currentCarId:0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.trafficLoop()}},{key:"render",value:function(){var e=this,t=this.state.participants.map(function(t){return n.a.createElement(O,{carId:t,key:t,onFinish:e.onFinish,onLose:e.onLose,extraSpeed:e.props.extraSpeed,heroSpeed:e.props.heroSpeed,heroPos:e.props.heroPos,heroState:e.props.heroState})});return n.a.createElement("div",null,t)}}]),t}(n.a.Component),O=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).mainLoop=function(){var e=a.carRef.current.getBoundingClientRect().top;if(e>=d)a.props.onFinish(a.props.carId);else if(a.state.carPos===a.props.heroPos&&e>=h-p)a.props.onLose(a.props.carId);else{var t=e+a.state.carSpeed+a.props.extraSpeed;1===a.props.heroState&&(t+=a.props.heroSpeed),a.carRef.current.style.top=t+"px",a.animationId=requestAnimationFrame(a.mainLoop)}},a.state={carSpeed:2*Math.random()+1,carPos:Math.floor(2*Math.random()),isHit:!1},a.carRef=n.a.createRef(),a.animationId=null,a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.animationId=requestAnimationFrame(this.mainLoop)}},{key:"componentWillUnmount",value:function(){this.animationId&&cancelAnimationFrame(this.animationId)}},{key:"render",value:function(){var e=this.state.carPos;return n.a.createElement("div",{className:"car ".concat(["left","right"][e]),ref:this.carRef})}}]),t}(n.a.Component),E=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).mainLoop=function(e){a.animationId=requestAnimationFrame(a.mainLoop);var t=a.props,r=t.heroState,n=t.gameState,o=a.state,i=o.trafficType,s=o.trafficLightId;if(1===r&&s>0&&a.trafficLightRef.current){var c=a.trafficLightRef.current.getBoundingClientRect().top,l=a.props.heroSpeed+a.props.extraSpeed;a.trafficLightRef.current.style.top=c+l+"px",c>=d?a.setState({inScreen:!1}):1===n&&0!==i&&c>=h&&a.props.onLose("traffic light")}},a.trafficLoop=function(){var e=Math.round(6e3*Math.random())+3e3;a.timeout=setTimeout(function(){a.createTraffic(),a.trafficLoop()},e)},a.createTraffic=function(){var e=a.props,t=e.heroState,r=e.gameState,n=a.state.inScreen;1!==r||1!==t||n||a.setState({trafficLightId:a.state.trafficLightId+1,inScreen:!0})},a.state={trafficType:0,trafficLightId:0,inScreen:!1},a.trafficLightRef=n.a.createRef(),a.animationId=null,a.intervalId=null,a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.trafficLoop(),this.animationId=requestAnimationFrame(this.mainLoop),this.intervalId=setInterval(function(){e.setState({trafficType:(e.state.trafficType+1)%3})},2e3)}},{key:"componentWillUnmount",value:function(){this.intervalId&&clearInterval(this.intervalId),this.animationId&&cancelAnimationFrame(this.animationId)}},{key:"render",value:function(){var e=this.state,t=e.trafficLightId,a=e.trafficType,r=this.props.heroState;return n.a.createElement("div",{className:["trafficlight",t>0?"":"hidden",1===r?"running":"paused",["green","red","yellow"][a]].join(" "),key:t,ref:this.trafficLightRef})}}]),t}(n.a.Component),j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(f.a)(t).call(this,e))).increaseKilometer=function(){1===a.state.gameState&&1===a.state.heroState&&a.setState({kilometers:a.state.kilometers+.2})},a.throttledChangeInformer=function(){var e=!0;return function(t){e&&(e=!1,console.log("IS HIT",t),a.setState({isHit:!0}),a.state.lifeInformer<=0&&a.gameOver(),a.setState({lifeInformer:a.state.lifeInformer-1}),setTimeout(function(){e=!0,a.setState({isHit:!1})},S))}},a.throttledChangeSpeed=function(){var e=!0;return function(t){e&&(e=!1,a.setState({heroSpeed:a.state.heroSpeed+3}),setTimeout(function(){e=!0,a.setState({heroSpeed:a.state.heroSpeed-3})},g))}},a.gameOver=function(){a.setState({gameState:0})},a.startGame=function(){a.setState({gameState:1})},a.restartGame=function(){a.setState({gameState:1,heroPos:0,heroState:1,lifeInformer:v,isHit:!1,kilometers:0})},a.state={gameState:-1,heroPos:0,heroState:1,lifeInformer:v,isHit:!1,kilometers:0,heroSpeed:k},a.loseLife=a.throttledChangeInformer(),a.speedUp=a.throttledChangeSpeed(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.gameState,r=t.heroState,o=t.heroPos,i=t.lifeInformer,s=t.isHit,c=t.kilometers,l=t.heroSpeed,f=Math.floor(c/10);return n.a.createElement("div",null,n.a.createElement("div",{className:"container"},n.a.createElement(b,{heroState:r,extraSpeed:f,heroSpeed:l,increaseKilometer:this.increaseKilometer}),1===a&&n.a.createElement("div",{className:"informer"},Math.floor(c)),n.a.createElement(y,{isHit:s,gameState:a,heroState:r,heroPos:o,lifeInformer:i,onStateChange:function(t){e.setState({heroState:t})},onPosChange:function(t){e.setState({heroPos:t})},onSpeedUp:this.speedUp}),n.a.createElement(E,{gameState:a,heroState:r,extraSpeed:f,heroSpeed:l,onLose:this.loseLife,onGameOver:this.gameOver}),n.a.createElement(L,{gameState:a,heroPos:o,heroState:r,extraSpeed:f,heroSpeed:l,onLose:this.loseLife,onGameOver:this.gameOver}),-1===a&&n.a.createElement("div",{className:"startgame",onClick:this.startGame}),0===a&&n.a.createElement("div",{className:"gameover"},n.a.createElement("ul",null,n.a.createElement("li",null,"\u4f60\u7684\u6210\u7ee9\uff1a",Math.floor(c)," km"),n.a.createElement("li",{onClick:this.restartGame},n.a.createElement("span",{className:"restartgame"}))))))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.74cb3568.chunk.js.map