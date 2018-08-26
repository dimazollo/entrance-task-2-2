export var scheduledActionsData = [
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

export var scenariosData = [
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

export var devicesData = [
  {
    icon: 'icon_temperature_2', // Pattern name is {icon_name}@{icon_scale}.{icon_type}
                                // Scale and type are specified in template
    name: 'Xiaomi Warm Floor',
    description: 'Включено',
    currentValue: '23', // Some init value for regulator
    control: 'knob', // Could be 'knob', 'slider-temperature', 'slider-light'
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