//在命令控制台使用videosetting 视频id -showcover true 命令来使视频显示封面
EC.addEvent("VideoInfoGet",function(p){
	console.log(p.info.options);
	if(p.info.options&&p.info.options.showcover===true||p.info.options.showcover==="true"){
		p.core.video.style.display="none";
		$Attr(p.videoframe.style,{
			backgroundImage:"url("+p.info.cv+")",
			backgroundPosition:"center",
			backgroundSize:"cover"
		});
	}
});