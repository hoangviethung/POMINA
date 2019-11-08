// @import File Here !!!
import map from "./map";

// Function thêm class lazyload vào các thẻ <img> có thuộc tính [data-src]
const addClassLazyload = () => {
	let imgList = document.querySelectorAll("img[data-src]")
	Array.prototype.forEach.call(imgList, function(el) {
		if (el.className.length > 0) {
			el.className = el.className + " lazyload"
		} else {
			el.className = "lazyload"
		}
	});
}

// Script cho tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block"
				setTimeout(() => {
					targetDOM.classList.add("show")
				}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

// ACTIVE HEADER WHEN SCROLL
function activeHeader() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 150) {
			$('header').addClass('active');
		} else {
			$('header').removeClass('active');
		}
	});
}

	// ACTIVE ITEM MENU BY URL
	function activeMenuByUrl() {
		var url = window.location.href.split('/').pop();

		let listNavItem = $('.bottom-header .nav-list .nav-item a');
		listNavItem.each(function() {
			let hung = $(this).attr('href');
			if (url.includes(hung)) {
				$(this).parents('.nav-item').addClass('active');
			}
		})
	}

// SHOW MENU IN MOBILE
function showMenuMobile() {
	$('.toggle-menu-mobile').click(function(e) {
		e.preventDefault();
		$(this).siblings('.search-mobile').find('.search').removeClass('active');
		$(this).siblings('.search-mobile').find('.close').removeClass('active');

		$('.top-header').removeClass('active');
		$('.bottom-header').toggleClass('active');
	});
}

// SHOW SEARCH MOBILE
function showSearchMobile() {
	$('.search-mobile').click(function(e) {
		e.preventDefault();
		$(this).find('.search').toggleClass('active');
		$(this).find('.close').toggleClass('active');

		$('.bottom-header').removeClass('active');
		$('.top-header').toggleClass('active');
	});
}

// SHOW BACK TO TOP
function showBackToTop() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 800) {
			$('#back-to-top').addClass('active');
		} else {
			$('#back-to-top').removeClass('active');
		}
	});

	$("#back-to-top").on("click", function(e) {
		e.preventDefault();
		$("html,body").animate({
			scrollTop: 0
		})
	})
}

// SHOW FULL CONTENT ABOUT
function showMoreContentAbout() {
	$('.content-about span').click(function(e) {
		e.preventDefault();
		console.log('OK');
		$('.content-about .desc').toggleClass('show-more');
	});
}

// HOME SLIDER
function sliderHomeBanner() {
	var swpier = new Swiper('.slider-HomeBanner', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		centeredSlides: true,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {},
		navigation: {
			nextEl: '.slider-HomeBanner .swiper-button-next',
			prevEl: '.slider-HomeBanner .swiper-button-prev',
		},
	});
}

// SLIDER LEADER (ABOUT PAGE)
function sliderLeader() {
	var swpier = new Swiper('.slider-Leaders .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 15,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {

		},
		navigation: {
			nextEl: '.slider-Leaders .swiper-button-next',
			prevEl: '.slider-Leaders .swiper-button-prev',
		},
	});
}

// SLIDER Achievement (ABOUT PAGE)
function sliderAchievement() {
	var swpier = new Swiper('.slider-Achievement .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 50,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {

		},
		navigation: {
			nextEl: '.slider-Achievement .swiper-button-next',
			prevEl: '.slider-Achievement .swiper-button-prev',
		},
	});
}

// SLIDER PRODUCT DETAIL
function sliderProcutDetail() {
	var images_Small = new Swiper('.slider-ProductDetail .small-image .swiper-container', {
		direction: 'vertical',
		spaceBetween: 20,
		slidesPerView: 4,
		freeMode: true,
		loopedSlides: 5,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.small-image .swiper-button-next',
			prevEl: '.small-image .swiper-button-prev',
		},
	});

	var images_Big = new Swiper('.slider-ProductDetail .big-image .swiper-container', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		spaceBetween: 10,
		simulateTouch: false,
		loopedSlides: 3,
		thumbs: {
			swiper: images_Small,
		},
	});
}

// SLIDER SAME PRODUCT
function sliderSameProduct() {
	var swpier = new Swiper('.slider-SameProduct', {
		slidesPerView: 4,
		spaceBetween: 20,
		speed: 1000,
		simulateTouch: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {

		},
		navigation: {
			nextEl: '.slider-SameProduct .swiper-button-next',
			prevEl: '.slider-SameProduct .swiper-button-prev',
		},
	});
}

// GET THUMBNAIL YOUTUBE
function _getThumbnailYoutube() {
	$(".library .item.video").each(function() {
		var src = $(this).attr("href");
		var youtube_video_id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
		if (youtube_video_id.length == 11) {
			$(this).find("img").attr("src", "https://img.youtube.com/vi/" + youtube_video_id + "/mqdefault.jpg");
		}
	})
}

// GÕ CHỮ RA TỪ TỪ
function typeIt() {
	new TypeIt('.typeit', {
		speed: 300,
		cursor: false,
		waitUntilVisible: true,
	}).go();
}

// SỰ KIỆN LINE CHÉO SOLOGAN
function scrollToSologan() {
	if ($('.sologan').length) {
		let offsetSologan = $('.sologan').offset();
		let topOffsetSologan = offsetSologan.top;

		$(window).scroll(function() {
			if ($(this).scrollTop() > topOffsetSologan - 500) {
				$('.sologan').find('h5').addClass('active');
			}
		});
	}
}

$(document).ready(function() {
	// GOOGLE MAP
	map();
	// WOW
	new WOW().init();
	// TYPE-IT
	typeIt();
	// Object Images
	objectFitImages("img.ofc");
	// MENU
	showMenuMobile();
	showSearchMobile();
	activeMenuByUrl();
	activeHeader();
	// YOUTUBE
	_getThumbnailYoutube();
	// BACK TO TOP
	showBackToTop();
	// ABOUT
	showMoreContentAbout();
	scrollToSologan();
	// SLIDER
	sliderHomeBanner();
	sliderLeader();
	sliderAchievement();
	sliderProcutDetail();
	sliderSameProduct();
	// TAB
	const tabGoogleMap = new Tab('.google-map .tab-container');
})