$(document).ready(function(){

  //fancybox
  $(".fancybox").fancybox();

  // Page Scrolling
  var scrollElement = 'html, body';
  $('html, body').each(function () {
    var initScrollTop = $(this).attr('scrollTop');
    $(this).attr('scrollTop', initScrollTop + 1);
    if ($(this).attr('scrollTop') == initScrollTop + 1) {
      scrollElement = this.nodeName.toLowerCase();
      $(this).attr('scrollTop', initScrollTop);
      return false;
    }    
  });

  // Equal hieght product grid
  equalheight = function(container){

  var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;
   $(container).each(function() {

     $el = $(this);
     $($el).height('auto')
     topPostion = $el.position().top;

     if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
     } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
   });
  }

  $(window).load(function() {
    equalheight('.product-block');
  });


  $(window).resize(function(){
    equalheight('.product-block');
  });
  
  // Smooth scrolling for internal links
  $(document).on("click", "a[href^='#']", function(event) {
  //$("a[href^='#']").click(function(event) {
    event.preventDefault();
    
    var navHeight = $("#navbar").outerHeight();
    
    var $this = $(this),
    target = this.hash,
    $target = $(target);

    $(scrollElement).stop().animate({
      'scrollTop': $target.offset().top - navHeight
    }, 900, 'swing', function() {
      //window.location.hash = target;
    });
    
  });
 
  
  // Form Validation
  $("form.comment-form").validate();
  $("form.contact-form").validate();
  
  $("form.mini-contact-form").validate();
  if(window.location.href.indexOf("?customer_posted=true") > -1) {
       $("p.success").addClass("show");
      }
  
  // Placeholder fix for input fields
  $(function() {
    var input = document.createElement("input");
      if(('placeholder' in input)==false) { 
      $('[placeholder]').focus(function() {
        var i = $(this);
        if(i.val() == i.attr('placeholder')) {
          i.val('').removeClass('placeholder');
          if(i.hasClass('password')) {
            i.removeClass('password');
            this.type='password';
          }     
        }
      }).blur(function() {
        var i = $(this);  
        if(i.val() == '' || i.val() == i.attr('placeholder')) {
          if(this.type=='password') {
            i.addClass('password');
            this.type='text';
          }
          i.addClass('placeholder').val(i.attr('placeholder'));
        }
      }).blur().parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
          var i = $(this);
          if(i.val() == i.attr('placeholder'))
            i.val('');
        })
      });
    }
  }); 
  
 })

// add to cart animation
$(document).ready(function() {

  $(".addtocart").click(function(e){

    var elem = $(this)
    $(elem).prop("disabled", true)
    
    e.preventDefault();

    function animate() {

      $("#cart-animation").show()
      
      var timeoutID = window.setTimeout(renableButton, 1500);

      function renableButton() {
       
      }

      var addtocartWidth = elem.outerWidth() / 2
      var addtocartHeight = elem.outerHeight() / 2

      var addtocartLeft = elem.offset().left + addtocartWidth;
      var addtocartTop = $(elem).offset().top + addtocartHeight ;

      var buttonAreaWidth = $("#cart-target").outerWidth();
      var buttonAreaHeight = $("#cart-target").outerHeight();

      var buttonAreaLeft = $("#cart-target").offset().left + buttonAreaWidth / 2  - $("#cart-animation").outerWidth() / 2;
      var buttonAreaTop = $("#cart-target").offset().top + buttonAreaWidth / 2  - $("#cart-animation").outerHeight() / 2 ;

      var path = {
        start: {
          x: addtocartLeft,
          y: addtocartTop,
          angle: 190.012,
          length: 0.2
        },
        end: {
          x: buttonAreaLeft,
          y: buttonAreaTop,
          angle: 90.012,
          length: 0.50
        }
      };

      $('#cart-animation').animate(
      {
        path : new $.path.bezier(path)
      },
      1200,
      function() {
        $(elem).prop("disabled", false)
        $("#cart-animation").fadeOut(500)
        elem.closest('form').submit();
      }
      );
    }

    animate();
  }) 

}); // end doc ready

/* code for auto hashtag scrolling */
$(window).load(function() {
  if (window.location.hash != '') {
    var hash = window.location.hash;
    if (hash.indexOf("#feature") !== -1) {
      var navHeight = $("#navbar").outerHeight();
      var scrollElement = 'html, body';
      $(scrollElement).stop().animate({
        'scrollTop': $(hash.replace("-","")).offset().top - navHeight
      }, 900, 'swing', function() { });
    }
  }
}) // end window load


