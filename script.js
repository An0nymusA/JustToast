const createElement = (name, classes = [], content = '') => {
    const element = document.createElement(name)
    element.classList.add(...classes)
    element.innerHTML = content
    return element
}

class toast {
    static wrapper
    static reverseOrder = true
    static defaultDuration = 2000
    static icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="icon icon-tabler icon-tabler-square-check" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z"/><rect width="16" height="16" x="4" y="4" rx="2"/><path d="m9 12 2 2 4-4"/></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="icon icon-tabler icon-tabler-square-x" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z"/><rect width="16" height="16" x="4" y="4" rx="2"/><path d="m10 10 4 4m0-4-4 4"/></svg>`,
        loading: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="icon icon-tabler icon-tabler-loader" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 6V3M16.25 7.75 18.4 5.6M18 12h3M16.25 16.25l2.15 2.15M12 18v3M7.75 16.25 5.6 18.4M6 12H3M7.75 7.75 5.6 5.6"/></svg>`
    }
    static #styles = {
        background: 'transparent',
        foreground: 'black',
        red: '#d41d1d',
        green: '#1dd41d',
        other: 'gray',
        border: '1px solid'
    }

    static {
        document.addEventListener('DOMContentLoaded', () => {
            const div = document.createElement('div')
            div.classList.add('toast-container')
            toast.wrapper = window.document.body.appendChild(div)

            toast.updateStyles()
        })
    }

    static updateStyles = (newStyles = null) => {
        if (newStyles) {
            for (let key in toast.#styles) {
                if (newStyles.hasOwnProperty(key)) {
                    toast.#styles[key] = newStyles[key]
                }
            }
        }

        if (toast.wrapper) {
            Object.entries(toast.#styles).forEach(([key, value]) => {
                toast.wrapper.style.setProperty(`--toast-${key}`, value)
            })
            return
        }

        setTimeout(() => {
            toast.updateStyles()
        }, 100)
    }

    /**
     * Method for getting toast element
     * @param {*} options
     * @returns toast element from given options`
     */
    static #generateToast = (options) => {
        const wrapper = createElement('div', ['toast__wrapper'])
        const toast = createElement('div', [
            'toast',
            options.color,
            ...(options.additionalClasses ?? [])
        ])

        if (options.icon) {
            const toastIcon = createElement(
                'span',
                ['toast__icon'],
                options.icon
            )
            toast.appendChild(toastIcon)
        }

        const text = createElement('span', [], options.message)
        toast.appendChild(text)

        wrapper.appendChild(toast)
        return wrapper
    }

    static #deleteToast = (toastElement, timeout) => {
        if (timeout === -1) return

        setTimeout(() => {
            toastElement.animate([{ opacity: '0' }], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            })
            toastElement.animate(
                [{ transform: 'scale(1)' }, { transform: 'scale(0)' }],
                {
                    duration: 700,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            )
            toastElement.animate(
                [
                    {
                        maxHeight: `${
                            toastElement.getBoundingClientRect().height
                        }px`
                    },
                    { maxHeight: '0px' }
                ],
                {
                    duration: 800,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            ).onfinish = () => {
                toastElement.remove()
            }
        }, timeout)
    }

    /**
     * Animate element after it is created
     * @param {*} toastElement
     */
    static #animateCreation = (toastElement) => {
        toastElement.animate(
            [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
            {
                duration: 300,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                origin: 'top'
            }
        )
        toastElement.animate(
            [
                { maxHeight: '0px' },
                {
                    maxHeight: `${toastElement.scrollHeight}px`
                }
            ],
            {
                duration: 250,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }
        )
    }

    static #appendToast = (toastElement) => {
        if (toast.reverseOrder) {
            toast.wrapper.prepend(toastElement)
            return toastElement
        }

        return toast.wrapper.appendChild(toastElement)
    }

    /**
     * Append new toast to the toast container
     * @param {*} options
     * @returns toast "object"
     */
    static #addToast = (rawOptions) => {
        var options

        const updateOptions = (rawOptions) => {
            options = rawOptions
            options.additionalClasses = options.additionalClasses ?? []
            options.duration = options.duration ?? toast.defaultDuration
        }
        updateOptions(rawOptions)

        var toastElement = toast.#appendToast(toast.#generateToast(options))
        toast.#animateCreation(toastElement)

        toast.#deleteToast(toastElement, options.duration)

        return {
            getElement: () => toastElement,
            rewrite: (newOptions) => {
                updateOptions(newOptions)

                const newToast = toast.#generateToast(options)

                toastElement.replaceWith(newToast)
                toastElement = newToast

                toast.#deleteToast(toastElement, options.duration)
            }
        }
    }

    static message = (message) => {
        toast.#addToast({ color: 'other', message })
    }
    static success = (message) => {
        toast.#addToast({ icon: toast.icons.success, color: 'green', message })
    }
    static error = (message) => {
        toast.#addToast({ icon: toast.icons.error, color: 'red', message })
    }
    static promise = (promise, messages) => {
        messages.success = messages.success ?? 'Success'
        messages.error = messages.error ?? 'Error'
        messages.loading = messages.loading ?? 'Loading'

        const el = toast.#addToast({
            icon: toast.icons.loading,
            color: 'other',
            message: messages.loading,
            additionalClasses: ['loading'],
            duration: -1
        })

        promise
            .then(() => {
                el.rewrite({
                    icon: toast.icons.success,
                    color: 'green',
                    message: messages.success
                })
            })
            .catch(() => {
                el.rewrite({
                    icon: toast.icons.error,
                    color: 'red',
                    message: messages.error
                })
            })
    }
}
