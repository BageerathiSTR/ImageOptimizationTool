"use strict";

window.onload = (async function () {
  const compressor = new window.Compress();
  const browserSupportsExifOrientation = () => {
    return new Promise((resolve) => Modernizr.on("exiforientation", resolve));
  };

  // Only rotate if browser does not support exit orientation.
  const shouldRotate = async () => {
    const supported = await browserSupportsExifOrientation();
    return !supported;
  };
  const rotate = await shouldRotate();
  console.log({ rotate });

  let upload = document.getElementById("upload");
  let preview = document.getElementById("preview");
  const clearQueue =  document.getElementById("clearQueue");
  
  
  let files = [];
  
  upload.addEventListener(
    "change",
    async function (evt) {
      files = [...evt.target.files];
      const results = await compressor.compress(files, {
        size: 4,
        quality: 0.75,
        rotate,
      });
      console.log(results);
      const output = results[0];
	  
      previewImages(files);
	  
      //preview.src = output.prefix + output.data;
    },
    false
  );
  
  clearQueue.addEventListener(
    "click",
    async function (evt) {
     document.getElementById("preview").innerHTML = "";
	 document.getElementById("upload").value = "";
    },
    false
  );

  
})();

function previewImages(files) {

  var preview = document.querySelector('#preview');
  
  if (files) {
    [].forEach.call(files, readAndPreview);
  }

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...
    
    var reader = new FileReader();
    
    reader.addEventListener("load", function() {
      var image = new Image();
      image.height = 100;
      image.title  = file.name;
      image.src    = this.result;
	  image.setAttribute("style","padding:10px 10px 10px 10px");
      preview.appendChild(image);
    });
    
    reader.readAsDataURL(file);
    
  }
};

function downloadAll(){
	
var fileURLs = document.querySelectorAll("img");

       var zip = new JSZip();	
		
        zip.file("im1.jpg",fileURLs[0], {base64: true});
        zip.file("im2.jpg",fileURLs[1], {base64: true});
        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "download.zip");
        }); 


};




