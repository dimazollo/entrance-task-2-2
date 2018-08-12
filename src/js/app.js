(function main () {
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
  var scenariosPaneElement = document.querySelector(
    '#featured-scenarios > .scenarios-pane')
  scenarios.forEach(function (item) {
    generateHouseItem(scenariosPaneElement, item, 'medium')
  })

  var devicesPaneElement = document.querySelector(
    '#featured-devices > .devices-pane')
  devices.forEach(function (item) {
    generateHouseItem(devicesPaneElement, item, 'big')
  })


  // Horizontal scroll with arrows on screen
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

})()

// Template method for house device or action element
function generateHouseItem (container, data, elementSize) {
  var template = `<div class="house-item house-item_size_${elementSize}">
                    <img class="house-item__icon"
                         srcset="../assets/${data.icon}@1x.png 1x,
                                 ../assets/${data.icon}@2x.png 2x"
                         src="../assets/${data.icon}@1x.png"
                         alt="${data.icon}">
                    <div>
                      <div class="house-item__name">${data.name}</div>
                      ${data.description
    ? '<div class="house-item__description">' + data.description + '</div>'
    : ''}
                    </div>
                  </div>`
  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.appendChild(newHtmlElement)
}


