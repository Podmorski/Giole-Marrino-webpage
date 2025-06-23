/*
 * Copyright (c) 2022 ib-themes
 * Author: ib-themes
 * This file is made for CURRENT TEMPLATE
 */

(function ($) {
  "use strict";

  var EdreaObject = {
    init: function () {
      this.anchor();
      this.mobileMenu();
      this.headlineAnimation(); // <<< THIS LINE IS ADDED
      this.hashtag();
      this.contactForm();
      this.donation_fx();
      this.owl();
      this.masonry();
      this.counter();
      this.modal();
      this.nav_skin();
      this.popup();
      this.svg();
      this.bg_images();
    },

    // THIS ENTIRE FUNCTION IS NEW
    headlineAnimation: function(){
        setTimeout(function(){
            $('.edrea_hero .title').removeClass('hidden-for-anim').addClass('animated fadeInRight');
        }, 2200); // This delay waits for the preloader to finish
    },

    anchor: function () {
      var a = $("section a[href^='#'],.edrea_intro a[href^='#']");
      a.on("click", function () {
        var e = $(this).attr("href");
        if (e !== "#") {
          $("html,body").animate({ scrollTop: $(e).offset().top }, 1000);
          return false;
        }
      });
    },

    mobileMenu: function () {
      var menu = $(".edrea_mobile_menu");
      var hamburger = menu.find(".hamburger");
      var DD = menu.find(".dropdown");
      var mobileMenuList = DD.find("a");

      hamburger.on("click", function () {
        if (hamburger.hasClass("is-active")) {
          hamburger.removeClass("is-active");
          DD.slideUp();
        } else {
          hamburger.addClass("is-active");
          DD.slideDown();
        }
      });

      mobileMenuList.on("click", function () {
        hamburger.removeClass("is-active");
        DD.slideUp();
        return false;
      });
    },

    contactForm: function () {
      $("#send_message").on("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        
        var form = $(".edrea_contact_form");
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var spanSuccess = form.find(".success");
        var success = spanSuccess.data("success");

        spanSuccess.empty();

        if (name === "" || email === "" || message === "") {
          form.find(".empty_notice").slideDown(500).delay(2000).slideUp(500);
          return;
        }
        
        var form_data = {
            name: name,
            email: email,
            message: message,
        };

        $.ajax({
          type: "POST",
          url: "https://formspree.io/f/xzzgavpo",
          data: form_data,
          headers: {
            'Accept': 'application/json'
          }
        }).done(function() {
            spanSuccess.html("<span class='contact_success'>" + success + "</span>").slideDown(500).delay(4000).slideUp(500);
            form[0].reset();
        }).fail(function() {
            spanSuccess.html("<span class='contact_error'>Oops! Something went wrong.</span>").slideDown(500).delay(4000).slideUp(500);
        });
        
        return false;
      });
    },

    donation_fx: function(){
        var self = this;
        var section = $('.edrea_donation_section');
        if(section.length){
            var paypal_user = 'kuksaudio'; // IMPORTANT: Replace with your client's PayPal.me username
            var amount_buttons = section.find('.amount_button');
            var custom_amount_input = section.find('#custom_amount');
            var donate_button = section.find('#donate_button');
            var donate_button_text = section.find('#donate_button_text');
            var selectedAmount = 0;

            var update_donate_link = function(){
                if(selectedAmount > 0){
                    var url = 'https://paypal.me/' + paypal_user + '/' + selectedAmount;
                    donate_button.attr('href', url).removeClass('disabled');
                    donate_button_text.text('Donate $' + selectedAmount + ' via PayPal');
                } else {
                    donate_button.attr('href', '#').addClass('disabled');
                    donate_button_text.text('Donate via PayPal');
                }
            };

            amount_buttons.off().on('click', function(e){
                e.preventDefault();
                var el = $(this);
                selectedAmount = parseInt(el.data('amount'));
                amount_buttons.removeClass('active');
                el.addClass('active');
                custom_amount_input.val('');
                update_donate_link();
            });

            custom_amount_input.on('input', function(){
                var el = $(this);
                var value = parseFloat(el.val());
                amount_buttons.removeClass('active');
                if(value > 0 && !isNaN(value)){
                    selectedAmount = value;
                } else {
                    selectedAmount = 0;
                }
                update_donate_link();
            });
            update_donate_link(); // Initialize
        }
    },

    owl: function () {
      $(".edrea_portfolio_slider .owl-carousel").each(function () {
        var e = $(this);
        var p = e.closest(".edrea_portfolio_slider");
        e.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 4,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            1040: {
              items: 3,
            },
            1600: {
              items: 4,
            },
          },
        });
        p.find(".edrea_prevnext .next a").click(function () {
          e.trigger("next.owl.carousel");
          return false;
        });
        p.find(".edrea_prevnext .prev a").click(function () {
          e.trigger("prev.owl.carousel");
          return false;
        });
      });

      $(".edrea_testi_slider .owl-carousel").each(function () {
        var e = $(this);
        var p = e.closest(".edrea_testi_slider");
        e.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 1,
        });
        p.find(".edrea_prevnext .next a").click(function () {
          e.trigger("next.owl.carousel");
          return false;
        });
        p.find(".edrea_prevnext .prev a").click(function () {
          e.trigger("prev.owl.carousel");
          return false;
        });
      });

      $(".edrea_news_slider .owl-carousel").each(function () {
        var e = $(this);
        var p = e.closest(".edrea_news_slider");
        e.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 2,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
          },
        });
        p.find(".edrea_prevnext .next a").click(function () {
          e.trigger("next.owl.carousel");
          return false;
        });
        p.find(".edrea_prevnext .prev a").click(function () {
          e.trigger("prev.owl.carousel");
          return false;
        });
      });
    },

    masonry: function () {
      var masonry = $(".masonry");
      if ($().isotope) {
        masonry.each(function () {
          $(this).isotope({
            itemSelector: ".masonry_item",
            masonry: {},
          });
          $(this).isotope("reloadItems").isotope();
        });
      }
    },

    counter: function () {
      var element = $(".edrea_counter");
      element.each(function () {
        var el = $(this);
        el.waypoint({
          handler: function () {
            if (!el.hasClass("stop")) {
              el.addClass("stop").countTo({
                refreshInterval: 50,
                formatter: function (value, options) {
                  return value
                    .toFixed(options.decimals)
                    .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
                },
              });
            }
          },
          offset: "90%",
        });
      });
    },

    modal: function () {
      var self = this;
      var modalBox = $(".edrea_modalbox");
      var item = $(".modal_item");
      var closePopup = modalBox.find(".close");
      var prevNext = modalBox.find(".edrea_prevnext");
      var fixedTitle = modalBox.find(".fixed_title");

      item.on("click", function () {
        var element = $(this);
        var content = element.find(".hidden_information").html();

        var items = element.closest(".modal_items"),
          index = element.attr("data-index"),
          from = items.attr("data-from"),
          count = items.attr("data-count");
        prevNext.attr("data-index", index);
        prevNext.attr("data-from", from);
        var titleIndex = index < 10 ? "0" + index : index;
        var titleCount = count < 10 ? "0" + count : count;
        fixedTitle.html(
          "<span>" + titleIndex + "/" + titleCount + "</span>" + from
        );

        $("body").addClass("modal");
        modalBox.addClass("opened");
        modalBox.find(".modal_in").html(content);

        self.modal_prevnext(prevNext, modalBox);
        self.svg();
        self.bg_images();
      });
      self.modal_prevnext(prevNext, modalBox);
      closePopup.on("click", function () {
        modalBox.removeClass("opened");
        modalBox.find(".modal_in").html("");
        $("body").removeClass("modal");
        return false;
      });
    },

    modal_prevnext: function (prevNext, modalBox) {
      var self = this;
      prevNext
        .find("a")
        .off()
        .on("click", function () {
          var e = $(this);
          var from = prevNext.attr("data-from");
          var index = parseInt(prevNext.attr("data-index"));
          var itemss = $('.modal_items[data-from="' + from + '"]');
          var count = parseInt(itemss.attr("data-count"));
          var fixedTitle = modalBox.find(".fixed_title");
          if (e.parent().hasClass("prev")) {
            index--;
          } else {
            index++;
          }
          if (index < 1) {
            index = count;
          }
          if (index > count) {
            index = 1;
          }

          var content = itemss
            .find('.modal_item[data-index="' + index + '"] .hidden_information')
            .html();
          prevNext.removeClass("disabled");
          prevNext.attr("data-index", index);

          setTimeout(function () {
            modalBox.find(".modal_in").fadeOut(500, function () {
              $(this).html(content).fadeIn(500);
            });
            var titleIndex = index < 10 ? "0" + index : index;
            var titleCount = count < 10 ? "0" + count : count;
            fixedTitle.html(
              "<span>" + titleIndex + "/" + titleCount + "</span>" + from
            );
          }, 500);

          $(".edrea_modalbox .modal_content")
            .stop()
            .animate({ scrollTop: 0 }, 500, "swing");

          self.modal_prevnext(prevNext, modalBox);
          self.svg();
          self.bg_images();
          return false;
        });
    },

    nav_skin: function () {
      $(window).on("scroll", function () {
        var topbar = $(".edrea_topbar");
        var WinOffset = $(window).scrollTop();
        if (WinOffset >= 100) {
          topbar.addClass("animate");
        } else {
          topbar.removeClass("animate");
        }
      });
    },

    popup: function () {
      $(".gallery_zoom").each(function () {
        // the containers for all your galleries
        $(this).magnificPopup({
          delegate: "a.zoom", // the selector for gallery item
          type: "image",
          gallery: {
            enabled: true,
          },
          removalDelay: 300,
          mainClass: "mfp-fade",
        });
      });
      $(".popup-youtube, .popup-vimeo").each(function () {
        // the containers for all your galleries
        $(this).magnificPopup({
          disableOn: 700,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      });

      $(".soundcloude_link").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    },

    preloader: function () {
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
        ? true
        : false;
      var preloader = $("#preloader");

      if (!isMobile) {
        setTimeout(function () {
          preloader.addClass("preloaded");
        }, 800);
        setTimeout(function () {
          preloader.remove();
        }, 2000);
      } else {
        preloader.remove();
      }
    },

    run_preloader: function () {
      var self = this;
      setTimeout(function () {
        self.preloader();
      }, 500);
    },

    svg: function () {
      $("img.svg").each(function () {
        var e = $(this);
        var imgclass = e.attr("class");
        var URL = e.attr("src");
        $.get(
          URL,
          function (data) {
            var svg = $(data).find("svg");
            if (typeof imgclass !== "undefined") {
              svg = svg.attr("class", imgclass + " ready-svg");
            }
            svg = svg.removeAttr("xmlns:a");
            e.replaceWith(svg);
          },
          "xml"
        );
      });
    },
    bg_images: function () {
      var data = $("*[data-img-url]");
      data.each(function () {
        var element = $(this);
        var url = element.data("img-url");
        element.css({ backgroundImage: "url(" + url + ")" });
      });
    },
    hashtag: function () {
      var self = this;
      var ccc = $(".edrea_topbar .menu .ccc");
      var element = $(".edrea_topbar .menu .current a");
      $(".edrea_topbar .menu a").on("mouseenter", function () {
        var e = $(this);
        self.currentLink(ccc, e);
      });
      $(".edrea_topbar .menu").on("mouseleave", function () {
        element = $(".edrea_topbar .menu .current a");
        self.currentLink(ccc, element);
      });
      self.currentLink(ccc, element);
    },
    currentLink: function (ccc, e) {
      if (!e.length) {
        return false;
      }
      var left = e.offset().left;
      var width = e.outerWidth();
      var menuleft = $(".edrea_topbar .menu").offset().left;
      if (e.parent().hasClass("button")) {
        width = 0;
      }
      ccc.css({ left: left - menuleft + "px", width: width + "px" });
    },
  };

  $(document).ready(function () {
    // initialization
    EdreaObject.init();
    EdreaObject.run_preloader(); // Run preloader as soon as the document is ready
  });

})(jQuery);

jQuery(".anchor_nav").onePageNav();
