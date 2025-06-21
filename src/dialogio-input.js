/*! Puffanee Dialogio | (c) Puffanee | https://github.com/puffaneeCo/DialogioJS | v3.0.0 */

const dialogio_lang = {
  "tr-TR": {
    ok: "tamam",
    default_placeholder: "Özel giriş...",
  },
  "en-US": {
    ok: "ok",
    default_placeholder: "Custom input...",
  },
  "en-UK": {
    ok: "ok",
    default_placeholder: "Custom input...",
  },
  "de-DE": {
    ok: "ok",
    default_placeholder: "Benutzerdefinierte Eingabe...",
  },
  "fr-FR": {
    ok: "ok",
    default_placeholder: "Entrée personnalisée...",
  },
};

const defuel = navigator.language || navigator.userLanguage;
var uel = "en-US";
if (dialogio_lang[defuel] !== undefined) {
  uel = dialogio_lang[defuel];
}

class Dialogio {
  static _Config = {
    ConfirmCloseIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" /></g></svg>`,
  };
}

class DialogioInput extends Dialogio {
  static #internalCall = false;

  constructor() {
    super();

    if (typeof jQuery === "undefined") {
      console.error("[DialogioJS] jQuery is required for DialogioJS Confirm.");
      return;
    }
  }

  static async #CreateInput(title = "", inputs = []) {
    if (!new.target && !DialogioInput.#internalCall) {
      console.warn("[DialogioJS] CreateInput cannot be used externally.");
      return;
    }
    DialogioInput.#internalCall = false;

    if (title.length > 40) {
      console.warn(
        "[DialogioJS] Dialog title is too long. It will be displayed, but CSS can shorten it."
      );
    }

    if (typeof inputs !== "object" || inputs === undefined) {
      console.warn("[DialogioJS] Dialog inputs is invalid.");
      return 3;
    }

    const inputHtml = `
      <div class="DialogioJS__InputOverlay" id="dialogioJSinput">
          <div class="DialogioJS__Input">
              <div class="Input__Header">
                  <h1 class="Header__Title">${title}</h1>
                  <button type="button" class="Header__CloseButton" data-difi="close">${
                    Dialogio._Config.ConfirmCloseIcon
                  }</button>
              </div>
              <div class="Input__Content">
                ${inputs.map((inp) => inp.view).join("")}
              </div>
              <button type="button" class="Input__Button" data-difi="save">${
                uel.ok
              }</button>
          </div>
      </div>
    `;

    $("body").append(inputHtml);

    return await new Promise((resolve, reject) => {
      const inputElement = $("#dialogioJSinput");

      inputElement.on(
        "click",
        ".Input__Button, .Header__CloseButton",
        function () {
          const btnType = $(this).data("difi");
          if (btnType === "close") {
            resolve([]);
          } else if (btnType === "save") {
            const inputsData = inputs.reduce((acc, inp) => {
              const inputEl = $(`[data-difi="${inp.id}"]`);
              acc[inp.id] = inputEl.val();
              return acc;
            }, {});
            resolve(inputsData);
          } else {
            return;
          }
          inputElement.addClass("Hide");
          inputElement.one(
            "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
            () => {
              inputElement.remove();
            }
          );
        }
      );
    });
  }

  /**
   * Create new confirmation with options
   * @param {string} title - The title to display in the header.
   * @param {object} inputs - Created custom Dialogio inputs object. (Max. 5 input)
   * @returns {object} - Returns input values or empty object
   * @description Create and show new input enter with options and return input(s) value.
   * @example
   * const input1 = Input.NewInput("TYPE", "ID", "LABEL", "PLACEHOLDER", "VALUE", controlFunction())
   * const input2 = Input.NewInput("TYPE", "ID", "LABEL", "PLACEHOLDER", "VALUE", controlFunction())
   * Input.Create("This is example title.", [input1, input2]);
   */
  async Create(title = "", inputs = []) {
    DialogioInput.#internalCall = true;
    return await DialogioInput.#CreateInput(title, inputs);
  }

  /**
   * Get Dialogio custom input for create input modal
   * @param {string} type - Input type data. (Text, number)
   * @param {string} id - Input custom id for get value in input modal.
   * @param {string} label - Label text for input.
   * @param {string} placeholder - Placeholder text for input content.
   * @param {string} value - Input value data.
   * @returns
   */
  NewInput(type = "text", id, label = "", placeholder = "", value = "") {
    if (!["text", "number", "tel", "email", "password"].includes(type)) {
      console.error(
        "[DialogioJS] Dialogio custom input supports only text inputs. (Text, number, tel etc.)"
      );
      return;
    }

    id = id.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    if (id.length < 4) {
      console.error(
        "[DialogioJS] Dialogio custom input id length is should be longer than 3."
      );
      return;
    }

    const inputhtml = `
      <div class="Custom__InputBox">
        <label class="InputLabel">${label || ""}</label>
        <input type="text" data-difi="${id}" class="CustomInput" placeholder="${
      placeholder || uel.default_placeholder
    }" value="${value || ""}"/>
      </div>
    `;
    return { id: id, view: inputhtml };
  }
}
