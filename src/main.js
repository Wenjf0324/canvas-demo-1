
      let canvas = document.getElementById("canvas");

      //画布的宽高为屏幕的宽高
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;

      let ctx = canvas.getContext("2d");
      ctx.strokeStyle = "none";
      ctx.fillStyle = "black";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      //选择画笔颜色
      let black = document.querySelector('.black');
      let red = document.querySelector('.red');
      let orange = document.querySelector('.orange');
      let green = document.querySelector('.green');
      let purple = document.querySelector('.purple');
      black.onclick=(e)=>{
        ctx.strokeStyle = "black";
      }
      red.onclick=(e)=>{
        ctx.strokeStyle = "red";
      }
      orange.onclick=(e)=>{
        ctx.strokeStyle = "orange";
      }
      green.onclick=(e)=>{
        ctx.strokeStyle = "green";
      }
      purple.onclick=(e)=>{
        ctx.strokeStyle = "purple";
      }

      let painting = false;
      let last;  //上一个坐标点

      //检测是否支持触屏
      var isTouchDevice = "ontouchstart" in document.documentElement;
      //如果是触屏设备
      if (isTouchDevice) {
        //获取第0个触碰点
        canvas.ontouchstart = (e) => {
          let x = e.touches[0].clientX;
          let y = e.touches[0].clientY;
          last = [x, y];  //第一个last
        };
        canvas.ontouchmove = (e) => {
          let x = e.touches[0].clientX;
          let y = e.touches[0].clientY;
          drawLine(last[0], last[1], x, y);
          last = [x, y];  //更新上一次的坐标点
        };
      } else {
        //如果不是触屏设备
        canvas.onmousedown = (e) => {
          painting = true;
          last = [e.clientX, e.clientY];  //初始化last
        };

        canvas.onmousemove = (e) => {
          if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY);
            last = [e.clientX, e.clientY];  //更新上一次的坐标点
          }
        };

        canvas.onmouseup = () => {
          painting = false;
        };
      }

      function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
