// Declare variables:
const form = document.querySelector('form'),
fileInput = form.querySelector('.file-input'),
progressArea = document.querySelector('.progress-area'),
uploadedArea = document.querySelector('.uploaded-area');

form.addEventListener('click', function () {
  fileInput.click();
});

fileInput.addEventListener('change', function ({target}) {
  let file = target.files[0];

  if (file) {
    //get file's information
    let fileName = file.name;
    if(fileName.length >= 12) {
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0,12) + "... ." + splitName[1];
    }

    upLoadFile(fileName);
  }
});

function upLoadFile(name) {
  let xhr  = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload.addEventListener('progress', function ({loaded, total}) {
    //get size information of file upload
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    //Convert fileTotal to KB or MB
    fileTotal < 1024 ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + "MB";

    let progressHTML = `<li class="row">
                          <i class='bx bxs-file'></i>
                          <div class="contents">
                            <div class="details">
                              <span class="name">${name} &#10020;Uploading</span>
                              <span class="percents">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width:${fileLoaded}%;"></div>
                            </div>
                          </div>
                        </li>
                      `;
    uploadedArea.classList.add('onprogress');
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="contents">
                              <i class='bx bxs-file' ></i>
                              <div class="details">
                                <span class="name">${name} &#10020;Uploaded</span>
                                <span class="sizes">${fileSize}</span>
                              </div>
                            </div>
                            <i class='bx bx-check check-icon' ></i>
                          </li>`;
      uploadedArea.classList.remove('onprogress');
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  })
  let formData = new FormData(form);
  xhr.send(formData);
}