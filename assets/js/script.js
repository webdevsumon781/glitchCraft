document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     .list active toggle
  =============================== */
  document.querySelectorAll(".list").forEach(function (item) {
    item.addEventListener("click", function () {
      document.querySelectorAll(".list").forEach(function (el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  const lists = document.querySelectorAll(".list");

  function setActive() {
    lists.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  }

  lists.forEach(l => l.addEventListener("click", setActive));

  /* ===============================
     Navigation
  =============================== */
  const navItems = document.querySelector(".nav").querySelectorAll("li");
  const sections = document.querySelectorAll(".section");

  navItems.forEach((li, index) => {
    li.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault();

      removeBackSection();

      navItems.forEach((item, i) => {
        if (
          item.querySelector("a").classList.contains("active") ||
          item.classList.contains("active")
        ) {
          addBackSection(i);
        }

        item.querySelector("a").classList.remove("active");
        item.classList.remove("active");
      });

      this.classList.add("active");
      showSection(this);
    });
  });

  function removeBackSection() {
    sections.forEach(sec => sec.classList.remove("back-section"));
  }

  function addBackSection(index) {
    sections[index].classList.add("back-section");
  }

  function showSection(el) {
    sections.forEach(sec => sec.classList.remove("active"));
    const id = el.getAttribute("href").split("#")[1];
    document.getElementById(id).classList.add("active");
  }

  function updateNav(el) {
    navItems.forEach(item => {
      item.classList.remove("active");
      item.querySelector("a").classList.remove("active");

      const target = el.getAttribute("href").split("#")[1];
      const navTarget = item
        .querySelector("a")
        .getAttribute("href")
        .split("#")[1];

      if (target === navTarget) {
        item.classList.add("active");
        item.querySelector("a").classList.add("active");
      }
    });
  }
  //  footer year scritp start
  setInterval(() => {
    let time = new Date();
    let fullDate = time.toLocaleDateString();
    let second = time.getSeconds();
    let minute = time.getMinutes();
    let hours = time.getHours();
    let timeArr = [second, minute, hours]
    if (timeArr[0] < 10) {
      timeArr[0] = "0" + timeArr[0];
    }
    if (timeArr[1] < 10) {
      timeArr[1] = "0" + timeArr[1];
    }
    if (timeArr[2] < 10) {
      timeArr[2] = "0" + timeArr[2];
    }
    document.querySelector('#footerYear').innerHTML = timeArr[0] + ":" + timeArr[1] + ":" + timeArr[2] + " " + fullDate;
  })

  // glitch effect
  $(function () {
    $(".glitch-img").mgGlitch({
      destroy: false,
      glitch: true,
      scale: true,
      blend: true,
      blendModeType: 'hue',
      glitch1TimeMin: 200,
      glitch1TimeMax: 400,
      glitch2TimeMin: 10,
      glitch2TimeMax: 100,
    });
  });

  /* ===============================
     Hire Me & About Us
  =============================== */
  document.querySelector(".hire-me")?.addEventListener("click", function () {
    const index = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(index);
  });

  document.querySelector(".about-us")?.addEventListener("click", function () {
    const index = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(index);
  });

  /* ===============================
     Mouse Cursor
  =============================== */
  if (document.querySelector(".mouse-cursor")) {
    const cursorInner = document.querySelector(".cursor-inner");
    const cursorOuter = document.querySelector(".cursor-outer");
    let hovering = false;

    window.addEventListener("mousemove", function (e) {
      if (!hovering) {
        cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.body.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, .trigger, .cursor-pointer")) {
        cursorInner.classList.add("cursor-hover");
        cursorOuter.classList.add("cursor-hover");
        hovering = true;
      }
    });

    document.body.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, .trigger, .cursor-pointer")) {
        cursorInner.classList.remove("cursor-hover");
        cursorOuter.classList.remove("cursor-hover");
        hovering = false;
      }
    });

    cursorInner.style.visibility = "visible";
    cursorOuter.style.visibility = "visible";
  }

});


/* ===============================
   MIXITUP (PORTFOLIO)
=============================== */
var mixer = mixitup(".portfolio-list");


/* ===============================
   GALLERY + FANCYBOX
=============================== */
document.querySelectorAll(".gallery a").forEach(function (link) {
  link.setAttribute("data-fancybox", "mygallery");

  var img = link.querySelector("img");
  if (img) {
    link.setAttribute("data-caption", img.getAttribute("alt"));
    link.setAttribute("title", img.getAttribute("alt"));
  }
});

/* Fancybox init (jQuery plugin – required) */
if (window.jQuery && jQuery.fn.fancybox) {
  jQuery(".gallery a").fancybox();

  jQuery("[data-fancybox]").fancybox({
    selector: ".mix:visible a",
    loop: true,
    hash: true,
    transitionEffect: "slide",
    clickContent: function (current, event) {
      return current.type === "image" && "next";
    }
  });
}

/* ===============================
   TESTIMONIAL CAROUSEL
=============================== */
if (window.jQuery && jQuery.fn.owlCarousel) {
  jQuery("#testimonial").owlCarousel({
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });
}


/* ===============================
   FUNFACTS COUNTER
=============================== */
document.querySelectorAll(".funfacts-box").forEach(function (box) {
  var counter = box.querySelector(".counter");
  if (!counter) return;

  var target = parseInt(counter.getAttribute("data-to"));
  var duration = parseInt(counter.getAttribute("data-time"));

  // Check if box is in viewport
  var boxTop = box.getBoundingClientRect().top + window.scrollY - window.innerHeight;
  if (window.scrollY > boxTop) {
    // Animate counter
    var start = 0;
    var step = function (timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    };
    window.requestAnimationFrame(step);
  }
});


// contact form start
const form = document.getElementById("contactForm");
const popup = document.getElementById("formSuccessPopup");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/webdevsumon781@gmail.com", {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success === "true") {
        form.reset();
        popup.classList.add("active");

        setTimeout(() => {
          popup.classList.remove("active");
        }, 3000);
      }
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
});
// contact form close
