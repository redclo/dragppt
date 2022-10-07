import GameMap from "..";
import FileSaver from 'file-saver';
import { utils } from "@/queenjs/framework";


export default (game: GameMap) => {

    const _Images: any = {};

    const _imgTemp = { x: 0, y: 0, width: 200, height: 200, image: null as any };


    function loadImage(url: string, index: number) {
        const i = index;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ index: i, img });
            }

            img.onerror = (e) => {
                reject({ index: i, error: e });
            }
            img.src = url;
        });
    }

    return {
        async MainLoad() {
            const query = utils.getQuery();
            console.log("query=>", query);
            if (query.row) {
                game.state.RowCount = parseInt(query.row);
            }
            if (query.column) {
                game.state.ColumnCount = parseInt(query.column);
            }
            await game.actions.loadImages();
            game.actions.initGameItems();
        },
        async loadImages() {
            const loading: any = [];

            const total = game.state.RowCount;
            for (let i = 0; i < total; i++) {
                loading.push(loadImage(`./images/${i + 1}.png`, i));
            }
            const rets = await Promise.all(loading);
            console.log(rets);

            rets.forEach((item: any) => {
                _Images[item.index] = item.img;
            })
        },

        getImage(index: number) {
            _imgTemp.image = _Images[index];
            //@ts-ignore
            _imgTemp.width = _imgTemp.image.width;
            //@ts-ignore
            _imgTemp.height = _imgTemp.image.height;

            return _imgTemp;
        }
    }
}