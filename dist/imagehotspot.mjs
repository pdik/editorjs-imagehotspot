(function(){"use strict";try{if(typeof document!="undefined"){var o=document.createElement("style");o.appendChild(document.createTextNode("._image-hotspot-tool_1jmnp_1{position:relative;margin-bottom:20px}._image-hotspot-tool__image-container_1jmnp_6{position:relative;margin-bottom:10px}._image-hotspot-tool__image_1jmnp_6{display:block;max-width:100%;height:auto}._image-hotspot-tool__caption_1jmnp_17{border:1px solid #e8e8eb;border-radius:3px;padding:8px;font-size:14px;line-height:1.4;margin-top:10px}._image-hotspot-tool__caption_1jmnp_17:empty:before{content:attr(placeholder);color:#707684}._image-hotspot-tool__caption_1jmnp_17:focus{outline:none;border-color:#388ae5}._image-hotspot-tool__hotspot_1jmnp_36{position:absolute;transform:translate(-50%,-50%);z-index:2;cursor:pointer}._image-hotspot-tool__hotspot-marker_1jmnp_43{width:20px;height:20px;background-color:#fffc;border:2px solid #388ae5;border-radius:50%;box-shadow:0 0 0 4px #388ae54d;transition:all .2s ease}._image-hotspot-tool__hotspot_1jmnp_36:hover ._image-hotspot-tool__hotspot-marker_1jmnp_43{transform:scale(1.2);background-color:#388ae5}._image-hotspot-tool__hotspot-editor_1jmnp_58{position:absolute;top:10px;right:10px;width:300px;background-color:#fff;border-radius:6px;box-shadow:0 4px 12px #00000026;z-index:3;padding:15px}._image-hotspot-tool__hotspot-editor-header_1jmnp_70{margin-bottom:10px}._image-hotspot-tool__hotspot-editor-title_1jmnp_74{width:100%;font-weight:500}._image-hotspot-tool__hotspot-editor-content_1jmnp_79{width:100%;resize:vertical;margin-bottom:10px}._image-hotspot-tool__hotspot-editor-actions_1jmnp_85{display:flex;justify-content:space-between}._image-hotspot-tool__button_1jmnp_90{background-color:#eff2f5;border:0;border-radius:4px;color:#707684;padding:8px 16px;cursor:pointer;font-size:14px;line-height:1;transition:background-color .2s ease}._image-hotspot-tool__button_1jmnp_90:hover{background-color:#e1e4e8}._image-hotspot-tool__button--primary_1jmnp_106{background-color:#388ae5;color:#fff}._image-hotspot-tool__button--primary_1jmnp_106:hover{background-color:#3072be}._image-hotspot-tool__button--danger_1jmnp_115{background-color:#e53838;color:#fff}._image-hotspot-tool__button--danger_1jmnp_115:hover{background-color:#c72b2b}._image-hotspot-tool__upload-button_1jmnp_124{display:block;width:100%;padding:16px;text-align:center}._image-hotspot-tool__add-hotspot-button_1jmnp_131{margin-top:10px}._image-hotspot-tool__input_1jmnp_135{border:1px solid #e8e8eb;border-radius:3px;padding:8px;font-size:14px;outline:none}._image-hotspot-tool__input_1jmnp_135:focus{border-color:#388ae5}._image-hotspot-tool__textarea_1jmnp_147{border:1px solid #e8e8eb;border-radius:3px;padding:8px;font-size:14px;outline:none;font-family:inherit}._image-hotspot-tool__textarea_1jmnp_147:focus{border-color:#388ae5}")),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
var y = Object.defineProperty;
var v = (b, o, t) => o in b ? y(b, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : b[o] = t;
var h = (b, o, t) => (v(b, typeof o != "symbol" ? o + "" : o, t), t);
const f = {
  "image-hotspot-tool": "_image-hotspot-tool_1jmnp_1",
  "image-hotspot-tool__image-container": "_image-hotspot-tool__image-container_1jmnp_6",
  "image-hotspot-tool__image": "_image-hotspot-tool__image_1jmnp_6",
  "image-hotspot-tool__caption": "_image-hotspot-tool__caption_1jmnp_17",
  "image-hotspot-tool__hotspot": "_image-hotspot-tool__hotspot_1jmnp_36",
  "image-hotspot-tool__hotspot-marker": "_image-hotspot-tool__hotspot-marker_1jmnp_43",
  "image-hotspot-tool__hotspot-editor": "_image-hotspot-tool__hotspot-editor_1jmnp_58",
  "image-hotspot-tool__hotspot-editor-header": "_image-hotspot-tool__hotspot-editor-header_1jmnp_70",
  "image-hotspot-tool__hotspot-editor-title": "_image-hotspot-tool__hotspot-editor-title_1jmnp_74",
  "image-hotspot-tool__hotspot-editor-content": "_image-hotspot-tool__hotspot-editor-content_1jmnp_79",
  "image-hotspot-tool__hotspot-editor-actions": "_image-hotspot-tool__hotspot-editor-actions_1jmnp_85",
  "image-hotspot-tool__button": "_image-hotspot-tool__button_1jmnp_90",
  "image-hotspot-tool__button--primary": "_image-hotspot-tool__button--primary_1jmnp_106",
  "image-hotspot-tool__button--danger": "_image-hotspot-tool__button--danger_1jmnp_115",
  "image-hotspot-tool__upload-button": "_image-hotspot-tool__upload-button_1jmnp_124",
  "image-hotspot-tool__add-hotspot-button": "_image-hotspot-tool__add-hotspot-button_1jmnp_131",
  "image-hotspot-tool__input": "_image-hotspot-tool__input_1jmnp_135",
  "image-hotspot-tool__textarea": "_image-hotspot-tool__textarea_1jmnp_147"
};
class E {
  constructor({ data: o, config: t, api: e, block: i, readOnly: a }) {
    h(this, "api");
    h(this, "block");
    h(this, "readOnly");
    h(this, "data");
    h(this, "config");
    h(this, "nodes");
    h(this, "activeHotspotId");
    h(this, "addingHotspot");
    h(this, "CSS");
    h(this, "settings");
    this.data = {
      image: o.image || { url: "", alt: "" },
      hotspots: o.hotspots || [],
      caption: o.caption || ""
    }, this.config = t, this.api = e, this.block = i, this.readOnly = a, this.CSS = {
      wrapper: "image-hotspot-tool",
      imageContainer: "image-hotspot-tool__image-container",
      image: "image-hotspot-tool__image",
      caption: "image-hotspot-tool__caption",
      hotspot: "image-hotspot-tool__hotspot",
      hotspotMarker: "image-hotspot-tool__hotspot-marker",
      hotspotEditor: "image-hotspot-tool__hotspot-editor",
      hotspotEditorHeader: "image-hotspot-tool__hotspot-editor-header",
      hotspotEditorTitle: "image-hotspot-tool__hotspot-editor-title",
      hotspotEditorContent: "image-hotspot-tool__hotspot-editor-content",
      hotspotEditorActions: "image-hotspot-tool__hotspot-editor-actions",
      button: "image-hotspot-tool__button",
      buttonPrimary: "image-hotspot-tool__button--primary",
      buttonDanger: "image-hotspot-tool__button--danger",
      uploadButton: "image-hotspot-tool__upload-button",
      addHotspotButton: "image-hotspot-tool__add-hotspot-button",
      input: "image-hotspot-tool__input",
      textarea: "image-hotspot-tool__textarea"
    }, this.settings = {
      uploadByFile: t.uploadByFile || void 0,
      uploadByUrl: t.uploadByUrl || void 0,
      additionalRequestData: t.additionalRequestData || {},
      additionalRequestHeaders: t.additionalRequestHeaders || {},
      captionPlaceholder: t.captionPlaceholder || "Caption (optional)",
      buttonLabels: Object.assign({
        upload: "Upload an image",
        uploadUrl: "Upload by URL",
        addHotspot: "Add Hotspot",
        save: "Save",
        cancel: "Cancel",
        remove: "Remove"
      }, t.buttonLabels || {})
    }, this.nodes = {
      wrapper: null,
      imageContainer: null,
      image: null,
      caption: null,
      fileInput: null,
      urlInput: null,
      hotspotEditor: null
    }, this.activeHotspotId = null, this.addingHotspot = !1;
  }
  render() {
    return this.nodes.wrapper = document.createElement("div"), this.nodes.wrapper.classList.add(f[this.CSS.wrapper]), this.data.image.url ? this._renderImage() : this._renderUploadUI(), this.nodes.wrapper;
  }
  _renderImage() {
    var o, t, e, i, a, d;
    if (this.nodes.imageContainer = this._make("div", [this.CSS.imageContainer]), (o = this.nodes.wrapper) == null || o.appendChild(this.nodes.imageContainer), this.nodes.image = this._make("img", [this.CSS.image], {
      src: this.data.image.url,
      alt: this.data.image.alt || ""
    }), (t = this.nodes.imageContainer) == null || t.appendChild(this.nodes.image), this.nodes.caption = this._make("div", [this.CSS.caption], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.caption || "",
      placeholder: this.config.captionPlaceholder || ""
    }), (e = this.nodes.wrapper) == null || e.appendChild(this.nodes.caption), this.data.hotspots.forEach((l) => this._renderHotspot(l)), !this.readOnly) {
      const l = this._make("button", [this.CSS.button, this.CSS.buttonPrimary, this.CSS.addHotspotButton], {
        textContent: (a = (i = this.config) == null ? void 0 : i.buttonLabels) == null ? void 0 : a.addHotspot,
        type: "button"
      });
      (d = this.nodes.wrapper) == null || d.appendChild(l), l.addEventListener("click", () => {
        this.addingHotspot = !0, this.nodes.image.style.cursor = "crosshair";
        const g = (c) => {
          const s = this.nodes.image.getBoundingClientRect(), _ = (c.clientX - s.left) / s.width * 100, p = (c.clientY - s.top) / s.height * 100;
          this._addHotspot(_, p), this.addingHotspot = !1, this.nodes.image.style.cursor = "", this.nodes.image.removeEventListener("click", g);
        };
        this.nodes.image.addEventListener("click", g);
      });
    }
  }
  _renderUploadUI() {
    var t, e, i, a, d, l, g, c;
    const o = this._make("button", [this.CSS.button, this.CSS.buttonPrimary, this.CSS.uploadButton], {
      textContent: (i = (e = (t = this.settings) == null ? void 0 : t.buttonLabels) == null ? void 0 : e.upload) != null ? i : "Upload an image",
      type: "button"
    });
    if ((d = (a = this.nodes) == null ? void 0 : a.wrapper) == null || d.appendChild(o), this.nodes.fileInput = this._make("input", [], {
      type: "file",
      accept: "image/*",
      style: "display: none"
    }), (l = this.nodes.wrapper) == null || l.appendChild(this.nodes.fileInput), o.addEventListener("click", () => {
      var s;
      (s = this.nodes.fileInput) == null || s.click();
    }), this.nodes.fileInput.addEventListener("change", async (s) => {
      var _, p;
      if (s.target && ((_ = s.target) == null ? void 0 : _.files) && ((p = s.target) == null ? void 0 : p.files.length) > 0) {
        const m = s.target, u = m && m.files ? m.files[0] : null;
        if (!u)
          return;
        try {
          if (this.settings.uploadByFile) {
            const r = await this.settings.uploadByFile(u);
            this.data.image = {
              url: r == null ? void 0 : r.file.url,
              alt: u.name
            };
          } else
            throw new Error("uploadByFile is not defined in settings.");
          this.nodes.wrapper && (this.nodes.wrapper.innerHTML = ""), this._renderImage();
        } catch (r) {
          console.error("Image upload failed", r), this.api.notifier.show({
            message: "Image upload failed",
            style: "error"
          });
        }
      }
    }), this.settings.uploadByUrl) {
      const s = this._make("div", [], {
        style: "margin-top: 10px;"
      });
      this.nodes.urlInput = this._make("input", [this.CSS.input], {
        placeholder: "Image URL",
        type: "url"
      });
      const _ = this._make("button", [this.CSS.button, this.CSS.buttonPrimary], {
        textContent: (g = this.settings.buttonLabels) == null ? void 0 : g.uploadUrl,
        type: "button",
        style: "margin-left: 10px;"
      });
      s.appendChild(this.nodes.urlInput), s.appendChild(_), (c = this.nodes.wrapper) == null || c.appendChild(s), _.addEventListener("click", async () => {
        var m, u, r;
        const p = (u = (m = this.nodes.urlInput) == null ? void 0 : m.value) == null ? void 0 : u.trim();
        if (!!p)
          try {
            if ((r = this.settings) != null && r.uploadByUrl) {
              const n = await this.settings.uploadByUrl(p);
              this.data.image = {
                url: n.file.url,
                alt: p.split("/").pop() || ""
              };
            } else
              throw new Error("uploadByUrl is not defined in settings.");
            this.nodes.wrapper && (this.nodes.wrapper.innerHTML = ""), this._renderImage();
          } catch (n) {
            console.error("Image upload by URL failed", n), this.api.notifier.show({
              message: "Image upload by URL failed",
              style: "error"
            });
          }
      });
    }
  }
  _renderHotspot(o) {
    var i;
    const t = this._make("div", [this.CSS.hotspot], {
      style: `left: ${o.x}%; top: ${o.y}%;`,
      "data-id": o.id
    }), e = this._make("div", [this.CSS.hotspotMarker]);
    t.appendChild(e), (i = this.nodes.imageContainer) == null || i.appendChild(t), this.readOnly || t.addEventListener("click", (a) => {
      a.stopPropagation(), this._editHotspot(o.id);
    });
  }
  _addHotspot(o, t) {
    const e = {
      id: this._generateId(),
      x: o,
      y: t,
      title: "",
      content: ""
    };
    this.data.hotspots.push(e), this._renderHotspot(e), this._editHotspot(e.id);
  }
  _editHotspot(o) {
    var s, _, p, m, u, r;
    this.activeHotspotId = o;
    const t = this.data.hotspots.find((n) => n.id === o);
    if (!t || !this.nodes.wrapper || (this.nodes.hotspotEditor && this.nodes.hotspotEditor.remove(), this.nodes.hotspotEditor = this._make("div", [this.CSS.hotspotEditor]), !this.nodes.imageContainer || !this.nodes.hotspotEditor))
      return;
    const e = this._make("div", [this.CSS.hotspotEditorHeader]), i = this._make("input", [this.CSS.input, this.CSS.hotspotEditorTitle], {
      value: (t == null ? void 0 : t.title) || "",
      placeholder: "Hotspot Title",
      type: "text"
    });
    e.appendChild(i), this.nodes.hotspotEditor.appendChild(e);
    const a = this._make("textarea", [this.CSS.textarea, this.CSS.hotspotEditorContent], {
      value: (t == null ? void 0 : t.content) || "",
      placeholder: "Hotspot Content",
      rows: 5
    });
    this.nodes.hotspotEditor.appendChild(a);
    const d = this._make("div", [this.CSS.hotspotEditorActions]), l = this._make("button", [this.CSS.button, this.CSS.buttonPrimary], {
      textContent: (_ = (s = this.settings.buttonLabels) == null ? void 0 : s.save) != null ? _ : "Save",
      type: "button"
    }), g = this._make("button", [this.CSS.button], {
      textContent: (m = (p = this.settings.buttonLabels) == null ? void 0 : p.cancel) != null ? m : "Cancel",
      type: "button"
    }), c = this._make("button", [this.CSS.button, this.CSS.buttonDanger], {
      textContent: (r = (u = this.settings.buttonLabels) == null ? void 0 : u.remove) != null ? r : "Remove",
      type: "button"
    });
    d.appendChild(l), d.appendChild(g), d.appendChild(c), this.nodes.hotspotEditor.appendChild(d), this.nodes.wrapper.appendChild(this.nodes.hotspotEditor), l.addEventListener("click", () => {
      var n, C, S;
      t.title = (n = i.value) != null ? n : "", t.content = a.value, (S = (C = this.nodes) == null ? void 0 : C.hotspotEditor) == null || S.remove(), this.activeHotspotId = null;
    }), g.addEventListener("click", () => {
      var n, C;
      (C = (n = this.nodes) == null ? void 0 : n.hotspotEditor) == null || C.remove(), this.activeHotspotId = null;
    }), c.addEventListener("click", () => {
      var n, C;
      this._removeHotspot(o), (C = (n = this.nodes) == null ? void 0 : n.hotspotEditor) == null || C.remove(), this.activeHotspotId = null;
    });
  }
  _removeHotspot(o) {
    var e;
    const t = (e = this.nodes.imageContainer) == null ? void 0 : e.querySelector(`[data-id="${o}"]`);
    t && t.remove(), this.data.hotspots = this.data.hotspots.filter((i) => i.id !== o);
  }
  _generateId() {
    return Math.random().toString(36).substring(2, 11);
  }
  save() {
    return {
      image: this.data.image,
      hotspots: this.data.hotspots,
      caption: this.nodes.caption ? this.nodes.caption.innerHTML : this.data.caption
    };
  }
  static get sanitize() {
    return {
      image: {
        url: !0,
        alt: !0
      },
      hotspots: {
        id: !0,
        x: !0,
        y: !0,
        title: !0,
        content: !0
      },
      caption: {
        br: !0,
        a: {
          href: !0,
          target: !0,
          rel: !0
        },
        b: {},
        i: {},
        strong: {},
        em: {}
      }
    };
  }
  static get CSS() {
    return {
      wrapper: "image-hotspot-tool"
    };
  }
  static get toolbox() {
    return {
      title: "Image Hotspots",
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 5H4V19L20 19V5ZM4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H4Z"/><circle cx="8" cy="12" r="2" /><circle cx="16" cy="8" r="2" /><circle cx="16" cy="16" r="2" /></svg>'
    };
  }
  _make(o, t = [], e = {}) {
    const i = document.createElement(o);
    Array.isArray(t) ? i.classList.add(...t) : t && i.classList.add(t);
    for (const a in e)
      i.setAttribute(a, String(e[a]));
    return i;
  }
}
export {
  E as default
};
