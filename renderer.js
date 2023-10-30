// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;

const win = remote.getCurrentWindow(); /* Note this is different from the
html global `window` variable */

function showInstallContainer() {
    const installContainer = document.getElementById('install-container');
    installContainer.classList.remove('hidden');
  }
  
  

// When document has loaded, initialize
document.onreadystatechange = (event) => {
    if (document.readyState === "complete") {
        handleWindowControls();

        // Show the loader
        const loader = document.getElementById('loader');
        loader.style.display = 'block';

        // Hide the loader after 5 seconds
        setTimeout(() => {
            // Add the fade-out class to initiate the fade-out effect
            loader.classList.add('fade-out');

            // Hide the loader after the transition ends
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
            
                // Call the showInstallContainer function here to make the install-container appear
                showInstallContainer();
            
                // Create a gradual fade-in effect by changing the opacity
                const installContainer = document.getElementById('install-container');
                let opacity = 0;
                const fadeInterval = setInterval(() => {
                    opacity += 0.05; // You can adjust the increment as needed
                    installContainer.style.opacity = opacity;
                    if (opacity >= 1) {
                        clearInterval(fadeInterval); // Stop the interval when opacity reaches 1
                    }
                }, 50); // You can adjust the interval time as needed
            }, { once: true });
        }, 2500);
    }
};

// Wait for the loader to finish fading out

  
// Add a click event listener to the custom button
// Add a click event listener to the custom button
document.querySelector('.custom-button').addEventListener('click', function () {
    document.getElementById('folder-selector').click();
});

// Add an event listener to handle the selected folder
document.getElementById('folder-selector').addEventListener('change', function (e) {
    const selectedFolder = e.target.files[0];
    if (selectedFolder) {
        // Handle the selected folder here
        console.log('Selected folder path:', selectedFolder.path);

        // Hide the folder selector and show the Next button
        const folderSelectorContainer = document.getElementById('folder-selector-container');
        const nextButtonContainer = document.getElementById('next-button-container');

        folderSelectorContainer.style.display = 'none';
        nextButtonContainer.style.display = 'block';
    }
});



window.onbeforeunload = (event) => {
    /* If the window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

