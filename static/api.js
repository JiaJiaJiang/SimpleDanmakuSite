/*
The MIT License (MIT)
Copyright (c) luojia@luojia.me
*/
//base64
(function(global){'use strict';var log=function(){},padding='=',chrTable='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',binTable=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];if(global.console&&global.console.log){log=function(message){global.console.log(message)}}function utf8Encode(str){var bytes=[],offset=0,length,char;str=encodeURI(str);length=str.length;while(offset<length){char=str[offset];offset+=1;if('%'!==char){bytes.push(char.charCodeAt(0))}else{char=str[offset]+str[offset+1];bytes.push(parseInt(char,16));offset+=2}}return bytes}function utf8Decode(bytes){var chars=[],offset=0,length=bytes.length,c,c2,c3;while(offset<length){c=bytes[offset];c2=bytes[offset+1];c3=bytes[offset+2];if(128>c){chars.push(String.fromCharCode(c));offset+=1}else if(191<c&&c<224){chars.push(String.fromCharCode(((c&31)<<6)|(c2&63)));offset+=2}else{chars.push(String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63)));offset+=3}}return chars.join('')}function encode(str){var result='',bytes=utf8Encode(str),length=bytes.length,i;for(i=0;i<(length-2);i+=3){result+=chrTable[bytes[i]>>2];result+=chrTable[((bytes[i]&0x03)<<4)+(bytes[i+1]>>4)];result+=chrTable[((bytes[i+1]&0x0f)<<2)+(bytes[i+2]>>6)];result+=chrTable[bytes[i+2]&0x3f]}if(length%3){i=length-(length%3);result+=chrTable[bytes[i]>>2];if((length%3)===2){result+=chrTable[((bytes[i]&0x03)<<4)+(bytes[i+1]>>4)];result+=chrTable[(bytes[i+1]&0x0f)<<2];result+=padding}else{result+=chrTable[(bytes[i]&0x03)<<4];result+=padding+padding}}return result}function decode(data){var value,code,idx=0,bytes=[],leftbits=0,leftdata=0;for(idx=0;idx<data.length;idx++){code=data.charCodeAt(idx);value=binTable[code&0x7F];if(-1===value){log('WARN: Illegal characters (code='+code+') in position '+idx)}else{leftdata=(leftdata<<6)|value;leftbits+=6;if(leftbits>=8){leftbits-=8;if(padding!==data.charAt(idx)){bytes.push((leftdata>>leftbits)&0xFF)}leftdata&=(1<<leftbits)-1}}}if(leftbits){log('ERROR: Corrupted base64 string');return null}return utf8Decode(bytes)}global.base64={encode:encode,decode:decode}}(window));

window.SXHR = {
	post:function(url, data, callback) {
		return this.request('POST',url, data, callback);
	},
	get:function(url, data, callback) {
		return this.request('GET',url, data, callback);
	},
	request:function(method,url,data,callback){
		var xhr = new XMLHttpRequest(); 
		xhr.withCredentials=true;
		if (callback instanceof Function) 
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					callback(null,xhr); 
				}
			};
			xhr.addEventListener('error',callback);
		if(method!=='POST')url+='?'+SXHR.formQuery(data);
		xhr.open(method,url,(callback instanceof Function)?true:false); 
		(method!=='POST')?xhr.send():xhr.send(data);
		return xhr;
	},
	formQuery:function(data){
		var tdata='';
		if (data&&(typeof data ==='object')) {
			var query = []; 
			for (var i in data) {
				if (data[i]&&(typeof data[i]=== 'object')) data[i] = JSON.stringify(data[i]); 
				query.push((data[i]!==undefined)?(encodeURIComponent(i) + '=' + encodeURIComponent(data[i])):i); 
			}
			tdata += query.join('&'); 
		}
		return tdata;
	},
	parseQuery:function(str){
		var args=str.match(/[^\?=\&\#]+(?:=[^\?=\&\#]+)?/g),
			re={},t;
		args&&args.forEach(function(a){
			t=a.split('=');
			re[t[0]]=t[1];
		});
		return re;
	},
};

window.SAPI={
	get:function(api, data, callback){
		var hasCallback=typeof callback==='function',okFunc,noFunc;
		SXHR.get(SAPI.siteRoot+'api/',Object.assign({api:api},data),function(err,xhr){
			SAPI.parseResult(err,xhr,hasCallback?callback:function(err,result,code,xhr){
				if(err)noFunc(err);
				else{
					okFunc(result);
				}
			});
		});
		if(!hasCallback){
			return new Promise(function(ok,no){
				okFunc=ok;noFunc=no;
			});
		}
	},
	post:function(api, data, callback){
		var hasCallback=typeof callback==='function',okFunc,noFunc;
		SXHR.post(SAPI.siteRoot+'api/?api='+api,data,function(err,xhr){
			SAPI.parseResult(err,xhr,hasCallback?callback:function(err,result,code,xhr){
				if(err)noFunc(err);
				else{
					okFunc(result);
				}
			});
		});
		if(!hasCallback){
			return new Promise(function(ok,no){
				okFunc=ok;noFunc=no;
			});
		}
	},
	parseResult:function(err,xhr,callback){//callback(err,result,code,xhr)
		var code=null,re;
		try{
			if(err)throw(err);
			re=JSON.parse(xhr.responseText);
			if((code=re.code)!=0){
				throw(new Error(re.result));
			}
			callback(null,re.result,re.code,xhr);
		}catch(e){
			if(!re)e=new Error(xhr.responseText);
			console.error(e);
			callback(e,null,code,xhr);
		}
	},
	getAccess:function(callback){
		var aT=localStorage.accessTime;
		if(aT&&(aT=Number(aT))&&((Date.now()/1000)|0)-aT<=300){
			callback(localStorage.access);
			return;
		}
		SAPI.refreshAccess(callback);
	},
	refreshAccess:function(callback){
		SAPI.get('video',{opt:'access'},function(err,r){
			if(err){
				console.error(err);
				callback&&callback(false);
				return;
			}
			var accessText=r.accessText.match(/(\w{13})(\w{13})(\w{13})(\w{13})/),
				accessCode=r.accessCode;
			accessText.shift();
			var access='';
			for(var i=0;i<accessCode.length;i++)
				access+=accessText[1*accessCode[i]];
			localStorage.access=access;
			localStorage.accessTime=r.accessTime;
			callback&&callback(access);
			return;
		});
	}
};

(function(){
	var scripts=document.querySelectorAll('script');
	SAPI.siteRoot=scripts[scripts.length-1].src.replace(/static\/api\.js.*$/,'');
})();
