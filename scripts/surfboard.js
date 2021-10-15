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

const slider=$('.products').bxSlider({
  pager: false,
  controls: false
});

$('.slider__side--right').click(e=>{
  e.preventDefault();
  slider.goToPrevSlide();
});
$('.slider__side--left').click(e=>{
  e.preventDefault();
  slider.goToNextSlide();
});

/////////////////////
//button

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// const myDropdownButton=document.querySelector("#myDropdBtn")

window.onclick = function (event) {
  if (!event.target.matches('.menu__dropdBtn')) {

    var dropdowns = document.getElementsByClassName("menu__dropdown_list");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

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
    const request=$.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      //success
      error: data=>{

      }
    });
    request.done(data=>{
      content.text(data.message);
    
    });

    request.fail(data=>{
      const message=data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });

    request.always(()=>{
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