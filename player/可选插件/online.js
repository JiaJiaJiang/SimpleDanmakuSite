/*
发送弹幕成功后把弹幕推送给其它客户端
在线人数功能
*/
(function(){
var menudiv;
var plugin_online_onlinecount=0;
EC.addEvent("CoreReady",
function(p) {
function clone(obj){
  if(typeof(obj) != 'object') return obj;
  if(obj == null) return obj;
  var myNewObj ={};
  for(var i in obj)
    myNewObj[i] = clone(obj[i]);
  return myNewObj;
}
	if (danmakuliveserver) {
		var breakcount=0;
		document.styleSheets[document.styleSheets.length-1].insertRule(".dmmarknewflash{height:100%;width:1px;background-color: #66ccff;opcacity:1;position:absolute;top:0px;transition: opacity 5s;}",0);
		var _ = function(type, data) {
			return JSON.stringify({
				type: type,
				data: data
			});
		}
		var socket, olcolecolor = "color:green;background:#ccc";
		var newconnect = function() {
			socket = new WebSocket(danmakuliveserver);
			Dlog("%c开始连接在线弹幕服务器",olcolecolor);
			socket.onopen = function(data) {
				Dinfo("%c已连接弹幕服务器", olcolecolor);
				socket.send(_("vid", p.videoid));
			};
			socket.onmessage = function(data) {
				var msg = JSON.parse(data.data);
				switch (msg.type) {
				case "ol":
					{
						if(menudiv){
							menudiv.innerHTML="观众:"+msg.data;
						}
						plugin_online_onlinecount=Number(msg.data);
						Dinfo("%c在线人数:" + msg.data, olcolecolor);
						break;
					}
				case "dm":
					{
						var d=msg.data;
						if(d.c&&d.t&&d.d){
							Dinfo("%c新弹幕:" + d.c, olcolecolor);
							p.core.danmufuns.initnewDanmuObj(d);
							p.danmulist.push(d);
							p.danmufuns.refreshnumber();
							var div=document.createElement("div");
							div.className="dmmarknewflash";
							div.style.left=(d.t/p.core.p.video.duration/1000*100)+"%";
							p.progresscover.appendChild(div);
							setTimeout(function(){
								div.style.opacity=0;
								setTimeout(function(){
									p.progresscover.removeChild(div);
								},5000);
							},100);
						}
						break;
					}
				}
			};
			socket.onerror = function(data) {
				Derror("%c连接错误", olcolecolor);
				socket = null;
			};
			socket.onclose = function(data) {
				Dinfo("%c连接关闭", olcolecolor);
				if(menudiv){
					menudiv.innerHTML="与在线服务器断开连接";
				}
				plugin_online_onlinecount=0;
				socket = null;
				breakcount++;
				if(breakcount<=10){
					setTimeout(newconnect, 5000);
				}else{
					Dinfo("%c连接已断开10次,停止连接", olcolecolor);
				}
			};
		}
		newconnect();
		EC.addEvent("danmusended",
		function(obj) {
			if(socket&&socket.readyState==1){
				obj=clone(obj);
				delete obj.sended,obj.hasfirstshowed;
				obj.ol=true;
				socket.send(_("dm",obj));
				Dinfo("向在线服务器推送弹幕:%O%c",obj,olcolecolor);
			}
		});

		

		EC.addEvent("danmucreated",function(t){
			if(t.danmuobj.ol===true)
			t.backgroundColor="rgba(205, 140, 1, 0.4)";
		},true);
	}
});
EC.addEvent("menuready",
function(m) {
	m.addTab("home","〓");
	setTimeout(function(){
		var d=m.tags["home"].addBlock("onlinenumber");
		menudiv=d;
		$Attr(d.style,{fontSize:"30px",paddingLeft:"7px",backgroundColor:"rgba(48, 44, 44, 0.33)"});
		d.innerHTML="连接中...";
		setInterval(function(){
			if(plugin_online_onlinecount>0){
				menudiv.innerHTML="观众:"+plugin_online_onlinecount;
			}
		},1000);
	},500);
});
})();