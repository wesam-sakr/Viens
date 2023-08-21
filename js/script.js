// replace text
$.fn.toggleText = function(t1, t2){
  if(this.text() == t1){
    this.text(t2);
  }else{                   
    this.text(t1);
  }
  return this;
};

// var toggler = document.querySelector('.navbar-toggler')
$('.navbar-toggler').click(function(){
  $('.nav-collapse').toggle(500);
  $('body').toggleClass('nav-open')
})


// dir
var bodyDir = $('body').css('direction')
console.log(bodyDir)
var dir
if(bodyDir == "rtl"){
  dir= true
}
else{
  dir = false
}

$(document).ready(function () {
  // loading
  setTimeout(function () {
    $("#loading").fadeOut();
  }, 3000);

  const inputElements = [...document.querySelectorAll('input.code')]

  inputElements.forEach((ele,index)=>{
    ele.addEventListener('keydown',(e)=>{
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. Then the event happens
      // which will clear the "before" input box.
      if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
    })
    ele.addEventListener('input',(e)=>{
        inputElements[index].focus()
      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first,...rest] = e.target.value
      e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index===inputElements.length-1
      const didInsertContent = first!==undefined
      if(didInsertContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index+1].focus()
        inputElements[index+1].value = rest.join('')
        inputElements[index+1].dispatchEvent(new Event('input'))
      }
    })
  })


  // header vedio
  $(".play-icon").click(function(){
    document.querySelector(".header-video video").play();
    $(this).addClass("d-none");
    $(".pause-icon").removeClass("d-none");
    $('.video-cover-img').fadeOut(2000);
  })
  $(".pause-icon").click(function(){
    document.querySelector(".header-video video").pause();
    $(this).addClass("d-none");
    $(".play-icon").removeClass("d-none");
    $('.video-cover-img').fadeIn(2000);
  })
  $('video').on('ended',function(){ 
    $('.video-cover-img').fadeIn(2000);
    $('.pause-icon').addClass("d-none");
    $(".play-icon").removeClass("d-none");
  });

  // owl-carousel
  $('.partners-slider .owl-carousel').owlCarousel({
    loop:false,
    margin:20,
    responsiveClass:true,
    rtl: dir,
    autoplay:true,
    autoplayTimeout:20000,
    responsive:{
        0:{
            items:2,
            nav:false
        },
        600:{
            items:4,
            nav:false
        },
        1000:{
            items:6,
            nav:false,
        }
    }
  });
  $('.grid-books .owl-carousel').owlCarousel({
    loop:false,
    nav: true,
    margin:20,
    responsiveClass:true,
    rtl: dir,
    autoplay:true,
    autoplayTimeout:20000,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000:{
            items:3,
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
      1200:{
        items: 4,
      },
      1400:{
        items: 4.5,

      }
    },
  });

  // home counter
  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 1500,
        easing: 'linear',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
  });

  // rateyo
  $(function () {
    $(".your-comment #rateYo").rateYo({
      starWidth: "20px",
      ratedFill: "#FFD500",
      normalFill: "#A7A7A7",
      rtl: dir,
      halfStar: false,
      starSvg:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>'
    });
  });

  // apply job upload cv
  $('#file-input').change(function(){
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
      var id =$(this).attr("id") ;
      var chars = $(this).next("span");
      var textMax = $(this).attr('maxlength');
      var textLength = $(this).val().length;
      var textRemaining = textLength;
      chars.html(textMax + ' /' + textRemaining);
    };

  // toggle fav item
  $(".fav").click(function () {
    $(this).toggleClass("added");
    $(this).toggleClass("fa-regular fa-solid");
    console.log(this)
  })
$(".show-pass").click(function () {
  $(this).find('i').toggleClass("fa-eye-slash fa-eye");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
      input.attr("type", "text");
  } else {
      input.attr("type", "password");
  }
  $(this).toggleClass('active');
});
  })

  // follow 
  $(".follow").click(function () {
    $(this).toggleClass("unfollow");
    $(this).find('span').toggleText('متابعة','الغاء المتابعة');
    console.log(this)
  })

  // make auth-img circle 
  var authWidth = $('.author-cover').width();
  $('.author-cover').height(authWidth)
  // -- responsive --
  $(window).resize(function(){
    var authWidth = $('.author-cover').width();
  $('.author-cover').height(authWidth)
  })

  if ($(".profile").length > 0) {
    const imgDiv = document.querySelector('.profile-pic');
    const img = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadBtn = document.querySelector('#uploadBtn');
    //if user hover on img div
    imgDiv.addEventListener('mouseenter', function(){
        uploadBtn.style.display = "block";
    });
    //if we hover out from img div
    imgDiv.addEventListener('mouseleave', function(){
        uploadBtn.style.display = "none";
    });
    //when we choose a pic to upload
    file.addEventListener('change', function(){
    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    }
    });
}

  // niceSelect
  $('select').niceSelect();

/**

*Exampe from https://kottenator.github.io/jquery-circle-progress/
*/
function scrollAction() {
  // Get the current scroll position
  var scrollPosition = window.pageYOffset;

  // Check if the scroll position is greater than or equal to 500px
  if (scrollPosition >= 500) {
    // Perform your desired action here
    var progressBarOptions = {
      startAngle: -1.55,
      size: 110,
      thickness:2,
        
        fill: {
        color: '#fff'
      }
    }
    
    $('.circle').circleProgress(progressBarOptions).on('circle-animation-progress');
    $('#circle-a').circleProgress({
      value : 800,
    }).on('circle-animation-progress', function(event, progress,stepValue) {
      $(this).find('strong').html(Math.round( stepValue));
    });
    $('#circle-b').circleProgress({
      value : 500,
    }).on('circle-animation-progress', function(event, progress,stepValue) {
      $(this).find('strong').html(Math.round( stepValue));
    });
   
    $('#circle-c').circleProgress({
      value : 80,
    }).on('circle-animation-progress', function(event, progress,stepValue) {
      $(this).find('strong').html(Math.round( stepValue));
    });
   
    $('#circle-d').circleProgress({
      value : 55,
    }).on('circle-animation-progress', function(event, progress,stepValue) {
      $(this).find('strong').html(Math.round( stepValue));
    });
   
   
  }
}



  // wow.js init
  new WOW().init();



