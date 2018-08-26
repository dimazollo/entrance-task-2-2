import { initializeKnob } from './knob'

// Template method for popup device control menu
export function generateDeviceControl (container, data) {
  var template = `
    <div class="popup-container__content device-controller">
      <div class="popup-container__header popup-header">
        <div class="popup-header__text-description text-description">
          <div class="text-description__name">${data.name}</div>
          <div class="text-description__info">${data.description}</div>
        </div>
        <div class="popup-header__status device-status">
          ${data.control === 'knob' || data.control === 'slider-temperature' ?
    '<div class="device-status__current-value">' +
    data.currentValue +
    '</div>' : '' }
          <img class="device-status__icon" 
               src="/assets/${data.icon}@2x.png">
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
    initializeKnob('.controls__knob')
  }

  // Block scroll of underlying content on slider moving
  if (data.control === 'slider-light' || data.control === 'slider-temperature') {
    document
    .querySelector('.controls__slider')
    .addEventListener('touchmove', function (e) {
      e.stopPropagation();
      return false;
    })
  }

}

// Template method for house device or action element
export function generateHouseItem (container, data, elementSize) {
  var template =
    `<div class="house-item house-item_size_${elementSize}">
      <div class="house-item__main-container">
        <img class="house-item__icon"
             srcset="/assets/${data.icon}@1x.png 1x,
                     /assets/${data.icon}@2x.png 2x"
             src="/assets/${data.icon}@1x.png">
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
          <img srcset="/assets/Icons_/Arrow_Double_/M.png 1x,
                       /assets/Icons_/Arrow_Double_/M@2x.png 2x"
               src="/assets/Icons_/Arrow_Double_/M.png">
        </div>
        <div class="arrows-container__double-arrow_direction_down">
          <img srcset="/assets/Icons_/Arrow_Double_/M.png 1x,
                       /assets/Icons_/Arrow_Double_/M@2x.png 2x"
               src="/assets/Icons_/Arrow_Double_/M.png">
        </div>
      </div>
    </div>`
  var newHtmlElement = document.createElement('div')
  newHtmlElement.innerHTML = template
  container.appendChild(newHtmlElement)
  return newHtmlElement
}