(function ($) {
  $.dialoger = $.dialoger || {};
  $.dialoger.toast = $.dialoger.toast || {};

  const tostIcons = {
    0: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5835 7.41667C4.5835 3.32056 7.90405 0 12.0002 0C16.0963 0 19.4168 3.32056 19.4168 7.41667V8.33334C19.4168 10.5339 19.7156 12.4847 20.171 13.8507C20.4004 14.539 20.6515 15.0238 20.8818 15.316C21.0523 15.5324 21.1541 15.5761 21.1774 15.5834C21.7248 15.5891 22.1668 16.0346 22.1668 16.5833V16.7917C22.1668 17.344 21.7191 17.7917 21.1668 17.7917H2.8335C2.28121 17.7917 1.8335 17.344 1.8335 16.7917V16.5833C1.8335 16.0346 2.27551 15.5891 2.82292 15.5834C2.84626 15.5761 2.948 15.5324 3.11851 15.316C3.34881 15.0238 3.59994 14.539 3.82936 13.8507C4.2847 12.4847 4.5835 10.5339 4.5835 8.33334V7.41667ZM2.81774 15.5847C2.81773 15.5846 2.81863 15.5844 2.82044 15.5841L2.81886 15.5845C2.81812 15.5847 2.81774 15.5847 2.81774 15.5847Z" fill="#ffffff"></path> <path d="M9.25013 19.5C8.87258 19.5 8.52722 19.7126 8.35723 20.0497C8.18723 20.3869 8.2216 20.791 8.44606 21.0945C9.27818 22.2199 10.5352 23 12.0001 23C13.465 23 14.7221 22.2199 15.5542 21.0945C15.7787 20.791 15.813 20.3869 15.643 20.0497C15.473 19.7126 15.1277 19.5 14.7501 19.5H9.25013Z" fill="#ffffff"></path> </g></svg>`,
    1: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g ><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#ffffff"></path></g></svg>`,
    2: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M2 12L7.25 17C7.25 17 8.66939 15.3778 9.875 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 12L13.25 17L22 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 7L12.5 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    3: `<svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g ><path d="M22.7,17.5l-8.1-14c-0.8-1.4-2.7-1.9-4.1-1.1C10,2.7,9.6,3.1,9.4,3.5l-8.1,14c-0.8,1.4-0.3,3.3,1.1,4.1c0.5,0.3,1,0.4,1.5,0.4h16.1c1.7,0,3-1.4,3-3C23.1,18.4,22.9,17.9,22.7,17.5z M12,18c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,18,12,18z M13,13c0,0.6-0.4,1-1,1s-1-0.4-1-1V9c0-0.6,0.4-1,1-1s1,0.4,1,1V13z"></path></g></svg>`,
    4: `<svg fill="#ffffff" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm223.797 707.147c-28.531-29.561-67.826-39.944-109.227-39.455-55.225.657-114.197 20.664-156.38 40.315-100.942 47.024-178.395 130.295-242.903 219.312-11.616 16.025-17.678 34.946 2.76 49.697 17.428 12.58 29.978 1.324 40.49-9.897l.69-.74c.801-.862 1.591-1.72 2.37-2.565 11.795-12.772 23.194-25.999 34.593-39.237l2.85-3.31 2.851-3.308c34.231-39.687 69.056-78.805 115.144-105.345 27.4-15.778 47.142 8.591 42.912 35.963-2.535 16.413-11.165 31.874-17.2 47.744-21.44 56.363-43.197 112.607-64.862 168.888-23.74 61.7-47.405 123.425-70.426 185.398l-2 5.38-1.998 5.375c-20.31 54.64-40.319 108.872-53.554 165.896-10.575 45.592-24.811 100.906-4.357 145.697 11.781 25.8 36.77 43.532 64.567 47.566 37.912 5.504 78.906 6.133 116.003-2.308 19.216-4.368 38.12-10.07 56.57-17.005 56.646-21.298 108.226-54.146 154.681-92.755 47.26-39.384 88.919-85.972 126.906-134.292 12.21-15.53 27.004-32.703 31.163-52.596 3.908-18.657-12.746-45.302-34.326-34.473-11.395 5.718-19.929 19.867-28.231 29.27-10.42 11.798-21.044 23.423-31.786 34.92-21.488 22.987-43.513 45.463-65.634 67.831-13.54 13.692-30.37 25.263-47.662 33.763-21.59 10.609-38.785-1.157-36.448-25.064 2.144-21.954 7.515-44.145 15.046-64.926 30.306-83.675 61.19-167.135 91.834-250.686 19.157-52.214 38.217-104.461 56.999-156.816 17.554-48.928 32.514-97.463 38.834-149.3 4.357-35.71-4.9-72.647-30.269-98.937Zm63.72-401.498c-91.342-35.538-200.232 25.112-218.574 121.757-13.25 69.784 13.336 131.23 67.998 157.155 105.765 50.16 232.284-29.954 232.29-147.084.005-64.997-28.612-111.165-81.715-131.828Z" fill-rule="evenodd"></path> </g></svg>`,
  };

  const tostStyles = ["Default", "Danger", "Success", "Warning", "Information"];
  const toastLocations = [
    "TopCenter",
    "BottomCenter",
    "LeftTop",
    "RightTop",
    "LeftBottom",
    "RightBottom",
  ];

  $.dialoger.toast = {
    /**
     * Set the location of the toast notifications.
     * @param {number} location - The location number where the toasts should appear. Location numbers in: https://github.com/puffanee/Dialoger/blob/main/README.md#Toast-Locations)
     * @returns {void}
     * @example
     * $.dialoger.toast.setLocation(0);
     * @description
     * This function sets the location of the toast notifications on the page.
     */
    setLocation: function (location = 0) {
      location = parseInt(location, 10);
      if (isNaN(location)) {
        console.error("[DialogerJS] Invalid toast location.");
        return;
      }

      if (toastLocations[location] !== undefined) {
        $("#dialogerJStoasts").remove();

        const newToast = $(`
      <div class="Dialoger__Toasts ${toastLocations[location]}" id="dialogerJStoasts">
        <div class="AllToasts" id="dialogerJStoastsall"></div>
      </div>
    `);

        $("body").prepend(newToast);
      } else {
        console.error("[DialogerJS] Invalid toast location number.");
        return;
      }
    },

    /**
     * Push a new toast notification.
     * @param {number} style - The style number of the toast notification. Style numbers in: https://github.com/puffanee/Dialoger/blob/main/README.md#Toast-Styles)
     * @param {string} message - The message to display in the toast notification.
     * @param {boolean} setIcon - Whether to set the icon for the toast notification. Defaults to true.
     * @returns {void}
     * @example
     * $.dialoger.toast(2, "This is a success message!", true);
     * @description
     * This function creates a toast notification with the specified style and message.
     */
    push: function (style = 0, message, setIcon = true) {
      if (
        typeof style !== "number" ||
        style < 0 ||
        style >= tostStyles.length
      ) {
        console.error("[DialogerJS] Invalid toast style number.");
        return;
      }

      if (!message) {
        console.error("[DialogerJS] Toast message is required.");
        return;
      }

      if (typeof message !== "string" || message.trim() === "") {
        console.error("[DialogerJS] Toast message must be a non-empty string.");
        return;
      }

      if (typeof setIcon !== "boolean") {
        console.error("[DialogerJS] setIcon must be a boolean value.");
        return;
      }

      const s = tostStyles[style] || tostStyles[0];
      const icon = setIcon ? tostIcons[style] || tostIcons[0] : false;

      const html = `
      <div class="Dialoger__Toast ${s}" id="dialogerJStoast">
        ${icon ? `<div class="ToastIcon">${icon}</div>` : ""}
        <div class="ToastMessage">${message}</div>
      </div>`;

      const $$HtmlToast = $(html);
      $("#dialogerJStoasts").css("display", "flex");
      $("#dialogerJStoastsall").css("display", "flex");
      $("#dialogerJStoastsall").append($$HtmlToast);

      setTimeout(() => $$HtmlToast.remove(), 12000);
    },
  };
})(jQuery);


