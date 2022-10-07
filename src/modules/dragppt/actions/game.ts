import GameMap from "..";
import FileSaver from 'file-saver';


export default (game: GameMap) => {

    let _canvas: HTMLCanvasElement;
    let _ctx2d: CanvasRenderingContext2D;

    return {
        initWidthCanvas(canvas: HTMLCanvasElement) {
            _canvas = canvas;
            _ctx2d = canvas.getContext("2d") as CanvasRenderingContext2D;
            game.state.ContainerHeight = window.innerHeight * game.state.pxScale;
            game.state.ContainerWidth = window.innerWidth * game.state.pxScale;
            canvas.width = game.state.ContainerWidth;
            canvas.height = game.state.ContainerHeight;

            game.actions.initMouseEvent(canvas);
            game.actions.initResizeEvents();

            game.actions.redraw();
        },

        initGameItems() {//
            const total = game.state.TotalCounts
            const row = game.state.RowCount;
            const column = game.state.ColumnCount;
            const indexs: number[] = [];
            const _items: any = [];

            for (let i = 0; i < row; i++) {
                for (let k = 0; k < column; k++) {

                    const item = {
                        type: i,
                        dragx: 0,
                        dragy: 0,
                        index: -1,
                        isDrag: false,
                        isTarget: false,
                    };

                    if (i == (row - 1)) {
                        let i = 0;
                        while (true) {
                            if (indexs.indexOf(i) == -1) {
                                item.index = i;
                                indexs.push(i);
                                break
                            }
                            i += 1
                        }
                        _items.push(item);
                        continue
                    }


                    let rindex = Math.floor(Math.random() * total + 0.02)
                    if (indexs.indexOf(rindex) == -1) {
                        indexs.push(rindex);
                        item.index = rindex;
                        _items.push(item);
                        continue;
                    }
                    while (true) {
                        rindex = (rindex + 1) % total
                        if (indexs.indexOf(rindex) == -1) {
                            indexs.push(rindex);
                            item.index = rindex;
                            _items.push(item);
                            break
                        }
                    }
                }
            }
            game.state._items = _items.sort((a: any, b: any) => a.index - b.index)
            console.log("===========><===========");
            console.log(_items);
        },

        redraw() {
            const state = game.state;
            const totalW = state.TotalWidth;
            const totalH = state.TotalHeight;

            const x0 = (state.ContainerWidth - totalW) / 2.0;
            const y0 = (state.ContainerHeight - totalH) / 2.0;
            const _items = game.state._items;
            _ctx2d.clearRect(0, 0, state.ContainerWidth, state.ContainerHeight);
            let currDrag = null;
            let dragx = 0, dragy = 0;
            for (let i = 0; i < state.RowCount; i++) {
                for (let k = 0; k < state.ColumnCount; k++) {
                    const index = i * state.ColumnCount + k;
                    const x = x0 + state.ItemSizeBox.w * k;
                    const y = y0 + state.ItemSizeBox.h * i;
                    const item = _items[index];

                    if (item.isDrag) {
                        currDrag = item;
                        dragx = x;
                        dragy = y;
                        continue;
                    }
                    const imgObj = game.actions.getImage(item.type);
                    _ctx2d.drawImage(imgObj.image, 0, 0, imgObj.width, imgObj.height, x, y, state.ItemSize, state.ItemSize)
                }
            }

            if (currDrag) {
                const imgObj = game.actions.getImage(currDrag.type);
                _ctx2d.drawImage(imgObj.image, 0, 0, imgObj.width, imgObj.height, dragx + currDrag.dragx, dragy + currDrag.dragy, state.ItemSize, state.ItemSize)
            }
        },

        getCanvas() {
            return _canvas;
        }
    }
}