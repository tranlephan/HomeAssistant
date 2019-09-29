//Cảm Ơn thuật toán lịch âm của bạn Hồ Ngọc Đức
//https://www.informatik.uni-leipzig.de/~duc/amlich/calrules.html
//Bạn Phan
//2019

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

    //const entityId = this.config.entity;
    //const state = hass.states[entityId];
    //const stateStr = state ? state.state : 'unavailable';
  const me ="Copyright &copy; 2019 Bạn Phan"
    const date = new Date();
    var thu = ["Chủ Nhật","Thứ Hai", "Thứ Ba","Thứ Tư","Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
        chiday = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        enday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
          "Cuộc sống vốn không công bằng. Hãy tập quen dần với điều đó - <i>Bill Gates</i>",
          "Say là cái điên tự nguyện ",
          "Khi nói ít đi, bạn sẽ nghe thấy nhiều hơn",
          "Dù có đeo vàng đi chăng nữa, con lừa vẫn là con lừa",
          "Hãy làm người như mình muốn, đừng cố làm như người khác muốn",
          "Thất bại không phải là ngược lại với thành công, nó là một phần của thành công",
          "Những người lặng lẽ nhất thường có lối suy nghĩ táo bạo nhất",
          "Cuộc sống cũng giống như đi xe đạp điện, nếu muốn thăng bằng hay tiếp tục di chuyển",
          "Hạnh phúc … không phải là được nhiều người yêu. Mà là được được một người yêu rất nhiều!",
          "Cuộc sống rất thú vị, và thú vị nhất khi nó được sống vì người khác",
          "Hãy quay về phía Mặt trời và bạn sẽ không thấy bóng tối - <i>Helen Keller</i>",
          "Đừng cố gắng để thành công, hãy cố gắng sống có giá trị - <i>Albert Einstein</i>",
          "Dấu hiệu thực sự của sự thông minh không phải là kiến thức mà là trí tưởng tượng - <i>Albert Einstein</i>",
          "Nếu bạn sinh ra trong nghèo khó đó không phải là lỗi của bạn. Nhưng nếu bạn chết trong nghèo khó thì đó là lỗi của bạn - <i>Bill Gates</i>",
          "Đừng so sánh bản thân với người khác. Làm như vậy là bạn đang tự xúc phạm mình đấy - <i>Bill Gates</i>",
          "Đừng buồn vì bụi hoa hồng có gai mà hãy vui vì trong bụi gai có hoa hồng - <i>Abraham Lincoln</i>",
          "Nếu ghét một người, tức là bạn đang thất bại trước người đó - <i>Khổng Tử</i>",
          "Nếu ai đó nói xấu sau lưng bạn, điều đó có nghĩa là bạn đang đi trước mặt họ - <i>Khổng Tử</i>",
          "Người tài đức nhìn bản thân, kẻ tiểu nhân nhìn người khác - <i>Khổng Tử</i>",
          "Người tài đức làm rồi mới nói và nói theo những việc đã làm - <i>Khổng Tử</i>",
          "Trời Có Nói Gì Đâu Mà Bốn Mùa Thay Đổi"
    ],
    solar = [
          { n:  1, t:  1, l: 'Tết Dương lịch' },
          { n:  9, t:  1, l: 'Ngày Học sinh - Sinh viên Việt Nam' },
          { n:  3, t:  2, l: 'Ngày thành lập Đảng Cộng sản Việt Nam' },
          { n: 14, t:  2, l: 'Lễ tình nhân - Valentine' },
          { n: 27, t:  2, l: 'Ngày Thầy thuốc Việt Nam' },
          { n:  8, t:  3, l: 'Ngày Quốc tế Phụ nữ' },
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
    var holiday = '',
    namAL = "",
    chinam = "",
    vismm = [],       // tháng dương lịch tiếng việt solar
    villm = [],       // tháng âm lich tiếng việt    lunar
    PI = Math.PI,
    camchithang = "",
    camchingay = "",
    camchigio = "",
    giohoangdao = "",
    tiet_khi ="",
    holidaysolar = "",
    holidaylunar = "";
    var dd = date.getDate();
    var dddd = date.getDay();
    var yyyy = date.getFullYear();
    var mm = date.getMonth();
    var act = date.getDay();
    if(act==0) act = 7;
    var currdate = (new Date()).toLocaleDateString('en-GB');
    var ly = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
        year: "numeric"
    }).format(date).match(/\d+/)[0],
        lm = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
            month: "numeric"
        }).format(date).match(/\d+/)[0],
        ld = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
            day: "numeric"
        }).format(date).match(/\d+/)[0];


    function INT(d) {
      return Math.floor(d);
    }
    var a, y, m, jd, lyyyy;
      lyyyy = 2000 + (ly - 17);
    a = INT((14 - mm) / 12);
    y = yyyy+4800-a;
    m = (mm+1)+12*a-3;
    jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;

    function checkHolidayLunar(nn, tt) {
              for (var i = 0; i < lunar.length; i++) {
                if (lunar[i].n === nn && lunar[i].t === tt)  {
                  holidaylunar = lunar[i].l;
                }
              }
                return holidaylunar
    }

    function checkHolidaySolar(nn, tt) {
                tt = tt + 1;
              for (var j = 0; j < solar.length; j++) {
                if (solar[j].n === nn && solar[j].t === tt)  {
                  holidaysolar = solar[j].l;
                }
              }
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


    holidaysolar = checkHolidaySolar(dd , mm);
    holidaylunar = checkHolidayLunar(ld, lm);
    

    if (holidaysolar == "" && holidaylunar == "") {
        holiday = DanhNgon[Math.floor(Math.random() * DanhNgon.length)];
    }
    else {
        holiday = holidaysolar + "<br>" + holidaylunar;
    }
    thu = thu[dddd];
    vismm = "Tháng " + vimm[mm];
    villm = "Tháng " + vimm[lm - 1];
    enmm = enmm[mm];
    enday = enday[dddd];
    chiday = chiday[dddd];
    camchithang = "<img src=\"/local/icons/12congiap/" + (lm+1)%12 + ".png" + "\"/>";
    camchingay = "<img src=\"/local/icons/12congiap/" + (jd+1)%12 + ".png" + "\"/>";
    camchigio = "<img src=\"/local/icons/12congiap/0.png" + "\"/>";
    chinam = "<img src=\"/local/icons/12congiap/" + (ly + 59) % 12 + ".png" + "\"/>";
    namAL = can [(ly - 1) % 10] + ' ' + chi [(ly + 59) % 12];
    camchithang += "Tháng " + can[(lyyyy*12+lm+3) % 10] + " " + chi[(lm+1)%12];
    camchingay += "Ngày " + can[(jd + 9) % 10] + " " + chi[(jd+1)%12];
    camchigio += "Giờ " + can[(jd - 1) * 2 % 10] + " " + chi[0];
    giohoangdao = getGioHoangDao(jd);
    tiet_khi = TIETKHI[getSunLongitude(jd + 1, 7.0)];

    this.content.innerHTML = `
      <div class="container">
          <div class="top3">
            <div class="thang">${vismm}</div>
            <div class="year">${yyyy}</div>
            <div class="thang">${enmm}</div>
          </div>
          <div class="center2">
            <div class="ngayduong">${dd}</div>
            <div class="le">${holiday}</div>
          </div>

          <div class="center3">
            <div class="thu">${enday}</div>
            <div class="thuv">${thu}</div>
            <div class="thu">${chiday}</div>
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
          <div class="footer">
          <p>&copy; 2019 Bạn Phan</p>
          </div>
      </div>
            <style>
        body{
          font-family: arial;
        }
        .container{
          margin: auto;
          position: relative;
        }
        .container .top3{
          display: block;
          clear: both;
          font-size: 1.5em;
        }
        .container .top3 .thang{
          width:40%;
          float: left;
          text-align: center;
        }
        .container .top3 .year{
          width:20%;
          color:#FFFF00;
          float: left;
          text-align: center;
          font-weight: bold;
        }
        .container .center2{
          width:100%;
          height: 300px;
          text-align: center
        }
        .container .center2 .ngayduong{
          font-weight:bold;
          font-size: 13em;
          color:#FF0000;
        }
        .container .center3{
          display: block;
          clear: both;
          width:99%;
          height: 40px;
          border:2px;
        }
        .container .center3 .thu{
          width:32%;
          float: left;
          text-align: center;
          font-size: 1.6em;
        }
        .container .center3 .thuv{
          font-weight:bold;
          width:36%;
          float: left;
          text-align: center;
          color:#B40486;
          font-size: 1.8em;
        }
        .container .end3:after{
          content: ' ';
          display: block;
          clear: both;
        }
        .container .end3 .left4{
          width:35%;
          float: left;
          font-size: 0.8em;
        }
        .container .end3 .left4 .ccnam{
          font-weight:bold;
          font-size: 1em;
        }
        .container .end3 .center4{
          width:30%;
          float: left;
          text-align: center;
        }
        .container .end3 .center4 .ngayam{
          font-size: 4.5em;
          color:#01DF01;
        }
        .container .end3 .center4 .thangam{
          font-size: 1.2em;
          color:#01DF01;
        }
        .container .end3 .right4{
          width:35%;
          float: left;
          text-align: center;
        }
      .container .footer{
          font-size: 85%;
          border-top:solid #e6e6e6;
          color: #838383;
      text-align: right
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
    return 4;
  }
}

customElements.define('lunar-day', Lunarday);