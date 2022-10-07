import { StateRoot } from '@/queenjs/framework';


type ImageItem = {
    type: number,
    dragx: number,
    dragy: number,
    index: number,
    isDrag: boolean,
    isTarget: boolean,
    img?: typeof Image,
}

export default class extends StateRoot {
    offsetX = 0;
    offsetY = 0;

    scale = 1.0;
    pxScale = 2;
    ContainerWidth = 0;
    ContainerHeight = 0;

    ImageSize = 220;
    ItemSize = this.computed(state => {
        return state.scale * state.ImageSize;
    });

    ItemSizeBox = this.computed(state => {
        return {
            w: state.scale * state.ImageSize + this.MarginLeft,
            h: state.scale * state.ImageSize + this.MarginHeight
        }
    })

    TotalWidth = this.computed(state => {
        return state.ItemSize * state.ColumnCount + (state.ColumnCount - 1) * state.MarginLeft;
    })
    TotalHeight = this.computed(state => {
        return state.ItemSize * state.RowCount + (state.RowCount - 1) * state.MarginHeight
    })

    TotalCounts = this.computed(state => {
        return state.RowCount * state.ColumnCount;
    })

    RowCount = 3
    ColumnCount = 4
    MarginLeft = 40
    MarginHeight = 40

    _items: ImageItem[] = [];
}