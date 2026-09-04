import { Menu, Platform } from "obsidian";
import CustomCheckboxes from "./main";


const updateTableCheckbox = (target: HTMLElement, newSymbol: string, plugin: CustomCheckboxes) => {
    const symbol = target.getAttribute("data-task")
    let cell = target.closest("td")
    if(!cell) {
        cell = target.closest("th")
        if (!cell) return
    }
    const row = target.closest("tr")
    if(!row) return
    const body = target.closest("tbody")
    if (!body) {
        const head = target.closest("thead")
        if (!head) return
    }
    
    const table = target.closest(".cm-table-widget")
    const prevLine = table?.previousElementSibling
    
    if (prevLine instanceof HTMLElement) {
        const tableStart = prevLine.getAttribute("data-table-start") || "0"

        let rowIndex = -2
        if (body) {
        rowIndex = Array.from(body.children).indexOf(row)
        }
        
        const cellIndex = Array.from(row.children).indexOf(cell)
        const editor = plugin.app.workspace.activeEditor?.editor
        if (!editor) return
        const tableStartPos = editor.offsetToPos(Number(tableStart))
        const rowStartLine = tableStartPos.line + 2 + rowIndex
        let rowLineText = editor.getLine(rowStartLine)
        const cells = rowLineText.split(" | ")
        const cellText = cells[cellIndex]

        cells[cellIndex] = cellText.replace("- [" + symbol + "]", "- [" + newSymbol + "]")

        rowLineText = cells.join(" | ")
        editor.setLine(rowStartLine, rowLineText)
    }
}




const updateListCheckbox = (target: HTMLElement, newSymbol: string, plugin: CustomCheckboxes) => {
    const wrapper = target.closest(".custom-checkbox")
    
    if(!wrapper) return
    const editor = plugin.app.workspace.activeEditor?.editor
    if (!editor) return
    const checkboxStart = wrapper.getAttribute("data-checkbox-start")
    const checkboxStartPos = editor.offsetToPos(Number(checkboxStart))
    const symbol = target.getAttribute("data-task")
    let checkboxLineText = editor.getLine(checkboxStartPos.line)
    checkboxLineText = checkboxLineText.replace("- [" + symbol + "]", "- [" + newSymbol + "]")
    editor.setLine(checkboxStartPos.line , checkboxLineText)
}



export const tableCheckboxClickEvent = (target: HTMLElement, plugin: CustomCheckboxes) => {
    const symbol = target.getAttribute("data-task")
    if (symbol == " ") {
        updateTableCheckbox(target, "x", plugin)
    } else {
        updateTableCheckbox(target, " ", plugin)
    }
        
}



const checkboxUpdateFunc = (target: HTMLElement, newSymbol: string, plugin: CustomCheckboxes, type: string) => {
    if (type == "table") {
        updateTableCheckbox(target, newSymbol, plugin)
    } else {
        updateListCheckbox(target, newSymbol, plugin)
    }
}



export const createCheckboxMenu = (e: PointerEvent, target: HTMLElement, plugin: CustomCheckboxes, type: string) => {

    const checkboxMenu = new Menu()
    //@ts-ignore
    checkboxMenu.dom?.classList.add("checkbox-menu")

    checkboxMenu.addItem(item => item
      .setTitle("Задача")
      .setIcon("circle")
      .onClick(() => {
        checkboxUpdateFunc(target, " ", plugin, type)
      })
    )
    
    checkboxMenu.addItem(item => item
      .setTitle("Выполнено")
      .setIcon("check-circle-2")
      .onClick(() => {
        checkboxUpdateFunc(target, "x", plugin, type)
      })
    )
    
    checkboxMenu.addItem(item => item
      .setTitle("Начато")
      .setIcon("circle-slash")
      .onClick(() => {
        checkboxUpdateFunc(target, "/", plugin, type)
      })
    )

    checkboxMenu.addItem(item => item
      .setTitle("Перенесено")
      .setIcon("chevron-right-circle")
      .onClick(() => {
        checkboxUpdateFunc(target, ">", plugin, type)
      })
    )
    
    checkboxMenu.addItem(item => item
      .setTitle("Отменено")
      .setIcon("minus")
      .onClick(() => {
        checkboxUpdateFunc(target, "-", plugin, type)
      })
    )
    
    checkboxMenu.addItem(item => item
      .setTitle("Провалено")
      .setIcon("x-circle")
      .onClick(() => {
        checkboxUpdateFunc(target, "~", plugin, type)
      })
    )

    checkboxMenu.showAtMouseEvent(e)
}



const contextMenuEvent = (e: PointerEvent, plugin: CustomCheckboxes) => {
  const target = e.target;
  if (target instanceof HTMLElement && target.classList.contains("task-list-item-checkbox")) {
    const cmLine = target.closest(".HyperMD-list-line");
    if (cmLine) {
      createCheckboxMenu(e, target, plugin, "list");
    }
  }
}


export const registerCheckboxEvents = (plugin: CustomCheckboxes) => {

    if (Platform.isDesktop) {
      plugin.registerDomEvent(document, "mousedown", (e) => {
        if (e.button == 2) {
          contextMenuEvent(e as PointerEvent, plugin)
        }
      });
    } else {
      plugin.registerDomEvent(document, "contextmenu", (e) => {
        contextMenuEvent(e as PointerEvent, plugin)
      });
    }


    plugin.registerEvent(plugin.app.workspace.on("editor-menu", (menu, editor, info) => {
        //@ts-ignore
        menu.dom?.classList.add("editor-menu")
    }))
}





export const updateNumberWidget = (numString: string, colored: boolean, target: HTMLElement, plugin: CustomCheckboxes) => {

    let cell = target.closest("td")
    if(!cell) {
        cell = target.closest("th")
        if (!cell) return
    }
    const row = target.closest("tr")
    if(!row) return
    const body = target.closest("tbody")
    if (!body) {
        const head = target.closest("thead")
        if (!head) return
    }
    
    const table = target.closest(".cm-table-widget")
    const prevLine = table?.previousElementSibling
    
    if (prevLine instanceof HTMLElement) {
        const tableStart = prevLine.getAttribute("data-table-start") || "0"

        let rowIndex = -2
        if (body) {
        rowIndex = Array.from(body.children).indexOf(row)
        }
        
        const cellIndex = Array.from(row.children).indexOf(cell)
        const editor = plugin.app.workspace.activeEditor?.editor
        if (!editor) return
        const tableStartPos = editor.offsetToPos(Number(tableStart))
        const rowStartLine = tableStartPos.line + 2 + rowIndex
        let rowLineText = editor.getLine(rowStartLine)
        const cells = rowLineText.split(" | ")
        const cellText = cells[cellIndex]

        let oldText = "{" + numString + "}"
        let newText = "{/" + numString + "/}"

        if (colored) {
          oldText = "{/" + numString + "/}"
          newText = "{" + numString + "}"
        }

        cells[cellIndex] = cellText.replace(oldText, newText)

        rowLineText = cells.join(" | ")
        editor.setLine(rowStartLine, rowLineText)
    }


    
}