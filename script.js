const createElement = (name, classes = [], content = "") => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  element.innerHTML = content;
  return element;
};

class toast {
  /** @type {HTMLElement} */
  static wrapper;
  /** @type {boolean} */
  static reverseOrder = true;
  /** @type {number} */
  static defaultDuration = 2000;
  /** @type {{ success: string, error: string, loading: string }} */
  static icons = {
    success: `<svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_593_1923)"><path d="M13.0004 25.9713C11.9124 25.7245 10.8675 25.3162 9.90039 24.76" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 4.02869C20.4852 4.59628 22.7041 5.9908 24.2933 7.98394C25.8826 9.97708 26.748 12.4507 26.748 14.9999C26.748 17.5491 25.8826 20.0228 24.2933 22.0159C22.7041 24.009 20.4852 25.4036 18 25.9712" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.22418 21.3663C5.54231 20.3756 5.02443 19.2816 4.69043 18.1263" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.40527 13.1249C4.60527 11.9374 4.99027 10.8124 5.53027 9.78115L5.74152 9.3999" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.13379 5.72368C10.3034 4.91856 11.6154 4.34333 13 4.02869" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.75 15L14.25 17.5L19.25 12.5" stroke="currentColor" stroke-width="1.95895" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_593_1923"><rect width="30" height="30" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`,
    error: `<svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_593_1952)"><path d="M13.0004 25.9713C11.9124 25.7245 10.8675 25.3162 9.90039 24.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 4.02875C20.4852 4.59634 22.7041 5.99086 24.2933 7.984C25.8826 9.97715 26.748 12.4508 26.748 15C26.748 17.5492 25.8826 20.0228 24.2933 22.016C22.7041 24.0091 20.4852 25.4037 18 25.9712" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.22418 21.3662C5.54231 20.3756 5.02443 19.2816 4.69043 18.1262" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.40527 13.125C4.60527 11.9375 4.99027 10.8125 5.53027 9.78127L5.74152 9.40002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.13379 5.72375C10.3034 4.91862 11.6154 4.34339 13 4.02875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 10V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 20V20.0125" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_593_1952"><rect width="30" height="30" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`,
    loading: `<svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_593_1961)"><path d="M11.1998 4.61255C9.83491 5.17753 8.59464 6.00579 7.5498 7.05005" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.1125 10.7C4.5457 12.0629 4.25263 13.524 4.25 15" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.1123 19.3C5.67729 20.6649 6.50555 21.9052 7.5498 22.95" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.2002 25.3875C12.5631 25.9543 14.0242 26.2474 15.5002 26.25" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.7998 25.3876C21.1647 24.8226 22.405 23.9943 23.4498 22.9501" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.8877 19.3C26.4545 17.9371 26.7476 16.476 26.7502 15" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.8877 10.7C25.3227 9.33509 24.4945 8.09482 23.4502 7.04999" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.8 4.6125C18.4371 4.0457 16.976 3.75263 15.5 3.75" stroke="currentColor" stroke-width="1.95896" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_593_1961"><rect width="30" height="30" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>`,
  };
  static #position = {
    vertical: "bottom",
    horizontal: "right",
  };

  /** @type {{ red: {text: string, bg: string, border: string}, green: {text: string, bg: string, border: string}, other: {text: string, bg: string, border: string} }} */
  static #styles = {
    red: {
      text: "#FFFFFF",
      bg: "#D45454",
      border: "",
    },
    green: {
      text: "#FFFFFF",
      bg: "#2FE075",
      border: "",
    },
    other: {
      text: "#FFFFFF",
      bg: "#3F3F3F",
      border: "",
    },
  };

  static {
    document.addEventListener("DOMContentLoaded", () => {
      const div = document.createElement("div");
      div.classList.add("toast-container");
      toast.wrapper = window.document.body.appendChild(div);

      toast.updateStyles();
    });
  }

  /**
   * @param {{ red: {text: string, bg: string, border: string}, green: {text: string, bg: string, border: string}, other: {text: string, bg: string, border: string} }} newStyles
   * @returns
   */
  static updateStyles = (newStyles = null) => {
    if (newStyles) {
      for (let key in toast.#styles) {
        if (newStyles.hasOwnProperty(key)) {
          toast.#styles[key] = newStyles[key];
        }
      }
    }

    if (toast.wrapper) {
      Object.entries(toast.#styles).forEach(([key, value]) => {
        const { bg, text, border } = value;
        toast.wrapper.style.setProperty(`--toast-${key}-background`, bg);
        toast.wrapper.style.setProperty(`--toast-${key}-text`, text);
        toast.wrapper.style.setProperty(`--toast-${key}-border`, border);
      });

      toast.wrapper.classList.add(
        `toast-${toast.#position.horizontal}`,
        `toast-${toast.#position.vertical}`
      );

      return;
    }

    setTimeout(() => {
      toast.updateStyles();
    }, 100);
  };

  /**
   *
   * @param {"top"|"bottom"} vertical
   * @param {"left"|"right"} horizontal
   */
  static setPosition = (vertical = "top", horizontal = "right") => {
    toast.#position = { vertical, horizontal };

    if (toast.wrapper) {
      toast.wrapper.classList.remove("top", "bottom", "right", "left");
      toast.wrapper.classList.add(vertical, horizontal);
    }
  };

  /**
   * Method for getting toast element
   * @param {*} options
   * @returns toast element from given options`
   */
  static #generateToast = (options) => {
    const wrapper = createElement("div", ["toast__wrapper"]);
    const toast = createElement("div", [
      "toast",
      options.color,
      ...(options.additionalClasses ?? []),
    ]);

    if (options.icon) {
      const toastIcon = createElement("span", ["toast__icon"], options.icon);
      toast.appendChild(toastIcon);
    }

    const text = createElement("span", [], options.message);
    toast.appendChild(text);

    wrapper.appendChild(toast);
    return wrapper;
  };

  /**
   * @param {HTMLElement} toastElement
   * @param {number} timeout
   */
  static #deleteToast = (toastElement, timeout) => {
    if (timeout === -1) return;

    setTimeout(() => {
      toastElement.animate([{ opacity: "0" }], {
        duration: 600,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      });
      toastElement.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0)" }],
        {
          duration: 700,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        }
      );
      toastElement.animate(
        [
          {
            maxHeight: `${toastElement.getBoundingClientRect().height}px`,
          },
          { maxHeight: "0px" },
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        }
      ).onfinish = () => {
        toastElement.remove();
      };
    }, timeout);
  };

  /**
   * Animate element after it is created
   * @param {HTMLElement} toastElement
   */
  static #animateCreation = (toastElement) => {
    toastElement.animate(
      [{ transform: "scale(0)" }, { transform: "scale(1)" }],
      {
        duration: 300,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        origin: "top",
      }
    );
    toastElement.animate(
      [
        { maxHeight: "0px" },
        {
          maxHeight: `${toastElement.scrollHeight}px`,
        },
      ],
      {
        duration: 250,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    );
  };

  /**
   * @param {HTMLElement} toastElement
   */
  static #appendToast = (toastElement) => {
    if (toast.reverseOrder) {
      toast.wrapper.prepend(toastElement);
      return toastElement;
    }

    return toast.wrapper.appendChild(toastElement);
  };

  /**
   * Append new toast to the toast container
   * @param {*} options
   * @returns toast "object"
   */
  static #addToast = (rawOptions) => {
    var options;

    const updateOptions = (rawOptions) => {
      options = rawOptions;
      options.additionalClasses = options.additionalClasses ?? [];
      options.duration = options.duration ?? toast.defaultDuration;
    };
    updateOptions(rawOptions);

    var toastElement = toast.#appendToast(toast.#generateToast(options));
    toast.#animateCreation(toastElement);

    toast.#deleteToast(toastElement, options.duration);

    return {
      getElement: () => toastElement,
      rewrite: (newOptions) => {
        updateOptions(newOptions);

        const newToast = toast.#generateToast(options);

        toastElement.replaceWith(newToast);
        toastElement = newToast;

        toast.#deleteToast(toastElement, options.duration);
      },
    };
  };

  /**
   * @param {string} message
   */
  static message = (message) => {
    toast.#addToast({ color: "other", message });
  };
  /**
   * @param {string} message
   */
  static success = (message) => {
    toast.#addToast({ icon: toast.icons.success, color: "green", message });
  };
  /**
   * @param {string} message
   */
  static error = (message) => {
    toast.#addToast({ icon: toast.icons.error, color: "red", message });
  };
  /**
   * @param {Promise<any>} promise
   * @param {{ success: string, error: string, loading: strings }} messages
   */
  static promise = (promise, messages) => {
    messages.success = messages.success ?? "Success";
    messages.error = messages.error ?? "Error";
    messages.loading = messages.loading ?? "Loading";

    const el = toast.#addToast({
      icon: toast.icons.loading,
      color: "other",
      message: messages.loading,
      additionalClasses: ["loading"],
      duration: -1,
    });

    promise
      .then(() => {
        el.rewrite({
          icon: toast.icons.success,
          color: "green",
          message: messages.success,
        });
      })
      .catch(() => {
        el.rewrite({
          icon: toast.icons.error,
          color: "red",
          message: messages.error,
        });
      });
  };
}
