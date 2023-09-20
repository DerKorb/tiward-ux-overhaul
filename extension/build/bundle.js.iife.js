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
`;class Q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(W.content.cloneNode(!0)),this.cardsContainer=this.shadowRoot.getElementById("cards")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),{onActionCardDoubleClick:b}=await import("https://www.twilightwars.com/js/events/action-card.js"),{playerActionCards:w}=await import("https://www.twilightwars.com/js/loaders/load-player-cards.js"),m=await n.getPlayer();console.log(m);const{actionCards:p,secretObjectives:u,promissoryNotes:c}=m;p.forEach(e=>{const A=document.createElement("div");A.ondblclick=()=>{const r=w.find(f=>f.userData.name===e.name);r&&(r.material.opacity=.3,r.scale.x=100,r.scale.y=100,r.visible=!0,setTimeout(()=>{b(),r.scale.x=1,r.scale.y=1,r.material.opacity=1,r.visible=!1},1))},A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/action-cards/${e.name}.png`,A.appendChild(o)}),u.forEach(e=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/objectives/${e.name}.png`,A.appendChild(o)}),c.filter(e=>e.color!==m.color).forEach(e=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");"faction"in e?o.src=`/img/faction/${e.faction}/${e.name}.png`:o.src=`/img/misc/${e.color}/${e.name}.png`,A.appendChild(o)})}}window.customElements.define("ti-cards-component",Q);const K="rgba(0, 0, 0, 0.8)",Z=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]];async function U(){const y=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:n}=await import("https://www.twilightwars.com/js/board-creation.js"),b=await y.getBoardSystems(),w=await y.getPlayers(),m=new Image;m.src="data:image/png;base64,"+O,await new Promise(p=>{m.onload=p}),b.forEach(async p=>{var c,e,A,o;const u=p.number===51?n[n.length-1]:n[p.position];await X(w,p,m,u),(c=u.userData.boardTokens)==null||c.controlTokens.forEach(r=>{r.visible=!1}),(e=u.userData.boardTokens)==null||e.infantry.forEach(r=>{r.visible=!1}),(A=u.userData.boardTokens)==null||A.pds.forEach(r=>{r.visible=!1}),(o=u.userData.boardTokens)==null||o.spaceDock.forEach(r=>{r.visible=!1}),u.material.map.needsUpdate=!0,u.material.needsUpdate=!0})}const O="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";async function X(y,n,b,w){var R,z,L,Y;const{CanvasTexture:m,Mesh:p,MeshBasicMaterial:u}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:c}=await import("https://www.twilightwars.com/js/utils/geometries.js"),e=document.createElement("canvas"),A=e.getContext("2d"),o=25;e.width=512,e.height=512;const r={Alpha:"red",Beta:"blue",Delta:"green"},f=y.reduce((t,a)=>(t[a.faction]=a.color,t),{}),_={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},P={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},V=(R=n.units)==null?void 0:R[0],F=V?_[V.color]:null;F&&(A.fillStyle=F,A.fillRect(0,0,e.width,e.height),A.globalCompositeOperation="destination-in",A.drawImage(b,-e.width*.1,-e.height*.1,e.width*1.2,e.height*1.2),A.globalCompositeOperation="source-over");function g(t,a,i,l,s="white",h=!1,C){A.font=`bold ${t}px Arial`;const d=A.measureText(a).width,E=i-d/2;A.fillStyle=s,A.fillText(a,h?E:i,l),C&&(A.strokeStyle=C,A.lineWidth=2,A.strokeText(a,h?E:i,l))}function AA(t,a,i,l,s,h="white"){A.beginPath(),A.moveTo(t+s,a),A.lineTo(t+i-s,a),A.quadraticCurveTo(t+i,a,t+i,a+s),A.lineTo(t+i,a+l-s),A.quadraticCurveTo(t+i,a+l,t+i-s,a+l),A.lineTo(t+s,a+l),A.quadraticCurveTo(t,a+l,t,a+l-s),A.lineTo(t,a+s),A.quadraticCurveTo(t,a,t+s,a),A.closePath(),A.fillStyle=h,A.fill()}n.anomaly&&g(o*1.5,n.anomaly,256,50,"white",!0);const eA={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};n.wormhole&&g(o*3.5,eA[n.wormhole]??n.wormhole,256,500,r[n.wormhole],!0),n.commandTokens&&n.commandTokens.forEach((t,a)=>{const i=f[t];A.lineWidth=20,A.beginPath();const l=2*Math.PI/6*a,s=256+226*Math.cos(l),h=256+266*Math.sin(l),C=256+226*Math.cos(l+2*Math.PI/6),d=256+266*Math.sin(l+2*Math.PI/6);A.moveTo(s,h),A.lineTo(C,d),A.strokeStyle=i,A.stroke()});for(let t=0;t<6;t++){const a=F??"black";A.lineWidth=5,A.beginPath();const i=2*Math.PI/6*t,l=256+256*Math.cos(i),s=256+296*Math.sin(i),h=256+256*Math.cos(i+2*Math.PI/6),C=256+296*Math.sin(i+2*Math.PI/6);A.moveTo(l,s),A.lineTo(h,C),A.strokeStyle=a,A.stroke()}if(n.planets){let t=0;for(const a of n.planets)nA(a,t++)}const j=new m(e),tA=c(.9),oA=new u({map:j});new p(tA,oA),w.material.onBeforeCompile=function(t){t.uniforms.canvasTexture={value:j},t.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function nA(t,a){const i=Z[n.planets.length][a].position[0],l=Z[n.planets.length][a].position[1],s=y.find(x=>x.planetCards.find(k=>k.name===t.name));function h(x,k,B){const M=s?P[s.color]:"white";A.fillStyle="white",x.filter(v=>v.name==="PDS").forEach((v,I)=>{g(o,"🛡",k+10+I*30,B-25,M)}),x.filter(v=>v.name==="Space Dock").forEach((v,I)=>{g(o,"🏗",k+10+I*30,B,M)});const aA=x.some(v=>v.name==="Infantry"&&v.upgraded);g(o,`🥆${aA?"+":""}`,k+82,B+35,M),A.font=`bold ${o*2}px Arial`,g(o*2,x.filter(v=>v.name==="Infantry").length.toString(),k+95,B,M,!0)}const C=s?s.planetCards.find(x=>x.name===t.name):null,d=`${t.resources}/${t.influence}`;let E,T="";switch(t.tech){case"Warfare":T="🔴";break;case"Biotic":T="🟢";break;case"Cybernetic":E="white",T="🟡";break;case"Propulsion":E="white",T="🔵";break}A.font=`bold ${o}px Arial`;const D=A.measureText(d).width;let S="";if(D>0){switch(t.trait){case"Hazardous":A.fillStyle="red",S="☢️";break;case"Industrial":A.fillStyle="green",S="🏭";break;case"Cultural":A.fillStyle="blue",S="🎭";break;default:A.fillStyle="white"}A.fillStyle=E??"white";const x=s?f[s.faction]:"white";A.font=`bold ${o*2}px Arial`,AA(i,l,200,100,10,K),t.units&&h(t.units,i+80,l+50),g(o*2,d,i+10,l+50,P[x]),C!=null&&C.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(i+25-D/2,l+30),A.lineTo(i+25+D*1.5,l+30),A.strokeStyle=P[x],A.stroke()),g(o*.9,t.name+T+S,i+10,l+85,P[x])}}if(n.units){const t=((z=n.units[0])==null?void 0:z.color)??"white",a=n.units.filter(d=>d.name==="Fighter"&&d.color===t).length,i=n.units.filter(d=>d.name==="Infantry"&&d.color===t).length,l=n.units.filter(d=>d.name==="Fighter"&&d.color!==t).length,s=n.units.filter(d=>d.name==="Infantry"&&d.color!==t).length;A.font=`bold ${o*2}px Arial`;const h=((L=n.units[0])==null?void 0:L.color)??"white",C=(Y=n.units.find(d=>d.color!==t))==null?void 0:Y.color;a+a>0&&(l>0?g(o*3,l.toFixed(0),90,231,h,!0,C):g(o*3,"🛦",90,231,h,!0,"white"),g(o*3,a.toFixed(0),90,331,h,!0,"white")),i+s>0&&(s>0?g(o*3,s.toFixed(0),410,231,h,!0,C):g(o*3,"🥆",410,231,h,!0,"white"),g(o*3,i.toFixed(0),410,331,h,!0,"white"))}}let q=document.createElement("template");q.innerHTML=`
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
`;class J extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(q.content.cloneNode(!0)),this.unitsContainer=this.shadowRoot.getElementById("units")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),b=await n.getPlayers(),w=await n.getBoardSystems(),m=document.createElement("tr");this.unitsContainer.appendChild(m);const p=document.createElement("td");m.appendChild(p);const u={Flagship:0,"War Sun":0,Dreadnought:0,Carrier:0,Cruiser:0,Destroyer:0,Fighter:0,PDS:0,Infantry:0,"Space Dock":0},c=b.reduce((e,A)=>(e[A.color]={...u},e),{});w.forEach(e=>{e.units.forEach(A=>{c[A.color][A.name]++}),e.planets.forEach(A=>{A.units.forEach(o=>{c[o.color][o.name]++})})}),Object.keys(u).forEach(e=>{const A=document.createElement("td");A.textContent=e,m.appendChild(A)}),b.forEach(e=>{const A=document.createElement("tr");this.unitsContainer.appendChild(A);const o=document.createElement("td");o.textContent=e.faction,A.appendChild(o),Object.values(c[e.color]).forEach(r=>{const f=document.createElement("td");f.style.color=e.color,f.style.fontWeight="bold",f.style.fontSize="20px",f.textContent=r>0?r.toString():"",A.appendChild(f)})})}}window.customElements.define("ti-units-component",J);let H=document.createElement("template");H.innerHTML=`
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
  `;const N={red:"#500000",green:"#005000",blue:"#000050",yellow:"#505000",purple:"#500050",orange:"#504000"};class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(H.content.cloneNode(!0)),this.votesContainer=this.shadowRoot.getElementById("votes")}async connectedCallback(){const b=await(await import("https://www.twilightwars.com/js/api.js")).getPlayers();console.log(b);const w=b.reduce((c,e)=>{let A=e.planetCards.reduce((r,f)=>r+f.influence,0),o=e.planetCards.reduce((r,f)=>r+(f.exhausted?f.influence:0),0);return c[N[e.color]]=o,c[e.color]=A,c},{});for(const c of b)c.vote&&!c.vote.abstain&&(w[c.color]=w[c.color]-c.vote.count);const m=Object.values(w).reduce((c,e)=>c+e,0);let p=0;const u=`conic-gradient(${Object.entries(w).map(([c,e],A)=>{const o=`${c} ${(100*p/m).toFixed(2)}%, ${c} ${(100*(p+e)/m).toFixed(2)}%`;return p+=e,o}).join(",")})`;this.votesContainer.getElementsByClassName("pie")[0].style.backgroundImage=u}}window.customElements.define("ti-votes-component",G);async function $(){console.log("running main"),await U(),document.body.appendChild(document.createElement("ti-cards-component")),document.body.appendChild(document.createElement("ti-units-component")),document.body.appendChild(document.createElement("ti-votes-component")),setInterval(U,4e3)}$()})();
