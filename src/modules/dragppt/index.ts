import { ModuleRoot } from "@/queenjs/framework";

import game from "./actions/game";
import mouse from "./actions/mouse";
import resize from "./actions/resize";
import select from "./actions/select";
import load from "./actions/load";

import State from "./state";

export default class GameMapModule extends ModuleRoot {
    actions = this.createAction([game, mouse, resize, select, load])
    state = new State().reactive();
    onInit() {
        super.onInit();
    }
}