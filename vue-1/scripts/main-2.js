new Vue({
    el: '#app',
    data: {
        value: 1
    },
    methods: {
        increment(value) {
            this.value = value;
            if (value === '25') {
                alert('numb 25');
            }
        }
    },
    computed: {
        doubleValue() {
            return this.value * 2;
        }
    }
});
