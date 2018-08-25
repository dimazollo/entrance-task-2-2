(function main () {
  var scheduledActions = [
    {
      icon: 'icon_temperature',
      name: 'Philips Cooler',
      description: 'Начнёт охлаждать в 16:30'
    },
    {
      icon: 'icon_sun',
      name: 'Xiaomi Yeelight LED Smart Bulb',
      description: 'Включится в 17:00'
    },
    {
      icon: 'icon_sun',
      name: 'Xiaomi Some Device',
      description: 'Включится в 17:10'
    },
    {
      icon: 'icon_sun',
      name: 'Xiaomi Some Device',
      description: 'Включится в 19:00'
    }
  ]

  var scenarios = [
    {
      icon: 'icon_sun_2',
      name: 'Включить весь свет в доме и во дворе'
    },
    {
      icon: 'icon_scheduled',
      name: 'Я ухожу'
    },
    {
      icon: 'icon_sun_2',
      name: 'Включить свет в коридоре'
    },
    {
      icon: 'icon_temperature_2',
      name: 'Набрать горячую ванну',
      description: 'Начнётся в 18:00'
    },
    {
      icon: 'icon_temperature_2',
      name: 'Сделать пол тёплым во всей квартире'
    }
  ]

  var devices = [
    {
      icon: 'icon_temperature_2',  // Pattern name is {icon_name}@{icon_scale}.{icon_type}
                              // Scale and type are specified in template
      name: 'Xiaomi Warm Floor',
      description: 'Включено',
      currentValue: '23',     // Some init value for regulator
      control: 'knob',  // Could be 'knob', 'slider-temperature', 'slider-light'
    },
    {
      icon: 'icon_sun_2',
      name: 'Xiaomi Yeelight LED',
      description: 'Включено',
      currentValue: '60',
      control: 'slider-light'
    },
    {
      icon: 'icon_temperature',
      name: 'Elgato Eve Degree Connected',
      description: 'Выключено до 17:00',
      currentValue: '15',
      control: 'slider-temperature',
    },
    {
      icon: 'icon_sun',
      name: 'D-Link Omna 180 Cam',
      description: 'Включится в 17:00'
    },
    {
      icon: 'icon_sun',
      name: 'LIFX Mini Day & Dusk A60 E27',
      description: 'Включится в 17:00',
      currentValue: '60',
      control: 'slider-light'
    },
    {
      icon: 'icon_sun_2',
      name: 'Xiaomi Mi Air Purifier 2S',
      description: 'Включено'
    },
    {
      icon: 'icon_sun',
      name: 'Philips Zhirui',
      description: 'Выключено'
    },
    {
      icon: 'icon_sun_2',
      name: 'Xiaomi Some Device'
    }
  ]

  // Init
  // Scheduled actions in main section
  var schedulePaneElement = document.querySelector('#main .schedule-pane')
  scheduledActions.forEach(function (action) {
    generateHouseItem(schedulePaneElement, action, 'big')
  })

  // Devices tiles in featured devices section
  var devicesPaneElement = document.querySelector(
      '#featured-devices > .devices-pane')
  var popupContainer = document.querySelector('.popup-container')
  var popupWrapper = document.querySelector('.popup-container-wrapper')
  var contentWrapper = document.querySelector('.wrapper')

  devices.forEach(function (item) {
    var deviceTile = generateHouseItem(devicesPaneElement, item, 'big')
    deviceTile.firstChild.addEventListener('click', function () {

      generateDeviceControl(popupContainer, item)

      popupContainer.classList.remove('transparent')
      popupWrapper.classList.remove('hidden')
      popupWrapper.classList.add('muted-background')
      contentWrapper.classList.add('blur')
    })
  })

  var dialogButtons = document.querySelectorAll('.popup-controls__button')
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

  // hide dropdown menu from hamburger on resize to prevent bugs
  $(window).resize(function () {
    var element = $('.header__header-menu')
    if (element.attr('style')) {
      // remove JQuery generated styles
      element.removeAttr('style')
    }
  })

  // render custom scroll buttons on overflow
  // Featured Devices
  updateScrollButtonsForFeaturedDevices()
  $(window).resize(function () {
    updateScrollButtonsForFeaturedDevices()
  })

  // Featured Scenarios
  initScenariosLayout(scenarios)

  // Circular regulator
})()

