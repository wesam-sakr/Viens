$(document).ready(function () {
  // loading
  setTimeout(function () {
    $("#loading").fadeOut();
  }, 3000);

  // replace text
  $.fn.toggleText = function (t1, t2) {
    if (this.text() == t1) {
      this.text(t2);
    } else {
      this.text(t1);
    }
    return this;
  };

  // toggle nav by clicking menu btn
  $('.navbar-toggler').click(function () {
    $('.nav-collapse').toggle(500);
    $('body').toggleClass('nav-open')
  })

  // toggle theme
  $('.theme').click(function () {
    $('.theme .bi').toggleClass('bi-brightness-alt-high-fill bi-cloud-moon')
  })

  // add edu-programs to save
  $('.save').click(function () {
    $(this).find('i').toggleClass('fa-regular fa-solid')
  })

  // select edu-programs 
  if ($('.edu-display').length > 0) {
    const items = document.querySelectorAll('.edu-display button');
    document.querySelector('.edu-display').addEventListener(
      'click',
      ({ target }) => {
        for (const item of items) item.classList.toggle('active', target === item);
        if ($('.edu-display button.fa-list-ul').hasClass('active')) {
          $('.edu-programs').addClass('single')
        }
        else {
          $('.edu-programs').removeClass('single')
        }
      }
    );
  }


  // Get all sections that have an ID defined
  const sections = document.querySelectorAll(".edu-content div[id]");

  // Add an event listener listening for scroll
  window.addEventListener("scroll", navHighlighter);

  function navHighlighter() {

    // Get current scroll position
    let scrollY = window.scrollY;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      sectionId = current.getAttribute("id");

      /*
      - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
      - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
      */
      if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        document.querySelector(".edu-nav a[href*=" + sectionId + "]").classList.add("active");
      } else {
        document.querySelector(".edu-nav a[href*=" + sectionId + "]").classList.remove("active");
      }
    });
  }

  // var offsetTop = $('.edu-content').offset().top;
  // var offsetbottom = ($(window).height() + $('.edu-content').height()) - ($('.edu-nav').height()/3);
  // $(window).scroll(function() {
  //   if($(this).scrollTop() >= offsetTop  && $(this).scrollTop() <= offsetbottom) {
  //   $('.edu-nav').addClass('isFixed');
  //   } else {
  //     $('.edu-nav').removeClass('isFixed');
  //   }
  // });

  if ($('.edu-content').length > 0) {
    var offsetTop = $('.edu-content').offset().top;
    $(window).scroll(function () {
      if ($(this).scrollTop() >= offsetTop) {
        $('.edu-nav').addClass('isFixed');
        // $('html').addClass('whiteSpace');
      } else {
        $('.edu-nav').removeClass('isFixed');
        // $('html').removeClass('whiteSpace');
      }
    });
  }


  // change dir
  var bodyDir = $('body').css('direction')
  console.log(bodyDir)
  var dir
  if (bodyDir == "rtl") {
    dir = true
  }
  else {
    dir = false
  }

  // verify code
  const inputElements = [...document.querySelectorAll('input.code')]
  inputElements.forEach((ele, index) => {
    ele.addEventListener('keydown', (e) => {
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. Then the event happens
      // which will clear the "before" input box.
      if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
    })
    ele.addEventListener('input', (e) => {
      inputElements[index].focus()
      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first, ...rest] = e.target.value
      e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index === inputElements.length - 1
      const didInsertContent = first !== undefined
      if (didInsertContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index + 1].focus()
        inputElements[index + 1].value = rest.join('')
        inputElements[index + 1].dispatchEvent(new Event('input'))
      }
    })
  })

  // header vedio
  $(".play-icon").click(function () {
    document.querySelector(".header-video video").play();
    $(this).addClass("d-none");
    $(".pause-icon").removeClass("d-none");
    $('#audio').fadeToggle(200)
    $('.video-cover-img').fadeOut(2000);
  })
  $(".pause-icon").click(function () {
    document.querySelector(".header-video video").pause();
    $(this).addClass("d-none");
    $('#audio').fadeToggle(200)
    $(".play-icon").removeClass("d-none");
    $('.video-cover-img').fadeIn(2000);
  })
  $("#audio").click(function () {
    $('#audio .bi').toggleClass('bi-volume-up bi-volume-mute')
    if ($(".header-video video").prop('muted') == true) {
      $(".header-video video").prop('muted', false);
    }

    else {
      $(".header-video video").prop('muted', true);
    }
  })
  $('video').on('ended', function () {
    $('.video-cover-img').fadeIn(2000);
    $('#audio').fadeToggle(200)
    $('.pause-icon').addClass("d-none");
    $(".play-icon").removeClass("d-none");
  });

  // follow 
  $(".follow").click(function () {
    $(this).toggleClass("unfollow");
    $(this).find('span').toggleText('متابعة', 'الغاء المتابعة');
    $(".follow i").toggleClass('fa-thumbs-up fa-thumbs-down');
    console.log(this)
  })

  // toggle fav item
  $(".fav").click(function () {
    $(this).toggleClass("added");
    $(this).toggleClass("fa-regular fa-solid");
    console.log(this)
  })

  // make img circle 
  var authWidth = $('.circle-cover').width();
  $('.circle-cover').height(authWidth)
  // -- responsive --
  $(window).resize(function () {
    var authWidth = $('.circle-cover').width();
    $('.circle-cover').height(authWidth)
  })

  // container-fluid-gap
  var container = document.querySelector('.container-fluid')
  var containerWidth = container.offsetWidth;
  var screenWidth = $(window).width();
  let containerGap = (screenWidth - containerWidth) / 2
  if ($(window).width() > 991.8){
    $('.container-fluid-gap').css({
      'padding-left': 16 + containerGap
    })
  }
  else{
    $('.container-fluid-gap').css({
      'padding-left': 16 + containerGap ,
      'padding-right': 16 + containerGap
    })
  }

  // center play video icon 
  var shapeWidth = $('.header-shape').width();
  var shapeHeight = $('.header-shape').height()
  $('.header-wrapper .play-icon').css({
    right: shapeWidth,
    top: shapeHeight / 2
  })
  $('.header-wrapper .pause-icon').css({
    right: shapeWidth,
    top: shapeHeight / 2
  })

  // -- responsive --
  $(window).resize(function () {
    var shapeWidth = $('.header-shape').width();
    $('.play-icon').css({
      right: shapeWidth,
      top: shapeHeight / 2
    })
    $('.pause-icon').css({
      right: shapeWidth,
      top: shapeHeight / 2
    })
  })

  // change profile pic
  if ($(".profile").length > 0) {
    const imgDiv = document.querySelector('.profile-pic');
    const img = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadBtn = document.querySelector('#uploadBtn');
    //if user hover on img div
    imgDiv.addEventListener('mouseenter', function () {
      uploadBtn.style.display = "block";
    });
    //if we hover out from img div
    imgDiv.addEventListener('mouseleave', function () {
      uploadBtn.style.display = "none";
    });
    //when we choose a pic to upload
    file.addEventListener('change', function () {
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
          img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
      }
    });
  }

  // apply job upload cv
  $('.file-input').change(function () {
    const fileInput = $(this).find('[type="file"]')[0];
    const label = $(this).find('[data-js-label]')[0];
    console.log($(fileInput).val());
    if (!$(fileInput).val()) return
    var value = $(fileInput).val().replace(/^.*[\\\/]/, '')
    $(label).html(value)
  })

  // textarea
  var $txtArea = $('textarea');
  $txtArea.on('keyup', countChar);
  function countChar() {
    var id = $(this).attr("id");
    var chars = $(this).next("span");
    var textMax = $(this).attr('maxlength');
    var textLength = $(this).val().length;
    var textRemaining = textLength;
    chars.html(textMax + ' /' + textRemaining);
  };

  // show pass
  $(".show-pass").click(function () {
    $(this).find('i').toggleClass("bi-eye-slash bi-eye");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
    $(this).toggleClass('active');
  });

  // wizard
  // Checking button status ( wether or not next/previous and
  // submit should be displayed )
  const checkButtons = (activeStep, stepsCount) => {
    const prevBtn = $("#wizard-prev");
    const nextBtn = $("#wizard-next");
    const submBtn = $("#wizard-subm");

    switch (activeStep / stepsCount) {
      case 0: // First Step
        prevBtn.hide();
        submBtn.hide();
        nextBtn.show();
        break;
      case 1: // Last Step
        nextBtn.hide();
        prevBtn.show();
        submBtn.show();
        break;
      default:
        submBtn.hide();
        prevBtn.show();
        nextBtn.show();
    }
  };

  // Scrolling the form to the middle of the screen if the form
  // is taller than the viewHeight
  const scrollWindow = (activeStepHeight, viewHeight) => {
    if (viewHeight < activeStepHeight) {
      $(window).scrollTop($(steps[activeStep]).offset().top - viewHeight / 2);
    }
  };

  // Setting the wizard body height, this is needed because
  // the steps inside of the body have position: absolute
  const setWizardHeight = activeStepHeight => {
    $(".wizard-body").height(activeStepHeight);
  };

  $(function () {
    // Form step counter (little cirecles at the top of the form)
    const wizardSteps = $(".wizard-header .wizard-step");
    // Form steps (actual steps)
    const steps = $(".wizard-body .step");
    // Number of steps (counting from 0)
    const stepsCount = steps.length - 1;
    // Screen Height
    const viewHeight = $(window).height();
    // Current step being shown (counting from 0)
    let activeStep = 0;
    // Height of the current step
    let activeStepHeight = $(steps[activeStep]).height();

    checkButtons(activeStep, stepsCount);
    setWizardHeight(activeStepHeight);

    // Resizing wizard body when the viewport changes
    $(window).resize(function () {
      setWizardHeight($(steps[activeStep]).height());
    });

    // Previous button handler
    $("#wizard-prev").click(() => {
      // Sliding out current step
      $(steps[activeStep]).removeClass("active");
      $(wizardSteps[activeStep]).removeClass("active");

      activeStep--;

      // Sliding in previous Step
      $(steps[activeStep]).removeClass("off").addClass("active");
      $(wizardSteps[activeStep]).addClass("active");

      activeStepHeight = $(steps[activeStep]).height();
      setWizardHeight(activeStepHeight);
      checkButtons(activeStep, stepsCount);
    });

    // Next button handler
    $("#wizard-next").click(() => {
      // Sliding out current step
      $(steps[activeStep]).removeClass("inital").addClass("off").removeClass("active");
      $(wizardSteps[activeStep]).removeClass("active");

      // Next step
      activeStep++;

      // Sliding in next step
      $(steps[activeStep]).addClass("active");
      $(wizardSteps[activeStep]).addClass("active");

      activeStepHeight = $(steps[activeStep]).height();
      setWizardHeight(activeStepHeight);
      checkButtons(activeStep, stepsCount);
    });
  });


  // owl-carousel
  $('.partners-slider .owl-carousel').owlCarousel({
    loop: false,
    margin: 20,
    responsiveClass: true,
    rtl: dir,
    autoplay: true,
    autoplayTimeout: 20000,
    responsive: {
      0: {
        items: 2,
        nav: false
      },
      600: {
        items: 4,
        nav: false
      },
      1000: {
        items: 6,
        nav: false,
      }
    }
  });
  $('.grid-books .owl-carousel').owlCarousel({
    loop: false,
    nav: true,
    margin: 20,
    responsiveClass: true,
    rtl: dir,
    autoplay: true,
    autoplayTimeout: 20000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      }
    }
  });
  $(".single_book_single .owl-carousel").owlCarousel({
    items: 2,
    rtl: dir,
    loop: true,
    margin: 15,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      520: {
        items: 1,
      },
      750: {
        items: 1,
      },
      992: {
        items: 1,
      },

    },
  });
  $(".most_recent .owl-carousel").owlCarousel({
    items: 2,
    rtl: dir,
    loop: true,
    margin: 15,
    nav: false,
    responsive: {
      0: {
        items: 1.5,
      },
      520: {
        items: 2,
      },
      750: {
        items: 2.5,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4.5,

      }
    },
  });

  // rateyo
  $(function () {
    $(".your-comment #rateYo").rateYo({
      starWidth: "20px",
      ratedFill: "#FFD500",
      normalFill: "#A7A7A7",
      rtl: dir,
      halfStar: false,
      starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>'
    });
  });

  // niceSelect
  // $('select').niceSelect();

  // wow.js init
  new WOW().init();
})