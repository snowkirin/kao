import Vue from "nativescript-vue";
import Main from "./components/Main";
import Common from './utils/Common';

import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadListView from 'nativescript-ui-listview/vue';

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
Vue.registerElement('VideoPlayer', () => require('nativescript-videoplayer').Video);
Vue.registerElement('exoplayer', () => require("nativescript-exoplayer").Video);

Vue.use(Common);
Vue.use(RadSideDrawer);
Vue.use(RadListView);
Vue.config.silent = true;

new Vue({
    template: `
        <Frame>
            <Main />
        </Frame>`,

    components: {
        Main
    }
}).$start();
