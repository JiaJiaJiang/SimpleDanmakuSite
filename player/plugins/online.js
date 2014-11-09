EC.addEvent("CoreReady",
function(player) {
	if (danmakuliveserver) {
		document.styleSheets[0].insertRule(".dmmarknewflash{height:100%;width:1px;background-color: #FCC516;opcacity:1;position:absolute;top:0px;transition: opcacity 0.6s;}",0);
		var _ = function(type, data) {
			return JSON.stringify({
				type: type,
				data: data
			});
		}
		var socket, olcolecolor = "color:green;background:#ccc";
		var newconnect = function() {
			socket = new WebSocket(danmakuliveserver);
			Dlog("开始连接在线弹幕服务器");
			socket.onopen = function(data) {
				Dinfo("%c已连接弹幕服务器", olcolecolor);
				socket.send(_("vid", player.videoid));
			};
			socket.onmessage = function(data) {
				var msg = JSON.parse(data.data);
				//Dinfo("消息get:%O%c", msg, olcolecolor);
				switch (msg.type) {
				case "ol":
					{
						Dinfo("%c在线人数:" + msg.data, olcolecolor);
						break;
					}
				case "dm":
					{
						var d=msg.data;
						if(d.c&&d.t&&d.d){
							Dinfo("%c新弹幕:" + d.c, olcolecolor);
							player.core.danmufuns.initnewDanmuObj(d);
							player.danmulist.push(d);
							player.danmufuns.refreshnumber();
							var div=document.createElement("div");
							div.className="dmmarknewflash";
							div.style.left=(d.t/player.core.player.video.duration/1000*100)+"%";
							player.progresscover.appendChild(div);
							setTimeout(function(){
								div.style.opcacity=0;
								setTimeout(function(){
									player.progresscover.removeChild(div);
								},600);
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
				socket = null;
				setTimeout(newconnect, 5000);
			};
		}
		newconnect();
		EC.addEvent("danmusended",
		function(obj) {
			if(socket&&socket.readyState==1){
				delete obj.sended,obj.hasfirstshowed,obj.ty;
				obj.ol=true;
				socket.send(_("dm",obj));
				Dinfo("向在线服务器推送弹幕:%O%c",obj,olcolecolor);
			}
		});

		EC.addEvent("danmucreated",function(t){
			if(t.ol===true)
			t.backgroundColor="rgba(205, 140, 1, 0.4);";
		},true);
	}
});