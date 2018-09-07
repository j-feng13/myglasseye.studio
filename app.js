const PHOTO_URL = 'http://photos.myglasseye.studio';
const CONTAINER = '.container_feed';
const MODAL = '.modal';

function getPhotoList(documentPath) {
	return fetch(documentPath, {
		mode: 'cors'
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
	img.src = `${PHOTO_URL}${key}${image}/small.jpg`;
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

function attachCarouselImages(ele, key, image, types) {
	const baseImageUrl = PHOTO_URL + key + image;
	const imgListFragment = document.createDocumentFragment();

	for (let type of types) {
		const img = document.createElement('img');
		img.classList.add('modal_carousel_image');
		img.src = `${baseImageUrl}/${type}.jpg`;
		img.crossorigin = 'anonymous';
		imgListFragment.appendChild(img);
	}

	ele.appendChild(imgListFragment);
}

function attachCarouselControls(ele, count) {
	const left = ele.querySelector('.modal_control_left');
	const right = ele.querySelector('.modal_control_right');
	
	const scope = {
		currentIndex: 0
	};

	function handleCarouselClick(target, step, count, evt) {
		const carouselImages = document.querySelectorAll('.modal_carousel_image');
		let nextIndex = this.currentIndex + step;
		if (nextIndex <= 0) {
			nextIndex = 0;
		} else if (nextIndex >= count) {
			nextIndex = count;
		}

		const currentImage = carouselImages[this.currentIndex];
		const nextImage = carouselImages[nextIndex];
		currentImage.classList.remove('modal_carousel_image_visible');
		nextImage.classList.add('modal_carousel_image_visible');

		this.currentIndex = nextIndex;
	}

	left.addEventListener('click', handleCarouselClick.bind(scope, left, -1, count));
	right.addEventListener('click', handleCarouselClick.bind(scope, right, 1, count));
}

function filterCarouselTypes(types) {
	const smallIndex = types.indexOf('small');
	types.slice(smallIndex, 1);
	return types;
}


function showModal(key, image, description, types) {
	const modalEle = document.querySelector(MODAL);
	const modal.classList.add('modal_visible');
	const imageContainerEle = modalEle.querySelector('.modal_carousal');
	const descriptionEle = modalEle.querySelector('.modal_description');

	descriptionEle.textContent = description;
	const carouselTypes = filterCarouselTypes(types);
	attachCarouselImages(imageContainerEle, key, image, carouselTypes);
	attachCarouselControls(modalEle, carouselTypes.length - 1);
}

function renderPhotoList(targetElement, photoList) {
	const { key, photos } = photoList;
	const fragment = document.createDocumentFragment();
	photos.map((photoItem) => {
		const { image, title, description, types } = photoItem;
		const headerEle = createImgHeader(title);
		const imgEle = createImgEle(key, image);
		const descriptionEle = createImgDescription(description);
		const container = createDivContainer(headerEle, imgEle, descriptionEle);
		container.addEventListener('click', showModal.bind(this, key, image, description, types));
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
