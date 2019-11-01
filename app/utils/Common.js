const VueCommon = {};
VueCommon.install = Vue => {
    Vue.prototype.$common = {
        S3_URL(id, thumb) {
            const path = id + (thumb ? '/thumb/' : '/');
            return `https://wisebirds-creativelibrary.s3.ap-northeast-2.amazonaws.com/${path}`;
        },
    };
};
export default VueCommon;
