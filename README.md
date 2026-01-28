# DNS-Flux

[![Chrome Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**DNS-Flux** 是一个轻量级的 Chrome 开发者工具，旨在通过一键操作瞬间刷新浏览器的 DNS 缓存并强制重载当前页面。它基于最新的 Manifest V3 规范构建，专为需要频繁切换环境或调试 DNS 解析的开发者设计。

---

## ⚠️ 核心前提（必读）

由于 Chrome 安全限制，刷新 DNS 依赖于内核隐藏的 `benchmarking` API。该 API 默认关闭，**若不使用特定参数启动 Chrome，本扩展将无法工作。**

### 如何开启 API 权限？

请彻底关闭 Chrome 浏览器，并根据您的操作系统通过以下方式重新启动：

#### **macOS**
打开终端，执行：
```bash
open /Applications/Google\ Chrome.app --args --enable-net-benchmarking
```

#### **Windows**
1. 右键点击 Chrome 桌面快捷方式，选择 **属性**。
2. 在 **目标 (Target)** 栏的末尾添加： ` --enable-net-benchmarking`（注意开头有一个空格）。
3. 通过该快捷方式重新启动 Chrome。

#### **Linux**
打开终端，执行：
```bash
google-chrome-stable --enable-net-benchmarking
```

---

## 🚀 主要功能

- **瞬时刷新**：清除 Chrome 内部的 Host Resolver Cache。
- **强制重载**：刷新 DNS 后自动执行 `Ctrl+F5` 级别的页面重载（跳过本地缓存）。
- **自动化支持**：可在选项中配置自定义间隔的定时自动刷新。
- **现代化标准**：完全兼容 Manifest V3，采用后台 Service Worker 调度。

---

## 🛠 安装步骤

1. 下载本项目源代码到本地。
2. 在 Chrome 地址栏输入 `chrome://extensions/` 并在右上角开启 **开发者模式**。
3. 点击 **加载已解压的扩展程序**。
4. 选择本项目所在的文件夹（`DNS-Flux`）。

---

## 💡 使用方法

- **图标点击**：在工具栏直接点击 DNS-Flux 图标。
- **快捷键**：
    - **Mac**: `Alt + Shift + F`
    - **Windows/Linux**: `Ctrl + Shift + F`
- **右键菜单**：在网页任意位置点击右键，选择 `Flush DNS and reload`。
- **配置选项**：在扩展管理页面点击“选项”，可开启定时自动刷新功能。

---

## 📄 许可证

本项目采用 [MIT License](LICENSE)。

---
