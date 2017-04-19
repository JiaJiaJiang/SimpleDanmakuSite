var  cmd_url="../command.php"; 
function cmd(command, bool, callback) { //bool为是否需要等待返回参数
	if (typeof(bool) != "boolean") {
		bool = true;
	}
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		switch(xmlhttp.readyState){
			case 4:{
				switch(xmlhttp.status){
					case 200:{
						if (!bool) {
							if(cmd.output===true)
							console.info("%c异步接收到了命令:" + command + "的成功回应\n执行回调函数","background:#4FB5FF;");
							if(typeof(callback)=="function"){
								callback(xmlhttp.responseText);
							}
						}
						break;
					}
					default:{
						console.warn("命令返回异常");
					}
				}
				break;
			}
		}
	}
	xmlhttp.open("POST", cmd_url,!bool);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	command=transarg(command);
	command = command.replace(/(^\s*)|(\s*$)/g, "");
	//command= command.replace("+", "%plus");
	query="cmd=" + base64.encode(command);
	if(window.signasconsole===true){
		query+="&fromconsole=1";
	}
	xmlhttp.send(query);
	if(cmd.output===true)console.log("%c命令:" + command,"background:#4FB5FF;");
	if (bool) {
		while (! (xmlhttp.responseText)) {}
		return xmlhttp.responseText;
	}
}
cmd.output=false;
function cmd_unitrans(string) {
	if (typeof(string) == "string") {
		return  escape(string);
	}else if(typeof string=="number"){
		return string;
	}
	else {
		if(cmd.output===true)console.warn("%c"+string,"background:#4FB5FF;");
	}
}
function transarg(str){
			str=str.replace(/(^\s*)|(\s*$)/g, "");//移除两边空格
			var tiz=str.split(/\s+/);
			var tag=false,tagind;
			for(var i=0;i<tiz.length;i++){
				var tmp;
				if(tmp=tiz[i].match(/^`(.*)`$/)){
					tiz[i]=cmd_unitrans(tmp[1]);
					tiz[i]=tiz[i].replace(/^\-\-/,"`-`-");
					tiz[i]=tiz[i].replace(/^\-/,"`-");
					continue;
				}else if(tmp=tiz[i].match(/^`(.*)$/)){
					tiz[i]=cmd_unitrans(tmp[1]);
					tagind=i;
					tag=true;
				}else if(tmp=tiz[i].match(/^(.*)`$/)){
					if(tag){
						tiz[tagind]+=cmd_unitrans(" "+tmp[1]);
						tag=false;
						tiz.splice(i,1);
						i--;
					}
				}else{
					if(tag){
						tiz[tagind]+=cmd_unitrans(" "+tiz[i]);
						tiz.splice(i,1);
						i--;
					}
				}
			}
			return tiz.join(" ");
}
function formArguments(){
	var command = "";
	for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
			command += cmd_unitrans(arguments[i]);
			if (i < length - 1) {
				command += " ";
			}
		}
			return command;
}
function autocmd() {
	var callback, length = arguments.length;
	var command = "";
	if (arguments.length >= 2) {
		if (typeof(arguments[length - 1]) == "function") {
			callback = arguments[length - 1];
			for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
				command += cmd_unitrans(arguments[i]);
				if (i <=( length - 2)) {
					command += " ";
				}
			}
			cmd(command, false, callback);
		}
	} else {
		for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
			command += cmd_unitrans(arguments[i]);
			if (i < length - 1) {
				command += " ";
			}
		}
		return cmd(command, true);
	}
}

//base64
(function(global){'use strict';var log=function(){},padding='=',chrTable='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',binTable=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];if(global.console&&global.console.log){log=function(message){global.console.log(message)}}function utf8Encode(str){var bytes=[],offset=0,length,char;str=encodeURI(str);length=str.length;while(offset<length){char=str[offset];offset+=1;if('%'!==char){bytes.push(char.charCodeAt(0))}else{char=str[offset]+str[offset+1];bytes.push(parseInt(char,16));offset+=2}}return bytes}function utf8Decode(bytes){var chars=[],offset=0,length=bytes.length,c,c2,c3;while(offset<length){c=bytes[offset];c2=bytes[offset+1];c3=bytes[offset+2];if(128>c){chars.push(String.fromCharCode(c));offset+=1}else if(191<c&&c<224){chars.push(String.fromCharCode(((c&31)<<6)|(c2&63)));offset+=2}else{chars.push(String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63)));offset+=3}}return chars.join('')}function encode(str){var result='',bytes=utf8Encode(str),length=bytes.length,i;for(i=0;i<(length-2);i+=3){result+=chrTable[bytes[i]>>2];result+=chrTable[((bytes[i]&0x03)<<4)+(bytes[i+1]>>4)];result+=chrTable[((bytes[i+1]&0x0f)<<2)+(bytes[i+2]>>6)];result+=chrTable[bytes[i+2]&0x3f]}if(length%3){i=length-(length%3);result+=chrTable[bytes[i]>>2];if((length%3)===2){result+=chrTable[((bytes[i]&0x03)<<4)+(bytes[i+1]>>4)];result+=chrTable[(bytes[i+1]&0x0f)<<2];result+=padding}else{result+=chrTable[(bytes[i]&0x03)<<4];result+=padding+padding}}return result}function decode(data){var value,code,idx=0,bytes=[],leftbits=0,leftdata=0;for(idx=0;idx<data.length;idx++){code=data.charCodeAt(idx);value=binTable[code&0x7F];if(-1===value){log('WARN: Illegal characters (code='+code+') in position '+idx)}else{leftdata=(leftdata<<6)|value;leftbits+=6;if(leftbits>=8){leftbits-=8;if(padding!==data.charAt(idx)){bytes.push((leftdata>>leftbits)&0xFF)}leftdata&=(1<<leftbits)-1}}}if(leftbits){log('ERROR: Corrupted base64 string');return null}return utf8Decode(bytes)}global.base64={encode:encode,decode:decode}}(window));