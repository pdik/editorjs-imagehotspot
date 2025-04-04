import { BlockToolData } from '@editorjs/editorjs';


interface image {
    url: string;
    alt?: string;
}

export interface hotspot {
    id: string;
    x: number;
    y: number;
    title: string;
    content: string;
}
/**
 * imagehotspot Tool's input and output data format
 */
export interface imagehotspotData extends BlockToolData {
    image: image,
    hotspots: Array<hotspot>,
    caption: string,
}

/**
 * imagehotspot Tool's configuration object that passed through the initial Editor config
 */
export interface imagehotspotConfig {
    /**
   * Function that uploads file to the server
   */
  uploadByFile?: (file: File) => Promise<{ file: { url: string } }>;
  
  /**
   * Function that uploads image by URL to the server
   */
  uploadByUrl?: (url: string) => Promise<{ file: { url: string } }>;
  
  /**
   * Additional data to send with requests
   */
  additionalRequestData?: object;
  
  /**
   * Additional headers to send with requests
   */
  additionalRequestHeaders?: object;
  
  /**
   * Placeholder for caption input
   */
  captionPlaceholder?: string;
  
  /**
   * Custom button labels
   */
  buttonLabels?: {
    upload?: string;
    uploadUrl?: string;
    addHotspot?: string;
    save?: string;
    cancel?: string;
    remove?: string;
  };
}
