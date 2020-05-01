/*
 * Simple Draw
 *
 * projectInfo: {
 *   name: 'Simple Draw',
 *   release: {
 *      day: 29,
 *      month: 4,
 *      year: 2020
 *   },
 *   developers: [
 *      'Renault Scabora' 
 *   ]
 * }
 * 
 * Powered By Renaultivo Systems
 * 
 */

(()=>{

   "use strict";

   let properties = {
      fullscreen: false,
      canvas: {
         width: 1000,
         height: 1000
      },
      pincel: {
         size: 1,
         color: 'black',
         minSize: 1,
         maxSize: 40,
         isDrawing: false,
         isErasing: false,
         numberOfTouches: 0
      },
      eraser: {
         minSize: 20
      },
      colors: {
         options: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Magenta', 'Tan', 'Cyan', 'Olive', 'Maroon', 'Navy', 'Aquamarine', 'Turquoise', 'Silver', 'Lime', 'Teal', 'Indigo', 'Violet', 'Pink', 'Black', 'White', 'Gray']
      }
   }

   let canvas = document.createElement('canvas');
   let paleta = document.createElement('div');
   let paletaImg = document.createElement('img');
   let pencilImg = document.createElement('img');
   let eraserImg = document.createElement('img');
   let pincelPanel = document.createElement('div');
   let touchesData = new Object();
   let downloadImg = document.createElement('img');
   let controlPanel = document.createElement('div');
   let fullScreenImg = document.createElement('img');
   let closePanelImg = document.createElement('img');

   let context = canvas.getContext('2d');

   canvas.width = properties.canvas.width;
   canvas.height = properties.canvas.height;
   
   context.lineWidth = properties.pincel.size;
   context.strokeStyle = properties.pincel.color;
   
   paleta.id = 'paleta';
   pincelPanel.id = 'pincelPanel';
   controlPanel.id = 'controlPanel';

   paleta.className = 'flexBoxAlign';
   eraserImg.className = 'controlPanelImgOption';
   pencilImg.className = 'controlPanelImgOption';
   downloadImg.className = 'controlPanelImgOption';
   controlPanel.className = 'flexBox alignCenter columnDirection';
   closePanelImg.className = 'controlPanelImgOption';
   fullScreenImg.className = 'controlPanelImgOption';

   paletaImg.src = 'assets/icons/paleta.png';
   eraserImg.src = 'assets/icons/eraser.png';
   pencilImg.src = 'assets/icons/pencil.png';
   downloadImg.src = 'assets/icons/download.png';
   closePanelImg.src = 'assets/icons/close.png';
   fullScreenImg.src = 'assets/icons/expand.png';

   paleta.appendChild(paletaImg);

   document.body.appendChild(canvas);
   document.body.appendChild(paleta);
   document.body.appendChild(controlPanel);
   document.body.appendChild(pincelPanel);

   paleta.onclick = function() {
      this.style.animation = 'fadeOur linear 0.3s';
      setTimeout(()=>{this.style.display = 'none';}, 250);
      controlPanel.style.right = '2%';
   }

   let lastItemSelected = null;

   function changeLineColor(color) {
      properties.pincel.color = color;
   }

   function saveCanvasAsFile() {

      let fileName = document.createElement('input');
      let inputBox = document.createElement('div');
      let clouseBox = document.createElement('div');
      let filePreview = document.createElement('img');
      let downloadButton = document.createElement('a');
      let downloadConfig = document.createElement('div');
      let downloadScreen = document.createElement('div');

      fileName.id = 'fileName';
      inputBox.id = 'inputBox';
      clouseBox.id = 'closeBox';
      filePreview.id = 'filePreview';
      downloadButton.id = 'downloadButton';
      downloadConfig.id = 'downloadConfig';
      downloadScreen.id = 'downloadScreen';

      inputBox.className = 'flexBoxAlign columnDirection';
      clouseBox.className = 'flexBoxAlign';
      downloadButton.className = 'flexBoxAlign';
      downloadConfig.className = 'flexBoxAlign columnDirection';

      fileName.type = 'text';
      fileName.value = 'Simple Draw - Renaultivo';
      
      filePreview.src = canvas.toDataURL('image/png');

      downloadButton.href = canvas.toDataURL('image/png');
      downloadButton.innerText = 'Download';
      downloadButton.download = fileName.value;

      clouseBox.innerText = 'Fechar';

      fileName.onkeyup = function() {
         downloadButton.download = this.value;
      }

      clouseBox.onclick = () => {
         document.body.removeChild(downloadScreen);
      }

      inputBox.appendChild(document.createTextNode('Nome do arquivo'));
      inputBox.appendChild(fileName);

      downloadConfig.appendChild(filePreview);
      downloadConfig.appendChild(inputBox);
      downloadConfig.appendChild(downloadButton);
      downloadConfig.appendChild(clouseBox);

      downloadScreen.appendChild(downloadConfig);
      document.body.appendChild(downloadScreen);

   }

   function createControlPanelOption(Instructions) {

      if (typeof Instructions == "undefined") {
         return false;
      }

      let element = document.createElement('div');
      controlPanel.appendChild(element);

      if (typeof Instructions == "string") {

         element.className = 'controlPanelOption';

         element.style.backgroundColor = Instructions;

         element.onclick = function() {

            this.className = 'controlPanelOption selectedItem'
            
            if (lastItemSelected != null) {
               lastItemSelected.className = 'controlPanelOption';
            }

            lastItemSelected = this;
            
            if (properties.pincel.isErasing) {
               properties.pincel.isErasing = false;
               canvas.style.cursor = 'crosshair';
               document.getElementById('pencilIcon').className = 'flexBoxAlign controlPanelOption selectedItem';
               document.getElementById('eraserIcon').className = 'flexBoxAlign controlPanelOption';
            }

            changeLineColor(Instructions);

         }

      } else {

         element.id = typeof Instructions.id != "undefined" ? Instructions.id : '';
         element.className = Instructions.selectedState ? 'flexBoxAlign controlPanelOption selectedItem' : 'flexBoxAlign controlPanelOption';

         element.style.color = typeof Instructions.color != "undefined" ? Instructions.color : '#000000';
         element.style.fontSize = typeof Instructions.fontSize != "undefined" ? Instructions.fontSize : '30px';
         element.style.backgroundColor = typeof Instructions.backgroundColor != "undefined" ? Instructions.backgroundColor : '#FFFFFF';
            
         element.innerText = typeof Instructions.text != "undefined" ? Instructions.text : '';

         typeof Instructions.content != "undefined" ? element.appendChild(Instructions.content) : '';

         element.onclick = typeof Instructions.onClick != "undefined" ? Instructions.onClick : ()=>{};

      }

   }

   createControlPanelOption({
      content: closePanelImg,
      backgroundColor: '#222222',
      onClick: () => {
         paleta.style.animation = 'fadeIn linear 0.3s';
         paleta.style.display = 'flex';
         controlPanel.style.right = 'calc(-11% - 100px)';
      }
   });

   createControlPanelOption({
      id: 'pencilIcon',
      content: pencilImg,
      selectedState: true,
      onClick: function() {
         properties.pincel.isErasing = false;
         this.className = 'flexBoxAlign controlPanelOption selectedItem';
         canvas.style.cursor = 'crosshair';
         document.getElementById('eraserIcon').className = 'flexBoxAlign controlPanelOption';
      }

   });

   createControlPanelOption({
      id: 'eraserIcon',
      content: eraserImg,
      onClick: function() {
         properties.pincel.isErasing = true;
         this.className = 'flexBoxAlign controlPanelOption selectedItem';
         canvas.style.cursor = 'url(assets/icons/eraser.png), auto';
         document.getElementById('pencilIcon').className = 'flexBoxAlign controlPanelOption';
      }
   });

   createControlPanelOption({
      content: fullScreenImg,
      onClick: () => {

         if (properties.fullscreen) {
            document.exitFullscreen();
            return false;
         }

         if (document.fullscreenEnabled) {
            document.getElementsByTagName('html')[0].requestFullscreen();
         }

      }
   });

   createControlPanelOption({
      content: downloadImg,
      onClick: saveCanvasAsFile
   });

   properties.colors.options.forEach((c)=>{
      createControlPanelOption(c);
   });

   let canvasControl = new Object();

   canvasControl.setSize = (w, h) => {

      properties.canvas.width = w;
      properties.canvas.height = h;

      canvas.width = w;
      canvas.height = h;

   }

   let drawManager = new Object();

   drawManager.startLine = (x, y) => {

      context.beginPath();
      context.moveTo(x, y);

      if (properties.pincel.isErasing) {
         context.fillStyle = '#FFFFFF';
         context.strokeStyle = '#FFFFFF';
         context.lineWidth = properties.pincel.size > properties.eraser.minSize ? properties.pincel.size : properties.eraser.minSize;
      } else {
         context.fillStyle = properties.pincel.color;
         context.strokeStyle = properties.pincel.color;
         context.lineWidth = properties.pincel.size;
      }

   }

   drawManager.setColor = (color) => {
      context.strokeStyle = color;
   }

   drawManager.draw = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
   }

   drawManager.moveTo = (x, y) => {
      context.moveTo(x, y);
   }

   drawManager.drawRect = (x, y) => {
      context.fillRect(x - (properties.pincel.size/2), y - (properties.pincel.size/2), properties.pincel.size, properties.pincel.size);
      context.stroke();
   }

   drawManager.drawCircle = (x, y) => {
      context.arc(x, y, properties.pincel.size, 0, 2 * Math.PI);
      context.stroke();
   }

   function startDraw(x, y, z=null) {

      let currentX = x / (canvas.offsetWidth / properties.canvas.width);
      let currentY = y / (canvas.offsetHeight / properties.canvas.height);

      
      if (z != null) {
         
         touchesData['touch'+z] = {
            lastX: currentX,
            lastY: currentY
         }

      }

      properties.pincel.isDrawing = true;
      drawManager.startLine(currentX, currentY);
      drawManager.drawRect(currentX, currentY);

   }

   function drawLine(x, y, z=null) {

      if (!properties.pincel.isDrawing) {
         return false;
      }

      let currentX = x / (canvas.offsetWidth / properties.canvas.width);
      let currentY = y / (canvas.offsetHeight / properties.canvas.height);

      if (z != null) {
         
         if (typeof touchesData['touch'+z] != "undefined") {
            context.moveTo(touchesData['touch'+z].lastX, touchesData['touch'+z].lastY);
         }

         touchesData['touch'+z] = {
            lastX: currentX,
            lastY: currentY
         }

      }

      drawManager.draw(currentX, currentY);

   }

   canvas.onmousedown = (e) => {

      if (typeof e.path != "undefined") {

         if (e.path[0] != canvas) {
            return false;
         }

      }

      startDraw(e.pageX, e.pageY);
   }

   canvas.ontouchstart = (e) => {

      for (let i=0; typeof e.touches[i] != "undefined"; i++) {
         startDraw(e.touches[i].pageX, e.touches[i].pageY, i);
      }

      if (e.touches.length > properties.pincel.numberOfTouches) {
         properties.pincel.numberOfTouches = e.touches.length;
      }

      properties.pincel.numberOfTouches--;

   }

   canvas.onmousemove = (e) => {
      drawLine(e.pageX, e.pageY);
   }

   canvas.ontouchmove = (e) => {
      
      if (!properties.pincel.isDrawing) {
         return false;
      }

      for (let i=0; typeof e.touches[i] != "undefined"; i++) {
         drawLine(e.touches[i].pageX, e.touches[i].pageY, i);
      }

   }

   canvas.onmouseup = () => {
      properties.pincel.isDrawing = false;
   }

   canvas.ontouchend = (e) => {

      if (e.cancelable) {
         e.preventDefault();
         e.stopPropagation();
      }

      if (properties.pincel.numberOfTouches > 0) {
         properties.pincel.numberOfTouches--;
         return false;
      }

      properties.pincel.isDrawing = false;

   }

   document.onfullscreenchange = (e) => {
      
      if (properties.fullscreen) {
         fullScreenImg.src = 'assets/icons/expand.png';
         properties.fullscreen = false;
      } else {
         fullScreenImg.src = 'assets/icons/contract.png';
         properties.fullscreen = true;
      }

   }

   window.onload = (e) => {
      canvasControl.setSize(window.screen.width, window.screen.height);
   }

   window.onkeydown = (e) => {
      
      if (e.keyCode == 107) {

         if (properties.pincel.size < properties.pincel.maxSize) {
            properties.pincel.size++;
            context.lineWidth = properties.pincel.size;
         }

      } else if (e.keyCode == 109) {

         if (properties.pincel.size > properties.pincel.minSize) {
            properties.pincel.size--;
            context.lineWidth = properties.pincel.size;
         }

      }

   }

 })(window);