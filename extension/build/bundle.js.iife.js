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
`;class Y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(W.content.cloneNode(!0)),this.cardsContainer=this.shadowRoot.getElementById("cards")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),{onActionCardDoubleClick:v}=await import("https://www.twilightwars.com/js/events/action-card.js"),{playerActionCards:b}=await import("https://www.twilightwars.com/js/loaders/load-player-cards.js"),m=await n.getPlayer();console.log(m);const{actionCards:u,secretObjectives:p,promissoryNotes:d}=m;u.forEach(t=>{const A=document.createElement("div");A.ondblclick=()=>{const l=b.find(w=>w.userData.name===t.name);l&&(l.material.opacity=.3,l.scale.x=100,l.scale.y=100,l.visible=!0,setTimeout(()=>{v(),l.scale.x=1,l.scale.y=1,l.material.opacity=1,l.visible=!1},1))},A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/action-cards/${t.name}.png`,A.appendChild(o)}),p.forEach(t=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");o.src=`/img/objectives/${t.name}.png`,A.appendChild(o)}),d.filter(t=>t.color!==m.color).forEach(t=>{const A=document.createElement("div");A.className="card",this.cardsContainer.appendChild(A);const o=document.createElement("img");"faction"in t?o.src=`/img/faction/${t.faction}/${t.name}.png`:o.src=`/img/misc/${t.color}/${t.name}.png`,A.appendChild(o)})}}window.customElements.define("ti-cards-component",Y);const Q="rgba(0, 0, 0, 0.8)",Z=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]];async function U(){const y=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:n}=await import("https://www.twilightwars.com/js/board-creation.js"),v=await y.getBoardSystems(),b=await y.getPlayers(),m=new Image;m.src="data:image/png;base64,"+K,await new Promise(u=>{m.onload=u}),v.forEach(async u=>{var d,t,A,o;const p=u.number===51?n[n.length-1]:n[u.position];await O(b,u,m,p),(d=p.userData.boardTokens)==null||d.controlTokens.forEach(l=>{l.visible=!1}),(t=p.userData.boardTokens)==null||t.infantry.forEach(l=>{l.visible=!1}),(A=p.userData.boardTokens)==null||A.pds.forEach(l=>{l.visible=!1}),(o=p.userData.boardTokens)==null||o.spaceDock.forEach(l=>{l.visible=!1}),p.material.map.needsUpdate=!0,p.material.needsUpdate=!0})}const K="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";async function O(y,n,v,b){var V,z,L;const{CanvasTexture:m,Mesh:u,MeshBasicMaterial:p}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:d}=await import("https://www.twilightwars.com/js/utils/geometries.js"),t=document.createElement("canvas"),A=t.getContext("2d"),o=25;t.width=512,t.height=512;const l={Alpha:"red",Beta:"blue",Delta:"green"},w=y.reduce((e,a)=>(e[a.faction]=a.color,e),{}),G={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},P={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},j=(V=n.units)==null?void 0:V[0],F=j?G[j.color]:null;F&&(A.fillStyle=F,A.fillRect(0,0,t.width,t.height),A.globalCompositeOperation="destination-in",A.drawImage(v,-t.width*.1,-t.height*.1,t.width*1.2,t.height*1.2),A.globalCompositeOperation="source-over");function f(e,a,i,r,s="white",h=!1,g){A.font=`bold ${e}px Arial`;const c=A.measureText(a).width,E=i-c/2;A.fillStyle=s,A.fillText(a,h?E:i,r),g&&(A.strokeStyle=g,A.lineWidth=2,A.strokeText(a,h?E:i,r))}function $(e,a,i,r,s,h="white"){A.beginPath(),A.moveTo(e+s,a),A.lineTo(e+i-s,a),A.quadraticCurveTo(e+i,a,e+i,a+s),A.lineTo(e+i,a+r-s),A.quadraticCurveTo(e+i,a+r,e+i-s,a+r),A.lineTo(e+s,a+r),A.quadraticCurveTo(e,a+r,e,a+r-s),A.lineTo(e,a+s),A.quadraticCurveTo(e,a,e+s,a),A.closePath(),A.fillStyle=h,A.fill()}n.anomaly&&f(o*1.5,n.anomaly,256,50,"white",!0);const _={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};n.wormhole&&f(o*3.5,_[n.wormhole]??n.wormhole,256,500,l[n.wormhole],!0),n.commandTokens&&n.commandTokens.forEach((e,a)=>{const i=w[e];A.lineWidth=20,A.beginPath();const r=2*Math.PI/6*a,s=256+226*Math.cos(r),h=256+266*Math.sin(r),g=256+226*Math.cos(r+2*Math.PI/6),c=256+266*Math.sin(r+2*Math.PI/6);A.moveTo(s,h),A.lineTo(g,c),A.strokeStyle=i,A.stroke()});for(let e=0;e<6;e++){const a=F??"black";A.lineWidth=5,A.beginPath();const i=2*Math.PI/6*e,r=256+256*Math.cos(i),s=256+296*Math.sin(i),h=256+256*Math.cos(i+2*Math.PI/6),g=256+296*Math.sin(i+2*Math.PI/6);A.moveTo(r,s),A.lineTo(h,g),A.strokeStyle=a,A.stroke()}if(n.planets){let e=0;for(const a of n.planets)tA(a,e++)}const R=new m(t),AA=d(.9),eA=new p({map:R});new u(AA,eA),b.material.onBeforeCompile=function(e){e.uniforms.canvasTexture={value:R},e.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function tA(e,a){const i=Z[n.planets.length][a].position[0],r=Z[n.planets.length][a].position[1],s=y.find(C=>C.planetCards.find(k=>k.name===e.name));function h(C,k,B){const M=s?P[s.color]:"white";A.fillStyle="white",C.filter(x=>x.name==="PDS").forEach((x,I)=>{f(o,"🛡",k+10+I*30,B-25,M)}),C.filter(x=>x.name==="Space Dock").forEach((x,I)=>{f(o,"🏗",k+10+I*30,B,M)});const oA=C.some(x=>x.name==="Infantry"&&x.upgraded);f(o,`🥆${oA?"+":""}`,k+82,B+35,M),A.font=`bold ${o*2}px Arial`,f(o*2,C.filter(x=>x.name==="Infantry").length.toString(),k+95,B,M,!0)}const g=s?s.planetCards.find(C=>C.name===e.name):null,c=`${e.resources}/${e.influence}`;let E,T="";switch(e.tech){case"Warfare":T="🔴";break;case"Biotic":T="🟢";break;case"Cybernetic":E="white",T="🟡";break;case"Propulsion":E="white",T="🔵";break}A.font=`bold ${o}px Arial`;const D=A.measureText(c).width;let S="";if(D>0){switch(e.trait){case"Hazardous":A.fillStyle="red",S="☢️";break;case"Industrial":A.fillStyle="green",S="🏭";break;case"Cultural":A.fillStyle="blue",S="🎭";break;default:A.fillStyle="white"}A.fillStyle=E??"white";const C=s?w[s.faction]:"white";A.font=`bold ${o*2}px Arial`,$(i,r,200,100,10,Q),e.units&&h(e.units,i+80,r+50),f(o*2,c,i+10,r+50,P[C]),g!=null&&g.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(i+25-D/2,r+30),A.lineTo(i+25+D*1.5,r+30),A.strokeStyle=P[C],A.stroke()),f(o*.9,e.name+T+S,i+10,r+85,P[C])}}if(n.units){const e=n.units[0].color,a=n.units.filter(c=>c.name==="Fighter"&&c.color===e).length,i=n.units.filter(c=>c.name==="Infantry"&&c.color===e).length,r=n.units.filter(c=>c.name==="Fighter"&&c.color!==e).length,s=n.units.filter(c=>c.name==="Infantry"&&c.color!==e).length;A.font=`bold ${o*2}px Arial`;const h=((z=n.units[0])==null?void 0:z.color)??"white",g=(L=n.units.find(c=>c.color!==e))==null?void 0:L.color;a+a>0&&(r>0?f(o*3,r.toFixed(0),90,231,h,!0,g):f(o*3,"🛦",90,231,h,!0,"white"),f(o*3,a.toFixed(0),90,331,h,!0,"white")),i+s>0&&(s>0?f(o*3,s.toFixed(0),410,231,h,!0,g):f(o*3,"🥆",410,231,h,!0,"white"),f(o*3,i.toFixed(0),410,331,h,!0,"white"))}}let q=document.createElement("template");q.innerHTML=`
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
`;class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(q.content.cloneNode(!0)),this.unitsContainer=this.shadowRoot.getElementById("units")}async connectedCallback(){const n=await import("https://www.twilightwars.com/js/api.js"),v=await n.getPlayers(),b=await n.getBoardSystems(),m=document.createElement("tr");this.unitsContainer.appendChild(m);const u=document.createElement("td");m.appendChild(u);const p={Flagship:0,"War Sun":0,Dreadnought:0,Carrier:0,Cruiser:0,Destroyer:0,Fighter:0,PDS:0,Infantry:0,"Space Dock":0},d=v.reduce((t,A)=>(t[A.color]={...p},t),{});b.forEach(t=>{t.units.forEach(A=>{d[A.color][A.name]++}),t.planets.forEach(A=>{A.units.forEach(o=>{d[o.color][o.name]++})})}),Object.keys(p).forEach(t=>{const A=document.createElement("td");A.textContent=t,m.appendChild(A)}),v.forEach(t=>{const A=document.createElement("tr");this.unitsContainer.appendChild(A);const o=document.createElement("td");o.textContent=t.faction,A.appendChild(o),Object.values(d[t.color]).forEach(l=>{const w=document.createElement("td");w.style.color=t.color,w.style.fontWeight="bold",w.style.fontSize="20px",w.textContent=l>0?l.toString():"",A.appendChild(w)})})}}window.customElements.define("ti-units-component",X);let H=document.createElement("template");H.innerHTML=`
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
  `;class J extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(H.content.cloneNode(!0)),this.votesContainer=this.shadowRoot.getElementById("votes")}async connectedCallback(){const b=(await(await import("https://www.twilightwars.com/js/api.js")).getPlayers()).reduce((d,t)=>{const A=t.planetCards.reduce((o,l)=>o+l.influence,0);return d[t.color]=A,d},{}),m=Object.values(b).reduce((d,t)=>d+t,0);let u=0;const p=`conic-gradient(${Object.entries(b).map(([d,t],A)=>{const o=`${d} ${(100*u/m).toFixed(2)}%, ${d} ${(100*(u+t)/m).toFixed(2)}%`;return u+=t,o}).join(",")})`;this.votesContainer.getElementsByClassName("pie")[0].style.backgroundImage=p}}window.customElements.define("ti-votes-component",J);async function N(){console.log("running main"),await U(),document.body.appendChild(document.createElement("ti-cards-component")),document.body.appendChild(document.createElement("ti-units-component")),document.body.appendChild(document.createElement("ti-votes-component")),setInterval(U,4e3)}N()})();
