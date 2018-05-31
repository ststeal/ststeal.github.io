Vue.filter('capitalize',function (value) {
    if (!value){
        return '';
    }
    value = value.toString();
    return value.replace(/\b\w/g,function (l) {
        return l.toUpperCase()
    });
});

new Vue({
    el: '#app',
    data: {
        show: false,
        message: 'Hello world , WORLD',
        cars: [
            {model: "BMW", speed: 250},
            {model: "lada", speed: 100},
            {model: "audi", speed: 123},
            {model: "volge", speed: 300},
        ]
    },
    methods: {},
    computed: {
        showMess() {
            return this.message.toUpperCase();
        }
    },
    filters: {
        lowerCase(value) {
            return value.toLowerCase();
        }
    }
});
