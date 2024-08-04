const commands = {
  help: "Available commands: help, clear, echo, date, shark",
  clear: () => document.getElementById('output').innerHTML = '',
  echo: (args) => args.join(' '),
  date: () => new Date().toLocaleString(),
  shark: () => `
                __
               / _)
      _.----._/ /
     /         /
  __/ (  | (  |
 /__.-'|_|--|_|
  `
};

const terminal = document.getElementById('terminal-body');
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const prompt = document.getElementById('prompt');

function updateScroll() {
  terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(e) {
  if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      const args = command.split(' ');
      const cmd = args.shift();

      output.innerHTML += `<div>${prompt.innerText} ${command}</div>`;

      if (cmd in commands) {
          const result = typeof commands[cmd] === 'function' ? commands[cmd](args) : commands[cmd];
          output.innerHTML += `<div>${result}</div>`;
      } else {
          output.innerHTML += `<div>Command not found: ${cmd}</div>`;
      }

      input.value = '';
      updateScroll();
  }
}

input.addEventListener('keydown', processCommand);

document.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(() => {
      const terminal = document.getElementById('terminal');
      terminal.style.display = 'block';
      terminal.style.animation = 'fadeIn 1s ease-in-out forwards';
      input.focus();
  }, 5000);
});

function updateTime() {
  document.getElementById('current-time').innerText = new Date().toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();