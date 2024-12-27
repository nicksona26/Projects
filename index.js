var folders = [];
var folderContainer = document.getElementById('folderContainer');

function fetchFolderData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetchFolders.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            folders = data.folders;
            renderFolders(); 
        }
    };
    xhr.send();
}

function saveFolderToDatabase(folderName) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "saveFolder.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); 
        }
    };
    xhr.send("folderName=" + encodeURIComponent(folderName));
}

window.onload = function() {
    fetchFolderData();
};

document.getElementById('createFolderBtn').addEventListener('click', function() {
    document.getElementById('folderInput').style.display = 'block';
});

document.getElementById('saveFolderBtn').addEventListener('click', function() {
    var folderName = document.getElementById('folderName').value.trim();
    if (folderName === '') {
        alert('Please enter a folder name.');
        return;
    }
  
    var folderNameLower = folderName.toLowerCase();
    var existingFolder = folders.find(f => f.toLowerCase() === folderNameLower);
    if (existingFolder) {
        alert('A folder with this name already exists.');
    } else {
        createFolder(folderName);
        renderFolders();
        saveFolderToDatabase(folderName);
        document.getElementById('folderName').value = '';
        document.getElementById('folderInput').style.display = 'none';
    }
});


function createFolder(name) {
    folders.push(name);
}

function renderFolders() {
    folderContainer.innerHTML = '';
    folders.forEach(function(folderName, index) {
        var folderElement = document.createElement('div');
        folderElement.classList.add('folder');
        folderElement.setAttribute('onclick', `navigateToPage2('${folderName}')`);

        var folderNameElement = document.createElement('div');
        folderNameElement.classList.add('folder-icon');
        folderNameElement.textContent = folderName;
        folderElement.appendChild(folderNameElement);

        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '❌';
        deleteButton.addEventListener('click', function() {
            event.stopPropagation();
            deleteFolder(index);
        });
        folderElement.appendChild(deleteButton);
        folderContainer.appendChild(folderElement);
    });
}

function navigateToPage2(folderName) {
    window.location.href = `page2.html?folder=${encodeURIComponent(folderName)}`;
}

function deleteFolder(index) {
    var folderName = folders[index]; 
    folders.splice(index, 1); 
    renderFolders(); 

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "deleteFolder.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send("folderName=" + encodeURIComponent(folderName));
}


renderFolders();