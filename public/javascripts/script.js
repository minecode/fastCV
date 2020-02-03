// eslint-disable-next-line no-unused-vars
const populateWithModules = (listOfModules, contentModules) => {
	listOfModules = listOfModules.sort();
	var form = document.getElementById('form');
	form.setAttribute('class', 'row text-center');
	listOfModules.forEach(element => {
		var div = document.createElement('div');
		div.setAttribute('id', element + 'Id');
		div.setAttribute('class', 'col-4 p-5');
		var h4 = document.createElement('h4');
		var title = element.replace('_', ' ').split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		var text = document.createTextNode(title);
		var preview = document.createElement('div');
		preview.setAttribute('id', element + 'Preview');
		preview.setAttribute('class', 'col-12 mt-3 mb-3');
		var image = document.createElement('img');
		image.setAttribute('src', './images/theme.svg');
		image.setAttribute('style', 'height: 100px');
		image.setAttribute('class', 'p-3');
		preview.append(image);
		var button = document.createElement('button');
		button.setAttribute('class', 'btn btn-primary btn-sm col-6');
		button.setAttribute('id', element + 'Button');
		button.setAttribute('onclick', 'addModule(\'' + element + '\', ' + contentModules[element] + ')');
		var textButton = document.createTextNode('Add');
		button.append(textButton);
		h4.append(text);
		div.append(h4);
		div.append(preview);
		div.append(button);
		form.append(div);
	});
};

// eslint-disable-next-line no-unused-vars
const addModule = (module, contentModule) => {
	var button = document.getElementById(module + 'Button');
	button.innerHTML = 'Remove';
	button.setAttribute('onclick', 'removeModule(\'' + module + '\', ' + JSON.stringify(contentModule) + ')');
	var modules = document.getElementById('modules');
	var div = document.createElement('div');
	div.setAttribute('id', module + 'Div');
	div.setAttribute('class', 'col-4');
	var content = JSON.parse(contentModule);
	var h4 = document.createElement('h4');
	var title = document.createTextNode(module.replace('_', ' ').split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
	h4.append(title);
	div.append(h4);
	var form = document.createElement('form');
	var formDiv = document.createElement('div');
	formDiv.setAttribute('class', 'form-group col-12');
	var label = document.createElement('label');
	label.setAttribute('for', 'for' + module);
	var select = document.createElement('select');
	select.setAttribute('id', 'for' + module);
	select.setAttribute('onChange', 'appendFormDiv(form, content, this.selectedIndex + 1)');
	for (var i = 0; i < content.max; i++) {
		var option = document.createElement('option');
		var text = document.createTextNode(i + 1);
		option.append(text);
		select.append(option);
	}
	label.append(select);
	formDiv.append(label);
	form.append(formDiv);
	div.append(form);
	modules.append(div);
};

// eslint-disable-next-line no-unused-vars
const removeModule = (module, contentModule) => {
	var button = document.getElementById(module + 'Button');
	button.innerHTML = 'Add';
	button.setAttribute('onclick', 'addModule(\'' + module + '\', ' + JSON.stringify(contentModule) + ')');
	var div = document.getElementById(module + 'Div');
	div.parentNode.removeChild(div);
};

const appendFormDiv = (form, content, count) => {
	console.log('======================');
	console.log(form);
	console.log('======================');
	console.log(content);
	console.log('======================');
	console.log(count);
	console.log('======================');
	for (var i = 0; i < count; i++) {
		for (var element in content) {
			if (element != 'max') {
				var formDiv = document.createElement('div');
				formDiv.setAttribute('class', 'form-group col-12');
				var label = document.createElement('label');
				label.setAttribute('for', element + 'Form');
				var text = document.createTextNode(element);
				label.append(text);
				formDiv.append(label);
				var input = document.createElement('input');
				input.setAttribute('type', 'text');
				input.setAttribute('class', 'form-control');
				input.setAttribute('id', element + 'Form');
				formDiv.append(input);
				form.append(formDiv);
			}
		}
	}
};