function initScenariosLayout (scenariosData) {
  // constants in accordance with the layout

  var scenariosPane = $('#featured-scenarios .scenarios-pane')
  var tileWidth = 200
  var hGap = 15
  var rowCount = 3

  var currentPage = 0
  var tilesCount = calculateColumnCount(scenariosPane.width(), tileWidth,
      hGap) * rowCount

  var minWidthForPaging = 970

  fillScenariosPage(scenariosPane, currentPage, tilesCount, scenariosData)
  updateScrollButtonsForFeaturedScenarios(scenariosData, tilesCount)

  $(window).resize(function () {
    var newTilesCount = calculateColumnCount(
        scenariosPane.width(), tileWidth, hGap) * rowCount

    if (tilesCount !== newTilesCount) {
      tilesCount = newTilesCount
      if (scenariosData.length < currentPage * tilesCount) {
        currentPage--
      }
      fillScenariosPage(scenariosPane, currentPage, tilesCount, scenariosData)
    }
    updateScrollButtonsForFeaturedScenarios(scenariosData, tilesCount)
  })

  $('#featured-scenarios .pagination__arrow.arrow_direction_left')
      .click(function () {
        if (window.innerWidth > minWidthForPaging) {
          if (currentPage > 0) {
            currentPage--
            scenariosPane.fadeOut(120, function () {
              fillScenariosPage(scenariosPane, currentPage, tilesCount,
                scenariosData)
              scenariosPane.fadeIn(120)
            })
          }
        } else {
          scenariosPane.animate({
            scrollLeft: '-=200px'
          }, 'slow')
        }
      })

  $('#featured-scenarios .pagination__arrow.arrow_direction_right')
      .click(function () {
        if (window.innerWidth > minWidthForPaging) {
          if (scenariosData.length > tilesCount * (currentPage + 1)) {
            currentPage++
            scenariosPane.fadeOut(120, function () {
              fillScenariosPage(scenariosPane, currentPage, tilesCount,
                scenariosData)
              scenariosPane.fadeIn(120)
            })
          }
        } else {
          scenariosPane.animate({
            scrollLeft: '+=200px'
          }, 'slow')
        }
      })
}

function fillScenariosPage (
  scenariosPane, pageNum, numberOfElements, scenarios) {
  var scenariosPaneElement = scenariosPane.get(0)
  while (scenariosPaneElement.firstChild) {
    scenariosPaneElement.removeChild(scenariosPaneElement.firstChild);
  }
  fillPageWithHouseItems(scenariosPaneElement,
      pageNum, numberOfElements, scenarios)
}

// Template method for house device or action element
function generateHouseItem (container, data, elementSize) {
  var template =
    `<div class="house-item house-item_size_${elementSize}">
      <div class="house-item__main-container">
        <img class="house-item__icon"
             srcset="../assets/${data.icon}@1x.png 1x,
                     ../assets/${data.icon}@2x.png 2x"
             src="../assets/${data.icon}@1x.png">
        <div>
          <div class="house-item__name">${data.name}</div>
            ${data.description ?
          '<div class="house-item__description">' +
            data.description +
          '</div>'
          : ''}
        </div>
      </div>
      <div class="house-item__arrows-container">
        <div class="arrows-container__double-arrow_direction_up">
          <img srcset="../assets/Icons_/Arrow_Double_/M.png 1x,
                       ../assets/Icons_/Arrow_Double_/M@2x.png 2x"
               src="../assets/Icons_/Arrow_Double_/M.png">
        </div>
        <div class="arrows-container__double-arrow_direction_down">
          <img srcset="../assets/Icons_/Arrow_Double_/M.png 1x,
                       ../assets/Icons_/Arrow_Double_/M@2x.png 2x"
               src="../assets/Icons_/Arrow_Double_/M.png">
        </div>
      </div>
    </div>`
  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.appendChild(newHtmlElement)
  return newHtmlElement
}

// Template method for popup device control menu
function generateDeviceControl (container, data) {
  var template = `
    <div class="popup-container__content device-controller">
      <div class="popup-container__header popup-header">
        <div class="popup-header__text-description text-description">
          <div class="text-description__name">${data.name}</div>
          <div class="text-description__info">${data.description}</div>
        </div>
        <div class="popup-header__status device-status">
          <div class="device-status__current-value">
            ${data.currentValue}
          </div>
          <img class="device-status__icon" 
               src="../assets/${data.icon}@2x.png">
        </div>
      </div>
      ${data.control === 'slider-light' ?
          '<div class="device-controller__menu">' +
            '<ul class="mode-menu">' +
              '<li class="mode-menu__button mode-menu__button_highlighted">Вручную</li>' +
              '<li class="mode-menu__button">Дневной свет</li>' +
              '<li class="mode-menu__button">Вечерный свет</li>' +
              '<li class="mode-menu__button">Рассвет</li>' +
            '</ul>' +
          '</div>' : '' }
      ${data.control === 'slider-temperature' ?
          '<div class="device-controller__menu">' +
            '<ul class="mode-menu">' +
              '<li class="mode-menu__button mode-menu__button_highlighted">Вручную</li>' +
              '<li class="mode-menu__button">Холодно</li>' +
              '<li class="mode-menu__button">Тепло</li>' +
              '<li class="mode-menu__button">Жарко</li>' +
            '</ul>' +
          '</div>' : '' }
      <div class="device-controller__controls">
          ${data.control === 'knob' ?
              '<div><input type="text" value="' +
                data.currentValue + '" ' +
                'class="controls__knob"></div>': ''}
          ${data.control === 'slider-temperature' ?
              '<input type="range" min="-10" max="30" value="' +
                data.currentValue +
                '" class="controls__slider ' +
                'controls__slider_type_temperature">' : ''}
          ${data.control === 'slider-light' ?
              '<input type="range" min="1" max="100" value="' +
                data.currentValue + '" ' +
                'class="controls__slider ' +
                'controls__slider_type_light">' : ''}
      </div>
    </div>
    `

  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.insertBefore(newHtmlElement, container.firstChild)
  if (data.control === 'knob') {
    initializeKnob()
  }
}