/* jQuery css bezier animation support -- Jonah Fox */

;(function($){

  $.path = {};

  var V = {
    rotate: function(p, degrees) {
      var radians = degrees * Math.PI / 180,
        c = Math.cos(radians),
        s = Math.sin(radians);
      return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]];
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]];
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]];
    }
  };

  $.path.bezier = function( params, rotate ) {
    params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
    params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];

    var v14 = V.minus( this.p4, this.p1 ),
      v12 = V.scale( v14, params.start.length ),
      v41 = V.scale( v14, -1 ),
      v43 = V.scale( v41, params.end.length );

    v12 = V.rotate( v12, params.start.angle );
    this.p2 = V.add( this.p1, v12 );

    v43 = V.rotate(v43, params.end.angle );
    this.p3 = V.add( this.p4, v43 );

    this.f1 = function(t) { return (t*t*t); };
    this.f2 = function(t) { return (3*t*t*(1-t)); };
    this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
    this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

    /* p from 0 to 1 */
    this.css = function(p) {
      var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
      css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.path.arc = function(params, rotate) {
    for ( var i in params ) {
      this[i] = params[i];
    }

    this.dir = this.dir || 1;

    while ( this.start > this.end && this.dir > 0 ) {
      this.start -= 360;
    }

    while ( this.start < this.end && this.dir < 0 ) {
      this.start += 360;
    }

    this.css = function(p) {
      var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
        css = {};

      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
      css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.fx.step.path = function(fx) {
    var css = fx.end.css( 1 - fx.pos );
    if ( css.prevX != null ) {
      $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
    }
    fx.elem.style.top = css.top;
    fx.elem.style.left = css.left;
  };

})(jQuery);


/* ajaxify */
/**
 * Shopify Ajaxify Shop. 
 * 
 * @uses Modified Shopify jQuery API (link to it)
 *
 */

jQuery(document).ready(function() { 
//Begin Wrapper

var jQ = jQuery;

/**
 * Collection of Selectors for various pieces on the page we need to update 
 *
 * I've tried to keep these as general and flexible as possible, but 
 * if you are doing your own markup, you may find you need to change some of these.
 *
 */
var selectors = {
    // Any elements(s) with this selector will have the total item count put there on add to cart.
    TOTAL_ITEMS: '.cart-total-items', 
    TOTAL_PRICE: '.cart-total-price',
    MINI_ITEMS: '.mini-cart',

    SUBMIT_ADD_TO_CART: 'input[type=image], input.submit-add-to-cart',
    
    FORM_ADD_TO_CART: 'form[action="/cart/add"]',
    
    //FORM_UPDATE_CART: 'form[name=cartform]',
    //The actual Update Button
    //FORM_UPDATE_CART_BUTTON: 'form[name=cartform] input[name=update]',
    //All the buttons on the form
    //FORM_UPDATE_CART_BUTTONS: 'input[type=image], input.button-update-cart',

    LINE_ITEM_ROW: '.cart-line-item',
    LINE_ITEM_QUANTITY_PREFIX: 'input#updates_',
    LINE_ITEM_PRICE_PREFIX: '.cart-line-item-price-',

    LINE_ITEM_REMOVE: '.remove a',
    
    EMPTY_CART_MESSAGE: '#empty'
};


/**
 * Collection of text strings. This is where you would change for a diff language, for example. 
 *
 */
var text = {
    ITEM: 'Item', 
    ITEMS: 'Items'
};

var button = '';

//Convenience method to format money. 
//Can just transform the amount here if needed
var formatMoney = function(price) {
    return Shopify.formatMoney(price);
};


//Attach Submit Handler to all forms with the /cart/add action. 
jQ(".quickAdd").submit(function(e) {
    e.preventDefault();

  button = $(e.target);

    //Disable the Add To Cart button, add a disabled class. 
    jQ(e.target).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', true).addClass('disabled');

    //Can't use updateCartFromForm since you need the item added before you can update (otherwise, would have been more convenient)
    //So, in onItemAdded, we Shopify.getCart() to force the repaint of items in cart. 
    Shopify.addItemFromForm(e.target);
});


//We only want to interrupt the UPDATE, not the CHECKOUT process
jQ(selectors.FORM_UPDATE_CART_BUTTON).click(function(e) {
    e.preventDefault();
    jQ(e.target.form).find(selectors.FORM_UPDATE_CART_BUTTONS).attr('disabled', true).addClass('disabled');
    Shopify.updateCartFromForm(e.target.form);
});

//Delegate the Remove Link functionality on the cart page.
jQ(selectors.FORM_UPDATE_CART).delegate(selectors.LINE_ITEM_REMOVE, 'click', function(e) {
    e.preventDefault();
    //Get the variant ID from the URL
    var vid = this.href.split('/').pop().split('?').shift();
    Shopify.removeItem(vid);
    jQ(this).parents(selectors.LINE_ITEM_ROW).remove();
});

/**
 * Shopify.onItemAdded
 * 
 * Triggered by the response when something is added to the cart via the add to cart button.
 * This is where you would want to put any flash messaging, for example.
 * 
 * @param object line_item
 * @param HTMLelement/String Form HTMLElement, or selector
 */
Shopify.onItemAdded = function(line_item, form) {
    //Default behaviour for this modification:
    //When a Add To Cart form is clicked, we disable the button and apply a class of disabled. 
    //Here is where we remove the disabled class, and reactivate the button.
    jQ(form).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', false).removeClass('disabled');

    //Get the state of the cart, which will trigger onCartUpdate
    Shopify.getCart();
};

/**
 * This updates the N item/items left in your cart
 * 
 * It's setup to match the HTML used to display the Cart Count on Load. If you change that (in your theme.liquid) 
 * you will probably want to change the message html here. 
 * This will update the HTML in ANY element with the class defined in selectors.TOTAL_ITEMS
 *
 * @param object the cart object. 
 * @param HTMLElement form. If included, we know its an Update of the CART FORM, which will trigger additional behaviour. 
 */
Shopify.onCartUpdate = function(cart, form) {

    // Total Items Update
    var message = '<span id="cart-target" class="count">'+cart.item_count+'</span> <a href="/cart">' + '<span class="nomobile">' + 
                    ((cart.item_count == 1) ? text.ITEM : text.ITEMS )+ '</span>' + 
            ' <span class="in-cart nomobile">in cart</span></a> ';

    jQ(selectors.TOTAL_ITEMS).html(message);


    var mini_message = '<a href="/cart"><span class="count">'+cart.item_count+'</span> Check out</a>';
    jQ(selectors.MINI_ITEMS).html(mini_message);
    // Price update - any element matching the selector will have their contents updated with the cart price.
    var price = formatMoney(cart.total_price);
    jQ(selectors.TOTAL_PRICE).html(' | Total: ' + price);

  // show 'added to basket' message
    //jQ(button).children(".added-to-cart").fadeIn(500).delay(2000).fadeOut(1500);
  
    //If the EMPTY_CART_MESSAGE element exiss, we should show it, and hide the form. 
    if( (jQ(selectors.EMPTY_CART_MESSAGE).length > 0) &&  cart.item_count == 0) {
        jQ(selectors.FORM_UPDATE_CART).hide();
        jQ(selectors.EMPTY_CART_MESSAGE).show();
    }

    // A form was passed in?
    form = form || false;
    //so it's the cart page form update, trigger behaviours for that page
    if(form) {
        //Nothing left in cart, we reveal the Nothing in cart content, hide the form.
        if(cart.item_count > 0) {
            //Loops through cart items, update the prices.
            jQ.each(cart.items, function(index, cartItem) {
                jQ(selectors.LINE_ITEM_PRICE_PREFIX + cartItem.id).html(formatMoney(cartItem.line_price));
                jQ(selectors.LINE_ITEM_QUANTITY_PREFIX + cartItem.id).val(cartItem.quantity);
            });

            //And remove any line items with 0
            jQ(form).find('input[value=0]').parents(selectors.LINE_ITEM_ROW).remove();

            //Since we are on the cart page, reenable the buttons we disabled
            jQ(form).find(selectors.FORM_UPDATE_CART_BUTTONS).attr('disabled', false).removeClass('disabled');

        }    
        //You can add any extra messaging you would want here. 
        //successMessage('Cart Updated.');
    }
};


//What to display when there is an error. You tell me?! I've left in a commented out example.
// You can tie this in to any sort of flash messages, or lightbox, or whatnot you want.
Shopify.onError = function(XMLHttpRequest, textStatus) {
  // Shopify returns a description of the error in XMLHttpRequest.responseText.
  // It is JSON.
  // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
  // var data = eval('(' + XMLHttpRequest.responseText + ')');
  // errorMessage(data.message + '(' + data.status  + '): ' + data.description);
};

//End Wrapper    
});