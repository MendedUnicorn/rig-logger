export const multipleInputsInOne = (container) => {
  container.onkeyup = function (e) {
    var target = e.srcElement || e.target;
    var maxLength = parseInt(target.attributes['maxlength'].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === 'input') {
          if (target.value.match(/[0-8]\d/)) {
            next.focus();
            break;
          }
        }
      }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
      var previous = target;
      while ((previous = previous.previousElementSibling)) {
        if (previous == null) break;
        if (previous.tagName.toLowerCase() === 'input') {
          previous.focus();
          break;
        }
      }
    }
  };
};

// https://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value
