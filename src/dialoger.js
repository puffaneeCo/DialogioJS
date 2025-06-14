/*! Puffanee Dialoger | (c) Puffanee | https://github.com/puffanee/Dialoger */

const uel = navigator.language || navigator.userLanguage;

const dialoger_lang = {
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

const DialogerButtons = {
  YesNo: [
    { t: dialoger_lang[uel].no, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].yes, ty: "Pos", i: "true" },
  ],
  ConfirmDecline: [
    { t: dialoger_lang[uel].decline, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].confirm, ty: "Pos", i: "true" },
  ],
  OkCancel: [
    { t: dialoger_lang[uel].cancel, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].ok, ty: "Pos", i: "true" },
  ],
  RetryCancel: [
    { t: dialoger_lang[uel].cancel, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].retry, ty: "Pos", i: "retry" },
  ],
  ContinueBack: [
    { t: dialoger_lang[uel].back, ty: "Neg", i: "back" },
    { t: dialoger_lang[uel].continue, ty: "Pos", i: "continue" },
  ],
  DeleteCancel: [
    { t: dialoger_lang[uel].cancel, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].delete, ty: "Pos", i: "delete" },
  ],
  Ok: [{ t: dialoger_lang[uel].ok, ty: "Pos", i: "true" }],
  CreateCancel: [
    { t: dialoger_lang[uel].cancel, ty: "Neg", i: "false" },
    { t: dialoger_lang[uel].create, ty: "Pos", i: "create" },
  ],
};
window.DialogerButtons = DialogerButtons;

