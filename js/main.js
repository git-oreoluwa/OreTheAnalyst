
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar-menu');
    var header = document.querySelector('.header_area');
    if (sidebar.style.left === "0px") {
      sidebar.style.left = "-250px";
      sidebar.classList.remove("fixed-sidebar"); // Remove fixed class when collapsing
    } else {
      sidebar.style.left = "0px";
      sidebar.classList.add("fixed-sidebar"); // Add fixed class when expanding
    }
    // Toggle the "navbar_fixed" class only when needed
    if (sidebar.style.left === "-250px" || window.innerWidth > 991) {
      header.classList.toggle("navbar_fixed");
    }
  }

  $(document).ready(function() {
    $('#main-nav a').click(function() {
      $('#main-nav a').removeClass('active');
      $(this).addClass('active');
    });

    // Attach the toggleSidebar function to the navbar-toggler button
    $(".navbar-toggler").click(function() {
      toggleSidebar();
    });
  });

 $(window).scroll(function() {
  var scroll = $(window).scrollTop();
  var sidebar = document.querySelector('.sidebar-menu');
  var navbarToggler = document.querySelector('.navbar-toggler');

  // Check conditions to toggle the "navbar_fixed" class
  if (
    ((sidebar.style.left === "-250px" || window.innerWidth > 991) ||
      navbarToggler.getAttribute('aria-expanded') === "false") &&
    scroll >= 50
  ) {
    $(".header_area").addClass("navbar_fixed");
  } else {
    $(".header_area").removeClass("navbar_fixed");
  }
});



  // Handle window resize events
  $(window).resize(function() {
    var sidebar = document.querySelector('.sidebar-menu');
    var header = document.querySelector('.header_area');
    // Check conditions to toggle the "navbar_fixed" class on window resize
    if ((sidebar.style.left === "-250px" || window.innerWidth > 991) && $(window).scrollTop() >= 50) {
      header.classList.add("navbar_fixed");
    } else {
      header.classList.remove("navbar_fixed");
    }
  });



     $(document).ready(function() {
       $('#main-nav a').click(function() {
         $('#main-nav a').removeClass('active');
         $(this).addClass('active');
       });
     });


  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  
  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

let navbarlinks = document.querySelectorAll('.nav-link');

// Function to add active class to navbar links
const navbarlinksActive = () => {
  let position = window.scrollY + 200;
  navbarlinks.forEach(navbarlink => {
    let section = document.querySelector(navbarlink.getAttribute('href'));
    if (!section) return;
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navbarlink.classList.add('active');
    } else {
      navbarlink.classList.remove('active');
    }
  });
};

// Add event listeners for scroll and click
window.addEventListener('load', navbarlinksActive);
window.addEventListener('scroll', navbarlinksActive);
navbarlinks.forEach(navbarlink => {
  navbarlink.addEventListener('click', navbarlinksActive);
});


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

 
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });



})()