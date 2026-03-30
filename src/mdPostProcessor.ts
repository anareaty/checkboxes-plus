import CustomCheckboxes from "src/main";
import { createCheckboxMenu, tableCheckboxClickEvent, updateNumberWidget } from "./events";


const renderTableCheckbox = (text: string, element: HTMLElement, plugin: CustomCheckboxes) => {

    let symbols = [" ", "x", ">", "/", "-", "~"]

    for (let symbol of symbols) {
        if (text.startsWith("- [" + symbol + "]")) {
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.classList.add("task-list-item-checkbox")
            checkbox.classList.add("table-checkbox")
            checkbox.setAttribute("data-task", symbol)
            checkbox.checked = true
            
            if (symbol == " ") {
                checkbox.checked = false
            }
            
            
            text = text.replace("- [" + symbol + "]", "")
            element.empty()
            element.append(checkbox)
            element.append(text)

            checkbox.onclick = (e) => {
                e.preventDefault()
                e.stopPropagation()
                tableCheckboxClickEvent(checkbox, plugin)
            }

            checkbox.onpointerdown = (e) => {
              e.stopPropagation()
            };

            checkbox.oncontextmenu = (e) => {
                e.preventDefault()
                e.stopPropagation()
                let cmTable = checkbox.closest(".cm-table-widget")
                if (cmTable) {
                    createCheckboxMenu(e as PointerEvent, checkbox, plugin, "table")
                }
            }

            break
        }
    }
}

export const registerTableCheckboxPostProcessor = (plugin: CustomCheckboxes) => {
    plugin.registerMarkdownPostProcessor((element, context) => {

      if (element.classList.contains("table-cell-wrapper")) {
        let text = element.innerText
        renderTableCheckbox(text, element, plugin)

      } else {
        let tableCells = element.findAll("td")

        for (let td of tableCells) {
          let text = td.innerText
          renderTableCheckbox(text, td, plugin)
        }
      }
    })
}







const renderNumberWidget = (text: string, element: HTMLElement, plugin: CustomCheckboxes) => {

    let numberMatch = text.match(/^(\{)(\d+)(\})$/)
    let colored = false
    if (!numberMatch) {
        numberMatch = text.match(/^(\{\/)(\d+)(\/\})$/)
        colored = true
    }
    


    if (numberMatch) {
        let numString = numberMatch[2]
        let numberWidget = document.createElement("span")
        numberWidget.classList.add("cp-number-widget")

        if (colored) {
            numberWidget.classList.add("cp-number-widget-colored")
        }

        numberWidget.append(numString)
        element.empty()
        element.append(numberWidget)

        numberWidget.onclick = (e) => {
            e.preventDefault()
            e.stopPropagation()
            updateNumberWidget(numString, colored, numberWidget, plugin)
        }
        numberWidget.onpointerdown = (e) => {
            e.stopPropagation()
        };
    }





    /*
    let symbols = [" ", "x", ">", "/", "-", "~"]

    for (let symbol of symbols) {
        if (text.startsWith("- [" + symbol + "]")) {
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.classList.add("task-list-item-checkbox")
            checkbox.classList.add("table-checkbox")
            checkbox.setAttribute("data-task", symbol)
            checkbox.checked = true
            
            if (symbol == " ") {
                checkbox.checked = false
            }
            
            
            text = text.replace("- [" + symbol + "]", "")
            element.empty()
            element.append(checkbox)
            element.append(text)

            checkbox.onclick = (e) => {
                e.preventDefault()
                e.stopPropagation()
                tableCheckboxClickEvent(checkbox, plugin)
            }

            checkbox.onpointerdown = (e) => {
              e.stopPropagation()
            };

            checkbox.oncontextmenu = (e) => {
                e.preventDefault()
                e.stopPropagation()
                let cmTable = checkbox.closest(".cm-table-widget")
                if (cmTable) {
                    createCheckboxMenu(e, checkbox, plugin, "table")
                }
            }

            break
        }
    }


    */
}


export const registerNumberWidgetPostProcessor = (plugin: CustomCheckboxes) => {
    plugin.registerMarkdownPostProcessor((element, context) => {

      if (element.classList.contains("table-cell-wrapper")) {
        let text = element.innerText
        renderNumberWidget(text, element, plugin)

      } else {
        let tableCells = element.findAll("td")

        for (let td of tableCells) {
          let text = td.innerText
          renderNumberWidget(text, td, plugin)
        }
      }
    })
}