/*! Puffanee Dialogio | (c) Puffanee | https://github.com/puffanee/DialogioJS */

const dialogio_lang = {
  "tr-TR": {
    yes: "evet",
    no: "hayır",
    confirm: "onayla",
    decline: "reddet",
    ok: "tamam",
    cancel: "iptal",
    retry: "tekrar dene",
    continue: "devam et",
    back: "geri dön",
    delete: "sil",
    create: "oluştur",
  },
  "en-US": {
    yes: "yes",
    no: "no",
    confirm: "confirm",
    decline: "decline",
    ok: "ok",
    cancel: "cancel",
    retry: "retry",
    continue: "continue",
    back: "back",
    delete: "delete",
    create: "create",
  },
  "en-UK": {
    yes: "yes",
    no: "no",
    confirm: "confirm",
    decline: "decline",
    ok: "ok",
    cancel: "cancel",
    retry: "retry",
    continue: "continue",
    back: "back",
    delete: "delete",
    create: "create",
  },
  "de-DE": {
    yes: "ja",
    no: "nein",
    confirm: "bestätigen",
    decline: "ablehnen",
    ok: "ok",
    cancel: "abbrechen",
    retry: "wiederholen",
    continue: "weiter",
    back: "zurück",
    delete: "löschen",
    create: "erstellen",
  },
  "fr-FR": {
    yes: "oui",
    no: "non",
    confirm: "confirmer",
    decline: "refuser",
    ok: "ok",
    cancel: "annuler",
    retry: "réessayer",
    continue: "continuer",
    back: "retour",
    delete: "supprimer",
    create: "créer",
  },
};

const defuel = navigator.language || navigator.userLanguage;
var uel = "en-US";
if (dialogio_lang[defuel] !== undefined) {
  uel = dialogio_lang[defuel];
}

const DialogioButtons = {
  YesNo: [
    { t: uel.no, ty: "Neg", i: "false" },
    { t: uel.yes, ty: "Pos", i: "true" },
  ],
  ConfirmDecline: [
    { t: uel.decline, ty: "Neg", i: "false" },
    { t: uel.confirm, ty: "Pos", i: "true" },
  ],
  OkCancel: [
    { t: uel.cancel, ty: "Neg", i: "false" },
    { t: uel.ok, ty: "Pos", i: "true" },
  ],
  RetryCancel: [
    { t: uel.cancel, ty: "Neg", i: "false" },
    { t: uel.retry, ty: "Pos", i: "retry" },
  ],
  ContinueBack: [
    { t: uel.back, ty: "Neg", i: "back" },
    { t: uel.continue, ty: "Pos", i: "continue" },
  ],
  DeleteCancel: [
    { t: uel.cancel, ty: "Neg", i: "false" },
    { t: uel.delete, ty: "Pos", i: "delete" },
  ],
  Ok: [{ t: uel.ok, ty: "Pos", i: "true" }],
  CreateCancel: [
    { t: uel.cancel, ty: "Neg", i: "false" },
    { t: uel.create, ty: "Pos", i: "create" },
  ],
};
window.DialogioButtons = DialogioButtons;

class Dialogio {
  static _Config = {
    ConfirmCloseIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" /></g></svg>`,
  };

  static _parseMarkdown(text) {
    if (!text) return "";
    text = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    text = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>");
    text = text
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>");
    text = text.replace(/~~(.*?)~~/g, "<del>$1</del>");
    text = text.replace(/^\d+\.\s+(.*$)/gim, "<li>$1</li>");
    text = text.replace(/(<li>.*<\/li>)/gim, "<ol>$1</ol>");
    text = text.replace(/^[-*+]\s+(.*$)/gim, "<li>$1</li>");
    text = text.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      "<a href='$2' target='_blank'>$1</a>"
    );
    text = text.replace(/\n{2,}/g, "</p><p>");
    text = `<p>${text}</p>`;
    text = text.replace(/<p><\/p>/g, "");
    return text;
  }
}

class DialogioConfirm extends Dialogio {
  static #internalCall = false;

  constructor() {
    super();

    if (typeof jQuery === "undefined") {
      console.error("[DialogioJS] jQuery is required for DialogioJS Confirm.");
      return;
    }

    if (typeof DialogioButtons === "undefined") {
      console.error("[DialogioJS] No Dialogio button items found.");
      return;
    }
  }

  static async #CreateConfirm(title = "", message, buttons = []) {
    if (!new.target && !DialogioConfirm.#internalCall) {
      console.warn("[DialogioJS] CreateConfirm cannot be used externally.");
      return;
    }
    DialogioConfirm.#internalCall = false;

    if (title.length > 40) {
      console.warn(
        "[DialogioJS] Dialog title is too long. It will be displayed, but CSS can shorten it."
      );
    }

    if (
      typeof message === "undefined" ||
      message === undefined ||
      message === null ||
      message.length <= 0
    ) {
      console.warn("[DialogioJS] Dialog message is invalid.");
      return 3;
    }

    if (typeof buttons !== "object" || buttons === undefined) {
      console.warn("[DialogioJS] Dialog buttons is invalid.");
      return 3;
    }

    message = Dialogio._parseMarkdown(message);

    const confirmHtml = `
      <div class="Dialogio__ConfirmOverlay" id="dialogioJSconfirm">
        <div class="Dialogio__Confirm">
          <div class="Confirm__Header">
            <h1 class="Header__Title">${title}</h1>
            <button type="button" class="Header__CloseButton" data-dcfi="close">${
              Dialogio._Config.ConfirmCloseIcon
            }</button>
          </div>
          <div class="Confirm__Content">
            <div class="Confirm__Message">${message}</div>
          </div>
          <div class="Confirm__Buttons">
            ${buttons
              .map(
                (btn) =>
                  `<button type="button" class="Confirm__Button Btn${btn.ty}" data-dcfi="${btn.i}">${btn.t}</button>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    $("body").append(confirmHtml);

    return new Promise((resolve, reject) => {
      const confirmElement = $("#dialogioJSconfirm");

      confirmElement.on(
        "click",
        ".Confirm__Button, .Header__CloseButton",
        function () {
          const btnType = $(this).data("dcfi");
          resolve(btnType);
          confirmElement.addClass("Hide");
          confirmElement.one(
            "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
            () => {
              confirmElement.remove();
            }
          );
        }
      );
    });
  }

  /**
   * Create new confirmation with options
   * @param {string} title - The title to display in the header.
   * @param {string} message - The message to display in the confirmation. Supports specific markdowns (LINK)
   * @param {object} buttons - Message dialog buttons
   * @returns {string} - Returns clicked button name (ok, cancel, yes etc.)
   * @description Show new confirmation with options and return button clicks.
   * @example
   * Confirm.Show("This is example title.", "This is example **message**.", DialogioButtons.YesNo);
   */
  async Show(title = "", message, buttons = []) {
    DialogioConfirm.#internalCall = true;
    return await DialogioConfirm.#CreateConfirm(title, message, buttons);
  }
}
