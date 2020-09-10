// @import File Here !!!
import GGMapInit from "./map";
import Loading from "./loading";
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

// CHECK LAYOUT
function checkLayout() {
	let selector = document.querySelector('body .index-page');

	if (selector) {
		document.querySelector('main').classList.add('have-big-banner');
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

function checkMenuHaveSub() {
	$('.nav-list .nav-item .nav-sub').each(function() {
		const itemHaveSub = $(this).parents('.nav-item')
		itemHaveSub.attr('submenu', 'true');
	})
}

function subMenu() {
	if ($(window).width() < 1025) {
		$('.nav-item').on('click', function() {
			$(this).toggleClass('show');
			$(this).find('.nav-sub').slideToggle();
		});
	}
}

// ACTIVE ITEM MENU BY URL
function activeMenuByUrl() {
	var url = window.location.href.split('/').pop();

	let listNavItem = $('.nav-list .nav-item a');
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
		$(this).toggleClass('active');
		$(this).siblings('.nav-list').toggleClass('active');
		$('body').toggleClass('disabled');
		$('.overlay').toggleClass('active');
	});

	$('.overlay').click(function(e) {
		e.preventDefault();
		$(this).removeClass('active');
		$('body').removeClass('disabled');
		$('.nav-list').removeClass('active');
		$('.toggle-menu-mobile').toggleClass('active');
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
	if ($('.content-about .desc').innerHeight() < 400) {
		$('.content-about .view-more').hide();
	};

	$('.content-about .view-more').click(function(e) {
		e.preventDefault();
		$(this).hide();
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

function sliderHomeProduct() {
	var sliderHomeProduct = new Swiper('.slider-HomeProduct .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 15,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		simulateTouch: false,
		navigation: {
			nextEl: '.slider-HomeProduct .swiper-button-next',
			prevEl: '.slider-HomeProduct .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2
			},
		},
	})
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
			768: {
				slidesPerView: 2
			},
			480: {
				slidesPerView: 1
			}
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
		loop: true,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.small-image .swiper-button-next',
			prevEl: '.small-image .swiper-button-prev',
		},
		breakpoints: {
			767: {
				direction: 'horizontal',
				slidesPerView: 3,
				spaceBetween: 10
			}
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
		navigation: {
			nextEl: '.small-image .swiper-button-next',
			prevEl: '.small-image .swiper-button-prev',
		}
	});
}

// SLIDER SAME PRODUCT
function sliderSameProduct() {
	var swpier = new Swiper('.slider-SameProduct .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 20,
		speed: 1000,
		simulateTouch: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 0,
			}
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
		speed: 50,
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

function ajaxFilerProduct() {
	$('.filter select').on('change', function() {
		const dataValue = $(this).val();
		$.ajax({
			type: "POST",
			url: "/get-product",
			data: {
				text: dataValue,
			},
			success: function(res) {
				$('.product-page .list-item').html(res)
			}
		});
	})
}

function slideFeelCustom() {
	const form = new Swiper('.landingFCustom__inner .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 20,
		speed: 1000,
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 0,
			}
		},
		navigation: {
			nextEl: '.landingFCustom__inner .swiper-button-next',
			prevEl: '.landingFCustom__inner .swiper-button-prev',
		},
	})
	const hha = new Swiper('.landingProject__inner .swiper-container', {
		slidesPerView: 3.5,
		centeredSlides: true,
		loop: true,
		cssMode: true,
		spaceBetween: 20,
		speed: 1000,
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 0,
			}
		},
		navigation: {
			nextEl: '.landingProject__inner .swiper-button-next',
			prevEl: '.landingProject__inner .swiper-button-prev',
		},
	})
}

function scrollToSection() {
	$('[data-scroll-to]').on('click', function(e) {
		e.preventDefault();
		const scrollToNumber = $(this).attr('data-scroll-to');
		$('html,body').animate({
				scrollTop: $(`[data-scroll-id="${scrollToNumber}"]`).offset().top -
					$('header').height(),
			},
			1200
		);
		$('header .nav-item').removeClass('active');
		$('#overlay').removeClass('active');
		$('body').removeClass('disabled');
	});

	const activeSectionWhenScroll = () => {
		$('[data-scroll-id]').each(function() {
			if (
				this.getBoundingClientRect().top < 2 * $('header').height() &&
				this.getBoundingClientRect().top > 0
			) {
				const toId = $(this).attr('data-scroll-id');
				$(`header [data-scroll-to]`).removeClass('active');
				$(`header [data-scroll-to="${toId}"]`).addClass('active');
				if (toId == '1') {
					sliderMenu().update();
				}
				sliderMenu().slideTo(Number(toId) - 1);
			}
		});
	};

	activeSectionWhenScroll();
	$(window).on('scroll', function() {
		activeSectionWhenScroll();
	});
};

function countDownSale() {
	// Set the date we're counting down to
	var temp = document.querySelector(".date-over p");
	if (temp) {
		var dateEND = new Date(temp.textContent).getTime();
		// Update the count down every 1 second
		var x = setInterval(function() {
			// Get today's date and time
			var now = new Date().getTime();
			// Find the distance between now and the count down date
			var distance = dateEND - now;
			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours =
				Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			// Display the result in the element
			try {
				document.getElementById("day").innerHTML = days;
				document.getElementById("hour").innerHTML = hours;
				document.getElementById("minute").innerHTML = minutes;
				document.getElementById("second").innerHTML = seconds;
				// If the count down is finished, write some text
				if (distance < 0) {}
			} catch (error) {}
		}, 1000);
	}
}
const talkingNews = () => {
	const form = new Swiper('.landingNews__inner .swiper-container', {
		spaceBetween: 20,
		speed: 1000,
		slidesPerView: 3,
		breakpoints: {
			1025: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 2
			},
			480: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		},
		navigation: {
			nextEl: '.landingNews__inner .swiper-button-next',
			prevEl: '.landingNews__inner .swiper-button-prev',
		},
	})
}
$(document).ready(function() {
	// GOOGLE MAP
	GGMapInit();
	Loading();
	// WOW
	new WOW().init();
	// TYPE-IT
	typeIt();
	// Object Images
	objectFitImages("img.ofc");
	// CHECK LAYOUT
	checkLayout();
	// MENU
	showMenuMobile();
	checkMenuHaveSub();
	activeMenuByUrl();
	activeHeader();
	subMenu();
	// YOUTUBE
	_getThumbnailYoutube();
	// BACK TO TOP
	showBackToTop();
	// ABOUT
	showMoreContentAbout();
	scrollToSologan();
	// SLIDER
	sliderHomeBanner();
	sliderHomeProduct();
	sliderAchievement();
	sliderProcutDetail();
	sliderSameProduct();
	slideFeelCustom();
	scrollToSection();
	countDownSale();
	talkingNews();
	// TAB
	const tabGoogleMap = new Tab('.google-map .tab-container');
	const tabProductDetail = new Tab('.tab-information .tab-container');
	// AJAX
	// ajaxFilerProduct();
})