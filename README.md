# JustToast

[Demo](https://adamz.cz/git/justtoast)

## Installation

Include `script.js` and `style.css` in your html

## Usage

### `toast.success(...)`

```javascript
toast.success("Success message");
```

### `toast.error(...)`

```javascript
toast.error("Error message");
```

### `toast.info(...)`

```javascript
toast.info("Simple message");
```

### `toast.promise(...)`

```javascript
toast.promise(promise, {
  success: "Promise resolved",
  error: "Promise rejected",
  loading: "Waiting for promise",
});
```

## Customization

### `toast.updateStyles(...)`

```javascript
toast.updateStyles({
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
});
```

### `toast.setPosition(vertical, horizontal)`

```javascript
toast.setPosition("top", "left");
```

### `toast.reverseOrder`

```javascript
toast.reverseOrder = true; // Most recent toasts will be on top
toast.reverseOrder = false; // Most recent toasts will be on bottom
```

### `toast.icons`

```javascript
toast.icons = {
  info: "<svg></svg>",
  success: "<svg></svg>",
  errror: "<svg></svg>",
  loading: "<svg></svg>",
};
```
