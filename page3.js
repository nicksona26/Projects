window.onload = function() {
    var fileName = getParameterByName('file');
    var folderName = getParameterByName('folder'); 
    document.getElementById('title').textContent = fileName;
    fetchFileText(fileName, folderName);
}

function fetchFileText(fileName, folderName) {
    var xhr = new XMLHttpRequest();
    // Include the folder name in the request
    xhr.open("GET", `fetchText&Title.php?file=${encodeURIComponent(fileName)}&folder=${encodeURIComponent(folderName)}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var text = xhr.responseText;
            document.getElementById('textbox').value = text;
        }
    };
    xhr.send();
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

document.getElementById('saveBtn').addEventListener('click', function() {
    var textToSave = document.getElementById('textbox').value;
    var title = document.getElementById('title').textContent;
    var folderName = getParameterByName('folder'); 

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "storeText&Title.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    
    xhr.send(`title=${encodeURIComponent(title)}&text=${encodeURIComponent(textToSave)}&folder=${encodeURIComponent(folderName)}`);
});

document.getElementById('backBtn').addEventListener('click', function() {
    window.history.back();
});
