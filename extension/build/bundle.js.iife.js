(function(){"use strict";let W=document.createElement("template");W.innerHTML=`
    <style>
        :host {
            position: fixed;
            bottom: 0px;
        }
        #cards {
            display: flex;
            position: fixed;
            bottom: -242px;
            transition: bottom 0.5s;
        }
        .card {
            border-radius: 5px;
            margin: 5px;
            overflow: hidden;
        }
        .card img {
            width: 200px;
            height: 300px;
        }
        #cards:hover {
            bottom: 0;
        }
    </style>
    <div id="cards">
    </div>
`;class K extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(W.content.cloneNode(!0)),this.cardsContainer=this.shadowRoot.getElementById("cards")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),{onActionCardDoubleClick:f}=await import("https://www.twilightwars.com/js/events/action-card.js"),{playerActionCards:w}=await import("https://www.twilightwars.com/js/loaders/load-player-cards.js"),d=await n.getPlayer();console.log(d);const{actionCards:u,secretObjectives:c,promissoryNotes:h}=d;u.forEach(e=>{const A=document.createElement("div");A.ondblclick=()=>{const i=w.find(g=>g.userData.name===e.name);i&&(i.material.opacity=.3,i.scale.x=100,i.scale.y=100,i.visible=!0,setTimeout(()=>{f(),i.scale.x=1,i.scale.y=1,i.material.opacity=1,i.visible=!1},1))},A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/action-cards/${e.name}.png`,A.appendChild(o)}),c.forEach(e=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/objectives/${e.name}.png`,A.appendChild(o)}),h.filter(e=>e.color!==d.color).forEach(e=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");"faction"in e?o.src=`/img/faction/${e.faction}/${e.name}.png`:o.src=`/img/misc/${e.color}/${e.name}.png`,A.appendChild(o)})}}window.customElements.define("ti-cards-component",K);const X="rgba(0, 0, 0, 0.8)",Z=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]];async function H(){const y=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:n}=await import("https://www.twilightwars.com/js/board-creation.js"),f=await y.getBoardSystems(),w=await y.getPlayers(),d=new Image;d.src="data:image/png;base64,"+N,await new Promise(u=>{d.onload=u}),f.forEach(async u=>{var h,e,A,o;const c=u.number===51?n[n.length-1]:n[u.position];await G(w,u,d,c),(h=c.userData.boardTokens)==null||h.controlTokens.forEach(i=>{i.visible=!1}),(e=c.userData.boardTokens)==null||e.infantry.forEach(i=>{i.visible=!1}),(A=c.userData.boardTokens)==null||A.pds.forEach(i=>{i.visible=!1}),(o=c.userData.boardTokens)==null||o.spaceDock.forEach(i=>{i.visible=!1}),c.material.map.needsUpdate=!0,c.material.needsUpdate=!0})}const N="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";async function G(y,n,f,w){var L,Y,O,Q;const{CanvasTexture:d,Mesh:u,MeshBasicMaterial:c}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:h}=await import("https://www.twilightwars.com/js/utils/geometries.js"),e=document.createElement("canvas"),A=e.getContext("2d"),o=25;e.width=512,e.height=512;const i={Alpha:"red",Beta:"blue",Delta:"green"},g=y.reduce((t,a)=>(t[a.faction]=a.color,t),{}),E={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},S={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},z=(L=n.units)==null?void 0:L[0],I=z?E[z.color]:null;I&&(A.fillStyle=I,A.fillRect(0,0,e.width,e.height),A.globalCompositeOperation="destination-in",A.drawImage(f,-e.width*.1,-e.height*.1,e.width*1.2,e.height*1.2),A.globalCompositeOperation="source-over");function b(t,a,l,s,r="white",m=!1,C){A.font=`bold ${t}px Arial`;const p=A.measureText(a).width,k=l-p/2;A.fillStyle=r,A.fillText(a,m?k:l,s),C&&(A.strokeStyle=C,A.lineWidth=2,A.strokeText(a,m?k:l,s))}function tA(t,a,l,s,r,m="white"){A.beginPath(),A.moveTo(t+r,a),A.lineTo(t+l-r,a),A.quadraticCurveTo(t+l,a,t+l,a+r),A.lineTo(t+l,a+s-r),A.quadraticCurveTo(t+l,a+s,t+l-r,a+s),A.lineTo(t+r,a+s),A.quadraticCurveTo(t,a+s,t,a+s-r),A.lineTo(t,a+r),A.quadraticCurveTo(t,a,t+r,a),A.closePath(),A.fillStyle=m,A.fill()}n.anomaly&&b(o*1.5,n.anomaly,256,50,"white",!0);const oA={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};n.wormhole&&b(o*3.5,oA[n.wormhole]??n.wormhole,256,500,i[n.wormhole],!0),n.commandTokens&&n.commandTokens.forEach((t,a)=>{const l=g[t];A.lineWidth=20,A.beginPath();const s=2*Math.PI/6*a,r=256+226*Math.cos(s),m=256+266*Math.sin(s),C=256+226*Math.cos(s+2*Math.PI/6),p=256+266*Math.sin(s+2*Math.PI/6);A.moveTo(r,m),A.lineTo(C,p),A.strokeStyle=l,A.stroke()});for(let t=0;t<6;t++){const a=I??"black";A.lineWidth=5,A.beginPath();const l=2*Math.PI/6*t,s=256+256*Math.cos(l),r=256+296*Math.sin(l),m=256+256*Math.cos(l+2*Math.PI/6),C=256+296*Math.sin(l+2*Math.PI/6);A.moveTo(s,r),A.lineTo(m,C),A.strokeStyle=a,A.stroke()}if(n.planets){let t=0;for(const a of n.planets)iA(a,t++)}const V=new d(e),nA=h(.9),aA=new c({map:V});new u(nA,aA),w.material.onBeforeCompile=function(t){t.uniforms.canvasTexture={value:V},t.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function iA(t,a){const l=Z[n.planets.length][a].position[0],s=Z[n.planets.length][a].position[1],r=y.find(x=>x.planetCards.find(T=>T.name===t.name));function m(x,T,M){const F=r?S[r.color]:"white";A.fillStyle="white",x.filter(v=>v.name==="PDS").forEach((v,j)=>{b(o,"🛡",T+10+j*30,M-25,F)}),x.filter(v=>v.name==="Space Dock").forEach((v,j)=>{b(o,"🏗",T+10+j*30,M,F)});const lA=x.some(v=>v.name==="Infantry"&&v.upgraded);b(o,`🥆${lA?"+":""}`,T+82,M+35,F),A.font=`bold ${o*2}px Arial`,b(o*2,x.filter(v=>v.name==="Infantry").length.toString(),T+95,M,F,!0)}const C=r?r.planetCards.find(x=>x.name===t.name):null,p=`${t.resources}/${t.influence}`;let k,P="";switch(t.tech){case"Warfare":P="🔴";break;case"Biotic":P="🟢";break;case"Cybernetic":k="white",P="🟡";break;case"Propulsion":k="white",P="🔵";break}A.font=`bold ${o}px Arial`;const D=A.measureText(p).width;let B="";if(D>0){switch(t.trait){case"Hazardous":A.fillStyle="red",B="☢️";break;case"Industrial":A.fillStyle="green",B="🏭";break;case"Cultural":A.fillStyle="blue",B="🎭";break;default:A.fillStyle="white"}A.fillStyle=k??"white";const x=r?g[r.faction]:"white";A.font=`bold ${o*2}px Arial`,tA(l,s,200,100,10,X),t.units&&m(t.units,l+80,s+50),b(o*2,p,l+10,s+50,S[x]),C!=null&&C.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(l+25-D/2,s+30),A.lineTo(l+25+D*1.5,s+30),A.strokeStyle=S[x],A.stroke()),b(o*.9,t.name+P+B,l+10,s+85,S[x])}}if(n.units){const t=((Y=n.units[0])==null?void 0:Y.color)??"white",a=n.units.filter(p=>p.name==="Fighter"&&p.color===t).length,l=n.units.filter(p=>p.name==="Infantry"&&p.color===t).length,s=n.units.filter(p=>p.name==="Fighter"&&p.color!==t).length,r=n.units.filter(p=>p.name==="Infantry"&&p.color!==t).length;A.font=`bold ${o*2}px Arial`;const m=((O=n.units[0])==null?void 0:O.color)??"white",C=(Q=n.units.find(p=>p.color!==t))==null?void 0:Q.color;a+a>0&&(s>0?b(o*3,s.toFixed(0),90,231,m,!0,C):b(o*3,"🛦",90,231,m,!0,"white"),b(o*3,a.toFixed(0),90,331,m,!0,"white")),l+r>0&&(r>0?b(o*3,r.toFixed(0),410,231,m,!0,C):b(o*3,"🥆",410,231,m,!0,"white"),b(o*3,l.toFixed(0),410,331,m,!0,"white"))}}let R=document.createElement("template");R.innerHTML=`
    <style>
        table {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        #units {
            position: relative;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: none; /* Hide the table by default */
        }
        #units td {
            text-align: center;
            min-width: 60px;
            font-size: 16px;
            padding: 5px;
        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 318px;
            z-index: 1000;
        }
        #showButton:hover + #units {
            display: inline-block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Units</button>
    <table id="units">
    </table>
`;class J extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(R.content.cloneNode(!0)),this.unitsContainer=this.shadowRoot.getElementById("units")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),f=await n.getPlayers(),w=await n.getBoardSystems(),d=document.createElement("tr");this.unitsContainer.appendChild(d);const u=document.createElement("td");d.appendChild(u);const c={Flagship:0,"War Sun":0,Dreadnought:0,Carrier:0,Cruiser:0,Destroyer:0,Fighter:0,PDS:0,Infantry:0,"Space Dock":0},h=f.reduce((e,A)=>(e[A.color]={...c},e),{});w.forEach(e=>{e.units.forEach(A=>{h[A.color][A.name]++}),e.planets.forEach(A=>{A.units.forEach(o=>{h[o.color][o.name]++})})}),Object.keys(c).forEach(e=>{const A=document.createElement("td");A.textContent=e,d.appendChild(A)}),f.forEach(e=>{const A=document.createElement("tr");this.unitsContainer.appendChild(A);const o=document.createElement("td");o.textContent=e.faction,A.appendChild(o),Object.values(h[e.color]).forEach(i=>{const g=document.createElement("td");g.style.color=e.color,g.style.fontWeight="bold",g.style.fontSize="20px",g.textContent=i>0?i.toString():"",A.appendChild(g)})})}}window.customElements.define("ti-units-component",J);let U=document.createElement("template");U.innerHTML=`
    <style>
        #votes {
            position: fixed;
            top: 50%;
            left: 50%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            transform: translate(-50%, -50%);
            display: none; /* Hide the table by default */

        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 408px;
            z-index: 1000;
        }
        #showButton:hover + #votes {
            display: block; /* Show the table when the button is hovered */
        }

        .pie {
            width: 400px;
            height: 400px;
            border-radius: 50%
          }
    </style>
    <button id="showButton">Show Votes</button>
    <div id="votes">
          <div class="pie" id="pie1"></div>
    </div>
    <div id="outcomes">
    </div>
  `;const $={red:"#500000",green:"#005000",blue:"#000050",yellow:"#505000",purple:"#500050",orange:"#504000"};class _ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(U.content.cloneNode(!0)),this.votesContainer=this.shadowRoot.getElementById("votes")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),f=await n.getPlayers(),w=await n.getGame();globalThis.players=f,globalThis.game=w;const d=f.reduce((e,A)=>{let o=A.planetCards.reduce((g,E)=>g+E.influence,0),i=A.planetCards.reduce((g,E)=>g+(E.exhausted?E.influence:0),0);return w.phase==="voting"?(e[$[A.color]]=i,e[A.color]=o-i):e[A.color]=o,e},{});for(const e of f)e.vote&&!e.vote.abstain&&(d[e.color]=d[e.color]-e.vote.count);const u=Object.values(d).reduce((e,A)=>e+A,0);let c=0;const h=`conic-gradient(${Object.entries(d).map(([e,A],o)=>{const i=`${e} ${(100*c/u).toFixed(2)}%, ${e} ${(100*(c+A)/u).toFixed(2)}%`;return c+=A,i}).join(",")})`;this.votesContainer.getElementsByClassName("pie")[0].style.backgroundImage=h}}window.customElements.define("ti-votes-component",_);let q=document.createElement("template");q.innerHTML=`
    <style>
        table {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        #objectives {
            position: relative;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: none; /* Hide the table by default */
        }
        #objectives td {
            text-align: center;
            min-width: 60px;
            font-size: 16px;
            padding: 5px;
        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 518px;
            z-index: 1000;
        }
        #showButton:hover + #objectives {
            display: inline-block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Objectives</button>
    <table id="objectives">
    </table>
`;class AA extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(q.content.cloneNode(!0)),this.objectivesContainer=this.shadowRoot.getElementById("objectives")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),f=await n.getPlayers(),w=await n.getGame(),d=document.createElement("tr");this.objectivesContainer.appendChild(d);const u=document.createElement("td");d.appendChild(u),f.forEach(c=>{const h=document.createElement("td");h.textContent=c.faction,d.appendChild(h)}),w.publicObjectives.forEach(c=>{const h=document.createElement("tr");this.objectivesContainer.appendChild(h);const e=document.createElement("td");e.textContent=c.name,h.appendChild(e),f.forEach(A=>{const o=document.createElement("td");o.style.color=A.color,o.style.fontWeight="bold",o.style.fontSize="20px",o.textContent=c.scores.find(i=>i.playerId===A._id)?"✔":"",h.appendChild(o)})})}}window.customElements.define("ti-objectives-component",AA);async function eA(){console.log("running main"),await H(),document.body.appendChild(document.createElement("ti-cards-component")),document.body.appendChild(document.createElement("ti-units-component")),document.body.appendChild(document.createElement("ti-votes-component")),document.body.appendChild(document.createElement("ti-objectives-component")),setInterval(H,4e3)}eA()})();
