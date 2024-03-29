import '../styles/simple-loader.scss';
import createNode from '../utils/createNode';

export default class SimpleLoader {
  size: number;

  constructor(pixelSize: number) {
    this.size = pixelSize;
  }

  get html() {
    return `
        <div class="simple-loader" style="width:${this.size || 24}px; height:${this.size || 24}px;">
            <svg viewBox="0 0 1000 1000">
                <g><path d="M500,964.2c-130.9,0-253.9-51-346.5-143.5C61,728.1,10,605,10,474.2c0-92.7,26-182.9,75.2-261C133.1,137.3,200.7,76,280.8,35.8L322,118c-65.1,32.6-120.1,82.5-159,144.2c-40,63.4-61.1,136.7-61.1,212c0,219.5,178.6,398.1,398.1,398.1c219.5,0,398.1-178.6,398.1-398.1c0-75.3-21.1-148.6-61.1-212c-38.9-61.7-93.9-111.6-159-144.2l41.2-82.1C799.3,76,866.9,137.3,914.8,213.2c49.2,78.1,75.2,168.3,75.2,261c0,130.9-51,253.9-143.5,346.5C753.9,913.2,630.9,964.2,500,964.2z"/></g>
            </svg>
        </div>
    `;
  }

  get element() {
    return createNode(this.html);
  }
}
