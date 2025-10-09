$(document).ready(function(){
    // Sticky navbar & scroll-up button
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Typing effect
    var typed = new Typed(".typing", {
        strings: ["Backend Developer", "Frontend Developer", "Full-stack Developer", "Mobile App Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Owl carousel for teams section
    var owl = $('.carousel');
    owl.owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    // Stop autoplay
    function pauseAutoplay() {
        owl.trigger('stop.owl.autoplay'); // Stop the carousel's autoplay
    }

    // Restart autoplay
    function resumeAutoplay() {
        autoplayTimeout = setTimeout(function() {
            owl.trigger('play.owl.autoplay', [2000]);
        }, 5000);
    }

    // Custom carousel navigation buttons
    $('.carousel-next').click(function(){
        pauseAutoplay();
        owl.trigger('next.owl.carousel');
        resumeAutoplay();
    });
    $('.carousel-prev').click(function(){
        pauseAutoplay();
        owl.trigger('prev.owl.carousel');
        resumeAutoplay();
    });
});

// Dark mode toggle
$('#dark-mode-toggle').click(function(event) {
    event.preventDefault(); 
    $('body').toggleClass('dark-mode');

    if ($('body').hasClass('dark-mode')) {
        $('#dark-mode-toggle img').attr('src', 'images/moon.svg');
    } else {
        $('#dark-mode-toggle img').attr('src', 'images/sun.svg');
    }
});
