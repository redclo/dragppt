import { css } from "@linaria/core";
import { defineComponent, ref, onMounted, reactive, nextTick, computed } from "vue";
import { useCtx } from "../../context";


export default defineComponent({
    setup() {
        const { dragppt } = useCtx();
        const canvasRef = ref();
        document.oncontextmenu = function () {
            return false;
        }

        onMounted(() => {
            // document.addEventListener('touchmove', function (e) {
            //     e.preventDefault();
            // }, { passive: false });

            document.title = "归类";
            dragppt.actions.MainLoad().then(() => {
                dragppt.actions.initWidthCanvas(canvasRef.value);
            })
        })

        function showInfo() {
            //Modal.show(<Info />, {width: "100%"})
            state.showInfo = !state.showInfo;
        }

        const state = reactive({
            showInfo: false,
            showLegend: false,
            showRegister: false,
        })

        return () => (
            <div class={rootStyle}>
                <div class="canvasContainer">
                    <canvas ref={canvasRef} />
                </div>

                <div class="hud">
                </div>

            </div>
        );
    },
});

const rootStyle = css`
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  .canvasContainer{
    width: 100%;
    height: 100%;
    background:grey;
    .border-side {
        width: 100%;
        height: 14px;
    }
    
    canvas {
        width: 100%;
        height: 100%;
    }
  }

  .hud{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    pointer-events: none;

    .top-left{
        position: absolute;
        top: 32px;
        left: 34px;
    }
  }

  .lover {
    position: absolute;
    right: 0px;
    bottom: 27px;
    width: 138px;
    pointer-events:none;
  }
`;
