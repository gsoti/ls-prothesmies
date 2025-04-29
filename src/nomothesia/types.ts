export interface NomothesiaCore {
    article: string;
    text: string;
}

export interface Nomothesia extends NomothesiaCore {
    highlighted: string[];
}