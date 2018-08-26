import * as $ from 'jquery'
import { scheduledActionsData, scenariosData, devicesData } from './data'
import { generateDeviceControl, generateHouseItem } from './templateMethods'
import {initScenariosLayout} from './scenarios'


(function main () {

  // Init
  // Scheduled actions in main section
  var schedulePaneElement = document.querySelector('#main .schedule-pane')
  scheduledActionsData.forEach(function (action) {
    generateHouseItem(schedulePaneElement, action, 'big')
  })

  // Devices tiles in featured devices section
  var devicesPaneElement = document.querySelector(
      '#featured-devices > .devices-pane')
  var popupContainer = document.querySelector('.popup-container')
  var popupWrapper = document.querySelector('.popup-container-wrapper')
  var contentWrapper = document.querySelector('.wrapper')

  devicesData.forEach(function (item) {
    var deviceTile = generateHouseItem(devicesPaneElement, item, 'big')
    deviceTile.firstChild.addEventListener('click', function () {

      generateDeviceControl(popupContainer, item)

      popupContainer.classList.remove('transparent')
      popupWrapper.classList.remove('hidden')
      popupWrapper.classList.add('muted-background')
      contentWrapper.classList.add('blur')
    })
  })

  var dialogButtons = document.querySelectorAll('.popup-dialog__button')
  dialogButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      popupContainer.classList.add('transparent')

      popupWrapper.classList.remove('muted-background')
      contentWrapper.classList.remove('blur')

      var hidePopupAnimationDuration = 500 // ms
      setTimeout(function () {
        popupContainer.removeChild(popupContainer.firstChild);
        popupWrapper.classList.add('hidden')
      }, hidePopupAnimationDuration)
    })
  })

  // Vertical scroll in schedule pane
  updateDoubleArrowsInScheduleTiles()
  $('.schedule-pane').scroll(function () {
    updateDoubleArrowsInScheduleTiles()
  })
  $(window).resize(updateDoubleArrowsInScheduleTiles ())

  // Horizontal scroll with arrows in featured devices
  $('#featured-devices .arrow_direction_right').click(function () {
    $('#devices-pane').animate({
      scrollLeft: '+=200px'
    }, 'slow')
  })

  $('#featured-devices .arrow_direction_left').click(function () {
    $('#devices-pane').animate({
      scrollLeft: '-=200px'
    }, 'slow')
  })

  // Open menu from hamburger icon
  $('.header__menu-toggle').on('click', function () {
    $('.header__header-menu').slideToggle(300, function () {
      if ($(this).css('display') === 'none') {
        $(this).removeAttr('style')
      }
    })
  })

  // Hide dropdown menu from hamburger on resize to prevent bugs
  $(window).resize(function () {
    var element = $('.header__header-menu')
    if (element.attr('style')) {
      // remove JQuery generated styles
      element.removeAttr('style')
    }
  })

  // Render custom scroll buttons on overflow
  // Featured Devices
  updateScrollButtonsForFeaturedDevices()
  $(window).resize(function () {
    updateScrollButtonsForFeaturedDevices()
  })

  // Featured Scenarios
  initScenariosLayout(scenariosData)

})()

function updateScrollButtonsForFeaturedDevices () {
  var element = document.querySelector('.devices-pane')
  if (element.scrollWidth > element.offsetWidth) {
    $('#featured-devices .pagination').show(100)
  } else {
    $('#featured-devices .pagination').hide(100)
  }
}

function updateDoubleArrowsInScheduleTiles () {
  $('.schedule-pane .house-item').each(function () {
    var tileCenter = this.offsetTop + this.offsetHeight / 2
    var parentContainer = $('.schedule-pane')

    if (tileCenter > parentContainer.scrollTop() + 331
        || tileCenter < parentContainer.scrollTop()) {

      $(this).find('> .house-item__main-container').css('display', 'none')
      $(this).find('> .house-item__arrows-container').css('display', 'flex')

    } else {
      $(this).find('> .house-item__arrows-container').css('display', 'none')
      $(this).find('> .house-item__main-container').css('display', 'flex')
    }
  })
}
