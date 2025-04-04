/**
 * Import styles library
 */
import styles from './index.module.css';

/**
 * Import icons
 */
import { IconStar } from '@codexteam/icons';

/**
 * Import types
 */
import { imagehotspotData, imagehotspotConfig,hotspot } from './types';
import { API, BlockAPI, BlockTool } from '@editorjs/editorjs';

/**
 * imagehotspot Tool for Editor.js
 */
export default class imagehotspot implements BlockTool {
  /**
   * Code API — public methods to work with Editor
   * 
   * @link https://editorjs.io/api
   */
   private readonly api: API;

  /**
   * Block API — methods and properties to work with Block instance
   * 
   * @link https://editorjs.io/blockapi
   */
  private readonly block: BlockAPI;

  /**
   * Read-only mode flag
   */
  private readonly readOnly: boolean;

  /**
   * Tool data for input and output
   */
  private data: imagehotspotData;

  /**
   * Configuration object that passed through the initial Editor configuration.
   */
  private config: imagehotspotConfig;

  /**
   * Tool's HTML nodes
   */
  private nodes: {[key: string]: HTMLElement|null};

  /**
   * ID of the active hotspot
   */
  private activeHotspotId: string|null;

  /**
   * Flag to indicate if a hotspot is being added
   */
  private addingHotspot: boolean;

  /**
   * CSS class names
   */
  private CSS: {[key: string]: string};
  settings: imagehotspotConfig;


  /**
   * Class constructor
   * 
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({ data, config, api, block, readOnly }: { data: imagehotspotData, config: imagehotspotConfig, api: API, block: BlockAPI, readOnly: boolean }) {
    this.data = {
      image: data.image || { url: '', alt: '' },
      hotspots: data.hotspots || [],
      caption: data.caption || '',
    };

    this.config = config;
    this.api = api;
    this.block = block;
    this.readOnly = readOnly;

    this.CSS = {
      wrapper: 'image-hotspot-tool',
      imageContainer: 'image-hotspot-tool__image-container',
      image: 'image-hotspot-tool__image',
      caption: 'image-hotspot-tool__caption',
      hotspot: 'image-hotspot-tool__hotspot',
      hotspotMarker: 'image-hotspot-tool__hotspot-marker',
      hotspotEditor: 'image-hotspot-tool__hotspot-editor',
      hotspotEditorHeader: 'image-hotspot-tool__hotspot-editor-header',
      hotspotEditorTitle: 'image-hotspot-tool__hotspot-editor-title',
      hotspotEditorContent: 'image-hotspot-tool__hotspot-editor-content',
      hotspotEditorActions: 'image-hotspot-tool__hotspot-editor-actions',
      button: 'image-hotspot-tool__button',
      buttonPrimary: 'image-hotspot-tool__button--primary',
      buttonDanger: 'image-hotspot-tool__button--danger',
      uploadButton: 'image-hotspot-tool__upload-button',
      addHotspotButton: 'image-hotspot-tool__add-hotspot-button',
      input: 'image-hotspot-tool__input',
      textarea: 'image-hotspot-tool__textarea',
    };

    this.settings = {
      uploadByFile: config.uploadByFile || undefined,
      uploadByUrl: config.uploadByUrl || undefined,
      additionalRequestData: config.additionalRequestData || {},
      additionalRequestHeaders: config.additionalRequestHeaders || {},
      captionPlaceholder: config.captionPlaceholder || 'Caption (optional)',
      buttonLabels: Object.assign({
        upload: 'Upload an image',
        uploadUrl: 'Upload by URL',
        addHotspot: 'Add Hotspot',
        save: 'Save',
        cancel: 'Cancel',
        remove: 'Remove',
      }, config.buttonLabels || {}),
    };

    /**
     * Declare Tool's nodes
     */
    this.nodes = {
      wrapper: null,
      imageContainer: null,
      image: null,
      caption: null,
      fileInput: null,
      urlInput: null,
      hotspotEditor: null,
    };
    this.activeHotspotId = null;
    this.addingHotspot = false;
  }

  /**
   * PUBLIC METHODS
   * 
   * @link https://editorjs.io/tools-api#public-methods
   */

  /**
   * Creates UI of a Block
   * Required
   * @link https://editorjs.io/tools-api#render
   * 
   * @returns {HTMLElement}
   */
  render() {
    this.nodes.wrapper = document.createElement('div',);
    this.nodes.wrapper.classList.add(styles[this.CSS.wrapper]);
    // If we have an image, render it with hotspots
    if (this.data.image.url) {
      this._renderImage();
    } else {
      // Otherwise, render the upload UI
      this._renderUploadUI();
    }
    return this.nodes.wrapper;
  }

  /**
   * Renders the image with hotspots
   * @private
   */
 

  /**
   * Helper for making Elements
   * @param {string} tagName - name of the tag
   * @param {string[]} classNames - list of CSS classes
   * @param {object} attributes - object with attributes
   * @returns {HTMLElement}
   * @private
   */
