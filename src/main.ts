import { Editor, MarkdownView, Plugin } from 'obsidian';
import { registerCheckboxExtension } from './cmExtension';
import { registerNumberWidgetPostProcessor, registerTableCheckboxPostProcessor } from './mdPostProcessor';
import { registerCheckboxEvents } from './events';

// Remember to rename these classes and interfaces!





export default class CustomCheckboxes extends Plugin {

	async onload() {


		registerCheckboxExtension(this)
		registerTableCheckboxPostProcessor(this)
		registerNumberWidgetPostProcessor(this)
		registerCheckboxEvents(this)

		this.addCommand({
			id: 'insert-checkbox',
			name: 'Вставить флажок',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection("- [ ] ")
			}
		});


		this.registerEvent(
		this.app.workspace.on("editor-menu", (menu, editor, view) => {
			menu.addItem((item) => {
				item
				.setTitle('Вставить флажок')
				.setSection("checkboxes-plus")
				.setIcon('check-square')
				.onClick(async () => {
					editor.replaceSelection("- [ ] ")
				});
			});
		}))
	}

	onunload() {

	}






}