class Dialoger {
  static _Config = {
    ToastIcons: {
      0: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5835 7.41667C4.5835 3.32056 7.90405 0 12.0002 0C16.0963 0 19.4168 3.32056 19.4168 7.41667V8.33334C19.4168 10.5339 19.7156 12.4847 20.171 13.8507C20.4004 14.539 20.6515 15.0238 20.8818 15.316C21.0523 15.5324 21.1541 15.5761 21.1774 15.5834C21.7248 15.5891 22.1668 16.0346 22.1668 16.5833V16.7917C22.1668 17.344 21.7191 17.7917 21.1668 17.7917H2.8335C2.28121 17.7917 1.8335 17.344 1.8335 16.7917V16.5833C1.8335 16.0346 2.27551 15.5891 2.82292 15.5834C2.84626 15.5761 2.948 15.5324 3.11851 15.316C3.34881 15.0238 3.59994 14.539 3.82936 13.8507C4.2847 12.4847 4.5835 10.5339 4.5835 8.33334V7.41667ZM2.81774 15.5847C2.81773 15.5846 2.81863 15.5844 2.82044 15.5841L2.81886 15.5845C2.81812 15.5847 2.81774 15.5847 2.81774 15.5847Z" fill="#ffffff"></path> <path d="M9.25013 19.5C8.87258 19.5 8.52722 19.7126 8.35723 20.0497C8.18723 20.3869 8.2216 20.791 8.44606 21.0945C9.27818 22.2199 10.5352 23 12.0001 23C13.465 23 14.7221 22.2199 15.5542 21.0945C15.7787 20.791 15.813 20.3869 15.643 20.0497C15.473 19.7126 15.1277 19.5 14.7501 19.5H9.25013Z" fill="#ffffff"></path> </g></svg>`,
      1: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#ffffff"></path></g></svg>`,
      2: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M2 12L7.25 17C7.25 17 8.66939 15.3778 9.875 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 12L13.25 17L22 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 7L12.5 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
      3: `<svg viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g ><path d="M22.7,17.5l-8.1-14c-0.8-1.4-2.7-1.9-4.1-1.1C10,2.7,9.6,3.1,9.4,3.5l-8.1,14c-0.8,1.4-0.3,3.3,1.1,4.1c0.5,0.3,1,0.4,1.5,0.4h16.1c1.7,0,3-1.4,3-3C23.1,18.4,22.9,17.9,22.7,17.5z M12,18c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,18,12,18z M13,13c0,0.6-0.4,1-1,1s-1-0.4-1-1V9c0-0.6,0.4-1,1-1s1,0.4,1,1V13z"></path></g></svg>`,
      4: `<svg viewBox="0 0 1920 1920" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm223.797 707.147c-28.531-29.561-67.826-39.944-109.227-39.455-55.225.657-114.197 20.664-156.38 40.315-100.942 47.024-178.395 130.295-242.903 219.312-11.616 16.025-17.678 34.946 2.76 49.697 17.428 12.58 29.978 1.324 40.49-9.897l.69-.74c.801-.862 1.591-1.72 2.37-2.565 11.795-12.772 23.194-25.999 34.593-39.237l2.85-3.31 2.851-3.308c34.231-39.687 69.056-78.805 115.144-105.345 27.4-15.778 47.142 8.591 42.912 35.963-2.535 16.413-11.165 31.874-17.2 47.744-21.44 56.363-43.197 112.607-64.862 168.888-23.74 61.7-47.405 123.425-70.426 185.398l-2 5.38-1.998 5.375c-20.31 54.64-40.319 108.872-53.554 165.896-10.575 45.592-24.811 100.906-4.357 145.697 11.781 25.8 36.77 43.532 64.567 47.566 37.912 5.504 78.906 6.133 116.003-2.308 19.216-4.368 38.12-10.07 56.57-17.005 56.646-21.298 108.226-54.146 154.681-92.755 47.26-39.384 88.919-85.972 126.906-134.292 12.21-15.53 27.004-32.703 31.163-52.596 3.908-18.657-12.746-45.302-34.326-34.473-11.395 5.718-19.929 19.867-28.231 29.27-10.42 11.798-21.044 23.423-31.786 34.92-21.488 22.987-43.513 45.463-65.634 67.831-13.54 13.692-30.37 25.263-47.662 33.763-21.59 10.609-38.785-1.157-36.448-25.064 2.144-21.954 7.515-44.145 15.046-64.926 30.306-83.675 61.19-167.135 91.834-250.686 19.157-52.214 38.217-104.461 56.999-156.816 17.554-48.928 32.514-97.463 38.834-149.3 4.357-35.71-4.9-72.647-30.269-98.937Zm63.72-401.498c-91.342-35.538-200.232 25.112-218.574 121.757-13.25 69.784 13.336 131.23 67.998 157.155 105.765 50.16 232.284-29.954 232.29-147.084.005-64.997-28.612-111.165-81.715-131.828Z" fill-rule="evenodd"></path> </g></svg>`,
    },
    ToastStyles: [
      "Default", // 0
      "Danger", // 1
      "Success", // 2
      "Warning", // 3
      "Information", // 4
    ],
    ToastLocations: [
      "TopCenter", // 0
      "BottomCenter", // 1
      "LeftTop", // 2
      "RightTop", // 3
      "LeftBottom", // 4
      "RightBottom", // 5
    ],
    ToastDefaultRemoveMs: 8000,
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

  static _isValidURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };
}

