/* JavaScript (script.js) */
let images = [];
let currentIndex = 0;

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const files = event.target.files;
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push({ src: e.target.result, name: file.name, date: new Date().getTime() });
            displayImages();
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('searchBar').addEventListener('input', function() {
    displayImages(this.value.toLowerCase());
});

function displayImages(search = '') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    images.filter(img => img.name.toLowerCase().includes(search)).forEach((img, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.name;
        imgElement.onclick = () => openLightbox(index);
        gallery.appendChild(imgElement);
    });
}

function openLightbox(index) {
    currentIndex = index;
    document.getElementById('lightbox-img').src = images[index].src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('lightbox-img').src = images[currentIndex].src;
    }
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        document.getElementById('lightbox-img').src = images[currentIndex].src;
    }
}

function sortImages(type) {
    if (type === 'name') {
        images.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'date') {
        images.sort((a, b) => a.date - b.date);
    }
    displayImages();
}