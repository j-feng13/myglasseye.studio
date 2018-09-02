const PHOTO_URL = 'http://photos.myglasseye.studio';
const CONTAINER = '.container_feed';

function getPhotoList(documentPath) {
	return fetch(documentPath, {
		mode: "cors"
	})
	.then((response) => {
		return response.json();
	});
}

function createDivContainer(headerEle, imgEle, descriptionEle) {
	const div = document.createElement('div');
	div.classList.add('container_photo');
	div.appendChild(headerEle);
	div.appendChild(imgEle);
	div.appendChild(descriptionEle);
	return div;
}

function createImgEle(key, image) {
	const img = document.createElement('img');
	img.src = `${PHOTO_URL}/${key}${image}/small.jpg`;
	img.crossorigin = 'anonymous'
	return img;
}

function createImgHeader(title) {
	const h1 = document.createElement('h1');
	const textNode = document.createTextNode(title);
	h1.classList.add('container_photo_title');
	h1.appendChild(textNode);
	return h1;
}

function createImgDescription(description) {
	const div = document.createElement('div');
	const textGradient = createTextGradient();
	const textNode = document.createTextNode(description);
	div.classList.add('container_photo_description');
	div.appendChild(textGradient);
	div.appendChild(textNode);
	return div;	
}

function createTextGradient() {
	const div = document.createElement('div')
	div.classList.add('container_description_blur');
	return div;
}

function renderPhotoList(targetElement, photoList) {
	const { key, photos } = photoList;
	const fragment = document.createDocumentFragment();
	photos.map((photoItem) => {
		const { image, title, description } = photoItem;
		const headerEle = createImgHeader(title);
		const imgEle = createImgEle(key, image);
		const descriptionEle = createImgDescription(description);
		const container = createDivContainer(headerEle, imgEle, descriptionEle);
		fragment.appendChild(container);
	});

	targetElement.appendChild(fragment);
}

function init(photoListFile) {
	const targetElement = document.querySelector(CONTAINER);
	getPhotoList(photoListFile)
	.then((photoList) => {
		renderPhotoList(targetElement, photoList)
	})
	.catch((err) => {
		console.log(err);
	});
}

document.addEventListener('DOMContentLoaded', init.bind(null, 'main_feed.json'));
