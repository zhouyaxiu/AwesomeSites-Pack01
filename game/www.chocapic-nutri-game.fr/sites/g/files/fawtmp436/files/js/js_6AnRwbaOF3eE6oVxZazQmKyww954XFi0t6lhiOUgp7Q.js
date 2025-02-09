/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.3.1
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("whatInput",[],t):"object"==typeof exports?exports.whatInput=t():e.whatInput=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";e.exports=function(){var e="initial",t=null,n=document.documentElement,o=["input","select","textarea"],r=[],i=[16,17,18,91,93],u=[9],d={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},a=[],s=!1,p=!1,c={x:null,y:null},f={2:"touch",3:"touch",4:"mouse"},v=!1;try{var l=Object.defineProperty({},"passive",{get:function(){v=!0}});window.addEventListener("test",null,l)}catch(e){}var h=function(){d[M()]="mouse",m(),y()},m=function(){var e=!!v&&{passive:!0};window.PointerEvent?(n.addEventListener("pointerdown",w),n.addEventListener("pointermove",x)):window.MSPointerEvent?(n.addEventListener("MSPointerDown",w),n.addEventListener("MSPointerMove",x)):(n.addEventListener("mousedown",w),n.addEventListener("mousemove",x),"ontouchstart"in window&&(n.addEventListener("touchstart",E,e),n.addEventListener("touchend",E))),n.addEventListener(M(),x,e),n.addEventListener("keydown",w),n.addEventListener("keyup",w)},w=function(n){if(!s){var r=n.which,a=d[n.type];if("pointer"===a&&(a=b(n)),e!==a||t!==a){var p=document.activeElement,c=!1,f=p&&p.nodeName&&o.indexOf(p.nodeName.toLowerCase())===-1;(f||u.indexOf(r)!==-1)&&(c=!0),("touch"===a||"mouse"===a||"keyboard"===a&&r&&c&&i.indexOf(r)===-1)&&(e=t=a,y())}}},y=function(){n.setAttribute("data-whatinput",e),n.setAttribute("data-whatintent",e),a.indexOf(e)===-1&&(a.push(e),n.className+=" whatinput-types-"+e),L("input")},x=function(e){if(c.x!==e.screenX||c.y!==e.screenY?(p=!1,c.x=e.screenX,c.y=e.screenY):p=!0,!s&&!p){var o=d[e.type];"pointer"===o&&(o=b(e)),t!==o&&(t=o,n.setAttribute("data-whatintent",t),L("intent"))}},E=function(e){"touchstart"===e.type?(s=!1,w(e)):s=!0},L=function(e){for(var n=0,o=r.length;n<o;n++)r[n].type===e&&r[n].fn.call(void 0,t)},b=function(e){return"number"==typeof e.pointerType?f[e.pointerType]:"pen"===e.pointerType?"touch":e.pointerType},M=function(){var e=void 0;return e="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},O=function(e){for(var t=0,n=r.length;t<n;t++)if(r[t].fn===e)return t};return"addEventListener"in window&&Array.prototype.indexOf&&h(),{ask:function(n){return"loose"===n?t:e},types:function(){return a},ignoreKeys:function(e){i=e},registerOnChange:function(e,t){r.push({fn:e,type:t||"input"})},unRegisterOnChange:function(e){var t=O(e);t&&r.splice(t,1)}}}()}])});;
/**
 * @file
 * Contains Trademark Workaround script function
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.trademarkWorkaround = {
    attach: function () {
      $('h1, h2, h3, h4').each(function(){
        const str = $(this).html();
        const res = str.replace(/[™®©]/g, '<sup>$&</sup>');
        $(this).html(res);
      }); 
    }
  };
})(jQuery, Drupal);;
/**
 * @file Common data layer helper.
 */

(function ($) {
  Drupal.behaviors.dataLayer = {

    /**
     * The language prefix list (no blank).
     *
     * @return {array}
     */
    langPrefixes: function langPrefixes() {
      var languages = Drupal.settings.dataLayer.languages,
          langList = [];

      for (var lang in languages) {
        if (languages[lang].prefix !== '') {
          langList.push(languages[lang].prefix);
        }
      }
      return langList;

      // With Underscore.js dependency.
      //var list = _.pluck(Drupal.settings.datalayer.languages, 'prefix');
      //return _.filter(list, function(lang) { return lang });
    },

    /**
     * Drupal behavior.
     */
    attach: function() { return }

  };
})(jQuery);
;
/**
 * @file
 *   Javascript for the event tracking on Buy Now button from advanced datalayer.
 */
(function ($) {
  // Check Product page is exist on any content type.

  $(document).ready(function () {
    if ($(".dsu-product-component-list").length > 0) {
      // Call on submit drupal ratings & reviews form.
      $('.dsu-product-component-list button').click(function () {
        // Get content category of the node.
        var content_category = $(this).parents('.dsu-product-component-list').data('eventcategory');
        // Get content brand of the node.
        var content_brand = $(this).parents('.dsu-product-component-list').data('eventbrand');
        // Get content id of the node.
        var content_id = $(this).parents('.dsu-product-component-list').data('eventid');
        // Get title of the node.
        var content_title = $(this).parents('.dsu-product-component-list').data('eventlabel');
        dataLayer.push({
          event: "buyNowButtonClick",
          eventCategory: "Buy Now",
          eventAction: "Buy Now Click",
          eventLabel: content_title,
          productBrand: content_brand,
          productCategory: content_category,
          productName: content_title,
          productId: content_id.toString(),
          buyNowClicked: 1
        });
      });
    }
  });

})(jQuery);
;
