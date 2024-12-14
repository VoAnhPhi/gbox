window.addEventListener("load", function () {
  document.querySelector(".loading").style.transition = "opacity 2s";
  document.querySelector(".loading").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
  let header = document.querySelector("header");
  let menuPc = document.querySelector(".menu");
  // BacktoTop
  window.addEventListener("scroll", function () {
    const scrollTop = document.documentElement.scrollTop;
    const backToTopImg = document.querySelector(".backtoTop_img");
    const menuFixed = document.querySelector(".menuFixed");

    backToTopImg && backToTopImg.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // menuFix
    if (scrollTop > header.offsetHeight + menuPc.offsetHeight) {
      menuFixed.style.display = "block";
      menuFixed.style.transition = "opacity 0.3s";
      menuFixed.style.opacity = "1";
    } else {
      menuFixed.style.opacity = "0";
      setTimeout(() => (menuFixed.style.display = "none"), 200);
    }
  });

  // slider gallery
  let $carousel = $(".gallery .gallery__wrap");
  $carousel.flickity({
    cellAlign: "left",
    prevNextButtons: false,
    contain: true,
    wrapAround: true,
    pageDots: false,
  });

  // prev
  $(".gallery .gallery__arrow .btn-prev").on("click", function () {
    $carousel.flickity("previous");
  });
  $(".gallery .gallery__arrow .btn-next").on("click", function () {
    $carousel.flickity("next");
  });

  // slider studio detail
  let $carousel2 = $(".studioDetail .studioDetail__slide");
  $carousel2.flickity({
    cellAlign: "left",
    prevNextButtons: false,
    contain: true,
    wrapAround: true,
    autoPlay: true,
    pageDots: false,
    on: {
      change: function (index) {
        let number = $(".studioDetail__detail .number .number_d");
        let indexPage = index + 1;
        number.text(indexPage.toString().padStart(2, 0));


        $('.floorplan').attr('href', 'img/StudioDetail/img-' + indexPage + '.jpg');
      },
    },
  });

  // prev
  $(".studioDetail__detail .arrow .btn-prev").on("click", function () {
    $carousel2.flickity("previous");
  });
  $(".studioDetail__detail .arrow .btn-next").on("click", function () {
    $carousel2.flickity("next");
  });

  // fullscreen project-detail
  $(".detail .fullscreen").on("click", function () {
    $(".popupImg").addClass("active-popupImg");
  });
  $(".popupImg .close").on("click", function () {
    $(".popupImg").removeClass("active-popupImg");
  });

  // hamburger
  let btn = $("header .container .hamburger");
  btn.on("click", function () {
    $(".menuMobile").toggleClass("active");
  });

  // hambuger
  const menuBtn = $(".hamburger");
  menuBtn.on("click", () => {
    menuBtn.toggleClass("open");
  });

  // all more
  var more = $(".allwork .allwork__more a");
  more.on("click", function (e) {
    e.preventDefault();
    more.css("display", "none");
    $(".imgMore").addClass("active");
  });

  // hover menu mb
  let li_hover = $(".menuMobile ul li");
  li_hover.hover(function () {
    li_hover.addClass("li_active");
    $(this).removeClass("li_active");
  });

  // tab project in home
  let tab = $(".project .project__tab ul li");
  let project = $(".project .project__wrap");
  tab.on("click", function (e) {
    e.preventDefault();
    tab.removeClass("active");
    $(this).addClass("active");

    let index = $(this).index();
    // console.log(index);
    project.removeClass("active");
    $(project[index]).addClass("active");
  });

  AOS.init({
    duration: 1200,
  });

  // contact
  $("footer .right .submit button").on("click", function (e) {
    e.preventDefault();

    let name = $("footer .name input").val();
    let phone = $("footer .phone input").val();
    let email = $("footer .mail input").val();
    let subject = $("footer .subject input").val();

    // var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    var check_name = true;
    var check_phone = true;
    var check_email = true;
    var check_subject = true;

    if (name == "") {
      $("footer .name input").addClass("error");
      check_name = false;
    } else {
      $("footer .name input").removeClass("error");
      check_name = true;
    }
    if (phone == "") {
      $("footer .phone input").addClass("error");
      check_phone = false;
    } else {
      $("footer .phone input").removeClass("error");
      check_phone = true;
    }
    if (email == "") {
      $("footer .mail input").addClass("error");
      check_email = false;
    } else {
      $("footer .mail input").removeClass("error");
      check_email = true;
    }
    if (subject == "") {
      $("footer .subject input").addClass("error");
      check_subject = false;
    } else {
      $("footer .subject input").removeClass("error");
      check_subject = true;
    }

    if (
      check_name == true &&
      check_phone == true &&
      check_email == true &&
      check_subject == true
    ) {
      $(".popup").addClass("activePopup");
      $(".popup .text").html("Logged in successfully !!!");
    } else {
      $(".popup").addClass("activePopup");
      $(".popup .text").html("System error");
    }

    $(".popup .popup-modal .btn").on("click", function () {
      $(".popup").removeClass("activePopup");
    });
  });

  //photo
  var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;
      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0]; // <a> element
        size = linkEl.getAttribute('data-size').split('x');
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          item.msrc = linkEl.children[0].getAttribute('src');
        }
        item.el = figureEl; // save link to element
        items.push(item);
      }
      return items;
    };
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function (el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });
      if (!clickedListItem) {
        return;
      }
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;
      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }
        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
    var photoswipeParseHash = function () {
      var hash = window.location.hash.substring(1),
        params = {};
      if (hash.length < 5) {
        return params;
      }
      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;
      items = parseThumbnailElements(galleryElement);
      options = {
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function (index) {
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };
      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }
      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };

  initPhotoSwipeFromDOM('.carousel-img');
});

