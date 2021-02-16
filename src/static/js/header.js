
let windowSize = document.body.clientWidth;

function responsiveHeader() {
    return {
        menuOpen: false,
        hamburgerActive: false,
        dropdown: "",
        windowSize: windowSize,
        sticky: true,
        lastPos: window.scrollY + 0,

        scroll() {
            if(window.scrollY < 400){
                this.sticky = true;
            }else{
                this.sticky = window.scrollY > this.$refs.navbar.offsetHeight && this.lastPos > window.scrollY;
      this.lastPos = window.scrollY;
      console.log(this.sticky + ' ScrollY: ' + window.scrollY);
            }
      
    },

        windowResize() {
            this.windowSize = document.body.clientWidth;
            return this.windowSize;
        },

    
    };
}

