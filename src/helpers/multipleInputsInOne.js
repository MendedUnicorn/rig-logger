// export const multipleInputsInOne = (container) => {
//   container.onkeyup = function (e) {
//     var target = e.srcElement || e.target;
//     console.log('target', target, e);
//     var maxLength = parseInt(target.attributes['maxlength'].value, 10);
//     var myLength = target.value.length;
//     if (e.key === 'Tab') {
//       myLength = 1;
//     }
//     console.log('mylength', myLength, 'maxlength', maxLength);
//     if (myLength >= maxLength) {
//       var next = target;
//       while ((next = next.nextElementSibling)) {
//         if (next == null) break;
//         if (next.tagName.toLowerCase() === 'input') {
//           next.focus();
//           break;
//         }
//       }
//     }
//     // Move to previous field if empty (user pressed backspace)
//     else if (myLength === 0) {
//       var previous = target;
//       while ((previous = previous.previousElementSibling)) {
//         if (previous == null) break;
//         if (previous.tagName.toLowerCase() === 'input') {
//           previous.focus();
//           break;
//         }
//       }
//     }
//   };
// };

// https://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value

export const multipleInputsInOne = (container) => {
  const inputs = container.querySelectorAll('input');
  inputs.forEach((input, i) => {
    input.addEventListener('keyup', (e) => {
      console.log(e);
      if (e.key === 'Enter' || input.value.length == 2) {
        inputs[i + 1].focus();
      }
      if (e.key === 'Backspace' && input.value.length == 0) {
        inputs[i - 1].focus();
      }
    });
  });
};

// my own creation
