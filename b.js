function detectObjs(){resList.innerHTML="图像识别中...",c.style.display="none",catImage.style.display="block",cocoSsd.load().then(function(e){e.detect(catImage).then(function(e){translate2zh(e),console.timeEnd()/**/})})}
function trashClassify(e){if(e.length===0)return;const t=e[0].class;
	var n="",r=0;trashClasses.result.map(function(t){e.map(function(e){if(t.name.indexOf(e.class)>-1){if(r>6)return;r+=1,n+="<li>"+t.name+":"+t.type+"</li>"}})}),console.warn("trash classes returned.."),resList.innerHTML=r>0?n:resList.innerHTML+", 没找到合适的分类"}
function translate2zh(e){if(e.length===0){drawResult(e);return}
	const t={"Ocp-Apim-Subscription-Key":ak,"Content-type":"application/json"},n=[];
	for(var r=0;r<e.length;r++)n.push({text:e[r].class});
	/*fetch(baseURL,{headers:t,body:JSON.stringify(n),method:"POST"}).then(function(e){return e.json()}).then(function(t){for(var n=0;n<e.length;n++){const r=t[n].translations;e[n].class=r.length>0?r[0].text:e[n].class}drawResult(e),trashClassify(e)}).catch(function(e){alert(e)})
		*/
		}
	function drawResult(e){catImage.style.display="none",c.style.display="block",context.drawImage(catImage,0,0,256,256),context.font="11px Arial",context.fontWeight=800,console.log("number of detections: ",e.length);for(var t=0;t<e.length;t++)context.beginPath(),context.rect(e[t].bbox[0],e[t].bbox[1],e[t].bbox[2],e[t].bbox[3]),context.lineWidth=1,context.strokeStyle="red",context.fillStyle="red",context.stroke(),context.fillText(e[t].score.toFixed(3)+" "+e[t].class,e[t].bbox[0],e[t].bbox[1]>10?e[t].bbox[1]-5:10);resList.innerHTML="Found "+e.length+" targets"}const catImage=document.getElementById("cat"),imgInput=document.querySelector("#imgInput"),resList=document.querySelector("#result"),c=document.getElementById("canvas"),context=c.getContext("2d")/*,ak="e7a9dcd56f314f52b2bb88f3305d451a",trashClassURL="https://www.huijienongye.com/index.php/api/Test/garbagego",baseURL="https://api-apc.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=zh-Hans"*/;
imgInput.onchange=function(e){var t=e.target.files;if(t.length===0)return;var n=new FileReader;n.onload=function(){catImage.src=n.result,detectObjs()},n.readAsDataURL(t[0])},detectObjs();
