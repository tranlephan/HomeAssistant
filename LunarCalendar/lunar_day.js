/*! *****************************************************************************
Bạn Phan
2020
Save the lunar_day.js to /config/www/. (or an other folder in /config/www/)
Save, the 12ConGiap icons (The contents of the folder "animated") under /config/www/ (or all image file /config/www/icons/12congiap/)
  dowloand 12congiap http://www.mediafire.com/file/6hpicd55nz2y6fg/icons.rar/file
lovelace config
resources:
  - type: js
    url: /local/lunar_day.js
  - badges: []
    title: Lịch
    cards:
      - type: 'custom:lunar-day'
new update 3/2020
  edit CamChi
  color CSS
  zodiac
  update DanhNgon
delete
  cnday
***************************************************************************** */
//22/3/2020
class Lunarday extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = '';
      this.content = document.createElement('div');
      this.content.style.padding = '0px';
      card.appendChild(this.content);
      this.appendChild(card);
    }
    function INT(d) {
      return Math.floor(d);
    }
    function getjd(dd, mm, yy) {
      mm = mm + 1;
      var a = INT((14 - mm) / 12);
      var y = yy+4800-a;
      var m = mm+12*a-3;
      var jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
      return jd;
    }
    function checkHolidayLunar(nn, tt) {
              for (var i = 0; i < lunar.length; i++) {
                if (lunar[i].n === nn && lunar[i].t === tt)  {
                  holidaylunar = lunar[i].l;
                }
              }
    holidaylunar = holidaylunar;
    return holidaylunar
    }
    function checkHolidaySolar(nn, tt) {
                tt = tt + 1;
              for (var j = 0; j < solar.length; j++) {
                if (solar[j].n === nn && solar[j].t === tt)  {
                  holidaysolar = solar[j].l;
                }
              }
    holidaysolar = holidaysolar;
    return holidaysolar
    }
    function getGioHoangDao(jd) {
    var chiOfDay = (jd+1) % 12;
    var gioHD = gio_hd[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
    var count = 0;
    for (var i = 0; i < 12; i++) {
      if (gioHD.charAt(i) == '1') {
        giohoangdao += chi[i];
        giohoangdao += " ("+(i*2+23)%24+"-"+(i*2+1)%24+")";
        if (count++ < 5) giohoangdao += '<br>';
        if (count == 3) giohoangdao += '\n';
      }
    }
    return giohoangdao;
  }

  function SunLongitude(jdn) {
    var T, T2, dr, M, L0, DL, lambda, theta, omega;
    T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    T2 = T * T;
    dr = PI / 180; // degree to radian
    M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    theta = L0 + DL; // true longitude, degree
    // obtain apparent longitude by correcting for nutation and aberration
    omega = 125.04 - 1934.136 * T;
    lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
    // Convert to radians
    lambda = lambda * dr;
    lambda = lambda - PI * 2 * (INT(lambda / (PI * 2))); // Normalize to (0, 2*PI)
    return lambda;
    }

  function getSunLongitude(dayNumber, timeZone) {
    return INT(SunLongitude(dayNumber - 0.5 - timeZone / 24.0) / PI * 12);
    }
  function checkzodiac(nn, tt) {
    if ((nn>=21 && tt == 12) || (nn<=19 && tt== 1)){
      zodiac = 'Ma Kết';
    }
    if ((nn>=20 && tt ==1) || (nn<=18 && tt == 2)){
      zodiac = 'Bảo Bình';
    }
    if ((nn>=19 && tt == 2) || (nn <=20 && tt == 3)){
      zodiac = 'Song Ngưu';
    }
    if ((nn>=21 && tt == 3) || (nn <=20 && tt == 4)){
      zodiac = 'Bạch Dương';
    }
    if ((nn>=21 && tt == 4) || (nn <=20 && tt == 5)){
      zodiac = 'Kim Ngưu';
    }
    if ((nn>=21 && tt == 5) || (nn<=20 && tt == 6)){
      zodiac = 'Song Tử';
    }
    if ((nn>=21 && tt == 6) || (nn<=20 && tt == 7)){
      zodiac = 'Cự Giả';
    }
    if ((nn>=21 && tt  == 7) || (nn<=20 && tt== 8)){
      zodiac = 'Sư Tử';
    }
    if ((nn>=21 && tt ==8) || (nn<=22 && tt == 9)){
      zodiac = 'Xử Nữ';
    }
    if ((nn>=23 && tt == 9) || (nn<=20 && tt ==10)){
      zodiac = 'Thiên Bình';
    }
    if ((nn>=21 && tt == 10) || (nn<=22 && tt == 11)){
      zodiac = 'Bọ Cạp';
    }
    if ((nn>=23 && tt == 11) || (nn<=20 && tt == 12)){
      zodiac = 'Nhân Mã';
    }
  return zodiac;
  }
    const me ="Copyright &copy; 2019 Bạn Phan"
    const date = new Date();
    var color = ["#66FFFF", "#00FFCC", "#00FF99", "#00FF33", "#33CC33", "#CC9900", "#CCFF00", "#880000", "#CC9999", "#3399FF", "#009999", "#FF66CC", "#FF6666", "#9966FF", "#3366FF", "#0066CC", "#0033CC", "#006633", "00DD00", "#000055", "#FF3333", "#96CDCD"],
    	vimm = ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bẩy", "Tám", "Chín", "Mười", "Mười Một", "Mười Hai"],
        enmm = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
        chi = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"],
        gio_hd = ['110100101100', '001101001011', '110011010010', '101100110100', '001011001101', '010010110011'],
        TIETKHI = ['Xuân phân', 'Thanh minh', 'Cốc vũ', 'Lập hạ', 'Tiểu mãn', 'Mang chủng',
              'Hạ chí', 'Tiểu thử', 'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ',
              'Thu phân', 'Hàn lộ', 'Sương giáng', 'Lập đông', 'Tiểu tuyết', 'Đại tuyết',
              'Đông chí', 'Tiểu hàn', 'Đại hàn', 'Lập xuân', 'Vũ thủy', 'Kinh trập'
      ],
    DanhNgon =[ "Bạn sinh ra là một nguyên bản. Đừng chết đi như một bản sao",
          "Đừng ngại thay đổi. Bạn có thể mất một cái gì đó tốt nhưng bạn có thể đạt được một cái gì đó còn tốt hơn",
          "Cuộc sống vốn không công bằng. Hãy tập quen dần với điều đó - Bill Gates",
          "Say là cái điên tự nguyện ",
          "Khi nói ít đi, bạn sẽ nghe thấy nhiều hơn",
          "Dù có đeo vàng đi chăng nữa, con lừa vẫn là con lừa",
          "Hãy làm người như mình muốn, đừng cố làm như người khác muốn",
          "Thất bại không phải là ngược lại với thành công, nó là một phần của thành công",
          "Những người lặng lẽ nhất thường có lối suy nghĩ táo bạo nhất",
          "Cuộc sống cũng giống như đi xe đạp điện, nếu muốn thăng bằng hay tiếp tục di chuyển",
          "Hạnh phúc … không phải là được nhiều người yêu. Mà là được được một người yêu rất nhiều!",
          "Cuộc sống rất thú vị, và thú vị nhất khi nó được sống vì người khác",
          "Hãy quay về phía Mặt trời và bạn sẽ không thấy bóng tối - Helen Keller",
          "Đừng cố gắng để thành công, hãy cố gắng sống có giá trị - Albert Einstein",
          "Dấu hiệu thực sự của sự thông minh không phải là kiến thức mà là trí tưởng tượng - Albert Einstein",
          "Nếu bạn sinh ra trong nghèo khó đó không phải là lỗi của bạn. Nhưng nếu bạn chết trong nghèo khó thì đó là lỗi của bạn - Bill Gates",
          "Đừng so sánh bản thân với người khác. Làm như vậy là bạn đang tự xúc phạm mình đấy - Bill Gates",
          "Đừng buồn vì bụi hoa hồng có gai mà hãy vui vì trong bụi gai có hoa hồng - Abraham Lincoln",
          "Nếu ghét một người, tức là bạn đang thất bại trước người đó - Khổng Tử",
          "Nếu ai đó nói xấu sau lưng bạn, điều đó có nghĩa là bạn đang đi trước mặt họ - Khổng Tử",
          "Người tài đức nhìn bản thân, kẻ tiểu nhân nhìn người khác - Khổng Tử",
          "Người tài đức làm rồi mới nói và nói theo những việc đã làm - Khổng Tử",
          "Quy Tắc Là Thứ Sinh Ra Để Được Phá Vỡ - Donald Trump",
          "Cách báo thù tốt nhất chính là thành công vang dội – Frank Sinatra",
          "Muốn thoát khỏi bầy sói thì phải ác hơn cả sói, nếu không muốn chết thì cố mà mọc nanh",
          "Dù cuộc sống có vần xoay thế nào, hãy sống thật tử tế – Gari",
          "Không có áp lực thì không có động lực – Thời niên thiếu không thể quay lại ấy",
          "Sức mạnh vĩ đại nhất mà nhân loại có trong tay chính là tình yêu – Mahatma Gandhi",
          "Nếu cơ hội không gõ cửa nhà bạn, có nghĩa là nhà bạn chưa có cửa. Hãy gắn 1 cái – Milton Berle",
          "Ngày hôm nay nếu bạn lãng phí đồng nghĩa với việc bạn bóp chết quá khứ và vứt bỏ ngày mai  – Thư viện Harvard",
          "Hãy học khi người khác ngủ; lao động khi người khác lười nhác; chuẩn bị khi người khác chơi bời; và bạn sẽ có giấc mơ khi người khác chỉ ao ước – William Arthur Ward",
          "Để thành công, khao khát thành công của bạn phải lớn hơn nỗi sợ thất bại. - Bill Cosby",
          "Tôi biết ơn những người đã nói KHÔNG với tôi. Bởi nhờ họ, tôi đã tự mình làm điều đó – Albert Einstein",
          "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle - Steve Jobs",
          "When you say It's hard, it actually means I'm not strong enough to fight for it. Stop saying its hard.Think positive!",
          "Don't worry about failures, worry about the chances you miss when you don't even try - Jack Canfield",
          "Build your own dreams, or someone else will hire you to build theirs - Farrah Gray",
          "We learn something from everyone who passes through our lives.. Some lessons are painful, some are painless.. but, all are priceless",
          "Rule #1 of life. Do what makes YOU happy",
          "The biggest failure you can have in life is making the mistake of never trying at all",
          "Trời Có Nói Gì Đâu Mà Bốn Mùa Thay Đổi - Khổng Tử"
    ],
    solar = [
          { n:  1, t:  1, l: 'Tết Dương lịch' },
          { n:  9, t:  1, l: 'Ngày Học sinh - Sinh viên Việt Nam' },
          { n:  3, t:  2, l: 'Ngày thành lập Đảng Cộng sản Việt Nam' },
          { n: 14, t:  2, l: 'Lễ Tình Nhân - Valentine' },
          { n: 27, t:  2, l: 'Ngày Thầy Thuốc Việt Nam' },
          { n:  8, t:  3, l: 'Ngày Quốc Tế Phụ nữ' },
          { n: 20, t:  3, l: 'Ngày Quốc Tế Hạnh Phúc' },
          { n: 26, t:  3, l: 'Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh' },
          { n: 28, t:  3, l: '20h30 Hưởng ứng giờ trái đất, tắt đèn vì môi trường' },
          { n: 21, t:  4, l: 'Ngày Sách Việt Nam' },
          { n: 30, t:  4, l: 'Ngày Thống nhất đất nước' },
          { n:  1, t:  5, l: 'Ngày Quốc tế Lao động' },
          { n:  7, t:  5, l: 'Ngày chiến thắng Điện Biên Phủ' },
          { n: 12, t:  5, l: 'Ngày Của Mẹ' },
          { n: 15, t:  5, l: 'Ngày thành lập Đội Thiếu niên Tiền phong Hồ Chí Minh' },
          { n: 19, t:  5, l: 'Ngày sinh của Chủ tịch Hồ Chí Minh' },
          { n:  1, t:  6, l: 'Ngày Quốc tế Thiếu nhi' },
          { n:  5, t:  6, l: 'Ngày Bác Hồ ra đi tìm đường cứu nước.<br>Ngày môi trường thế giới' },
          { n: 21, t:  6, l: 'Ngày Báo Chí Việt Nam' },
          { n: 28, t:  6, l: 'Ngày Gia Đình Việt Nam' },
          { n: 11, t:  7, l: 'Ngày dân số thế giới' },
          { n: 27, t:  7, l: 'Ngày Thương binh Liệt sĩ' },
          { n: 28, t:  7, l: 'Ngày thành lập công đoàn Việt Nam' },
          { n: 19, t:  8, l: 'Ngày Cách mạng tháng Tám thành công' },
          { n:  2, t:  9, l: 'Ngày Quốc khánh' },
          { n:  7, t:  9, l: 'Sinh Nhật Bạn Phan'},
          { n: 10, t:  9, l: 'Ngày thành lập Mặt trận Tổ quốc Việt Nam'},
          { n:  1, t: 10, l: 'Ngày quốc tế người cao tuổi' },
          { n: 10, t: 10, l: 'Ngày giải phóng thủ đô' },
          { n: 13, t: 10, l: 'Ngày Doanh nhân Việt Nam' },
          { n: 20, t: 10, l: 'Ngày thành lập Hội Phụ nữ Việt Nam' },
          { n: 31, t: 10, l: 'Ngày Hallowen' },
          { n:  9, t: 11, l: 'Ngày pháp luật việt nam' },
          { n: 20, t: 11, l: 'Ngày Nhà giáo Việt Nam' },
          { n: 23, t: 11, l: 'Ngày thành lập Hội chữ thập đỏ Việt Nam' },
          { n:  1, t: 12, l: 'Ngày thế giới phòng chống AIDS' },
          { n: 22, t: 12, l: 'Ngày thành lập Quân đội Nhân dân Việt Nam' },
          { n: 24, t: 12, l: 'Ngày Lễ Giáng Sinh' }
        ],

        lunar = [
          { n:  1, t:  1, l: "Tết Nguyên Đán" },
          { n:  2, t:  1, l: "Mùng 2 Tết" },
          { n:  3, t:  1, l: "Mùng 3 Tết" },
          { n: 15, t:  1, l: "Tết Nguyên tiêu" },
          { n:  3, t:  3, l: "Tết Hàn thực" },
          { n: 10, t:  3, l: "Giỗ Tổ Hùng Vương" },
          { n: 15, t:  4, l: "Lễ Phật Đản" },
          { n:  5, t:  5, l: "Tết Đoan ngọ" },
          { n: 15, t:  7, l: "Vu Lan" },
          { n: 15, t:  8, l: "Tết Trung thu" },
          { n:  9, t:  9, l: "Tết Trùng Củu" },
          { n: 10, t: 10, l: "Tết Thường Tân" },
          { n: 15, t: 10, l: " Tết Hạ Nguyên" },
          { n: 23, t: 12, l: "Ông Táo chầu trời" }
        ];
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var holiday = '',
    namAL = "",
    chinam = "",
    vismm = [],
    villm = [],
    PI = Math.PI,
    camchithang = "",
    camchingay = "",
    camchigio = "",
    giohoangdao = "",
    tiet_khi ="",
    holidaysolar = "",
    holidaylunar = "",
    zodiac = "";
    var thu = Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(date);
    var enday = Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    var dd = date.getDate();
    var dddd = date.getDay();
    var yyyy = date.getFullYear();
    var mm = date.getMonth();
    var ly = +Intl.DateTimeFormat("vi-VN-u-ca-chinese", {year: "numeric"}).format(date).match(/\d+/)[0];
    if (ly<=1000){
      ly = (ly-17) + 2000;
    }
    var lm = +Intl.DateTimeFormat("vi-VN-u-ca-chinese", {month: "long"}).format(date).match(/\d+/)[0];
    var ld = +Intl.DateTimeFormat("vi-VN-u-ca-chinese", {day: "numeric"}).format(date).match(/\d+/)[0];
    var jd;

    jd = getjd(dd, mm, yyyy);
    holidaysolar = checkHolidaySolar(dd , mm);
    holidaylunar = checkHolidayLunar(ld, lm);
    zodiac = checkzodiac(dd , mm + 1);
    if (holidaysolar == "" && holidaylunar == "") {
        holiday = DanhNgon[Math.floor(Math.random() * DanhNgon.length)];
    }
    else {
        holiday = '<b><font color="FF0000">' + holidaysolar + "<br>" + holidaylunar + "</font></b>";
    }
    vismm = "Tháng " + vimm[mm];
    villm = "Tháng " + vimm[lm - 1];
    enmm = enmm[mm];
    camchithang = "<img src=\"/local/12congiap/" + (lm+1)%12 + ".png" + "\"/>";
    camchingay = "<img src=\"/local/12congiap/" + (jd+1)%12 + ".png" + "\"/>";
    camchigio = "<img src=\"/local/12congiap/0.png" + "\"/>";
    chinam = "<img src=\"/local/12congiap/" + (ly + 59) % 12 + ".png" + "\"/>";
    namAL = can [(ly + 6) % 10] + ' ' + chi [(ly +8) % 12];
    camchithang += "Tháng " + can[(ly*12+lm+3) % 10] + " " + chi[(lm+1)%12];
    camchingay += "Ngày " + can[(jd + 9) % 10] + " " + chi[(jd+1)%12];
    camchigio += "Giờ " + can[(jd - 1) * 2 % 10] + " " + chi[0];
    giohoangdao = getGioHoangDao(jd);
    tiet_khi = TIETKHI[getSunLongitude(jd + 1, 7.0)];
    if (dddd == 0){
    	dd 		  = '<font color="FF0000">' + dd + "</font>";
    	thu 	  = '<font color="FF0000">' + thu + "</font>";
    	enday 	= '<font color="FF0000">' + enday + "</font>";
    	villm 	= '<font color="FF0000">' + villm + "</font>";
    	ld 		  = '<font color="FF0000">' + ld + "</font>";
    	zodiac	= '<font color="FF0000">' + zodiac + "</font>";
    }
    if (dddd != 0){
    	var randomclor = Math.floor(Math.random() * color.length);
      dd          = '<font color="' + color[Math.floor(Math.random() * color.length)] + '">' + dd + "</font>";
      thu         = '<font color="' + color[randomclor] + '">' + thu + "</font>";
      enday       = '<font color="' + color[randomclor] + '">' + enday + "</font>";
      zodiac      = '<font color="' + color[randomclor] + '">' + zodiac + "</font>";
      randomclor  = Math.floor(Math.random() * color.length);
      villm       = '<font color="' + color[randomclor] + '">' + villm + "</font>";
      ld          = '<font color="' + color[randomclor] + '">' + ld + "</font>";
    }
    this.content.innerHTML = `
      <div class="container">
          <div class="top3">
            <div class="thang">${vismm}</div>
            <div class="year">${yyyy}</div>
            <div class="thang">${enmm}</div>
          </div>
          
		  <div class="ngayduong">${dd}</div>
          <div class="le">${holiday}</div>
          
          <div class="center3">
            <div class="thu">${enday}</div>
            <div class="thuv">${thu}</div>
            <div class="zodiac">${zodiac}</div>
          </div>
          <div class="end3">
              <div class="left4">
                <div class="ccnam">${chinam}Năm ${namAL}</div>
                <div class="cc">${camchithang}</div>
                <div class="cc">${camchingay}</div>
                <div class="cc">${camchigio}</div>
                <div class="tk">Tiết Khí: ${tiet_khi}</div>
              </div>
              <div class="center4">
                <div class="thangam">${villm}</div>
                <div class="ngayam">${ld}</div>
              </div>
              <div class="right4">
                <div class="ghd">GIỜ HOÀNG ĐẠO</div>
                <div class="ghd">${giohoangdao}</div>
              </div>
          </div>
          
      </div>
            <style>
        .container{
          margin: auto;
          position: relative;
        }
        .top3{
          display: block;
          clear: both;
		  padding-top: 12px;
		  padding-bottom: 10px;
          width:99%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .thang{
          width:40%;
          float: left;
          text-align: center;
          color:#BB0000;
		  font-size: 1.5em;
        }
        .year{
          width:20%;
          color:#AA0000;
          float: left;
          text-align: center;
          font-weight: bold;
		  font-size: 1.8em;
        }
        .ngayduong{
		  display: block;
          clear: both;
		  width:100%;
		  height:270px;
          font-weight:bold;
		  font-size:20em;
		  display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
		}
		.le{
		  display: block;
          clear: both;
		  width:100%;
		  display: flex;
		  font-size:1.3em;
		  padding-top: 5px;
		  padding-bottom: 20px;
		  justify-content: center;
		  align-items: center;
		  text-align: center;
		  font-weight: bold;
		}
        .center3{
          display: block;
          clear: both;
		  padding-top: 12px;
		  padding-bottom: 12px;
          width:99%;
          border:2px;
          border:1px solid Yellow;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .thu{
          width:32%;
          float: left;
          text-align: center;
          font-size: 1.6em;
        }
        .zodiac{
          width:32%;
          float: left;
          text-align: center;
          font-size: 1.6em;
        }
        .thuv{
          font-weight:bold;
          width:36%;
          float: left;
          text-align: center;
          font-size: 1.8em;
        }
        .end3:after{
          content: ' ';
          display: block;
          clear: both;
        }
        .end3{
          margin-top: 10px;
        }
        .left4{
          width:35%;
          float: left;
          font-size: 0.8em;
        }
        .ccnam{
          font-weight:bold;
          font-size: 1em;
          color:#FF0000;
        }
        .center4{
          width:30%;
          float: left;
          text-align: center;
        }
		.ngayam{
		  display: block;
          clear: both;
		  width:100%;
		  height:70px;
          font-weight:bold;
		  font-size:8em;
		  display: flex;
          justify-content: center;
          align-items: center;
		  padding-top: 20px;
		  padding-bottom: 5px;
		}
		.thangam{
		  display: block;
          clear: both;
		  width:100%;
		  height:20%;
          font-weight:bold;
		  display: flex;
		  font-size:1.2em;
		  padding-top: 5px;
		  padding-bottom: 2px;
		  justify-content: center;
		  align-items: center;
		}
        .right4{
          width:35%;
          float: left;
          text-align: center;
		  padding-bottom: 10px;
        }
		.tk{
			padding-left:10px;
		}
      </style>
    `;
  }

  setConfig(config) {
    //if (!config.entity) {
      //throw new Error('You need to define an entity');
    //}
    //this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('lunar-day', Lunarday);