class DialogerToast extends Dialoger {
  static #internalCall = false;
  static #RemoveMs = DialogerToast.ToastDefaultRemoveMs; // Toasts will be removed after this time in milliseconds
  static get RemoveTime() {
    return this.#RemoveMs;
  }
  static #setRemoveTime(ms) {
    if (typeof ms === "number" && ms > 0) {
      this.#RemoveMs = ms;
    }
  }

  /**
   * @class Toast
   * @classdesc DialogerJS Toasts class.
   * @param {number} location - The location number of the toast on the screen. (LINK)
   * @param {number} removeTime - Toasts will be removed after this time in milliseconds. Default is 8000ms.
   * @returns {Toast}
   * @description Creates a new Toast instance.
   */
  constructor(location = 0, removeTime = 8000) {
    super();

    if (typeof jQuery === "undefined") {
      console.error("[DialogerJS] jQuery is required for DialogerJS Confirm.");
      return;
    }

    if (typeof removeTime === "number" && removeTime > 0) {
      DialogerToast.#setRemoveTime(removeTime);
    } else {
      console.warn("[DialogerJS] Invalid remove time. Using default.");
    }

    if ($("#dialogerJStoasts").length === 0) {
      DialogerToast.#internalCall = true;
      DialogerToast.#SetLocation(location || 0);
      DialogerToast.#internalCall = false;
    }
  }

  static #CreateToast(style = 0, message = "", redirect = "", setIcon = true) {
    if (!new.target && !DialogerToast.#internalCall) {
      console.warn("[DialogerJS] CreateToast cannot be used externally.");
      return;
    }

    if (
      typeof style !== "number" ||
      Dialoger._Config.ToastStyles[style] === undefined
    ) {
      style = 0;
      console.warn(
        `[DialogerJS] Invalid style: ${style}. Using default style.`
      );
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      console.error("[DialogerJS] Toast message must be a non-empty string.");
      return;
    }

    if (typeof setIcon !== "boolean") {
      console.error("[DialogerJS] setIcon must be a boolean value.");
      return;
    }

    document
      .getElementById("dialogerJStoasts")
      .style.setProperty(
        "--dialoger-notification-ms",
        `${DialogerToast.RemoveTime - 350}ms`
      );

    const id = `dialogerJStoast-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const toastStyle = Dialoger._Config.ToastStyles[style];
    const iconHtml = setIcon
      ? `<div class="ToastIcon">${Dialoger._Config.ToastIcons[style]}</div>`
      : "";

    const encodedMessage = $("<div>").text(message).html();

    const toastHtml = `
      <div class="Dialoger__Toast ${toastStyle}" id="${id}">
        ${iconHtml}
        <div class="ToastMessage">${encodedMessage}</div>
      </div>
    `;

    $("#dialogerJStoasts").css("display", "flex").append(toastHtml);

    const toast = $(`#${id}`);

    setTimeout(() => {
      toast.remove();
      if (typeof onClose === "function") onClose();
    }, DialogerToast.RemoveTime);

    toast.on("click", function () {
      if (redirect?.trim() && Dialoger._isValidURL(redirect)) {
        window.location.href = redirect;
      } else {
        $(this).remove();
      }
    });
  }

  /**
   * Sets the location of the toast notifications.
   * @param {number} location - The location number of the toast on the screen. (LINK)
   * @returns {void}
   * @description Sets the location of the toast notifications on the screen.
   */
  static #SetLocation(location = 0) {
    if (!new.target && !DialogerToast.#internalCall) {
      console.warn("[DialogerJS] SetLocation cannot be used externally.");
      return;
    }

    if (
      typeof location !== "number" ||
      !Dialoger._Config.ToastLocations[location]
    ) {
      console.warn(
        `[DialogerJS] Invalid location: ${location}. Using default.`
      );
      location = 0;
    }

    location =
      Dialoger._Config.ToastLocations[location] ||
      Dialoger._Config.ToastLocations[0];

    $("#dialogerJStoasts").remove();

    const newToast = $("<div>", {
      class: `Dialoger__Toasts ${location}`,
      id: "dialogerJStoasts",
    });

    $("body").prepend(newToast);
  }

  /**
   * Displays a notification (bell) toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {boolean} setIcon - Whether to display the icon in the toast. Defaults to true.
   * @param {string} redirect - When you click on the notification, you will be redirected to this address (only url). Default is no redirect, remove notification.
   * @returns {void}
   * @description Displays a notification (bell) toast notification with the specified message and icon.
   * @example
   * Toast.Notif("This is a notification toast message.", "https://github.com/puffanee", true);
   */
  Notif(message = "", redirect = "", setIcon = true) {
    DialogerToast.#internalCall = true;
    DialogerToast.#CreateToast(0, message, redirect, setIcon);
    DialogerToast.#internalCall = false;
  }

  /**
   * Displays a danger toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {boolean} setIcon - Whether to display the icon in the toast. Defaults to true.
   * @param {string} redirect - When you click on the notification, you will be redirected to this address (only url). Default is no redirect, remove notification.
   * @returns {void}
   * @description Displays a danger toast notification with the specified message and icon.
   * @example
   * Toast.Danger("This is a danger toast message.", "https://github.com/puffanee", true);
   */
  Danger(message = "", redirect = "", setIcon = true) {
    DialogerToast.#internalCall = true;
    DialogerToast.#CreateToast(1, message, redirect, setIcon);
    DialogerToast.#internalCall = false;
  }

  /**
   * Displays a success toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {boolean} setIcon - Whether to display the icon in the toast. Defaults to true.
   * @param {string} redirect - When you click on the notification, you will be redirected to this address (only url). Default is no redirect, remove notification.
   * @returns {void}
   * @description Displays a success toast notification with the specified message and icon.
   * @example
   * Toast.Success("This is a success toast message.", "https://github.com/puffanee", true);
   */
  Success(message = "", redirect = "", setIcon = true) {
    DialogerToast.#internalCall = true;
    DialogerToast.#CreateToast(2, message, redirect, setIcon);
    DialogerToast.#internalCall = false;
  }

  /**
   * Displays a warning toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {boolean} setIcon - Whether to display the icon in the toast. Defaults to true.
   * @param {string} redirect - When you click on the notification, you will be redirected to this address (only url). Default is no redirect, remove notification.
   * @returns {void}
   * @description Displays a warning toast notification with the specified message and icon.
   * @example
   * Toast.Warn("This is a warning toast message.", "https://github.com/puffanee", true);
   */
  Warn(message = "", redirect = "", setIcon = true) {
    DialogerToast.#internalCall = true;
    DialogerToast.#CreateToast(3, message, redirect, setIcon);
    DialogerToast.#internalCall = false;
  }

  /**
   * Displays a information toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {boolean} setIcon - Whether to display the icon in the toast. Defaults to true.
   * @param {string} redirect - When you click on the notification, you will be redirected to this address (only url). Default is no redirect, remove notification.
   * @returns {void}
   * @description Displays a information toast notification with the specified message and icon.
   * @example
   * Toast.Info("This is a information toast message.", "https://github.com/puffanee", true);
   */
  Info(message = "", redirect = "", setIcon = true) {
    DialogerToast.#internalCall = true;
    DialogerToast.#CreateToast(4, message, redirect, setIcon);
    DialogerToast.#internalCall = false;
  }
}

