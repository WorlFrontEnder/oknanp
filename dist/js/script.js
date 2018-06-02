$(document).ready(function() {
 
 // карусель
 $('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    items:2, 
    dots:false,
	navText: ['',''],
	responsive:{
        0:{
            items:1,
            nav:true
        },
        1245:{
            items:2,
        }
	}
});
 
/*$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});*/

}); /* End js code */