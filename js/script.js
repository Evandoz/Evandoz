(function($){
  //Scroll
  var $viewport = $(window),
    $topAnchor = $('#top-anchor');

  $viewport.scroll(function() {
    $(this).scrollTop() > $(this).height() ? $topAnchor.addClass('on') : $topAnchor.removeClass('on');
  });
  $topAnchor.click(function() {
    $("html, body").animate({scrollTop: 0}, 0);
  });

  // Scroll
  var $header = $("#header"),
    $headerPH = $("#header-placeholder"),
    $side = $("#side"),
    $toc = $("#toc"),
    $headerlinks = $(".headerlink");
  // 双击回顶
  $header.dblclick(function () {
    $("html, body").animate({ scrollTop: 0 }, 0);
  });
  if ($side.length > 0) {
    var sidePosTop = $side.offset().top,
      sidePosLeft = $side.offset().left;
  }
  $viewport.scroll(function (event) {
    var scrollTop = $viewport.scrollTop(), $marginTop = 0;
    if (scrollTop > 60) {
      $headerPH.css("position", "relative");
      $header.addClass("sticky");
    } else if (scrollTop <= 0) {
      $headerPH.css("position", "fixed");
      $header.removeClass("sticky");
    }
    if (sidePosTop > 80) $marginTop = 70;
    if (scrollTop > sidePosTop - $marginTop) {
      $side.addClass("sticky").css("left", sidePosLeft);
    } else {
      $side.removeClass("sticky").css("left", null);
    }

    if ($toc.length) {
      $headerlinks.each(function () {
        var $m = $(this),
          $mParent = $m.parent(),
          curId = $m.attr("href"),
          mHeight = $mParent.height(),
          mPosTop = $mParent.offset().top;

        if (scrollTop + $viewport.height() >= $("#wrapper").height() * 0.999) {

          var curLink = $toc.find(".active");
          curLink.removeClass("active");
          curId = $($headerlinks[$headerlinks.length - 1]).attr("href");
          var curTocLink = $toc.find("[href='" + curId + "']");
          curTocLink.addClass("active");
          var parentList = curTocLink.parent().parent(".toc-content-child");
          if (parentList.length) {
            parentList.addClass("active");
          }
        } else if (scrollTop >= mPosTop - mHeight / 2) {

          var curLink = $toc.find(".active");
          if (curId && curLink.attr("href") != curId) {
            curLink.removeClass("active");
            var curTocLink = $toc.find("[href='" + curId + "']");
            curTocLink.addClass("active");
            var parentList = curTocLink.parent().parent(".toc-content-child");
            if (parentList.length) {
              parentList.addClass("active");
            }
          }
        } else {
          return false;
        }
      });
    }
  });

  //Fit Vids
  $("body").fitVids();

  // Caption-justified
  $('#post-content').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().prop('tagName') !== 'a') {
        $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
      }
    });
  });

  breakpoints({
    xlarge:  [ '1200px',  '1920px' ],
    large:   [ '992px',   '1199px' ],
    medium:  [ '768px',   '991px'  ],
    small:   [ '436px',   '767px'  ],
    xsmall:  [ null,      '480px'  ]
  });

  var option = {
    selector: 'a.gallery-item',
    popupWidth: 150,
    popupHeight: 150,
    popupCloserText: '',
    popupLoaderText: '',
    usePopupNav: true,
    usePopupDefaultStyling: false,
    windowMargin: 50
  };

  breakpoints.on('<=small', function() {
    option.windowMargin = 0;
  });

  breakpoints.on('>small', function() {
    option.windowMargin = 50;
  });

  $('#post-content').poptrox(option);

  // Mobile nav
  var $navIcon = $('#nav-icon'),
    $mobileNav = $('#mobile-nav'),
    $overLayer = $('#over-layer'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  var locateCenter = function(){
    var winHeight = $(window).height();
    var navHeight = $mobileNav.outerHeight();
    var margin = (winHeight - navHeight) / 2;
    $mobileNav.css('margin-top', margin + 'px');
  }

  $navIcon.on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    locateCenter();
    $navIcon.toggleClass('on');
    $mobileNav.fadeToggle(200);
    $overLayer.fadeToggle(400);
    stopMobileNavAnim();
  });

  function toggleOff(){
    if (isMobileNavAnim) return;
    $navIcon.removeClass('on');
    $mobileNav.fadeOut(200);
    $overLayer.fadeOut(200);
  }

  $overLayer.on('click', function(){
    toggleOff();
  });

  $(window).on('resize', function () {
    toggleOff();
  });

})(jQuery);
