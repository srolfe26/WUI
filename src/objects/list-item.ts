import isset from '../utils/isset';

export default class ListItem {
    data: Record<string, any>;

    constructor(record: Record<string, any>) {
        if (!isset(record)) {
            throw new Error('A ListItem must be created by a record');
        }

        this.data = record;
    }

    get html(): string {
        return '';
    }

    get el(): HTMLElement {
        return document.createElement('div');
    }
}