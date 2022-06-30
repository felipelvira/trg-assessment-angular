export interface Location {
    id?:string,
    position: {
        lat: number,
        lng: number,
    },
    label: {
        color: string,
        text: string
    },
    title: string,
    info: string,
    options: any | {},
    description?:string
}