/**
   * Renders the image with hotspots
   * @private
   */
  private _renderImage(): void {
    this.nodes.imageContainer = this._make('div', [this.CSS.imageContainer]);
    this.nodes.wrapper?.appendChild(this.nodes.imageContainer);

    this.nodes.image = this._make('img', [this.CSS.image], {
      src: this.data.image.url,
      alt: this.data.image.alt || '',
    });
    this.nodes.imageContainer?.appendChild(this.nodes.image);

    this.nodes.caption = this._make('div', [this.CSS.caption], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.caption || '',
      placeholder: this.config.captionPlaceholder || '',
    });
    this.nodes.wrapper?.appendChild(this.nodes.caption);

    this.data.hotspots.forEach((hotspot) => this._renderHotspot(hotspot));

    if (!this.readOnly) {
      const addHotspotButton = this._make('button', [this.CSS.button, this.CSS.buttonPrimary, this.CSS.addHotspotButton], {
        textContent: this.config?.buttonLabels?.addHotspot!,
        type: 'button',
      });
      this.nodes.wrapper?.appendChild(addHotspotButton);

      addHotspotButton.addEventListener('click', () => {
        this.addingHotspot = true;
        this.nodes.image!.style.cursor = 'crosshair';

        const clickHandler = (e: MouseEvent) => {
          const rect = this.nodes.image!.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          this._addHotspot(x, y);

          this.addingHotspot = false;
          this.nodes.image!.style.cursor = '';
          this.nodes.image!.removeEventListener('click', clickHandler);
        };

        this.nodes.image!.addEventListener('click', clickHandler);
      });
    }
  }

  /**
   * Renders the upload UI
   * @private
   */
  _renderUploadUI() {
    const uploadButton = this._make('button', [this.CSS.button, this.CSS.buttonPrimary, this.CSS.uploadButton], {
      textContent: this.settings?.buttonLabels?.upload ?? 'Upload an image',
      type: 'button',
    });
    this.nodes?.wrapper?.appendChild(uploadButton);

    // Create file input
    this.nodes.fileInput = this._make('input', [], {
      type: 'file',
      accept: 'image/*',
      style: 'display: none',
    });
    this.nodes.wrapper?.appendChild(this.nodes.fileInput);

    // Handle file upload
    uploadButton.addEventListener('click', () => {
      this.nodes.fileInput?.click();
    });

    this.nodes.fileInput.addEventListener('change', async (e) => {
      if (e.target && (e.target as HTMLInputElement)?.files && e.target?.files.length > 0) {
        const target = e.target as HTMLInputElement;
        const file = target && target.files ? target.files[0] : null;
        if (!file) {
          return;
        }

        try {
          if (this.settings.uploadByFile) {
            const response = await this.settings.uploadByFile(file);
            this.data.image = {
              url: response?.file.url,
              alt: file.name,
            };
          } else {
            throw new Error('uploadByFile is not defined in settings.');
          }
          // Clear the wrapper and render the image
          if (this.nodes.wrapper) {
            this.nodes.wrapper.innerHTML = '';
          }
          this._renderImage();
        } catch (error) {
          console.error('Image upload failed', error);
          this.api.notifier.show({
            message: 'Image upload failed',
            style: 'error',
          });
        }
      }
    });

    // Add URL upload option if enabled
    if (this.settings.uploadByUrl) {
      const urlUploadWrapper = this._make('div', [], {
        style: 'margin-top: 10px;',
      });

      this.nodes.urlInput = this._make('input', [this.CSS.input], {
        placeholder: 'Image URL',
        type: 'url',
      });

      const urlUploadButton = this._make('button', [this.CSS.button, this.CSS.buttonPrimary], {
        textContent: this.settings.buttonLabels?.uploadUrl!,
        type: 'button',
        style: 'margin-left: 10px;',
      });

      urlUploadWrapper.appendChild(this.nodes.urlInput);
      urlUploadWrapper.appendChild(urlUploadButton);
      this.nodes.wrapper?.appendChild(urlUploadWrapper);

      urlUploadButton.addEventListener('click', async () => {
        const url = this.nodes.urlInput?.value?.trim();

        if (!url) return;

        try {
          if (this.settings?.uploadByUrl) {
            const response = await this.settings.uploadByUrl(url);
            this.data.image = {
              url: response.file.url,
              alt: url.split('/').pop() || '',
            };
  
          } else {
            throw new Error('uploadByUrl is not defined in settings.');
          }

          
          // Clear the wrapper and render the image
          if (this.nodes.wrapper) {
            this.nodes.wrapper.innerHTML = '';
          }
          this._renderImage();
        } catch (error) {
          console.error('Image upload by URL failed', error);
          this.api.notifier.show({
            message: 'Image upload by URL failed',
            style: 'error',
          });
        }
      });
    }
  }

  /**
   * Renders a hotspot on the image
   * @param {object} hotspot - hotspot data
   * @private
   */
  private _renderHotspot(hotspot: hotspot): void {
    const hotspotElement = this._make('div', [this.CSS.hotspot], {
      style: `left: ${hotspot.x}%; top: ${hotspot.y}%;`,
      'data-id': hotspot.id,
    });
  
    const hotspotMarker = this._make('div', [this.CSS.hotspotMarker]);
    hotspotElement.appendChild(hotspotMarker);
  
    this.nodes.imageContainer?.appendChild(hotspotElement);
  
    if (!this.readOnly) {
      hotspotElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this._editHotspot(hotspot.id);
      });
    }
  }

  /**
   * Adds a new hotspot at the specified coordinates
   * @param {number} x - x coordinate in percentage
   * @param {number} y - y coordinate in percentage
   * @private
   */
  private _addHotspot(x: number, y: number): void {
    const hotspot: hotspot = {
      id: this._generateId(),
      x,
      y,
      title: '',
      content: '',
    };
  
    this.data.hotspots.push(hotspot);
    this._renderHotspot(hotspot);
    this._editHotspot(hotspot.id);
  }

  /**
   * Opens the hotspot editor for the specified hotspot
   * @param {string} id - hotspot id
   * @private
   */
  private _editHotspot(id: string): void {
    this.activeHotspotId = id;
    const hotspot = this.data.hotspots.find(h => h.id === id);

    if (!hotspot || !this.nodes.wrapper) return;
  
    // Remove existing editor if any
    if (this.nodes.hotspotEditor) {
      this.nodes.hotspotEditor.remove();
    }

    // Create editor
    this.nodes.hotspotEditor = this._make('div', [this.CSS.hotspotEditor]);
    if(!this.nodes.imageContainer || !this.nodes.hotspotEditor) return;
    // Header
    const header = this._make('div', [this.CSS.hotspotEditorHeader]);
    const titleInput = this._make('input', [this.CSS.input, this.CSS.hotspotEditorTitle], {
      value: hotspot?.title || '',
      placeholder: 'Hotspot Title',
      type: 'text',
    }) as HTMLInputElement;
    header.appendChild(titleInput);
    this.nodes.hotspotEditor.appendChild(header);

    // Content
    const contentTextarea = this._make('textarea', [this.CSS.textarea, this.CSS.hotspotEditorContent], {
      value: hotspot?.content || '',
      placeholder: 'Hotspot Content',
      rows: 5,
    }) as HTMLTextAreaElement;
    this.nodes.hotspotEditor.appendChild(contentTextarea);

    // Actions
    const actions = this._make('div', [this.CSS.hotspotEditorActions]);

    const saveButton = this._make('button', [this.CSS.button, this.CSS.buttonPrimary], {
      textContent: this.settings.buttonLabels?.save ?? 'Save',
      type: 'button',
    });

    const cancelButton = this._make('button', [this.CSS.button], {
      textContent: this.settings.buttonLabels?.cancel ?? 'Cancel',
      type: 'button',
    });

    const removeButton = this._make('button', [this.CSS.button, this.CSS.buttonDanger], {
      textContent: this.settings.buttonLabels?.remove ?? 'Remove',
      type: 'button',
    });

    actions.appendChild(saveButton);
    actions.appendChild(cancelButton);
    actions.appendChild(removeButton);
    this.nodes.hotspotEditor.appendChild(actions);

 
    this.nodes.wrapper.appendChild(this.nodes.hotspotEditor);
  

    // Event handlers
    saveButton.addEventListener('click', () => {
      hotspot.title = titleInput.value ?? '';
      hotspot.content = contentTextarea.value;
      this.nodes?.hotspotEditor?.remove();
      this.activeHotspotId = null;
    });

    cancelButton.addEventListener('click', () => {
      this.nodes?.hotspotEditor?.remove();
      this.activeHotspotId = null;
    });

    removeButton.addEventListener('click', () => {
      this._removeHotspot(id);
      this.nodes?.hotspotEditor?.remove();
      this.activeHotspotId = null;
    });
  }

  /**
   * Removes a hotspot
   * @param {string} id - hotspot id
   * @private
   */
  private _removeHotspot(id: string): void {
    const hotspotElement = this.nodes.imageContainer?.querySelector(`[data-id="${id}"]`);
    if (hotspotElement) {
      hotspotElement.remove();
    }
  
    this.data.hotspots = this.data.hotspots.filter((h) => h.id !== id);
  }

  /**
   * Generates a unique ID for a hotspot
   * @returns {string}
   * @private
   */
  private _generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

 

  /**
   * Return Tool data
   * @returns {object}
   */
  public save(): imagehotspotData {
    return {
      image: this.data.image,
      hotspots: this.data.hotspots,
      caption: this.nodes.caption ? this.nodes.caption.innerHTML : this.data.caption,
    };
  }

  static get sanitize(): Record<string, any> {
    return {
      image: {
        url: true,
        alt: true,
      },
      hotspots: {
        id: true,
        x: true,
        y: true,
        title: true,
        content: true,
      },
      caption: {
        br: true,
        a: {
          href: true,
          target: true,
          rel: true,
        },
        b: {},
        i: {},
        strong: {},
        em: {},
      },
    };
  }
  /**
   * Tool's CSS properties
   * @returns {object}
   */
 
  static get CSS() {
    return {
      wrapper: 'image-hotspot-tool',
    };
  }



  /**
   * Validates Block data after saving
   * @link https://editorjs.io/tools-api#validate
   * 
   * @param {imagehotspotData} savedData
   * @returns {boolean} true if data is valid, otherwise false
   */ 
  // validate() {}

  /**
   * 
   * Returns HTML that will be appended at the top of Block-settings
   * @link https://editorjs.io/tools-api#render-settings
   * 
   * @returns {HTMLElement}
   */ 
  // renderSettings() {}

  /**
   * Clear Tools stuff: cache, variables, events.
   * Called when Editor instance is destroying.
   * @link https://editorjs.io/tools-api#destroy
   * 
   * @returns {void}
   */
  // destroy() {}

  /**
   * Handle content pasted by ways that described by pasteConfig static getter
   * @link https://editorjs.io/tools-api#on-paste
   * 
   * @param {PasteEvent} event - event with pasted content
   * @returns {void}
   */  
  // onPaste() {}

  /**
   * Specifies how to merge two similar Blocks
   * @link https://editorjs.io/tools-api#merge
   * 
   * @param {imagehotspotData} data - data of second Block
   * @returns {imagehotspotData} - merged data
   */
  // merge() {} 

  /**
   * STATIC GETTERS
   * 
   * @link https://editorjs.io/tools-api#static-getters
   */

  /**
   * Process pasted content before appending to the Editor
   * @link https://editorjs.io/tools-api#pasteconfig
   * 
   * @returns {tags?: string[], files?: { mimeTypes: string[], extensions: string[] }, patterns?: { [string]: RegEx }}
   */ 
  // static get pasteConfig() {
  //   return {
  //     /**
  //      * Paste HTML into Editor
  //      */
  //     tags: [],
    
  //     /**
  //      * Paste URL of media into the Editor
  //      */
  //     patterns: {},
    
  //     /**
  //      * Drag n drop file from into the Editor
  //      */
  //     files: {
  //       mimeTypes: [ ],
  //     },
  //   };
  // }

  /**
   * Clean unwanted HTML tags or attributes
   * @link https://editorjs.io/tools-api#sanitize
   * 
   * @returns {{[string]: boolean|object}} - Sanitizer rules
   */
  // static get sanitize() {
  //   return {};
  // } 

  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   * 
   * @returns {{icon: string, title: string}}
   */
  /**
   * Specify Block Tool's title and icon
   * @returns {object}
   */
  static get toolbox() {
    return {
      title: 'Image Hotspots',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 5H4V19L20 19V5ZM4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H4Z"/><circle cx="8" cy="12" r="2" /><circle cx="16" cy="8" r="2" /><circle cx="16" cy="16" r="2" /></svg>',
    };
  }

  /**
   * Shortcut that fires render method and inserts new Block
   * @link https://editorjs.io/tools-api#shortcut
   * 
   * @returns {string}
   */
  // static get shortcut() {
  //   // return 'CMD+SHIFT+I';
  // }

  /**
   * Config allows Tool to specify how it can be converted into/from another Tool
   * 
   * @link https://editorjs.io/tools-api#conversionconfig
   * 
   * @returns {{export: string|function, import: string|function}}
   */
  // static get conversionConfig() {
  //   // return {
  //   //   export: (data) => {
  //   //     return data.items.join('.'); // in this example, all list items will be concatenated to an export string
  //   //   },
  //   //  
  //   //   /**
  //   //    * In this example, List Tool creates items by splitting original text by a dot symbol. 
  //   //    */
  //   //   import: (string) => {
  //   //     const items = string.split('.');
  //   //
  //   //     return {
  //   //       items: items.filter( (text) => text.trim() !== ''),
  //   //       type: 'unordered'
  //   //     };
  //   //   }
  //   // };
  // }

  /**
   * With this option, Editor.js won't handle Enter keydowns
   * @link https://editorjs.io/tools-api#enablelinebreaks
   * 
   * @returns {boolean}
   */ 
  // static get enableLineBreaks() {
  //   return true;
  // }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   * 
   * @returns {boolean}
   */
  // static get isReadOnlySupported() {
  //   return true;
  // } 

  /**
   * LIFE CYCLE HOOKS
   * 
   * These methods are called by Editor.js core
   * @link https://editorjs.io/tools-api#lifecycle-hooks
   */

  /**
   * Called after Block contents is added to the page
   */
  // rendered() {}

  /**
   * Called each time Block contents is updated
   */
  // updated() {}

  /**
   * Called after Block contents is removed from the page but before Block instance deleted
   */
  // removed() {}

  /**
   * Called after Block is moved by move tunes or through API
   * 
   * @param {MoveEvent} event 
   */
  // moved(event) {}
  /**
   * Helper for making Elements
   * @param {string} tagName - name of the tag
   * @param {string[]} classNames - list of CSS classes
   * @param {object} attributes - object with attributes
   * @returns {HTMLElement}
   * @private
   */
  
  private _make(
    tagName: string,
    classNames: string[] = [],
    attributes: { [key: string]: string | boolean | number } = {}
  ): HTMLElement {
    const el = document.createElement(tagName);
  
    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }
  
    for (const attrName in attributes) {
      el.setAttribute(attrName, String(attributes[attrName]));
    }
  
    return el;
  }
};