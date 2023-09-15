(function(){"use strict";let I=document.createElement("template");I.innerHTML=`
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
`;class V extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(I.content.cloneNode(!0)),this.cardsContainer=this.shadowRoot.getElementById("cards")}async connectedCallback(){const g=await(await import("https://www.twilightwars.com/js/api.js")).getPlayer();console.log(g);const{actionCards:w,secretObjectives:m,promissoryNotes:p}=g;w.forEach(l=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");t.src=`/img/action-cards/${l.name}.png`,i.appendChild(t)}),m.forEach(l=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");t.src=`/img/objectives/${l.name}.png`,i.appendChild(t)}),p.filter(l=>l.color!==g.color).forEach(l=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");"faction"in l?t.src=`/img/faction/${l.faction}/${l.name}.png`:t.src=`/img/misc/${l.color}/${l.name}.png`,i.appendChild(t)})}}window.customElements.define("ti-cards-component",V);const z="rgba(0, 0, 0, 0.8)",W=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]],L=[[256,220],[256,180],[256,220],[256,180]];async function Z(){const E=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:a}=await import("https://www.twilightwars.com/js/board-creation.js"),g=await E.getBoardSystems(),w=await E.getPlayers(),m=new Image;m.src="data:image/png;base64,"+Y,await new Promise(p=>{m.onload=p}),g.forEach(async p=>{var i,t,A,r;const l=p.number===51?a[a.length-1]:a[p.position];await Q(w,p,m,l),(i=l.userData.boardTokens)==null||i.controlTokens.forEach(u=>{u.visible=!1}),(t=l.userData.boardTokens)==null||t.infantry.forEach(u=>{u.visible=!1}),(A=l.userData.boardTokens)==null||A.pds.forEach(u=>{u.visible=!1}),(r=l.userData.boardTokens)==null||r.spaceDock.forEach(u=>{u.visible=!1}),l.material.map.needsUpdate=!0,l.material.needsUpdate=!0})}const Y="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";async function Q(E,a,g,w){var R;const{CanvasTexture:m,Mesh:p,MeshBasicMaterial:l}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:i}=await import("https://www.twilightwars.com/js/utils/geometries.js"),t=document.createElement("canvas"),A=t.getContext("2d"),r=25;t.width=512,t.height=512;const u={Alpha:"red",Beta:"blue",Delta:"green"},k=E.reduce((e,n)=>(e[n.faction]=n.color,e),{}),J={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},P={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},q=(R=a.units)==null?void 0:R[0],D=q?J[q.color]:null;D&&(A.fillStyle=D,A.fillRect(0,0,t.width,t.height),A.globalCompositeOperation="destination-in",A.drawImage(g,-t.width*.1,-t.height*.1,t.width*1.2,t.height*1.2),A.globalCompositeOperation="source-over");function x(e,n,o,s,c="white",f=!1,b){A.font=`bold ${e}px Arial`;const y=A.measureText(n).width,C=o-y/2;A.fillStyle=c,A.fillText(n,f?C:o,s),b&&(A.strokeStyle=b,A.lineWidth=2,A.strokeText(n,f?C:o,s))}function N(e,n,o,s,c,f="white"){A.beginPath(),A.moveTo(e+c,n),A.lineTo(e+o-c,n),A.quadraticCurveTo(e+o,n,e+o,n+c),A.lineTo(e+o,n+s-c),A.quadraticCurveTo(e+o,n+s,e+o-c,n+s),A.lineTo(e+c,n+s),A.quadraticCurveTo(e,n+s,e,n+s-c),A.lineTo(e,n+c),A.quadraticCurveTo(e,n,e+c,n),A.closePath(),A.fillStyle=f,A.fill()}a.anomaly&&x(r*1.5,a.anomaly,256,50,"white",!0);const G={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};a.wormhole&&x(r*3.5,G[a.wormhole]??a.wormhole,256,500,u[a.wormhole],!0),a.commandTokens&&a.commandTokens.forEach((e,n)=>{const o=k[e];A.lineWidth=20,A.beginPath();const s=2*Math.PI/6*n,c=256+226*Math.cos(s),f=256+266*Math.sin(s),b=256+226*Math.cos(s+2*Math.PI/6),y=256+266*Math.sin(s+2*Math.PI/6);A.moveTo(c,f),A.lineTo(b,y),A.strokeStyle=o,A.stroke()});for(let e=0;e<6;e++){const n=D??"black";A.lineWidth=5,A.beginPath();const o=2*Math.PI/6*e,s=256+256*Math.cos(o),c=256+296*Math.sin(o),f=256+256*Math.cos(o+2*Math.PI/6),b=256+296*Math.sin(o+2*Math.PI/6);A.moveTo(s,c),A.lineTo(f,b),A.strokeStyle=n,A.stroke()}if(a.planets){let e=0;for(const n of a.planets)AA(n,e++)}const H=new m(t),$=i(.9),_=new l({map:H});new p($,_),w.material.onBeforeCompile=function(e){e.uniforms.canvasTexture={value:H},e.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function AA(e,n){const o=W[a.planets.length][n].position[0],s=W[a.planets.length][n].position[1],c=E.find(h=>h.planetCards.find(d=>d.name===e.name));function f(h,d,B){const M=c?P[c.color]:"white";A.fillStyle="white",h.filter(v=>v.name==="PDS").forEach((v,F)=>{x(r,"🛡",d+10+F*30,B-25,M)}),h.filter(v=>v.name==="Space Dock").forEach((v,F)=>{x(r,"🏗",d+10+F*30,B,M)});const eA=h.some(v=>v.name==="Infantry"&&v.upgraded);x(r,`🥆${eA?"+":""}`,d+82,B+35,M),A.font=`bold ${r*2}px Arial`,x(r*2,h.filter(v=>v.name==="Infantry").length.toString(),d+95,B,M,!0)}const b=c?c.planetCards.find(h=>h.name===e.name):null,y=`${e.resources}/${e.influence}`;let C,S="";switch(e.tech){case"Warfare":S="🔴";break;case"Biotic":S="🟢";break;case"Cybernetic":C="white",S="🟡";break;case"Propulsion":C="white",S="🔵";break}A.font=`bold ${r}px Arial`;const T=A.measureText(y).width;if(T>0){switch(e.trait){case"Hazardous":A.fillStyle="red";break;case"Industrial":A.fillStyle="green";break;case"Cultural":A.fillStyle="blue";break;default:A.fillStyle="white"}A.fillStyle=C??"white";const h=c?k[c.faction]:"white";A.font=`bold ${r*2}px Arial`,N(o,s,200,100,10,z),e.units&&f(e.units,o+80,s+50),x(r*2,y,o+10,s+50,P[h]),b!=null&&b.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(o+25-T/2,s+30),A.lineTo(o+25+T*1.5,s+30),A.strokeStyle=P[h],A.stroke()),x(r*.9,e.name+S,o+10,s+85,P[h])}}if(a.units){let e=function(o,s,c,f=80){var h;Object.entries(o).length*f;const y=((h=a.units[0])==null?void 0:h.color)??"white",C=["Fi","Fi+","In","In+"],S=["🛦","🛦+","🥆","🥆+"],T=[[90,231,331],[90,231,331],[410,231,331],[410,231,331]];for(let d=0;d<C.length;d++)o[C[d]]&&(x(r*3,`${S[d]}`,T[d][0],T[d][1],y,!0,"white"),x(r*3,`${o[C[d]]?o[C[d]]:""}`,T[d][0],T[d][2],y,!0,"white"))};const n=a.units.reduce((o,s)=>{const c=s.upgraded?s.name.slice(0,2)+"+":s.name.slice(0,2);return o[c]=(o[c]||0)+1,o},{});A.font=`bold ${r*2}px Arial`,L[a.planets.length],e(n)}}let U=document.createElement("template");U.innerHTML=`
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
`;class K extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(U.content.cloneNode(!0)),this.unitsContainer=this.shadowRoot.getElementById("units")}async connectedCallback(){const a=await import("https://www.twilightwars.com/js/api.js"),g=await a.getPlayers(),w=await a.getBoardSystems(),m=document.createElement("tr");this.unitsContainer.appendChild(m);const p=document.createElement("td");m.appendChild(p);const l={Flagship:0,"War Sun":0,Dreadnought:0,Carrier:0,Cruiser:0,Destroyer:0,Fighter:0,PDS:0,Infantry:0,"Space Dock":0},i=g.reduce((t,A)=>(t[A.color]={...l},t),{});w.forEach(t=>{t.units.forEach(A=>{i[A.color][A.name]++}),t.planets.forEach(A=>{A.units.forEach(r=>{i[r.color][r.name]++})})}),Object.keys(l).forEach(t=>{const A=document.createElement("td");A.textContent=t,m.appendChild(A)}),g.forEach(t=>{const A=document.createElement("tr");this.unitsContainer.appendChild(A);const r=document.createElement("td");r.textContent=t.faction,A.appendChild(r),Object.values(i[t.color]).forEach(u=>{const k=document.createElement("td");k.style.color=t.color,k.style.fontWeight="bold",k.style.fontSize="20px",k.textContent=u>0?u.toString():"",A.appendChild(k)})})}}window.customElements.define("ti-units-component",K);let j=document.createElement("template");j.innerHTML=`
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
  `;class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(j.content.cloneNode(!0)),this.votesContainer=this.shadowRoot.getElementById("votes")}async connectedCallback(){const w=(await(await import("https://www.twilightwars.com/js/api.js")).getPlayers()).reduce((i,t)=>{const A=t.planetCards.reduce((r,u)=>r+u.influence,0);return i[t.color]=A,i},{}),m=Object.values(w).reduce((i,t)=>i+t,0);let p=0;const l=`conic-gradient(${Object.entries(w).map(([i,t],A)=>{const r=`${i} ${(100*p/m).toFixed(2)}%, ${i} ${(100*(p+t)/m).toFixed(2)}%`;return p+=t,r}).join(",")})`;this.votesContainer.getElementsByClassName("pie")[0].style.backgroundImage=l}}window.customElements.define("ti-votes-component",X);async function O(){console.log("running main"),await Z(),document.body.appendChild(document.createElement("ti-cards-component")),document.body.appendChild(document.createElement("ti-units-component")),document.body.appendChild(document.createElement("ti-votes-component")),setInterval(Z,4e3)}O()})();
