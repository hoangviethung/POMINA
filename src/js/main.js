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

// FAQ
function showFAQ() {
	$('.FAQ .item-group .question').click(function(e) {
		e.preventDefault();

		$(this).find('.arrow-icon').toggleClass('active');
		$(this).siblings('.answer').slideToggle();
	});
}



$(document).ready(function() {
	new WOW().init();
	objectFitImages("img.ofc");
	_getThumbnailYoutube();
	showBackToTop();
	showSearchMobile();
	showMenuMobile();
	sliderHomeBanner();
	activeHeader();
	showFAQ();
})

$(window).on("scroll", function() {
	// Scroll
})