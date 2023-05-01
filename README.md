# JustToast
[Demo](https://adamz.cz/git/justtoast)
## Installation
Include `script.js` and `style.css` in your html
## Usage
### toast.success()
``` javascript
toast.success("Success message")
```
### toast.error()
``` javascript
toast.error("Error message")
```
### toast.message()
``` javascript
toast.message("Simple message")
```
### toast.promise()
``` javascript
toast.promise(promise, {
    success: "Promise resolved",
    error: "Promise rejected",
    loading: "Waiting for promise"
})
```
## Customization
### toast.updateStyles()
``` javascript
toast.updateStyles(
    background: 'transparent', // background color of all toasts, if transparent / semi transparent, background blur is applied
    foreground: 'black', // text color
    red: '#d41d1d', // error color 
    green: '#1dd41d', // success color
    other: 'gray', // promise / message color
    border: '1px solid' // border style = if set to 0 or blank, removes border
)
```
### toast.reverseOrder
``` javascript
toast.reverseOrder = true; // Most recent toasts will be on top
toast.reverseOrder = false; // Most recent toasts will be on bottom
```
### toast.icons
``` javascript
toast.icons = {
    success: '<svg></svg>',
    errror: '<svg></svg>',
    loading: '<svg></svg>'
}
```