class DialogerConfirm extends Dialoger {
  static #internalCall = false;

  constructor() {
    super();

    if (typeof jQuery === "undefined") {
      console.error("[DialogerJS] jQuery is required for DialogerJS Confirm.");
      return;
    }

    if (typeof DialogerButtons === "undefined") {
      console.error("[DialogerJS] No Dialoger button items found.");
      return;
    }
  }

  static async #CreateConfirm(title = "", message, buttons = []) {
    if (!new.target && !DialogerConfirm.#internalCall) {
      console.warn("[DialogerJS] CreateConfirm cannot be used externally.");
      return;
    }
    DialogerConfirm.#internalCall = false;

    if (title.length > 40) {
      console.warn(
        "[DialogerJS] Dialog title is too long. It will be displayed, but CSS can shorten it."
      );
    }

    if (
      typeof message === "undefined" ||
      message === undefined ||
      message === null ||
      message.length <= 0
    ) {
      console.warn("[DialogerJS] Dialog message is invalid.");
      return 3;
    }

    if (typeof buttons !== "object" || buttons === undefined) {
      console.warn("[DialogerJS] Dialog buttons is invalid.");
      return 3;
    }

    message = Dialoger._parseMarkdown(message);

    const confirmHtml = `
      <div class="Dialoger__ConfirmOverlay" id="dialogerJSconfirm">
        <div class="Dialoger__Confirm">
          <div class="Confirm__Header">
            <h1 class="Header__Title">${title}</h1>
            <button type="button" class="Header__CloseButton" data-dcfi="close">${
              Dialoger._Config.ConfirmCloseIcon
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
      const confirmElement = $("#dialogerJSconfirm");

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
   * @returns {void}
   * @description Show new confirmation with options and return button clicks.
   * @example
   * Confirm.Show("This is example title.", "This is example **message**.", DialogerButtons.YesNo);
   */
  async Show(title = "", message, buttons = []) {
    DialogerConfirm.#internalCall = true;
    return await DialogerConfirm.#CreateConfirm(title, message, buttons);
  }
}
