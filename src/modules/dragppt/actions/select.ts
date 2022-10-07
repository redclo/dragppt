import { indexOf, isUndefined } from "lodash";
import GameMap from "..";

export default (game: GameMap) => {

    let _selected: number[] = [];//选中的序号
    let _rectSelecting = false;
    let _rectStartX = 0, _rectStartY = 0;
    const _rectCurrX = 0, _rectCurrY = 0;
    let _initMoveX = 0, _initMoveY = 0;
    const _tempSelected: number[] = [];
    const idUnselect = false;
    let _downIndex = -1;

    return {

        checkIndex(x: number, y: number) {
            const state = game.state;
            const totalW = state.TotalWidth;
            const totalH = state.TotalHeight;
            const x0 = (state.ContainerWidth - totalW) / 2.0;
            const y0 = (state.ContainerHeight - totalH) / 2.0;

            const xOff = x - x0;
            const yOff = y - y0;

            if (xOff < 0 || yOff < 0 || xOff > totalW || yOff > totalH) {
                return -1;
            }

            console.log(xOff, yOff);

            const box = game.state.ItemSizeBox;

            const xindex = Math.floor(xOff / box.w);
            const yindex = Math.floor(yOff / box.h);
            //判断是否落在box里面
            let xtemp = (xindex + 1) * game.state.ItemSize
            if (xindex > 0) {
                xtemp += (xindex - 1) * game.state.MarginLeft
            }
            if (xOff > xtemp) {//点到缝隙里面了
                return -1;
            }

            let ytemp = (yindex + 1) * game.state.ItemSize
            if (yindex > 0) {
                ytemp += (yindex - 1) * game.state.MarginHeight
            }
            if (yOff > ytemp) {//点到缝隙里面了
                return -1;
            }

            return xindex + yindex * game.state.ColumnCount;
        },

        downEvent(x: number, y: number) {
            console.log("down Event", x, y);
            _rectStartX = x;
            _rectStartY = y;

            _initMoveX = game.state.offsetX;
            _initMoveY = game.state.offsetY;

            _downIndex = game.actions.checkIndex(x, y);

            console.log("downIndex=>", _downIndex);

            game.actions.redraw();
        },

        cleanSelect() {
            _selected = [];

            game.actions.redraw();
        },

        getSelected() {
            return _selected;
        },

        clickEvent(x: number, y: number) {

        },

        moveDragEvent(x: number, y: number) {
            game.state.offsetX = _initMoveX + (x - _rectStartX);
            game.state.offsetY = _initMoveY + (y - _rectStartY);

            if (game.state.offsetX > 0) game.state.offsetX = 0;
            if (game.state.offsetY > 0) game.state.offsetY = 0;

            // const box = game.actions.getContentBox();

            // console.log((game.state.ContainerWidth - box.w), game.state.offsetX)
            // if (game.state.offsetX < (game.state.ContainerWidth - box.w)) {
            //     game.state.offsetX = game.state.ContainerWidth - box.w;
            // }
            // if (game.state.offsetY < (game.state.ContainerHeight - box.h)) {
            //     game.state.offsetY = game.state.ContainerHeight - box.h;
            // }

            game.actions.redraw();
        },

        moveEvent(x: number, y: number, buttons: number) {
            console.log("move Event", x, y, buttons);
            const isMoving = (_downIndex != -1);
            if (!isMoving) return;

            const dtaX = (x - _rectStartX);
            const dtaY = (y - _rectStartY);

            const item = game.state._items[_downIndex]
            item.dragx = dtaX;
            item.dragy = dtaY;
            item.isDrag = true;

            game.actions.redraw();
        },

        upEvent(x: number, y: number) {
            console.log("up Event", x, y);
            _rectSelecting = false;
            if (_downIndex != -1) {
                const item = game.state._items[_downIndex]
                item.dragx = 0;
                item.dragy = 0;
                item.isDrag = false;

                const upIndex = game.actions.checkIndex(x, y);
                console.log(upIndex);

                if (upIndex != -1 && upIndex != _downIndex) {
                    const target = game.state._items[upIndex]
                    const srcTarget = item.type;
                    item.type = target.type;
                    target.type = srcTarget;
                }
            }
            _downIndex = -1;
            game.actions.redraw();
        },
    }
}