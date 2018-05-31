new Vue({
    el: '#app',
    data: {
        title: 'Hell',
        styleCSS: ''
    },
    methods: {
        changeText() {
            this.title = 'New Text';
        }
    }
});