function initializeKnob() {
  $('.controls__knob').knob({
    min: 10,
    max: 30,
    thickness: 0.01,
    angleArc: 290,
    angleOffset: -145,
    cursor: true,
    fgColor: '#333333',
    width: 221,
    height: 221,

    // Add plus or minus sign to the value of circular regulator
    format: function(v) {
      if (v > 0) {
        return '+' + v
      } else if (v === 0) {
        return v
      } else if (v < 0) {
        return '-' + v
      }
    },
    // Override draw
    draw: function () {
      var a = this.arc(this.cv)  // Arc
      var r = 1

      // Outer radial dashes
      this.g.beginPath()
      this.g.strokeStyle = this.o.fgColor

      this.g.lineWidth = 1 * this.scale
      this.g.strokeStyle = '#F5A623'
      var numberOfDashes = 138 // Approximately
      var step = this.PI2 / numberOfDashes
      var proportion = 0.81;  // ratio of inner circle radius to outer circle
      for (var angle = this.startAngle; angle < this.endAngle; angle += step) {
        this.g.beginPath();
        this.g.moveTo(this.xy + this.radius * proportion * Math.cos(angle),
          this.xy + this.radius * proportion * Math.sin(angle));
        this.g.lineTo(this.xy + this.radius * Math.cos(angle),
          this.xy + this.radius * Math.sin(angle))

        if (angle < (a.s + a.e) / 2) {
          this.g.strokeStyle = '#F5A623'
        } else {
          this.g.strokeStyle = '#333333'
        }
        this.g.stroke()
      }

      // Central circle with shadow
      this.g.strokeStyle = '#FEFEFE'
      this.g.fillStyle = '#FEFEFE'
      this.g.shadowColor = 'rgba(134,121,71,0.45)'
      this.g.shadowBlur = 4 * this.scale
      this.g.shadowOffsetY = 2 * this.scale

      this.g.beginPath()
      this.g.arc(this.xy, this.xy, this.radius * proportion + 1, 0, 2 * Math.PI, false)
      this.g.stroke()
      this.g.fill()

      // Cursor
      this.g.fillStyle = '#333333'
      this.g.strokeStyle = '#333333'
      this.g.shadowColor = 'transparent'
      this.g.lineWidth = 2 * this.scale

      var headLen = 6 * this.scale
      var headAngle = (a.s + a.e) / 2
      var toX = this.xy + this.radius * proportion * Math.cos(headAngle)
      var toY = this.xy + this.radius * proportion * Math.sin(headAngle)

      this.g.beginPath()
      this.g.strokeStyle = r ? this.o.fgColor : this.fgColor

      this.g.moveTo(toX, toY)
      this.g.lineTo(toX - headLen * Math.cos(headAngle - Math.PI / 4), toY - headLen * Math.sin(headAngle - Math.PI / 4))

      // Path from the side point of the arrow, to the other side point
      this.g.lineTo(toX - headLen * Math.cos(headAngle + Math.PI / 4), toY - headLen * Math.sin(headAngle + Math.PI / 4))

      // Path from the side point back to the tip of the arrow, and then again to the opposite side point
      this.g.lineTo(toX, toY)
      this.g.lineTo(toX - headLen * Math.cos(headAngle - Math.PI / 4), toY - headLen * Math.sin(headAngle - Math.PI / 4))
      this.g.stroke()
      this.g.fill()

      return false
    }
  })
}


function calculateColumnCount (blockWidth, columnWidth, columnGap) {
  return Math.floor((blockWidth + columnGap) / (columnWidth + columnGap))
}

function fillPageWithHouseItems (containerElement, pageNumber,
      numberOfElementsOnPage, data) {
  var startElementNumber = pageNumber * numberOfElementsOnPage
  var endElementNumber = startElementNumber + numberOfElementsOnPage
  for (var i = startElementNumber; i < endElementNumber; i++) {
    if (data[i]) {
      generateHouseItem(containerElement, data[i], 'medium')
    }
  }
}

function closePopupWindow (container) {
  container.remove(container.firstChild);

}

function updateScrollButtonsForFeaturedScenarios (scenariosData, tilesCount) {
  var element = document.querySelector('.scenarios-pane')
  if (element.scrollWidth > element.offsetWidth && window.innerWidth <= 970
      || (scenariosData.length > tilesCount && window.innerWidth > 970)) {
    $('#featured-scenarios .pagination').show(100)
  } else {
    $('#featured-scenarios .pagination').hide(100)
  }
}

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
    var element = this
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
