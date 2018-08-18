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

  // var scenariosPaneElement = document.querySelector(
  //   '#featured-scenarios > .scenarios-pane')
  // scenarios.forEach(function (item) {
  //   generateHouseItem(scenariosPaneElement, item, 'medium')
  // })

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

  // Pagination
  initScenariosLayout(scenarios)

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

  $('#featured-scenarios .pagination__arrow.arrow_direction_left')
      .click(function () {
        if (currentPage > 0) {
          currentPage--
          scenariosPane.fadeOut(120, function () {
            fillScenariosPage(scenariosPane, currentPage, tilesCount, scenariosData)
            scenariosPane.fadeIn(120)
          })
        }
      })

  $('#featured-scenarios .pagination__arrow.arrow_direction_right')
    .click(function () {
      if (scenariosData.length > tilesCount * (currentPage + 1)) {
        currentPage++
        scenariosPane.fadeOut(120, function () {
          fillScenariosPage(scenariosPane, currentPage, tilesCount, scenariosData)
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
           src="../assets/${data.icon}@1x.png"
           alt="${data.icon}">
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
  containerElement, pageNum, numberOfElements, data) {
  var startElementNumber = pageNum * numberOfElements
  var endElementNumber = startElementNumber + numberOfElements
  for (var i = startElementNumber; i < endElementNumber; i++) {
    if (data[i]) {
      generateHouseItem(containerElement, data[i], 'medium')
    }
  }
}
