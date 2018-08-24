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
      icon: 'icon_sun_2',
      name: 'Xiaomi Yeelight LED',
      description: 'Включено'
    },
    {
      icon: 'icon_sun',
      name: 'D-Link Omna 180 Cam',
      description: 'Включится в 17:00'
    },
    {
      icon: 'icon_temperature',
      name: 'Elgato Eve Degree Connected',
      description: 'Выключено до 17:00'
    },
    {
      icon: 'icon_sun',
      name: 'LIFX Mini Day & Dusk A60 E27',
      description: 'Включится в 17:00'
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
  var schedulePaneElement = document.querySelector('#main .schedule-pane')
  scheduledActions.forEach(function (action) {
    generateHouseItem(schedulePaneElement, action, 'big')
  })

  var devicesPaneElement = document.querySelector(
    '#featured-devices > .devices-pane')
  devices.forEach(function (item) {
    generateHouseItem(devicesPaneElement, item, 'big')
  })

  // Vertical scroll on schedule pane
  // TODO - your code

  // Horizontal scroll with arrows on featured devices
  $('#featured-devices .arrow_direction_right').click(function () {
    event.preventDefault()
    $('#devices-pane').animate({
      scrollLeft: '+=200px'
    }, 'slow')
  })

  $('#featured-devices .arrow_direction_left').click(function () {
    event.preventDefault()
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

  // hide hamburger menu on resize to prevent bugs
  $(window).resize(function () {
    var element = $('.header__header-menu')
    if (element.attr('style')) {
      element.removeAttr('style')
    }
  })

  // Pagination
  initScenariosLayout(scenarios)

  // Circular regulator
  $(function () {
    $('.device-regulator__knob').knob({
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

      draw: function () {
        var a = this.arc(this.cv)  // Arc
        var r = 1

        // Border lines
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

        // central circle with shadow
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
  })

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

  fillScenariosPage(scenariosPane, currentPage, tilesCount, scenariosData)

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
  })

  $('#featured-scenarios .pagination__arrow.arrow_direction_left').
    click(function () {
      if (currentPage > 0) {
        currentPage--
        scenariosPane.fadeOut(120, function () {
          fillScenariosPage(scenariosPane, currentPage, tilesCount,
            scenariosData)
          scenariosPane.fadeIn(120)
        })
      }
    })

  $('#featured-scenarios .pagination__arrow.arrow_direction_right').
    click(function () {
      if (scenariosData.length > tilesCount * (currentPage + 1)) {
        currentPage++
        scenariosPane.fadeOut(120, function () {
          fillScenariosPage(scenariosPane, currentPage, tilesCount,
            scenariosData)
          scenariosPane.fadeIn(120)
        })
      }
    })
}

function fillScenariosPage (
  scenariosPane, pageNum, numberOfElements, scenarios) {
  var scenariosPaneElement = scenariosPane.get(0)
  scenariosPaneElement.innerHTML = ''
  fillPageWithHouseItems(scenariosPaneElement, pageNum, numberOfElements,
    scenarios)
}

// Template method for house device or action element
function generateHouseItem (container, data, elementSize) {
  var template =
    `<div class="house-item house-item_size_${elementSize}">
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
    </div>`
  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.appendChild(newHtmlElement)
}

function calculateColumnCount (blockWidth, columnWidth, columnGap) {
  return Math.floor((blockWidth + columnGap) / (columnWidth + columnGap))
}

function fillPageWithHouseItems (
  containerElement, pageNumber, numberOfElementsOnPage, data) {
  var startElementNumber = pageNumber * numberOfElementsOnPage
  var endElementNumber = startElementNumber + numberOfElementsOnPage
  for (var i = startElementNumber; i < endElementNumber; i++) {
    if (data[i]) {
      generateHouseItem(containerElement, data[i], 'medium')
    }
  }
}
