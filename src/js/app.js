(function main() {
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

  var scenariosPaneElement = document.querySelector(
    '#featured-scenarios > .scenarios-pane')
  scenarios.forEach(function (item) {
    generateHouseItems(scenariosPaneElement, item, 'medium')
  })
})()

function generateHouseItems (container, data, elementSize) {
  var template = `<div class="house-item house-item_size_${elementSize}">
                    <img class="house-item__icon"
                         srcset="../assets/${data.icon}@1x.png 1x,
                                 ../assets/${data.icon}@2x.png 2x"
                         src="../assets/${data.icon}@1x.png"
                         alt="${data.icon}">
                    <div>
                      <div class="house-item__name">${data.name}</div>
                      ${data.description ? '<div class="house-item__description">' + data.description + '</div>' : ''}
                    </div>
                  </div>`
  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.appendChild(newHtmlElement)
}