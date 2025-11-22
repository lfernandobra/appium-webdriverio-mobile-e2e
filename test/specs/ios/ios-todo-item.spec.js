import ListScreen from "../../screenobjects/ios/list.screen";
import ItemScreen from "../../screenobjects/ios/item.screen";

describe('Todo Item', () => {
    it('Create a Todo Item', async () => {
        // Create a todo list
        await ListScreen.createListBtn.click();
        await ListScreen.listNameInput.addValue("Things to do today");
        await ListScreen.createBtn.click();

        await expect(await ListScreen.listNameField("Things to do today")).toBeExisting();

        // Create Todo Item
        await ListScreen.listNameField('~Things to do today').click();
        await ItemScreen.createItem.click();
        await ItemScreen.title.addValue("Buy Groceries");
        await ItemScreen.dueDate.click();
        await ItemScreen.datePicker.click();
        // it's dinamic date, so adjust accordingly   
        await ItemScreen.getByAccessibility('Sunday, November 28').click();
        await ItemScreen.secondWindow.click();
        await ItemScreen.createBtn.click();

        // Assertion
        await expect(ItemScreen.getByAccessibility('Buy Groceries')).toBeExisting();
        await expect(ItemScreen.getByAccessibility('Due Sunday, November 28, 2021')).toBeExisting();
    });
});