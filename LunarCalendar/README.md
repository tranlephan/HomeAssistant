<h1>Lovelaca Lunar Calendar card</h1>
<meta name="description" content="Âm Lịch Home Assistant" />
<meta name="robots" content="Lunar Calendar card" />
<p> Thẻ Lịch Âm Cho Home Assistant</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/tranlephan/HomeAssistant/master/LunarCalendar/lunar-day.png?raw=true"><img src="https://raw.githubusercontent.com/tranlephan/HomeAssistant/master/LunarCalendar/lunar-day.png?raw=true" alt="Weather Card" style="max-width:100%;"></a></p>
<br>
<h2>New update 3/2020</h2><br>
  color CSS<br>
  zodiac<br>
  update DanhNgon<br>
  delete cnday<br>
<h2>Manual</h2>
<ol>
<li>Download the <a href="https://github.com/tranlephan/HomeAssistant/blob/master/LunarCalendar/lunar_day.js" rel="nofollow">lunar_day.js</a> to <code>/config/www/</code>. (or an other folder in <code>/config/www/</code>)</li>
<li>Save, the <a href="http://www.mediafire.com/file/6hpicd55nz2y6fg/icons.rar/file" rel="nofollow">12ConGiap icons</a> (The contents of the folder "animated") under <code>/config/www/</code> (or all image file <code>/config/www/icons/12congiap/</code>)</li>
</ol>
<br>
<h2>lovelace config</h2>
<div>
<pre>
resources:
  - type: js
    url: /local/lunar_day.js
</pre>
</div>
<br>
<div>
<pre>
  - badges: []
    title: Lịch
    cards:
      - type: 'custom:lunar-day'
</pre>
</div>
<p>or</p>
<div>
<pre>
      - type: 'custom:lunar-day'
</pre>
</div>