// project show json
const apiUrl = 'http://localhost:3000/projects';
const apiUrlFilm = 'http://localhost:3000/film';
const apiUrlIamge = 'http://localhost:3000/image';

const projectList = document.getElementById('projectList');
const projectFilm = document.getElementById('projectFilm');
const projectIamge = document.getElementById('projectImage');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectHTML = `
          <div class="project__wrap-item" data-aos="fade-down">
             <a href="ProjectDetail.html?id=${project.id}">
              <div class="img">
                <img src="${project.image}" alt="${project.projectName}">
              </div>
            </a>
          <div>

          <div class="text">
            <h5>${project.projectName}</h5>
            <p>Clients: ${project.client}</p>
            <p>Photographer: ${project.photographer}</p>
            ${project.director ? `<p>Director: ${project.director}</p>` : ""}
          </div>
      `;
      projectList.innerHTML += projectHTML;
    });
  })
  .catch(error => console.error('Error fetching data:', error));

fetch(apiUrlFilm)
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectHTML = `
          <div class="project__wrap-item" data-aos="fade-down">
            <a href="ProjectDetail.html?id=${project.id}">
              <div class="img">
                <img src="${project.image}" alt="${project.projectName}">
              </div>
            </a>
          <div>

          <div class="text">
            <h5>${project.projectName}</h5>
            <p>Clients: ${project.client}</p>
            <p>Photographer: ${project.photographer}</p>
            ${project.director ? `<p>Director: ${project.director}</p>` : ""}
          </div>
      `;
      projectFilm.innerHTML += projectHTML;
    });
  })
  .catch(error => console.error('Error fetching data:', error));

fetch(apiUrlIamge)
  .then(response => response.json())
  .then(data => {
    data.forEach(project => {
      const projectHTML = `
          <div class="project__wrap-item" data-aos="fade-down">
            <a href="ProjectDetail.html?id=${project.id}">
              <div class="img">
                <img src="${project.image}" alt="${project.projectName}">
              </div>
            </a>
          <div>

          <div class="text">
            <h5>${project.projectName}</h5>
            <p>Clients: ${project.client}</p>
            <p>Photographer: ${project.photographer}</p>
            ${project.director ? `<p>Director: ${project.director}</p>` : ""}
          </div>
      `;
      projectIamge.innerHTML += projectHTML;
    });
  })
  .catch(error => console.error('Error fetching data:', error));


