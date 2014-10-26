<?php
$option = $options;
if (isID($option[0])) {
  $_SESSION['access'.$option[0]]=md5(uniqid());
/*function superdanmuTab(){
?>
    <div id="supertabchoose"><div id="chooseText">字</div><div id="chooseCode">码</div></div>
    <div id="commonTools" style="position: absolute;height: 26px;width: 100%;top: 0px;left: 0px;font-size: 13px;background-color: #66ccff;">
         <input  name="gettime" style="width: 54px;text-align: right;" title="Ctrl+Alt+t" /> 
        相对于<select onchange="inputCenter.relativeTo(this.value)">
        <option value="frame">框架</option>
        <option value="video">视频</option>
        </select>
    </div>
    <div id="SuperTextTab" class="SuperTab">高级字幕</div>
    <div id="SupeCodeTab" class="SuperTab">代码弹幕</div>
<?php
}*/
/*function optioneles(){
?>
                <div>
                     <h3> 播放器设置</h3>
                     <div>
                      <span>默认隐藏边栏:<div switch name="DefaultHideSideBar"></div></span>
                      <span>进度条显示弹幕密度:<div switch name="ProgressDanmumark"></div></span>
                      </div>
                 </div>
                 <div>
                     <h3> 普通弹幕</h3>
                     <div>
                     <span>单独渲染:<div switch name="DivCommonDanmu"></div></span>
                    <span>描边宽度:<div range name="StorkeWidth" min=0 max=2 default=1></div></span>
                    <span>阴影厚度:<div range name="ShadowWidth" min=0 max=10 default=0></div></span>
                      <span>弹幕实时渲染:<div switch name="RealtimeVary"></div></span>
                      <span>弹幕时间:<div  range name="DanmuSpeed" min=3 max=10 default=5></div></span>
                      </div>
                 </div>
                  <div>
                     <h3> 高级弹幕</h3>
                     <div>
                      <span>变速调试:<div range name="PlaySpeed" min=0.2 max=1.5 default=1></div></span>
                      <span>2D高级弹幕:<div switch name="TwoDCodeDanmu"></div></span>
                       <span>3D高级弹幕:<div switch name="ThreeDCodeDanmu"></div></span>
                       </div>
                 </div>
                 <div>
                      <h3>开发</h3>
                      <div>
                      <span>弹幕层Debug:<div switch name="Debug"></div></span>
                      </div>
                 </div>
<?php
}*/
function videopreload(){ ?>
<div class="videopreload" id="videopreload">
      <div class="videopreloadanimationframe">
        <div class="videopreloadanimation shakeanimation">(๑•́ ω •̀๑)</div>
      </div>
</div>
 <?php
}
function menu(){
?>
 <?php
}?>



<div  class="playermainbody" allowfullscreen="true" type="danmuplayer" videoid="<?php echo $option[0];?>" playersse="<?php echo $_SESSION['access'.$option[0]];?>">
            <div id="videoframe">
                    <div id="videoframe"></div>
                 <?php menu();?>
                 <div id="tipbox"></div>
                <?php videopreload();?>
            </div>
            <!--div id="sidebar">
                <div id="ctrlpannel">
                <div id="playcount">播放数:获取中..</div>
                <div id="danmucount">弹幕数:获取中..</div>
                <div id="statboard"></div>
                <div id="danmulistbutton" class="ctrlbutton">弹幕池</div><div id="superdanmubutton" class="ctrlbutton">高级弹幕</div><div id="optionbutton" class="ctrlbutton">设置</div>
                </div>
                <div id="tabpages">
                   <div id="danmupool" class="tabpage"  onselectstart="return false" >
                       <div id="tabletop">
                           <span class="danmutime">时间</span> <span class="danmucontent">内容</span> <span class="danmudate">日期</span>
                       </div>
                       <div id="danmus"></div>
                   </div>
                   <div id="superdanmueditor" class="tabpage">
                   </div>
                 <div id="optionpannel" class="tabpage">
                 </div>
                </div>
                
            </div-->
            <div id="sendbox">
                <input id="danmuinput" name="danmuinput" />
                <div id="fontstylebutton">₣<div id="fontpannel">
                    <div id="danmuType">
                        <span>奇行</span>
                        <div id="fromtop" title="顶部">⿵</div>
                        <div id="frombottom" title="底部">⿶</div>
                        <div id="fromright" title="向左" class="selected">←</div>
                        <div id="fromleft" title="向右">→</div>
                    </div>
                    <div id="fontSize">
                        <span>大小</span>
                        <div id="Sizesmall" title="小">C</div>
                        <div id="Sizemiddle" title="中" class="selected">D</div>
                        <div id="Sizebig" title="大">E</div>
                    </div>
                    <div id="fontColor">
                        <span>颜色</span>
                        <input id="colorinput" placeholder="FFFFFF" name="colorInput" />
                        <div id="colorview"></div>
                    </div>
                </div>
                </div>
                <div id="sendbutton">发射</div>
                <div id="sendboxcover"></div>
            </div>
            <div id="controler" onselectstart="return false" >
                <div id="play_pause">
                    <div id="pause" title="暂停">
                        <span type="1"></span>
                        <span type="2"></span>
                    </div>
                    <div id="play" title="播放">
                        <div></div>
                    </div>
                </div>
                <div id="progress">
                    <canvas id="danmumark"></canvas>
                    <canvas id="progressbar"></canvas>
                    <div id="progersscover"></div>
                </div>
                <div id="time"></div>
                <div id="danmuctrl" title="显示/隐藏弹幕">⊙</div>
                <div id="sidebarctrl" title="显示/隐藏侧栏">ￅ</div>
                <div id="volume" title="音量">
                    <div id="stat">Д</div>
                    <div id="range">
                        <div></div>
                    </div>
                    <span>100</span>
                </div>
                <div id="loop" title="循环">∞</div>
                <div id="fullscreen" title="全屏">全<div id="fullpage" title="填满页面">页</div></div>
            </div>
        </div><?php
} else {
    echo "Error";
}

?>
