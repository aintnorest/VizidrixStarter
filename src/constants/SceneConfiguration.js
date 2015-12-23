import { spring } from 'react-motion';

export default {
    backdrop: {
        Enter: { x: 0, y: 0, z: -1, opacity: 100},
        Leave: { x: 0, y: 0, z: -1, opacity: 100},
        Styles(val) {
            return { x: val.x, y: val.y, z: -1, opacity: 100};
        },
        VM(store) {
            return require("components/Backdrop/Backdrop").default(store);
        }
    },
    cardFrame: {
        Enter: { x: -100, y: 0, z: 0, opacity: 100},
        Leave: { x: -100, y: 0, z: 0, opacity: 100},
        Styles(val) {
            return { x: val.x, y: val.y, z: 0, opacity: 100};
        },
        VM(store) {
            return require("components/CardFrame/CardFrame").default(store);
        }
    },
};
