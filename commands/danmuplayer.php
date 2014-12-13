<?php
$option = $options;
if (isID($option[0])) {
  $_SESSION['access'.$option[0]]=md5(uniqid());

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
                    <div id="videoframein"></div>
                 <?php menu();?>
                 <div id="tipbox"></div>
                <?php videopreload();?>
            </div>
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
                    <div id="progresscover"></div>
                </div>
                <div id="time"></div>
                <div id="danmuctrl" title="显示/隐藏弹幕" class="button">⊙</div>
                <div id="volume" title="音量" class="button">
                    <div id="stat">Д</div>
                    <div id="range">
                        <div></div>
                    </div>
                    <span>100</span>
                </div>
                <div id="loop" title="循环" class="button">∞</div>
                <div id="unknownbutton" class="button">〄</div>
                <div id="fullscreen" title="全屏" class="button">全<div id="fullpage" title="填满页面">页</div></div>
            </div>
        </div><?php
} else {
    echo "Error";
}

?>
