///////////////////////////////////////////////////////////////////////////////
//section team///
// const btnTeam=document.querySelectorAll('.member__name');

// btnTeam.forEach(item =>{
//   item.addEventListener('click', e =>{
//     const parentEl=e.target.parentElement.parentElement;
//     const desc=parentEl.querySelector('.member__desc');
//     const triangle=parentEl.querySelector('.member__name__triangle');

//     if(triangle.classList.contains('member__name__triangle_rotated')) {
//       triangle.classList.remove('member__name__triangle_rotated');
//     }else {
//       triangle.classList.add('member__name__triangle_rotated');
//     }

//     if(desc.classList.contains('member__desc__visible')) {
//       desc.classList.remove('member__desc__visible');
//     }else {
//       desc.classList.add('member__desc__visible');
//     }
//   });
// });

/////////////

const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$(".team__title").click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team");
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});

// ////////////////////////////////////////////////////////////////////////
// //section products//

const slider = $('.products').bxSlider({
  pager: false,
  controls: false
});

$('.slider__side--right').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});
$('.slider__side--left').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});

/////////////////////
//button

$(".menu__dropdBtn").click (e=>{
  $(".menu__dropdown_list").slideToggle(300);
});

// $(document).ready(function(){
//     $('a').on('click', function(e){
//       e.preventDefault();
//     });
       
//     $('#ddmenu li').hover(function () {
//        clearTimeout($.data(this,'timer'));
//        $('ul',this).stop(true,true).slideDown(200);
//     }, function () {
//       $.data(this,'timer', setTimeout($.proxy(function() {
//         $('ul',this).stop(true,true).slideUp(200);
//       }, this), 100));
//     });
   
//   });
  



// const openButtonMennu = document.querySelector('#myDropdBtn');

// openButtonMennu.addEventListener("click", e => {

// });

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // const myDropdownButton=document.querySelector("#myDropdBtn")

// window.onclick = function (event) {
//   if (!event.target.matches('.menu__dropdBtn')) {

//     var dropdowns = document.getElementsByClassName("menu__dropdown_list");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

/////////////////////////////////////////////////////////////
//section hero - menu overlay

const openButton = document.querySelector("#openMenu")
const menu = document.querySelector("#menu")

openButton.addEventListener("click", e => {
  menu.classList.toggle("overlay");

  const closeButton = document.querySelector("#close")

  closeButton.addEventListener("click", e => {
    menu.classList.toggle("overlay");
  });
});

////////////////////////////////////////////////////
//section reviwes//
const findBlock = alias => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") == alias
  });
};

$(".reviews__switcher__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlock(target);
  const curItem = $this.closest(".reviews__switcher-item");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});

////////////////////////////////
////section order
const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach(field => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}


$(".form").submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      //success
      error: data => {

      }
    });
    request.done(data => {
      content.text(data.message);

    });

    request.fail(data => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline"
      });
    });
  }
});

$(".app-close-modal").click(e => {
  e.preventDefault();

  $.fancybox.close();
});

//////////////////////////////////////////////////////////////////////////////////////////
///product--menu--section
const mesureWidth = item => {
  let reqitemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".product--menu");
  const titleBlock = container.find(".product--menu__title");
  const titleWidth = titleBlock.width() * titleBlock.length;

  const textContainer = item.find(".product--menu__conrainer");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddinRright = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqitemWidth = screenWidth - titleWidth;
  } else {
    reqitemWidth = 524;
  }

  return {
    container: reqitemWidth,
    textContainer: reqitemWidth - paddinRright - paddingLeft,
  }
}

const closeEveryItemInContainer = container => {
  const items = container.find(".product--menu__item");
  const contentMenu = container.find(".product--menu__content");

  items.removeClass("active");
  contentMenu.width(0);
}

const openItemProductMenu = item => {
  const hiddenContent = item.find(".product--menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".product--menu__conrainer");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".product--menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".product--menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".product--menu");

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openItemProductMenu(item);
  }
});

////////////////////////////////////////////////////////////////////////
//////map--section

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11,
    // controls: []
  });

  // const coords =[
  //   [59.94554327989287, 30.38935262114668],
  // ];

  // const myCollection=new ymaps.GeoObjectCollection({},{
  //   draggable: false,
  //   iconLayout: 'default#image',
  //   iconImageHref: '../img/icon/marker.png',
  //   iconImageSize: [76, 95],
  //   iconImageoffset: [-35, 52]
  // });

  // coords.forEach(coord=>{
  //   myCollection.add(new ymaps.Placemark(coord));
  // });

  // myMap.geoObjects.add(myCollection);

  // myMap.behaviors.disable('scrollZoom');
};


ymaps.ready(init);

//////////////////////////////////////
///////wrapper///maincontent///

const sections = $("section");
const display = $(".maincontent");
const sideMenus = $(".fixed-menu");
const menuItems = sideMenus.find(".fixed-menu__item");

const mobileDetect = new mobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const positions = sectionEq * -100;

  if (isNaN(positions)) {
    console.error("Передано не верное значение в countSectionPosition");
    return 0;
  }
  return positions;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowd";

  if (menuTheme === "black") {
    sideMenus.addClass(activeClass);
  } else {
    sideMenus.removeClass("fixed-menu--shadowd");
  }
};

const resetActiveClassForItem = (item, itemEq, activeClass) => {
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq)

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: 'translateY($[position]%)'
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);
}

const viewortScroller = () => {
  const activeSection = sections.filter("active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (nextSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewortScroller();

  if (deltaY > 0) {
    //next
    scroller.next();
  }

  if (deltaY < 0) {
    //prey
    scroller.prev();
  }
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName == "textarea";
  const scroller = viewortScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38: //prev
      scroller.prev();
      break;

    case 40:
      scroller.next();
      break; //next 
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

////////////////////////////////////////////////////////////////////
///Link///

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const targets = $this.attr("data-scroll-to");
  const reqSection = $('[data-section-id=${target}]');

  performTransition(reqSection.index());
})

//////////////////////////////////////////////////////////////////
///touch swipe///
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin


if (isMobile) {
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewortScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    }
  });
}

///////////////////////////////////////////////////
//////player-section

let player;
const playerContainer = $(".player");

let eventInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      player.pauseVideo();
    } else {
      playerContainer.addClass("paused");
      player.playVideo();
    }
  });
}


// let player;
function onYouTubeIframeAPIReady() {
  let player = new YT.Player('yt-player', {
    height: '392',
    width: '662',
    videoId: 'W7h-Yho8EB0',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventInit();