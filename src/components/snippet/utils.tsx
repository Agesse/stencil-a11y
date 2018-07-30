export function activateButton(button: any) {
  button.setAttribute("aria-selected", "true");
  button.setAttribute("tabindex", "0");
  button.classList.add("active");
  button.focus();
}

export function deactivateButton(button: any) {
  button.setAttribute("aria-selected", "false");
  button.classList.remove("active");
  button.setAttribute("tabindex", "-1");
}

export function generateId(prefix) {
  var id = 0;
  while (document.getElementById(prefix + "-" + id)) {
    id = Math.floor(Math.random() * Math.floor(10000));
  }
  return prefix + "-" + id;
}