const projectDetail = document.getElementById('projectDetail');
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

fetch(`${apiUrl}/${projectId}`)
  .then(response => response.json())
  .then(project => {
    const detailHTML = `
        <div class="detail__top">
          <div class="detail__top-left">
            <div class="left">
              <h6>${project.projectName}</h6>
            </div>
          </div>

          <div class="detail__top-right">
              <div class="fullscreen">
                <p>FullScreen</p>
                  <img src="img/icon/fullScreen-notbg.png" alt="">
              </div>
              
              <div class="studioDetail__back back">
                <div class="text">
                  <a href="./">Back to all </a>
                  <img src="img/icon/arrow-left.png" alt="">
                </div>
              </div>
          </div>
        </div>
        <div class="detail__img" data-aos="fade-down">
            <img class="clickable-image" src="${project.image}" alt="">
        </div>

        <div class="detail__bot">
            <div class="detail__bot-left item" data-aos="fade-right">
                <h6>desciption</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    ut ornare est, malesuada eleifend urna. Ut vel felis vel elit auctor efficitur. Nulla pellentesque vestibulum elit, at condimentum felis sollicitudin quis. </p>
            </div>
            <div class="detail__bot-mid item" data-aos="fade-up">
                <h6>client</h6>
                <p>${project.client}</p>
            </div>

            <div class="detail__bot-right item" data-aos="fade-left">
                <h6>about team</h6>
                <p>DOP: Yeen Yeen <br>
                PHOTOGRAPHER: ${project.photographer}<br>
                ART DIRECTOR: ${project.director} </p>
            </div>
        </div>
        `;
    projectDetail.innerHTML = detailHTML;
  })
  .catch(error => console.error('Error fetching project detail:', error));


const apiStudio = 'http://localhost:3000/studios';
const studios = document.getElementById('listStudio')

fetch(apiStudio)
  .then((response) => response.json())

  .then((data) => {
    data.forEach(studio => {
      const studioHTML = `
          <div class="studio__wrap-item" data-aos="fade-down">
            <div class="img">
              <img src="${studio.image}" alt="Studio ${studio.number}">
            </div>
            <a href="Studio-Details.html?id=${studio.id}">
              <div class="content">
                <div class="number">
                  <p>studio</p>
                  <span>${studio.number}</span>
                </div>
                <div class="dimensions">
                  <p>dimensions</p>
                  <p class="arrownumber">${studio.dimensions}</p>
                </div>
                <div class="details">
                  <p>details</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.86 24.67">
                    <polygon class="cls-1" points="20.43 16.89 4.24 0.71 0.71 4.24 16.89 20.43 20.43 23.96 23.96 20.43 40.15 4.24 36.61 0.71 20.43 16.89"></polygon>
                  </svg>
                </div>
              </div>
            </a>
          </div>
          `;
      studios.innerHTML += studioHTML;
    });

  })
  .catch(error => console.error('Error fetching data:', error));

const studioId = urlParams.get('id');
const studioDetail = document.getElementById('studioDetail');

