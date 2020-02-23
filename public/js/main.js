$(document).ready(function() {

  // Custom Dropdown Menu
  $('.mj-dropdown').click(function() {
    $('.mj-dropdown-menu').toggleClass('active')
  })

  // Navbar Toggle on Mobile
  $('.navbar-toggler').click(function() {
    $('#collapsibleNavbar').addClass('active')
    $('#main-modal').fadeIn(400)
  })
  $('#main-modal').click(function() {
    $('#collapsibleNavbar').removeClass('active')
    $(this).fadeOut(400)
  })

  // Add active class to top navigation on refresh
  var winTop = $(window).scrollTop()
  if (winTop > 37) {
    $('.navbar-wrapper').addClass('active')
  } else {
    $('.navbar-wrapper').removeClass('active')
  }

  // Top navigation on scroll
  $(window).scroll(function () {
    var winTop = $(window).scrollTop()
    if (winTop > 37) {
      $('.navbar-wrapper').addClass('active')
    } else {
      $('.navbar-wrapper').removeClass('active')
    }
  })

  // Show dropdown on hover
  $('ul.navbar-nav li.dropdown').mouseenter(function() {
    $('ul.navbar-nav li.dropdown').find('.dropdown-menu').removeClass('hide')
    $('ul.navbar-nav li.dropdown').find('.dropdown-menu').css('display', 'none')
    $(this).find('.dropdown-menu').fadeIn(200)
  })
  $('ul.navbar-nav li.dropdown').mouseleave(function() {
    $(this).find('.dropdown-menu').addClass('hide').fadeOut(200)
  })

  // Toggle admin panel submenus
  $('.sidebar-wrapper .nav-item .has-submenu').click(function(e) {
      e.preventDefault()
      $(this).next().slideToggle(400)
      $(this).toggleClass('change-icon')
  })

  // Toggle admin and marketer sidenav in tablet and mobile
  $('.admin-marketer-header .feather-menu').click(function() {
      $('.sidebar-wrapper').toggleClass('active')
  })

  $('.sidebar-wrapper .nav-item .menu-item').click(function() {
      $('.sidebar-wrapper').removeClass('active')
      $('.sidebar-wrapper .nav-item .menu-content').slideUp(400)
      $('.sidebar-wrapper .nav-item .has-submenu').removeClass('change-icon')
  })

  // Accordion Slide Toggle
  $('.accordion-header').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).next().slideUp(400)
      $(this).removeClass('active')
    } else {
      $('.accordion-body').slideUp(400)
      $('.accordion-header').removeClass('active')
      $(this).next().slideDown(400)
      $(this).addClass('active')
    }
  })
})

function calendar(e,year=0,month=0) {
  //console.log(this.data("day"));
  let calendar = e.parentElement.parentElement
  $.ajax('/api/persian-calendar', {
    type: 'POST',  // http method
    data: { "year": year,"month":month },  // data to submit
    success: function (data, status, xhr) {
      //$('#calendar').html('status: ' + status + ', data: ' + data);
      calendar.innerHTML = data
    },
    error: function (jqXhr, textStatus, errorMessage) {
      calendar.innerHTML = errorMessage
    }
  });
}

function select_cal(e)
{
    let calendar = e.parentElement.parentElement.parentElement
    let date = calendar.previousElementSibling

    date.value = e.dataset.year + '-' + e.dataset.month + '-' + e.dataset.day
    $(".date-cell").removeClass("active")
    $(e).find("span").addClass("active")
    calendar.classList.remove('active')
}
