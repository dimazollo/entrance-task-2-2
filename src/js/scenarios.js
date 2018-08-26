import * as $ from 'jquery'
import { generateHouseItem } from './templateMethods'

export function initScenariosLayout (scenariosData) {
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

function updateScrollButtonsForFeaturedScenarios (scenariosData, tilesCount) {
  var element = document.querySelector('.scenarios-pane')
  if (element.scrollWidth > element.offsetWidth && window.innerWidth <= 970
    || (scenariosData.length > tilesCount && window.innerWidth > 970)) {
    $('#featured-scenarios .pagination').show(100)
  } else {
    $('#featured-scenarios .pagination').hide(100)
  }
}