fetch(`${apiStudio}/${studioId}`)
  .then(response => response.json())
  .then(studio => {
    const detailStudio = `
        <section class="studioDetail">
              <div class="container">
                  <div class="studioDetail__back">
                      <div class="text">
                          <a href="Studio.html">Back to all </a>
                          <img src="img/icon/arrow-left.png" alt="">
                      </div>
                  </div>

                  <div class="studioDetail__slide">
                      <div class="studioDetail__slide-item">
                          <img src="${studio.image}" alt="">
                      </div>
                  </div>

                  <div class="studioDetail__detail">
                      <div class="number">
                          <p>studio</p>
                          <span class="number_d">${studio.number}</span>
                      </div>

                      <div class="dimensions">
                          <p class='p1'>dimensions</p>
                          <p>${studio.dimensions}</p>
                      </div>
                      <a class="floorplan" download href="${studio.image}">
                          <p>Download FloorPlan</p>
                          <img src="./img/icon/icon-plan.png" alt="img/StudioDetail/img-2.jpg">
                      </a>
                      <div class="fullscreen ">
                          <p>Full Screen</p>
                          <img src="./img/icon/fullScreen-notbg.png" alt="">
                      </div>

                      <div class="gallery__arrow arrow">
                          <div class="btn btn-prev">
                              <svg id="Layer_1" class='prev' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 40.86 24.67">
                                  <defs>
                                      <style>
                                          .cls-1 {
                                              fill: #4f4e4e;
                                              stroke: #000;
                                              stroke-miterlimit: 10;
                                          }
                                      </style>
                                  </defs>
                                  <title>arrow</title>
                                  <polygon class="cls-1"
                                      points="20.43 16.89 4.24 0.71 0.71 4.24 16.89 20.43 20.43 23.96 23.96 20.43 40.15 4.24 36.61 0.71 20.43 16.89" />
                              </svg>
                              <span>Previous</span>
                          </div>
                          <div class="btn btn-next">
                              <span>Next</span>
                              <svg id="Layer_1" class='next' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 40.86 24.67">
                                  <defs>
                                      <style>
                                          .cls-1 {
                                              fill: #4f4e4e;
                                              stroke: #000;
                                              stroke-miterlimit: 10;
                                          }
                                      </style>
                                  </defs>
                                  <title>arrow</title>
                                  <polygon class="cls-1"
                                      points="20.43 16.89 4.24 0.71 0.71 4.24 16.89 20.43 20.43 23.96 23.96 20.43 40.15 4.24 36.61 0.71 20.43 16.89" />
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section class="container">
              <div class="lineStudio">
                  <hr>
              </div>
          </section>

          <section class="Details">
              <div class="container">
                  <div class="row">
                      <div class="col-md-6 col-sm-6 col-12" data-aos="fade-down">
                          <div class="Details__pricing item">
                              <h2>Pricing</h2>
                              <p><span style="font-family:'PB'">Please note:</span> We operate on a 10 hour working day from 8am
                                  to 6pm.
                                  Overtime is charged outside these times at the above rates.</p>
                          </div>
                          <div class="Details__table">
                              <nav>
                                  <ul>
                                      <li class="li1">
                                          <p>Shoot</p>
                                      </li>
                                      <li>
                                          <p>10.000.000 vnd</p>
                                      </li>
                                  </ul>
                                  <ul>
                                      <li class="li1">
                                          <p>Build</p>
                                      </li>
                                      <li>
                                          <p>5.000.000 vnd</p>
                                      </li>
                                  </ul>
                                  <ul>
                                      <li class="li1">
                                          <p>Remove</p>
                                      </li>
                                      <li>
                                          <p>2.500.000 vnd</p>
                                      </li>
                                  </ul>
                                  <ul>
                                      <li class="li1">
                                          <p>Total</p>
                                      </li>
                                      <li>
                                          <p>${studio.price}</p>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                      <div class="col-md-6 col-ms-6 col-12" data-aos="fade-up">
                          <div class="Details__floorplan item">
                              <h2>Floorplan</h2>
                              <div class="img">
                                  <img src="./img/StudioDetail/client-area-2.jpg" alt="">
                              </div>
                          </div>
                      </div>
                      <div class="col-md-12 col-sm-12 col-12">
                          <div class="Details__specs">
                              <h2>Specs:</h2>
                              <div class="row">
                                  <div class="col-md-6 col-sm-6 col-12 textleft" data-aos="fade-down">
                                      <p>Dimensions<br>18mW × 18mL × 7mH </p><br>
                                      <p>U shaped infinity cove ( Green colour )</p><br>
                                      <p>Drive in access</p>
                                  </div>
                                  <div class="col-md-6 col-sm-6 col-12 textleft" data-aos="fade-down">
                                      <p>Remote controlled floating ceiling ( 6mWx12mL)</p><br>
                                      <p>New client area ( Yellow colour )</p><br>
                                      <p>Air conditioned in production office</p><br>
                                      <p>Power: 3 × 400A</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-12 col-ms-12 col-12" data-aos="fade-up">
                          <div class="Details__booknow">
                              <div class="icon">
                                  <img src="./img/icon/arrow-down.png" alt="">
                              </div>
                              <div class="text">
                                  <button id="bookNowBtn" data-id="${studio.id}" data-name="Studio ${studio.number}" data-price="${studio.price.replace(' vnd', '').replace('.', '')}" data-image="${studio.image}">
                                  <p> Book Now </p>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        <section class="hr">
            <div class="container">
                <hr>
            </div>
        </section>
    `
    studioDetail.innerHTML = detailStudio;
    AOS.init({
      duration: 1200,
    });

    document.getElementById('bookNowBtn').addEventListener('click', function (e) {
      const studioId = e.target.getAttribute('data-id');
      const studioName = e.target.getAttribute('data-name');
      const studioPrice = parseFloat(e.target.getAttribute('data-price').replace(' vnd', '').replace('.', '').replace(',', '')) || 0;
      const studioImage = e.target.getAttribute('data-image');

      let cart = JSON.parse(sessionStorage.getItem('studioCart')) || [];

      cart.push({ id: studioId, name: studioName, price: studioPrice, image: studioImage });

      sessionStorage.setItem('studioCart', JSON.stringify(cart));

      document.querySelector('.popup').classList.add('activePopup');
      document.querySelector('.popup .text').innerHTML = `${studioName} đã được thêm vào giỏ hàng!`;
      document.querySelector('.popup .btn-d').addEventListener('click', function () {
        document.querySelector('.popup').classList.remove('activePopup');
      });
      setTimeout(() => {
        window.location.href = 'Studio-rental.html';
      }, 2000)
    });
  })
  .catch(error => console.error('Error fetching studio detail:', error));

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('totalPrice');
  let cart = JSON.parse(sessionStorage.getItem('studioCart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceEl.textContent = '0';
    return;
  }

  let totalPrice = 0;
  cartContainer.innerHTML = '';
  cart.forEach((item, index) => {
    totalPrice += item.price;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="number">
            <p>${item.name}</p>
            <p>${item.price.toLocaleString()} VND</p>
          </div>
          <button class="removeBtn" data-index="${index}">Remove</button>
        </div>
      `;
    cartContainer.appendChild(cartItem);
  });

  totalPriceEl.textContent = totalPrice.toLocaleString();


  document.querySelectorAll('.removeBtn').forEach(button => {
    button.addEventListener('click', function (e) {
      const index = e.target.getAttribute('data-index');
      let cart = JSON.parse(sessionStorage.getItem('studioCart')) || [];
      cart.splice(index, 1);
      sessionStorage.setItem('studioCart', JSON.stringify(cart));
      location.reload();
    });
  });

  // document.getElementById('checkoutBtn').addEventListener('click', () => {
  //   document.querySelector('.popup').classList.add('activePopup');
  //   document.querySelector('.popup .text').innerHTML = `Đặt thành công
  //     <br>Gbox sẽ liên hệ cho bạn sớm nhất`;
  //   document.querySelector('.popup .btn-d').addEventListener('click', function () {
  //     document.querySelector('.popup').classList.remove('activePopup');
  //   });
  //   setTimeout(() => {
  //     sessionStorage.removeItem('studioCart');
  //     location.reload();
  //   }, 3000)
  // });

  document.getElementById('checkoutBtn').addEventListener('click', async () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      document.querySelector('.popup').classList.add('activePopup');
      document.querySelector('.popup .text').innerHTML = `Bạn cần đăng nhập trước khi thanh toán`;
      document.querySelector('.popup .btn-d').addEventListener('click', function () {
        document.querySelector('.popup').classList.remove('activePopup');
      });
      setTimeout(() => {
        window.location.href = 'Member.html';
        return;
      }, 2000)
      return;
    }

    const cart = JSON.parse(sessionStorage.getItem('studioCart')) || [];
    if (cart.length === 0) {
      document.querySelector('.popup').classList.add('activePopup');
      document.querySelector('.popup .text').innerHTML = `Giỏ hàng của bạn đang trống`;
      document.querySelector('.popup .btn-d').addEventListener('click', function () {
        document.querySelector('.popup').classList.remove('activePopup');
      });
      return;
    }

    const orderData = {
      userId: user.id,
      username: user.username,
      email: user.email,
      cart: cart,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        sessionStorage.removeItem('studioCart');
        alert('Đặt hàng thành công');
      } else {
        console.error('Lỗi khi lưu đơn hàng:', response.statusText);
        alert('Đã có lỗi xảy ra, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  });
});

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

loginBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  loginBtn.classList.add('active');
  registerBtn.classList.remove('active');
});

registerBtn.addEventListener('click', () => {
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

switchToRegister.addEventListener('click', () => {
  registerBtn.click();
});

switchToLogin.addEventListener('click', () => {
  loginBtn.click();
});

document.querySelector('#registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.querySelector('input[placeholder="Username"]').value;
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;
  const confirmPassword = e.target.querySelector('input[placeholder="Confirm Password"]').value;

  if (password !== confirmPassword) {
    document.querySelector('.popup').classList.add('activePopup');
    document.querySelector('.popup .text').innerHTML = `Mật khẩu nhập lại không đúng`;
    document.querySelector('.popup .btn-d').addEventListener('click', function () {
      document.querySelector('.popup').classList.remove('activePopup');
    });
    return;
  }

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (response.ok) {
    document.querySelector('.popup').classList.add('activePopup');
    document.querySelector('.popup .text').innerHTML = `Đăng ký thành công`;
    document.querySelector('.popup .btn-d').addEventListener('click', function () {
      document.querySelector('.popup').classList.remove('activePopup');
    });
    setTimeout(() => {
      document.querySelector('.popup').classList.remove('activePopup');
      document.getElementById('loginBtn').click();
    }, 2000);
  } else {
    document.querySelector('.popup').classList.add('activePopup');
    document.querySelector('.popup .text').innerHTML = `Có lỗi xảy ra. Vui lòng thử lại.`;
    document.querySelector('.popup .btn-d').addEventListener('click', function () {
      document.querySelector('.popup').classList.remove('activePopup');
    });
  }
});

document.querySelector('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;

  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();

  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    document.querySelector('.popup').classList.add('activePopup');
    document.querySelector('.popup .text').innerHTML = `Chào mừng trở lại, ${user.username}`;
    document.querySelector('.popup .btn-d').addEventListener('click', function () {
      document.querySelector('.popup').classList.remove('activePopup');
    });
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showUserInfo(user);
  } else {
    document.querySelector('.popup').classList.add('activePopup');
    document.querySelector('.popup .text').innerHTML = `Tên đăng nhập hoặc mật khẩu không đúng`;
    document.querySelector('.popup .btn-d').addEventListener('click', function () {
      document.querySelector('.popup').classList.remove('activePopup');
    });
  }
});

