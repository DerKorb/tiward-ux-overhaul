(function(){"use strict";const I="rgba(0, 0, 0, 0.8)",D=[[],[{position:[160,290]}],[{position:[120,20]},{position:[160,380]}],[{position:[150,270]},{position:[190,10]},{position:[200,380]}]],V=[[256,220],[256,180],[256,220],[256,180]];async function Y(){const r=await import("https://www.twilightwars.com/js/api.js"),{skeletonHexArray:l}=await import("https://www.twilightwars.com/js/board-creation.js"),C=await r.getBoardSystems(),B=await r.getPlayers(),v=new Image;v.src="data:image/png;base64,"+z,await new Promise(k=>{v.onload=k}),C.forEach(async k=>{var S,f,A,i;const m=k.number===51?l[l.length-1]:l[k.position];await Q(B,k,v,m),(S=m.userData.boardTokens)==null||S.controlTokens.forEach(b=>{b.visible=!1}),(f=m.userData.boardTokens)==null||f.infantry.forEach(b=>{b.visible=!1}),(A=m.userData.boardTokens)==null||A.pds.forEach(b=>{b.visible=!1}),(i=m.userData.boardTokens)==null||i.spaceDock.forEach(b=>{b.visible=!1}),m.material.map.needsUpdate=!0,m.material.needsUpdate=!0})}const z="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";async function Q(r,l,C,B){var q;const{CanvasTexture:v,Mesh:k,MeshBasicMaterial:m}=await import("https://www.twilightwars.com/js/vendor/three/build/three.module.js"),{createHexagonGeometry:S}=await import("https://www.twilightwars.com/js/utils/geometries.js"),f=document.createElement("canvas"),A=f.getContext("2d"),i=25;f.width=512,f.height=512;const b={Alpha:"red",Beta:"blue",Delta:"green"},Z=r.reduce((e,o)=>(e[o.faction]=o.color,e),{}),X={red:"rgba(255, 0, 0, 1.0)",blue:"rgba(0, 0, 255, 1.0)",green:"rgba(0, 255, 0, 1.0)",yellow:"rgba(255, 255, 0, 1.0)",purple:"rgba(255, 0, 255, 1.0)",black:"rgba(0, 0, 0, 1.0)",orange:"rgba(255, 165, 0, 1.0)"},P={red:"rgba(255, 150, 150, 1)",blue:"rgba(150, 150, 255, 1)",green:"rgba(150, 255, 150, 1)",yellow:"rgba(255, 255, 0, 1)",purple:"rgba(255, 150, 255, 1)",orange:"rgba(255, 150, 0, 1)",white:"white"},W=(q=l.units)==null?void 0:q[0],E=W?X[W.color]:null;E&&(A.fillStyle=E,A.fillRect(0,0,f.width,f.height),A.globalCompositeOperation="destination-in",A.drawImage(C,-f.width*.1,-f.height*.1,f.width*1.2,f.height*1.2),A.globalCompositeOperation="source-over");function p(e,o,t,n,a="white",h=!1,u){A.font=`bold ${e}px Arial`;const w=A.measureText(o).width,g=t-w/2;A.fillStyle=a,A.fillText(o,h?g:t,n),u&&(A.strokeStyle=u,A.lineWidth=2,A.strokeText(o,h?g:t,n))}function K(e,o,t,n,a,h="white"){A.beginPath(),A.moveTo(e+a,o),A.lineTo(e+t-a,o),A.quadraticCurveTo(e+t,o,e+t,o+a),A.lineTo(e+t,o+n-a),A.quadraticCurveTo(e+t,o+n,e+t-a,o+n),A.lineTo(e+a,o+n),A.quadraticCurveTo(e,o+n,e,o+n-a),A.lineTo(e,o+a),A.quadraticCurveTo(e,o,e+a,o),A.closePath(),A.fillStyle=h,A.fill()}l.anomaly&&p(i*1.5,l.anomaly,256,50,"white",!0);const L={Alpha:"🔴",Beta:"🔵",Delta:"🟢",Yellow:"🟡"};l.wormhole&&p(i*3.5,L[l.wormhole]??l.wormhole,256,500,b[l.wormhole],!0),l.commandTokens&&l.commandTokens.forEach((e,o)=>{const t=Z[e];A.lineWidth=20,A.beginPath();const n=2*Math.PI/6*o,a=256+226*Math.cos(n),h=256+266*Math.sin(n),u=256+226*Math.cos(n+2*Math.PI/6),w=256+266*Math.sin(n+2*Math.PI/6);A.moveTo(a,h),A.lineTo(u,w),A.strokeStyle=t,A.stroke()});for(let e=0;e<6;e++){const o=E??"black";A.lineWidth=5,A.beginPath();const t=2*Math.PI/6*e,n=256+256*Math.cos(t),a=256+296*Math.sin(t),h=256+256*Math.cos(t+2*Math.PI/6),u=256+296*Math.sin(t+2*Math.PI/6);A.moveTo(n,a),A.lineTo(h,u),A.strokeStyle=o,A.stroke()}if(l.planets){let e=0;for(const o of l.planets)G(o,e++)}const U=new v(f),R=S(.9),J=new m({map:U});new k(R,J),B.material.onBeforeCompile=function(e){e.uniforms.canvasTexture={value:U},e.fragmentShader=`
        uniform sampler2D canvasTexture;
      `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",`
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `)};function G(e,o){const t=D[l.planets.length][o].position[0],n=D[l.planets.length][o].position[1],a=r.find(c=>c.planetCards.find(s=>s.name===e.name));function h(c,s,y){const M=a?P[a.color]:"white";A.fillStyle="white",c.filter(d=>d.name==="PDS").forEach((d,F)=>{p(i,"🛡",s+10+F*30,y-25,M)}),c.filter(d=>d.name==="Space Dock").forEach((d,F)=>{p(i,"🏗",s+10+F*30,y,M)});const O=c.some(d=>d.name==="Infantry"&&d.upgraded);p(i,`🥆${O?"+":""}`,s+82,y+35,M),A.font=`bold ${i*2}px Arial`,p(i*2,c.filter(d=>d.name==="Infantry").length.toString(),s+95,y,M,!0)}const u=a?a.planetCards.find(c=>c.name===e.name):null,w=`${e.resources}/${e.influence}`;let g,x="";switch(e.tech){case"Warfare":x="🔴";break;case"Biotic":x="🟢";break;case"Cybernetic":g="white",x="🟡";break;case"Propulsion":g="white",x="🔵";break}A.font=`bold ${i}px Arial`;const T=A.measureText(w).width;if(T>0){switch(e.trait){case"Hazardous":A.fillStyle="red";break;case"Industrial":A.fillStyle="green";break;case"Cultural":A.fillStyle="blue";break;default:A.fillStyle="white"}A.fillStyle=g??"white";const c=a?Z[a.faction]:"white";A.font=`bold ${i*2}px Arial`,K(t,n,200,100,10,I),e.units&&h(e.units,t+80,n+50),p(i*2,w,t+10,n+50,P[c]),u!=null&&u.exhausted&&(A.lineWidth=5,A.beginPath(),A.moveTo(t+25-T/2,n+30),A.lineTo(t+25+T*1.5,n+30),A.strokeStyle=P[c],A.stroke()),p(i*.9,e.name+x,t+10,n+85,P[c])}}if(l.units){let e=function(t,n,a,h=80){var c;Object.entries(t).length*h;const w=((c=l.units[0])==null?void 0:c.color)??"white",g=["Fi","Fi+","In","In+"],x=["🛦","🛦+","🥆","🥆+"],T=[[90,231,331],[90,231,331],[410,231,331],[410,231,331]];for(let s=0;s<g.length;s++)t[g[s]]&&(p(i*3,`${x[s]}`,T[s][0],T[s][1],w,!0,"white"),p(i*3,`${t[g[s]]?t[g[s]]:""}`,T[s][0],T[s][2],w,!0,"white"))};const o=l.units.reduce((t,n)=>{const a=n.upgraded?n.name.slice(0,2)+"+":n.name.slice(0,2);return t[a]=(t[a]||0)+1,t},{});A.font=`bold ${i*2}px Arial`,V[l.planets.length],e(o)}}function j(){const r=document.createElement("div");r.setAttribute("draggable","true"),r.style.width="100px",r.style.height="100px",r.style.background="red",r.style.position="absolute",r.style.top="50%",r.style.left="50%",r.style.cursor="move";const l=document.createElement("button");l.innerText="Close",l.onclick=()=>{document.body.removeChild(r)},r.appendChild(l),document.body.appendChild(r),r.addEventListener("dragstart",C=>{C.dataTransfer.setData("text/plain","This text may be dragged")}),r.addEventListener("drag",C=>{r.style.top=`${C.clientY}px`,r.style.left=`${C.clientX}px`})}async function H(){console.log("running main"),await Y(),j()}H()})();
