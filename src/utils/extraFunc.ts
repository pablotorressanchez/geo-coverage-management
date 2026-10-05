export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function RandomStyle() {
    const rndColorFill = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return {
        base: {
            fillOpacity: 0.45,
            color: rndColorFill,
            strokeWeight: 4,
            fillColor: rndColorFill,
            clickable: true
        },
        editing: {
            stroke: true,
            color: '#f06eaa',
            weight: 4,
            opacity: 0.5,
            fill: true,
            fillColor: '#f06eaa',
            fillOpacity: 0.2,
            clickable: true
        }
    }
}