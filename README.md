# 📈 Resource Manager

A modern Task Manager-like **fully tested**, and **type-safe** desktop application built with Electron to help monitor CPU, RAM, and Storage live usages as well as provide system information in a minimalistic fashion, designed to run seamlessly on all major desktop platforms.

## 💥 Features

✅ Fully tested
- Unit tests with Vitest
- End-to-end (E2E) tests with Playwright
- Continuous integration with GitHub Actions ensures tests run automatically on every commit


✅ Cross-platform builds
- Generated for Windows, macOS, and Linux using GitHub Actions

✅ Type-safe codebase
- Written in TypeScript
- Strong typings enforced across main, preload, and renderer processes
- IPC communication is safe: only specific functions are exposed to the UI

✅ Custom window frame
- Matches the native look and feel of both Windows and macOS
- Supports closing, minimizing, maximizing, and dragging just like a native app

✅ System tray integration
- Tray menu with Show and Quit actions
- On macOS: custom tray icon with automatic light/dark (black/white) adaptation

✅ Custom macOS menu bar
- Show / Quit / Close actions
- View switching directly from the macOS menu bar
- Works in sync with the renderer UI for seamless interaction


🛠 Tech Stack
- [Electron](https://www.electronjs.org/)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev) for unit tests
- [Playwright](https://playwright.dev) for end-to-end tests
- [GitHub Actions](https://github.com/features/actions) for CI/CD


<img width="842" height="639" alt="Screenshot 2025-08-26 at 8 46 42 PM" src="https://github.com/user-attachments/assets/4004701d-052d-4f94-8b32-7aade99584e1" />
