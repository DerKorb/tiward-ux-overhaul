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
`;class Y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(W.content.cloneNode(!0)),this.cardsContainer=this.shadowRoot.getElementById("cards")}async connectedCallback(){const w=await(await import("https://www.twilightwars.com/js/api.js")).getPlayer();console.log(w);const{actionCards:b,secretObjectives:m,promissoryNotes:p}=w;b.forEach(s=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");t.src=`/img/action-cards/${s.name}.png`,i.appendChild(t)}),m.forEach(s=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");t.src=`/img/objectives/${s.name}.png`,i.appendChild(t)}),p.filter(s=>s.color!==w.color).forEach(s=>{const i=document.createElement("div");i.className="card",this.cardsContainer.appendChild(i);const t=document.createElement("img");"faction"in s?t.src=`/img/faction/${s.faction}/${s.name}.png`:t.src=`/img/misc/${s.color}/${s.name}.png`,i.appendChild(t)})}}window.customElements.define("ti-cards-component",Y);const Q="rgba(0, 0, 0, 0.8)",Z=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]];async function U(){const v=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:o}=await import("https://www.twilightwars.com/js/board-creation.js"),w=await v.getBoardSystems(),b=await v.getPlayers(),m=new Image;m.src="data:image/png;base64,"+K,await new Promise(p=>{m.onload=p}),w.forEach(async p=>{var i,t,A,a;const s=p.number===51?o[o.length-1]:o[p.position];await O(b,p,m,s),(i=s.userData.boardTokens)==null||i.controlTokens.forEach(u=>{u.visible=!1}),(t=s.userData.boardTokens)==null||t.infantry.forEach(u=>{u.visible=!1}),(A=s.userData.boardTokens)==null||A.pds.forEach(u=>{u.visible=!1}),(a=s.userData.boardTokens)==null||a.spaceDock.forEach(u=>{u.visible=!1}),s.material.map.needsUpdate=!0,s.material.needsUpdate=!0})}const K="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";async function O(v,o,w,b){var V,z,L;const{CanvasTexture:m,Mesh:p,MeshBasicMaterial:s}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:i}=await import("https://www.twilightwars.com/js/utils/geometries.js"),t=document.createElement("canvas"),A=t.getContext("2d"),a=25;t.width=512,t.height=512;const u={Alpha:"red",Beta:"blue",Delta:"green"},E=v.reduce((e,n)=>(e[n.faction]=n.color,e),{}),G={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},P={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},j=(V=o.units)==null?void 0:V[0],M=j?G[j.color]:null;M&&(A.fillStyle=M,A.fillRect(0,0,t.width,t.height),A.globalCompositeOperation="destination-in",A.drawImage(w,-t.width*.1,-t.height*.1,t.width*1.2,t.height*1.2),A.globalCompositeOperation="source-over");function f(e,n,r,l,c="white",h=!1,g){A.font=`bold ${e}px Arial`;const d=A.measureText(n).width,y=r-d/2;A.fillStyle=c,A.fillText(n,h?y:r,l),g&&(A.strokeStyle=g,A.lineWidth=2,A.strokeText(n,h?y:r,l))}function $(e,n,r,l,c,h="white"){A.beginPath(),A.moveTo(e+c,n),A.lineTo(e+r-c,n),A.quadraticCurveTo(e+r,n,e+r,n+c),A.lineTo(e+r,n+l-c),A.quadraticCurveTo(e+r,n+l,e+r-c,n+l),A.lineTo(e+c,n+l),A.quadraticCurveTo(e,n+l,e,n+l-c),A.lineTo(e,n+c),A.quadraticCurveTo(e,n,e+c,n),A.closePath(),A.fillStyle=h,A.fill()}o.anomaly&&f(a*1.5,o.anomaly,256,50,"white",!0);const _={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};o.wormhole&&f(a*3.5,_[o.wormhole]??o.wormhole,256,500,u[o.wormhole],!0),o.commandTokens&&o.commandTokens.forEach((e,n)=>{const r=E[e];A.lineWidth=20,A.beginPath();const l=2*Math.PI/6*n,c=256+226*Math.cos(l),h=256+266*Math.sin(l),g=256+226*Math.cos(l+2*Math.PI/6),d=256+266*Math.sin(l+2*Math.PI/6);A.moveTo(c,h),A.lineTo(g,d),A.strokeStyle=r,A.stroke()});for(let e=0;e<6;e++){const n=M??"black";A.lineWidth=5,A.beginPath();const r=2*Math.PI/6*e,l=256+256*Math.cos(r),c=256+296*Math.sin(r),h=256+256*Math.cos(r+2*Math.PI/6),g=256+296*Math.sin(r+2*Math.PI/6);A.moveTo(l,c),A.lineTo(h,g),A.strokeStyle=n,A.stroke()}if(o.planets){let e=0;for(const n of o.planets)tA(n,e++)}const R=new m(t),AA=i(.9),eA=new s({map:R});new p(AA,eA),b.material.onBeforeCompile=function(e){e.uniforms.canvasTexture={value:R},e.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function tA(e,n){const r=Z[o.planets.length][n].position[0],l=Z[o.planets.length][n].position[1],c=v.find(C=>C.planetCards.find(k=>k.name===e.name));function h(C,k,B){const F=c?P[c.color]:"white";A.fillStyle="white",C.filter(x=>x.name==="PDS").forEach((x,D)=>{f(a,"🛡",k+10+D*30,B-25,F)}),C.filter(x=>x.name==="Space Dock").forEach((x,D)=>{f(a,"🏗",k+10+D*30,B,F)});const oA=C.some(x=>x.name==="Infantry"&&x.upgraded);f(a,`🥆${oA?"+":""}`,k+82,B+35,F),A.font=`bold ${a*2}px Arial`,f(a*2,C.filter(x=>x.name==="Infantry").length.toString(),k+95,B,F,!0)}const g=c?c.planetCards.find(C=>C.name===e.name):null,d=`${e.resources}/${e.influence}`;let y,T="";switch(e.tech){case"Warfare":T="🔴";break;case"Biotic":T="🟢";break;case"Cybernetic":y="white",T="🟡";break;case"Propulsion":y="white",T="🔵";break}A.font=`bold ${a}px Arial`;const I=A.measureText(d).width;let S="";if(I>0){switch(e.trait){case"Hazardous":A.fillStyle="red",S="☢️";break;case"Industrial":A.fillStyle="green",S="🏭";break;case"Cultural":A.fillStyle="blue",S="🎭";break;default:A.fillStyle="white"}A.fillStyle=y??"white";const C=c?E[c.faction]:"white";A.font=`bold ${a*2}px Arial`,$(r,l,200,100,10,Q),e.units&&h(e.units,r+80,l+50),f(a*2,d,r+10,l+50,P[C]),g!=null&&g.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(r+25-I/2,l+30),A.lineTo(r+25+I*1.5,l+30),A.strokeStyle=P[C],A.stroke()),f(a*.9,e.name+T+S,r+10,l+85,P[C])}}if(o.units){const e=o.units[0].color,n=o.units.filter(d=>d.name==="Fighter"&&d.color===e).length,r=o.units.filter(d=>d.name==="Infantry"&&d.color===e).length,l=o.units.filter(d=>d.name==="Fighter"&&d.color!==e).length,c=o.units.filter(d=>d.name==="Infantry"&&d.color!==e).length;A.font=`bold ${a*2}px Arial`;const h=((z=o.units[0])==null?void 0:z.color)??"white",g=(L=o.units.find(d=>d.color!==e))==null?void 0:L.color;n+n>0&&(l>0?f(a*3,l.toFixed(0),90,231,h,!0,g):f(a*3,"🛦",90,231,h,!0,"white"),f(a*3,n.toFixed(0),90,331,h,!0,"white")),r+c>0&&(c>0?f(a*3,c.toFixed(0),410,231,h,!0,g):f(a*3,"🥆",410,231,h,!0,"white"),f(a*3,r.toFixed(0),410,331,h,!0,"white"))}}let q=document.createElement("template");q.innerHTML=`
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
`;class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(q.content.cloneNode(!0)),this.unitsContainer=this.shadowRoot.getElementById("units")}async connectedCallback(){const o=await import("https://www.twilightwars.com/js/api.js"),w=await o.getPlayers(),b=await o.getBoardSystems(),m=document.createElement("tr");this.unitsContainer.appendChild(m);const p=document.createElement("td");m.appendChild(p);const s={Flagship:0,"War Sun":0,Dreadnought:0,Carrier:0,Cruiser:0,Destroyer:0,Fighter:0,PDS:0,Infantry:0,"Space Dock":0},i=w.reduce((t,A)=>(t[A.color]={...s},t),{});b.forEach(t=>{t.units.forEach(A=>{i[A.color][A.name]++}),t.planets.forEach(A=>{A.units.forEach(a=>{i[a.color][a.name]++})})}),Object.keys(s).forEach(t=>{const A=document.createElement("td");A.textContent=t,m.appendChild(A)}),w.forEach(t=>{const A=document.createElement("tr");this.unitsContainer.appendChild(A);const a=document.createElement("td");a.textContent=t.faction,A.appendChild(a),Object.values(i[t.color]).forEach(u=>{const E=document.createElement("td");E.style.color=t.color,E.style.fontWeight="bold",E.style.fontSize="20px",E.textContent=u>0?u.toString():"",A.appendChild(E)})})}}window.customElements.define("ti-units-component",X);let H=document.createElement("template");H.innerHTML=`
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
  `;class J extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(H.content.cloneNode(!0)),this.votesContainer=this.shadowRoot.getElementById("votes")}async connectedCallback(){const b=(await(await import("https://www.twilightwars.com/js/api.js")).getPlayers()).reduce((i,t)=>{const A=t.planetCards.reduce((a,u)=>a+u.influence,0);return i[t.color]=A,i},{}),m=Object.values(b).reduce((i,t)=>i+t,0);let p=0;const s=`conic-gradient(${Object.entries(b).map(([i,t],A)=>{const a=`${i} ${(100*p/m).toFixed(2)}%, ${i} ${(100*(p+t)/m).toFixed(2)}%`;return p+=t,a}).join(",")})`;this.votesContainer.getElementsByClassName("pie")[0].style.backgroundImage=s}}window.customElements.define("ti-votes-component",J);async function N(){console.log("running main"),await U(),document.body.appendChild(document.createElement("ti-cards-component")),document.body.appendChild(document.createElement("ti-units-component")),document.body.appendChild(document.createElement("ti-votes-component")),setInterval(U,4e3)}N()})();