function showUserInfo(user) {
  const userInfo = document.getElementById('userInfo');
  userInfo.querySelector('#userName').textContent = user.username;

  const userDetails = document.createElement('div');
  userDetails.className = 'user-details';
  userDetails.innerHTML = `
    <p>Email: <span>${user.email}</span></p>
    <p>Join Date: <span>${user.joinDate || 'N/A'}</span></p>
  `;

  if (!userInfo.querySelector('.user-details')) {
    userInfo.appendChild(userDetails);
  }
  userInfo.classList.remove('hidden');
  userInfo.style.display = 'block';
  document.querySelector('.form-container').classList.add('hidden');

}

document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    showUserInfo(user);
    document.querySelector('.form-container').classList.add('hidden');
  }
});


// Đăng xuất
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  document.getElementById('userInfo').classList.add('hidden');
  document.querySelector('.form-container').classList.remove('hidden');
  userInfo.querySelector('#userName').textContent = '';
  const userDetails = userInfo.querySelector('.user-details');
  if (userDetails) {
    userInfo.removeChild(userDetails);
  }
  document.querySelector('.popup').classList.add('activePopup');
  document.querySelector('.popup .text').innerHTML = `Đăng xuất thành công`;
  document.querySelector('.popup .btn-d').addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('activePopup');
  });
  setTimeout(() => {
    window.location.href = 'Member.html';
  }, 2000)
});
