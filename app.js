const PHOTO_URL = 'http://photos.myglasseye.studio';

function getPhotoList(documentPath) {
	return fetch(documentPath, {
		mode: "cors"
	})
	.then((response) => {
		return response.json();
	});
}

function createDivContainer(title, description, img) {
	const div = document.createElement('div');
	const headerText = document.createTextNode(title);
	const descriptionText  = document.createTextNode(description);
	div.appendChild(headerText);
	div.appendChild(descriptionText);
	div.appendChild(img);
	return div;
}

function createImgEle(image) {
	const img = document.createElement('img');
	img.src = PHOTO_URL + image;
	img.crossorigin = 'anonymous'
	return img;
}

function renderPhotoList(targetElement, photoList) {
	const fragment = document.createDocumentFragment();
	photoList.map((photoItem) => {
		const { image, title, description } = photoItem;
		const img = createImageEle(image);
		const container = createDivContainer(title, description, img);
		fragment.appendChild(container);
	});

	targetElement.appendChild(fragment);
}

function init(photoListFile) {
	const targetElement = document.querySelector('body');
	getPhotoList(photoListFile)
	.then((photoList) => {
		renderPhotoList(targetElement, photoList)
	});
}

init('main_feed.json');