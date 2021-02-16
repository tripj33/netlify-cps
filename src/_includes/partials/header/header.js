module.exports = function () {

    let windowSize = document.body.clientWidth;

    function responsiveHeader() {
        return {
            menuOpen: false,
            hamburgerActive: false,
            dropdown: "",
            windowSize: windowSize,

            windowResize() {
                this.windowSize = document.body.clientWidth;
                return this.windowSize;
            }
        };
    }
}
