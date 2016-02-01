// Get HTML elements
var addSkillButton = document.querySelector('.add-skill')
var removeSkillButton = document.querySelector('.remove-skill')
var form = document.querySelector('form')

// Get cloned node with all children of template for adding skill
var skillTemplate = document.querySelector('.skill').cloneNode(true)

// Add skill button clicked: add skill 
function addSkillHandler(evt) {

	// Get previous skill element, and clone skill template for new skill
	var prevSkill = last('.skill')
	var newSkill = skillTemplate.cloneNode(true)

	// Get Submit button, and get form element (by selecting parent of Submit button)
	var submitNode = document.querySelector('.submit')
	var form = submitNode.parentNode

	// Change the button next to the previous skill to -
	prevSkill.querySelector('.add-skill').classList.add('hidden')
	prevSkill.querySelector('.remove-skill').classList.remove('hidden')

	// Add event handlers, and insert new skill template before Submit button
	newSkill.querySelector('.add-skill').addEventListener('click', addSkillHandler)
	newSkill.querySelector('.remove-skill').addEventListener('click', removeSkillHandler)
	form.insertBefore(newSkill, submitNode)
}

// Select last element in group for input selector
function last(selector) {
	var all = document.querySelectorAll(selector)
	return all[all.length - 1]
}

// Remove skill button clicked: remove skill 
function removeSkillHandler(evt) {
	var skillToRemove = evt.currentTarget.parentNode
	skillToRemove.remove()
}

// Serialize form data to json
function serializeForm(selector) {
	var form = document.querySelector(selector)
	var formInputs = form.querySelectorAll('input:not([type=submit]),textarea')
	var jsonData = {}

	for (var i=0; i<formInputs.length; i++) {
		var item = formInputs[i]

		if (item.name ==='skills_attributes') {
			if (!!jsonData[item.name]) {
				jsonData[item.name].push({'description': item.value})
			} else {
				jsonData[item.name] = [{'description': item.value}]
			}
		} else {
			jsonData[item.name] = item.value
		}		
	}

	var wrapper = {}
	//wrapper[form.name] = jsonData
	wrapper['form'] = jsonData

	return wrapper

}

// Submit button clicked
function submitHandler(evt) {
	evt.preventDefault()
	var jsonData = serializeForm('form')
}

// Add event handlers to HTML elements
addSkillButton.addEventListener('click', addSkillHandler)
removeSkillButton.addEventListener('click', removeSkillHandler)
form.addEventListener('submit', submitHandler)
