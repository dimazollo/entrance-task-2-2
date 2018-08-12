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

function generateHouseItems (container, element, size) {
  var template = `<div class="house-item house-item_size_${size}">
                    <img class="house-item__icon"
                         srcset="../assets/${element.icon}@1x.png 1x,
                                 ../assets/${element.icon}@2x.png 2x"
                         src="../assets/${element.icon}@1x.png"
                         alt="${element.icon}">
                    <div>
                      <div class="house-item__name">${element.name}</div>
                      ${element.description ? '<div class="house-item__description">' + element.description + '</div>' : ''}
                    </div>
                  </div>`
  var element = document.createElement('div')
  element.innerHTML = template
  container.appendChild(element)
}

var scenariosPaneElement = document.querySelector('#featured-scenarios > .scenarios-pane')
scenarios.forEach(function (item) {
  generateHouseItems(scenariosPaneElement, item, 'medium')
})