var files = [];
var fileContainer = document.getElementById('fileContainer');
var folderName = '';

function fetchFileData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetchFiles.php?folder=" + encodeURIComponent(folderName), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            files = data.files;
            renderFiles(); 
        }
    };
    xhr.send();
}


function saveFileToDatabase(fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "saveFile.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); 
        }
    };
    xhr.send("fileName=" + encodeURIComponent(fileName) + "&folderName=" + encodeURIComponent(folderName));
}

window.onload = function() {
    folderName = getParameterByName('folder');
    document.getElementById('folderName').textContent = folderName + " files";
    fetchFileData();
};


document.getElementById('createFileBtn').addEventListener('click', function() {
    document.getElementById('fileInput').style.display = 'block';
});

document.getElementById('saveFileBtn').addEventListener('click', function() {
    var fileName = document.getElementById('fileName').value;
    if (fileName.trim() !== '') {
        createFile(fileName);
        renderFiles();
        saveFileToDatabase(fileName);
        document.getElementById('fileName').value = '';
        document.getElementById('fileInput').style.display = 'none';
    } else {
        alert('Please enter a file name.');
    }
});

document.getElementById('backBtn').addEventListener('click', function() {
    window.history.back();
});


function createFile(name) {
    files.push(name);
}

function renderFiles() {
    fileContainer.innerHTML = '';
    files.forEach(function(fileName, index) {
        var fileElement = document.createElement('div');
        fileElement.classList.add('file');

        var fileNameElement = document.createElement('div');
        fileNameElement.classList.add('file-icon');
        fileNameElement.textContent = fileName;
        fileElement.appendChild(fileNameElement);

        fileElement.setAttribute('onclick', `navigateToPage3('${fileName}')`);

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '❌';
        deleteButton.addEventListener('click', function() {
            event.stopPropagation();
            deleteFile(index);
        });
        fileElement.appendChild(deleteButton);

        fileContainer.appendChild(fileElement);
    });
}

function deleteFile(index) {
    var fileName = files[index]; 
    files.splice(index, 1); 
    renderFiles(); 

    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "deleteFile.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); 
        }
    };
    xhr.send("fileName=" + encodeURIComponent(fileName));
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function navigateToPage3(fileName) {
    window.location.href = `page3.html?file=${encodeURIComponent(fileName)}&folder=${encodeURIComponent(folderName)}`;
}

renderFiles();
